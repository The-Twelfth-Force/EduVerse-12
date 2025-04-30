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
    // Save to localStorage or perform any action
    window.localStorage.setItem("selectedTerm", data.subject);
    window.localStorage.setItem("selectedCourse", data.course);
    window.localStorage.setItem("selectedSection", data.section);
    window.localStorage.setItem("selectedProfessor", data.professor);
    
  };

  const [selectedTerm, setSelectedTerm] = useState<string>("");

  useEffect(() => {
    const stored = window.localStorage.getItem("selectedTerm");
    if (stored) {
      setSelectedTerm(stored);
    } 
  }
  , []);

  const [selectedSections, setSelectedSections] = useState<CourseSection[]>([]);

  const courseSections: CourseSection[] = [
    {
      _id: '1',
      prefix: 'CS',
      number: '101',
      section_number: '001',
      course_name: 'Introduction to Computer Science',
      term: 'S25',
      status: 'Open',
      profFirst: 'John',
      profLast: 'Doe',
      meetings: [
        {
          meeting_days: ['Monday', 'Wednesday'],
          start_time: '10:00 AM',
          end_time: '11:30 AM',
          location: {
            building: 'Engineering Building',
            room: '101',
          },
        },
      ],
      imageUrl: '/images/landscape.jpg',
    },
    {
      _id: '2',
      prefix: 'CS',
      number: '102',
      section_number: '002',
      course_name: 'Data Structures',
      term: 'S25',
      status: 'Open',
      profFirst: 'Jane',
      profLast: 'Smith',
      meetings: [
        {
          meeting_days: ['Tuesday', 'Thursday'],
          start_time: '1:00 PM',
          end_time: '2:30 PM',
          location: {
            building: 'Science Building',
            room: '202',
          },
        },
      ],
      imageUrl: '/images/landscape.jpg',
    }
  ];

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
                                  {Array.from(new Set(courseSections.map(section => section.prefix))).map(prefix => (
                                    <SelectItem key={prefix} value={prefix}>
                                      {prefix}
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
                                  {Array.from(new Set(courseSections.map(section => section.number))).map(number => (
                                    <SelectItem key={number} value={number}>
                                      {number}
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
                                  {Array.from(new Set(courseSections.map(section => section.section_number))).map(section => (
                                    <SelectItem key={section} value={section}>
                                      {section}
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
                                {Array.from(new Set(courseSections.map(section => section.profFirst + " " + section.profLast))).map(prof => (
                                  <SelectItem key={prof} value={prof}>
                                    {prof}
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
