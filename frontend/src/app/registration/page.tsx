"use client";

import { useState } from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { CourseSection } from "@/types/course";
import { DataTable } from "@/components/DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import ScheduleCalendar from "@/components/Planner/ScheduleCalendar";
import { Button } from "@/components/ui/button";

export default function Registration() {
  const [selectedSections, setSelectedSections] = useState<CourseSection[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());

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
      prefix: "CS",
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
      prefix: "CS",
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

  // Handle year selection change for the calendar section
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  // Dummy handler for "Add Event" button – in a real app, you could open a dialog/modal
  const handleAddEventButton = () => {
    alert("Add Event functionality triggered.");
  };

  return (
    <div className="flex flex-col h-full space-y-4 p-4">
      {/* Filter Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 rounded-md p-4 shadow-sm mb-4">
        {/* Row 1 */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-sm">Course Status</span>
            <div className="text-sm text-gray-700">Open Classes Only</div>
          </div>
          <Button variant="outline" className="text-sm px-3 py-1">Change</Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-sm">Term</span>
            <div className="text-sm text-gray-700">2025 Fall</div>
          </div>
          <Button variant="outline" className="text-sm px-3 py-1">Change</Button>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-sm">Locations</span>
            <div className="text-sm text-gray-700">1 of 27 Selected</div>
          </div>
          <Button variant="outline" className="text-sm px-3 py-1">Change</Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-sm">Sessions</span>
            <div className="text-sm text-gray-700">All Sessions Selected</div>
          </div>
          <Button variant="outline" className="text-sm px-3 py-1">Change</Button>
        </div>

  {/* Row 3 */}
  <div className="flex items-center justify-between">
    <div>
      <span className="font-semibold text-sm">Academic Careers</span>
      <div className="text-sm text-gray-700">All Academic Careers Selected</div>
    </div>
    <Button variant="outline" className="text-sm px-3 py-1">Change</Button>
  </div>
  <div className="flex items-center justify-between">
    <div>
      <span className="font-semibold text-sm">Instruction Modes</span>
      <div className="text-sm text-gray-700">All Instruction Modes Selected</div>
    </div>
    <Button variant="outline" className="text-sm px-3 py-1">Change</Button>
  </div>
</div>



      {/* Upper Section: Data Table with Add To Cart Button */}
      <div className="flex flex-col w-full shadow rounded-md">
        <div className="p-2 max-h-full overflow-scroll">
          <DataTable columns={columns(handleRowSelectionChange)} data={courseSections} />
        </div>
        <Button
          className="sticky w-auto m-2"
          onClick={() => {
            console.log(formattedSections);
            localStorage.setItem("selectedSections", JSON.stringify(selectedSections));
          }}
          disabled={selectedSections.length === 0}
        >
          Add To Cart
        </Button>
      </div>

      {/* Lower Section: Calendar */}
      <div className="relative border border-gray-200 rounded-md w-full overflow-hidden shadow-md">
        {/* Calendar Header with Controls */}
        <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-gray-900 text-white">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Button
              onClick={handleAddEventButton}
              className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-teal-200 hover:text-gray-900 transition-colors"
            >
              Add Event
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="year" className="text-sm">
              Year:
            </label>
            <select
              id="year"
              value={year}
              onChange={handleYearChange}
              className="px-2 py-1 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-200"
            >
              {Array.from({ length: 10 }, (_, i) => {
                const yr = new Date().getFullYear() - 5 + i;
                return (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {/* Calendar Component */}
        <div className="p-4">
          <ScheduleCalendar courses={selectedSections} year={year} />
        </div>
      </div>
    </div>
  );
}
