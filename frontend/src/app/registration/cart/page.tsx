'use client'
import React, { useEffect, useState } from 'react'
import { CourseSection } from '@/types/course'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export default function Cart() {
  const [selectedSections, setSelectedSections] = useState<CourseSection[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const stored = localStorage.getItem('selectedSections')
    if (stored) {
      setSelectedSections(JSON.parse(stored))
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

  const handleRemoveSelected = () => {
    const updated = selectedSections.filter(section => !selectedIds.has(section._id))
    setSelectedSections(updated)
    localStorage.setItem('selectedSections', JSON.stringify(updated))
    setSelectedIds(new Set())
  }

  const handleRegister = () => {
    const existing = localStorage.getItem('registeredClasses')

    if (existing) {
      const alreadyRegistered: CourseSection[] = JSON.parse(existing)
      const newOnes = selectedSections.filter(
        section => !alreadyRegistered.some(
          reg => reg._id === section._id
        )
      )
      const updated = [...alreadyRegistered, ...newOnes]
      localStorage.setItem('registeredClasses', JSON.stringify(updated))
    } else {
      localStorage.setItem('registeredClasses', JSON.stringify(selectedSections))
    }

    localStorage.setItem('selectedSections', '')
    
  }

  return (
    <div className="min-h-screen w-full p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Selected Courses</h1>
        {selectedIds.size > 0 && (
          <Button variant="destructive" onClick={handleRemoveSelected}>
            Remove Selected
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
            {selectedSections.map((section) => (
              <tr key={section._id} className="border-t hover:bg-gray-50">
                <td className="p-2 text-center">
                  <Checkbox
                    checked={selectedIds.has(section._id)}
                    onCheckedChange={() => toggleSelected(section._id)}
                    aria-label="Select course"
                  />
                </td>
                <td className="p-2 font-medium">
                  {section.prefix} {section.number} - Section {section.section_number}
                </td>
                <td className="p-2">
                  {section.profFirst} {section.profLast}
                </td>
                <td className="p-2">
                  {section.meetings[0]?.meeting_days.join(', ')}
                </td>
                <td className="p-2">
                  {section.meetings[0]?.start_time} – {section.meetings[0]?.end_time}
                </td>
                <td className="p-2">
                  {section.meetings[0]?.location.building} {section.meetings[0]?.location.room}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedSections.length === 0 && (
          <p className="text-center p-4 text-gray-500">No courses selected.</p>
        )}
      </div>

      <div className="mt-4">
        <Button className="w-full" onClick={handleRegister}>
          Register Selected
        </Button>
      </div>
    </div>
  )
}
