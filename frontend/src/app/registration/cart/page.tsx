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
      <div className="aspect-ratio: auto relative border-gray-200 border-[1px] rounded-md w-full overflow-clip shadow-md">
          <ScheduleCalendar courses={selectedSections} />
      </div>
    </div>
  )
}
