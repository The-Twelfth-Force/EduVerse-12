'use client'
import React, { useEffect, useState } from 'react'
import ScheduleCalendar from '@/components/Planner/ScheduleCalendar'
import { CourseSection } from '@/types/course'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export default function Schedule() {
  const [registeredClasses, setRegisteredClasses] = useState<CourseSection[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const stored = localStorage.getItem('registeredClasses')
    if (stored) {
      setRegisteredClasses(JSON.parse(stored))
    }
  }, [])

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleDropSelected = () => {
    const updated = registeredClasses.filter(course => !selectedIds.has(course._id))
    setRegisteredClasses(updated)
    localStorage.setItem('registeredClasses', JSON.stringify(updated))
    setSelectedIds(new Set())
  }

  return (
    <div className="min-h-screen w-full p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Registered Classes</h1>
        {selectedIds.size > 0 && (
          <Button variant="destructive" onClick={handleDropSelected}>
            Drop Selected
          </Button>
        )}
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-md shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b text-gray-700">
            <tr>
              <th className="p-2 text-center">Select</th>
              <th className="p-2">Course</th>
              <th className="p-2">Professor</th>
              <th className="p-2">Days</th>
              <th className="p-2">Time</th>
              <th className="p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {registeredClasses.map((course) => (
              <tr key={course._id} className="border-t hover:bg-gray-50">
                <td className="p-2 text-center">
                  <Checkbox
                    checked={selectedIds.has(course._id)}
                    onCheckedChange={() => toggleSelected(course._id)}
                    aria-label="Select course"
                  />
                </td>
                <td className="p-2 font-medium">
                  {course.prefix} {course.number} - {course.section_number}
                </td>
                <td className="p-2">
                  {course.profFirst} {course.profLast}
                </td>
                <td className="p-2">
                  {course.meetings[0]?.meeting_days.join(', ')}
                </td>
                <td className="p-2">
                  {course.meetings[0]?.start_time} – {course.meetings[0]?.end_time}
                </td>
                <td className="p-2">
                  {course.meetings[0]?.location.building} {course.meetings[0]?.location.room}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {registeredClasses.length === 0 && (
          <p className="text-center p-4 text-gray-500">No registered classes.</p>
        )}
      </div>
      <div className="h-full border border-gray-200 rounded-md shadow overflow-clip">
        <ScheduleCalendar courses={registeredClasses} />
      </div>
    </div>
  )
}
