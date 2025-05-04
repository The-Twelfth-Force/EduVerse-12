"use client";

import { useState, useEffect } from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { CourseSection } from "@/types/course";
import { DataTable } from "@/components/DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import ScheduleCalendar from "@/components/Planner/ScheduleCalendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";

import { FilterOptions } from "@/types/dbInteraction";
import { Section } from "@/lib/dbSchema";

const formSchema = z.object({
  subject: z.string(),
  course: z.string(),
  section: z.string(),
  professor: z.string()
});

export default function Registration() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      course: "",
      professor: "",
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Data: ", data);
    // Handle form submission logic here
  };

  function parseSections(data: Section[]): CourseSection[] {
    return data.map((section) => ({
      _id: section.SectionID,
      prefix: section.Course_ID.split(" ")[0],
      number: section.Course_ID.split(" ")[1],
      section_number: section.SectionNum,
      course_name: section.Course_ID,
      term: "S25",
      status: (section.S_Capacity > 0) ? "Open" : "Closed",
      profFirst: section.Prof_First,
      profLast: section.Prof_Last,
      meetings: [
        {
          meeting_days: section.Meetings.split(" "),
          start_time: section.start_time,
          end_time: section.end_time,
          location: {
            building: section.Location.split(" ")[0],
            room: section.Location.split(" ")[1],
          },
        },
      ],
      imageUrl: section.ImageUrl || "/images/landscape.jpg",
    }));
  }

  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [courseSections, setCourseSections] = useState<CourseSection[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("selectedTerm");
    if (stored) {
      setSelectedTerm(stored);
    }
  }
    , []);

  const [selectedSections, setSelectedSections] = useState<CourseSection[]>([]);

  const columns = (handleRowSelectionChange: (rowSelection: Row<CourseSection>, value: CheckedState) => void): ColumnDef<CourseSection>[] => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            if (!!value) {
              setSelectedSections(courseSections);
            } else {
              setSelectedSections([]);
            }
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => handleRowSelectionChange(row, value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "Course",
      header: "Professor",
      cell: ({ row }) => (
        <div>
          {row.original.prefix} {row.original.number} {row.original.profFirst} {row.original.profLast}
        </div>
      ),
    },
    {
      accessorKey: "section_number",
      header: "Section Number",
    },
    {
      accessorKey: "meetings",
      header: "Meeting Days",
      cell: ({ row }) => <div>{row.original.meetings[0]?.meeting_days.join(", ")}</div>,
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
      cell: ({ row }) => <div>{row.original.meetings[0]?.start_time}</div>,
    },
    {
      accessorKey: "endTime",
      header: "End Time",
      cell: ({ row }) => <div>{row.original.meetings[0]?.end_time}</div>,
    },
  ];

  async function handleTextSearch(value: string) {
    console.log("Search Value: ", value);
    // Perform search logic here
    // Example: Fetch data from an API based on the search value
    const response = await fetch(`/api/getSections?q=${value}`);
    const data = await response.json();
    console.log("Search Results: ", data);
    const parsed = parseSections(data);
    setCourseSections(parsed);
  }

  function handleRowSelectionChange(rowSelection: Row<CourseSection>, value: CheckedState) {
    rowSelection.toggleSelected(!!value);
    if (value) {
      setSelectedSections((prev) => [...prev, rowSelection.original]);
    } else {
      setSelectedSections((prev) => prev.filter((section) => section._id !== rowSelection.original._id));
    }
    console.log("Selected Sections: ", selectedSections);
  }

  // Dummy transformation for selectedSections (for localStorage)
  const formattedSections = {
    selected: {
      state: "selected",
      data: {
        latest: selectedSections,
      },
    },
  };

  return (
    <div className="flex h-full space-x-4 p-4">
      <div className="flex flex-col">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Search courses, professors, etc."
            className="w-full mr-4"
            onKeyDown={(e => {
              if (e.key === "Enter") {
                handleTextSearch(e.currentTarget.value);
              }
            }
            )}
          />
          <div className="flex justify-start">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-auto m-2">
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="flex w-full space-x-4">
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem className="space-y-2 w-full">
                              <FormLabel>Subject</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {FilterOptions["subject"].map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="course"
                          render={({ field }) => (
                            <FormItem className="space-y-2 w-full">
                              <FormLabel>Course</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a course" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {FilterOptions["course"].map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="section"
                          render={({ field }) => (
                            <FormItem className="space-y-2 w-full">
                              <FormLabel>Section</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a section" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {FilterOptions["section"].map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="professor"
                        render={({ field }) => (
                          <FormItem className="space-y-2 w-full">
                            <FormLabel>Professor</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a professor" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {FilterOptions["professor"].map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button className="w-full" type="submit">Search</Button>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col w-full shadow rounded-md justify-between overflow-scroll">
          <div className="p-2">
            <DataTable columns={columns(handleRowSelectionChange)} data={courseSections} />
          </div>
          <Button className="sticky w-auto m-2" onClick={() => console.log(formattedSections)} disabled={selectedSections.length === 0}>
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="relative w-full overflow-hidden ">
        <div className="font-semibold text-lg mb-4">
          <p>{selectedTerm}</p>
        </div>
        <div className="border-gray-200 border-[1px] rounded-md shadow-sm">
          <ScheduleCalendar courses={selectedSections}></ScheduleCalendar>
        </div>
      </div>
    </div>
  );
}
