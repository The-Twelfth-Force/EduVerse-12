'use client'
import { useState } from "react"
import { ColumnDef, Row } from "@tanstack/react-table"
import { CourseSection } from '@/types/course'
import { DataTable } from "@/components/DataTable"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"
import CollegeScheduleCalendar from "@/components/Planner/CollegeScheduleCalendar"

export default function Registration() {
  const [selectedSections, setSelectedSections] = useState<CourseSection[]>([])

  const courseSections: CourseSection[] = [
    {
      _id: "1",
      prefix: "CS",
      number: "101",
      section_number: "001",
      profFirst: "John",
      profLast: "Doe",
      meetings: [{
          meeting_days: ["Monday", "Wednesday"],
          start_time: "09:00 AM",
          end_time: "10:30 AM",
          location: {
            building: "Science Hall",
            room: "101"
          }
        }],
    },
    {
      _id: "2",
      prefix: "CS",
      number: "101",
      section_number: "002",
      profFirst: "Jane",
      profLast: "Smith",
      meetings: [{
          meeting_days: ["Tuesday", "Thursday"],
          start_time: "11:00 AM",
          end_time: "12:15 PM",
          location: {
            building: "Science Hall",
            room: "102"
          }
        }],
    },
    {
      _id: "3",
      prefix: "CS",
      number: "101",
      section_number: "003",
      profFirst: "Alice",
      profLast: "Johnson",
      meetings: [{
          meeting_days: ["Friday"],
          start_time: "01:00 PM",
          end_time: "02:30 PM", 
          location: {
            building: "Science Hall",
            room: "103"
          }
        }],
    },
  ]

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
      accessorKey: 'Course',
      header: 'Professor',
      cell: ({ row }) => (
        <div>
          {row.original.prefix} {row.original.number} {row.original.profFirst} {row.original.profLast}
        </div>
      ),
    },
    {
      accessorKey: 'section_number',
      header: 'Section Number',
    },
    {
      accessorKey: 'meetings',
      header: 'Meeting Days',
      cell: ({ row }) => (
        <div>
          {row.original.meetings[0]?.meeting_days.join(', ')}
        </div>
      ),
    },
    {
      accessorKey: 'startTime',
      header: 'Start Time',
      cell: ({ row }) => (
        <div>
          {row.original.meetings[0]?.start_time}
        </div>
      ),
    },
    {
      accessorKey: 'endTime',
      header: 'End Time',
      cell: ({ row }) => (
        <div>
          {row.original.meetings[0]?.end_time}
        </div>
      ),
    },
  ]



  function handleRowSelectionChange(rowSelection: Row<CourseSection>, value: CheckedState) {
    rowSelection.toggleSelected(!!value)
    if (value) {
      setSelectedSections((prev) => [...prev, rowSelection.original])
    } else if (!value) {
      setSelectedSections((prev) => prev.filter((section) => section._id !== rowSelection.original._id))
    }
    console.log("Selected Sections: ", selectedSections)
    console.log("Selected Courses: ", formattedSections)
  }

  // Transform selectedSections into the expected format
  const formattedSections = {
    selected: {
      state: "selected",
      data: {
        latest: selectedSections
      }
    }
  }

  return (
    <div className="flex max-h-screen space-x-4 p-4">
      <div className="flex max-w-1/2 shadow rounded-md">
        <DataTable columns={columns(handleRowSelectionChange)} data={courseSections}/>
      </div>
      <div className="flex border-gray-200 border-[1px] rounded-md w-fit overflow-clip shadow-lg">
        <CollegeScheduleCalendar courses={selectedSections}></CollegeScheduleCalendar>
      </div>
    </div>
  )
}
