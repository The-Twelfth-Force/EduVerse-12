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
      _id: "1",
      prefix: "CS",
      number: "101",
      section_number: "001",
      profFirst: "John",
      profLast: "Doe",
      meetings: [
        {
          meeting_days: ["Monday", "Wednesday"],
          start_time: "09:00 AM",
          end_time: "10:30 AM",
          location: {
            building: "Science Hall",
            room: "101",
          },
        },
      ],
    },
    {
      _id: "2",
      prefix: "PHYS",
      number: "102",
      section_number: "002",
      profFirst: "Jane",
      profLast: "Smith",
      meetings: [
        {
          meeting_days: ["Tuesday", "Thursday"],
          start_time: "11:00 AM",
          end_time: "12:30 PM",
          location: {
            building: "Engineering Hall",
            room: "202",
          },
        },
      ],
    },
    {
      _id: "3",
      prefix: "MUSI",
      number: "103",
      section_number: "003",
      profFirst: "Alice",
      profLast: "Johnson",
      meetings: [
        {
          meeting_days: ["Friday"],
          start_time: "01:00 PM",
          end_time: "02:30 PM",
          location: {
            building: "Math Hall",
            room: "303",
          },
        },
      ],
    },
    {
      _id: "4",
      prefix: "CS",
      number: "104",
      section_number: "004",
      profFirst: "Bob",
      profLast: "Brown",
      meetings: [
        {
          meeting_days: ["Monday", "Wednesday"],
          start_time: "03:00 PM",
          end_time: "04:30 PM",
          location: {
            building: "Arts Hall",
            room: "404",
          },
        },
      ],
    },
    {
      _id: "5",
      prefix: "ENGR",
      number: "105",
      section_number: "005",
      profFirst: "Charlie",
      profLast: "Davis",
      meetings: [
        {
          meeting_days: ["Tuesday", "Thursday"],
          start_time: "05:00 PM",
          end_time: "06:30 PM",
          location: {
            building: "Engineering Hall",
            room: "505",
          },
        },
      ],
    },
    {
      _id: "6",
      prefix: "BIO",
      number: "106",
      section_number: "006",
      profFirst: "David",
      profLast: "Wilson",
      meetings: [
        {
          meeting_days: ["Monday", "Wednesday"],
          start_time: "07:00 PM",
          end_time: "08:30 PM",
          location: {
            building: "Science Hall",
            room: "606",
          },
        },
      ],
    },
    {
      _id: "7",
      prefix: "CHEM",
      number: "107",
      section_number: "007",
      profFirst: "Eve",
      profLast: "Garcia",
      meetings: [
        {
          meeting_days: ["Tuesday", "Thursday"],
          start_time: "09:00 AM",
          end_time: "10:30 AM",
          location: {
            building: "Math Hall",
            room: "707",
          },
        },
      ],
    },
    {
      _id: "8",
      prefix: "STAT",
      number: "108",
      section_number: "008",
      profFirst: "Frank",
      profLast: "Martinez",
      meetings: [
        {
          meeting_days: ["Friday"],
          start_time: "11:00 AM",
          end_time: "12:30 PM",
          location: {
            building: "Arts Hall",
            room: "808",
          },
        },
      ],
    },
    {
      _id: "9",
      prefix: "HIST",
      number: "109",
      section_number: "009",
      profFirst: "Grace",
      profLast: "Hernandez",
      meetings: [
        {
          meeting_days: ["Monday", "Wednesday"],
          start_time: "01:00 PM",
          end_time: "02:30 PM",
          location: {
            building: "Engineering Hall",
            room: "909",
          },
        },
      ],
    },
    {
      _id: "10",
      prefix: "PHIL",
      number: "110",
      section_number: "010",
      profFirst: "Henry",
      profLast: "Lopez",
      meetings: [
        {
          meeting_days: ["Tuesday", "Thursday"],
          start_time: "03:00 PM",
          end_time: "04:30 PM",
          location: {
            building: "Science Hall",
            room: "1010",
          },
        },
      ],
    },
    {
      _id: "11",
      prefix: "ART",
      number: "111",
      section_number: "011",
      profFirst: "Ivy",
      profLast: "Gonzalez",
      meetings: [
        {
          meeting_days: ["Friday"],
          start_time: "05:00 PM",
          end_time: "06:30 PM",
          location: {
            building: "Math Hall",
            room: "1111",
          },
        },
      ],
    },
    {
      _id: "12",
      prefix: "ECON",
      number: "112",
      section_number: "012",
      profFirst: "Jack",
      profLast: "Wilson",
      meetings: [
        {
          meeting_days: ["Monday", "Wednesday"],
          start_time: "07:00 PM",
          end_time: "08:30 PM",
          location: {
            building: "Arts Hall",
            room: "1212",
          },
        },
      ],
    },
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
                      <Button type="submit">Search</Button>
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
            Register
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
