'use client'
import React, { useEffect, useState } from 'react'
import ScheduleCalendar from '@/components/Planner/ScheduleCalendar'
import { CourseSection } from '@/types/course'

export default function Cart() {
  const [selectedSections, setSelectedSections] = useState<CourseSection[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('selectedSections')
    if (stored) {
      setSelectedSections(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="aspect-ratio: auto relative border-gray-200 border-[1px] rounded-md w-full overflow-clip shadow-md">
      <ScheduleCalendar courses={selectedSections} />
    </div>
  )
}
