'use client'
import React, { useEffect, useState } from 'react'
import ScheduleCalendar from '@/components/Planner/ScheduleCalendar'
import { CourseSection } from '@/types/course'
import { Button } from '@/components/ui/button'

export default function Cart() {
  const [selectedSections, setSelectedSections] = useState<CourseSection[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('selectedSections')
    if (stored) {
      setSelectedSections(JSON.parse(stored))
    }
  }, [])

  const handleRemove = (id: string) => {
    const updated = selectedSections.filter(section => section._id !== id)
    setSelectedSections(updated)
    localStorage.setItem('selectedSections', JSON.stringify(updated))
  }

  return (
    <div>
      <div className="sticky flex justify-center w-full h-fill m-1">
        <Button className="w-full h-fill" 
          onClick={() => {
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
          }} >
          Register
        </Button>
      </div>
      <div className="space-y-4 mt-4">
        {selectedSections.length === 0 ? (
          <p className="text-center text-gray-500">No courses selected.</p>
        ) : (
          selectedSections.map((section) => (
            <div
              key={section._id}
              className="p-4 border border-gray-300 rounded-md shadow-sm"
            >
              <h2 className="font-semibold text-lg">
                {section.prefix} {section.number} - Section {section.section_number}
              </h2>
              <p>Professor: {section.profFirst} {section.profLast}</p>
              <p>Days: {section.meetings[0]?.meeting_days.join(', ')}</p>
              <p>Time: {section.meetings[0]?.start_time} - {section.meetings[0]?.end_time}</p>
              <p>Location: {section.meetings[0]?.location.building} {section.meetings[0]?.location.room}</p>
              <Button className="" variant="destructive" onClick={() => handleRemove(section._id)}>
                Remove
              </Button>
            </div>
            
          ))
        )}
      </div>
    </div>
  )
}
