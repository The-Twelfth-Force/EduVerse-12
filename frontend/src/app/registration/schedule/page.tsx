'use client'
import React, { useEffect, useState } from 'react'
import ScheduleCalendar from '@/components/Planner/ScheduleCalendar'
import { CourseSection } from '@/types/course'
import { Button } from '@/components/ui/button'
import { register } from 'module'

export default function Schedule() {
  const [registeredClasses, setSelectedSections] = useState<CourseSection[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('registeredClasses')
    if (stored) {
      setSelectedSections(JSON.parse(stored))
    }
  }, [])

  return (
    <div>
      <div className="aspect-ratio: auto relative border-gray-200 border-[1px] rounded-md w-full overflow-clip shadow-md">
          <ScheduleCalendar courses={registeredClasses} />
      </div>
    </div>
  )
}