'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function CourseFinderPage() {
  const [semester, setSemester] = useState('')
  const [subject, setSubject] = useState('')
  const [courseNumber, setCourseNumber] = useState('')
  const [meetingTime, setMeetingTime] = useState('')
  const [meetingDays, setMeetingDays] = useState('')
  const [status, setStatus] = useState('')

  const semesters = ['2025 Spring', '2025 Summer', '2025 Fall']
  const subjects = ['Computer Science', 'Software Engineering', 'Data Science']
  const times = ['Morning', 'Afternoon', 'Evening']
  const days = ['MWF', 'TR', 'Online']
  const statuses = ['Open', 'Closed', 'Waitlist']

  const handleSearch = () => {
    // Save or search logic
    const searchQuery = {
      semester,
      subject,
      courseNumber,
      meetingTime,
      meetingDays,
      status,
    }
    localStorage.setItem('courseSearch', JSON.stringify(searchQuery))
    alert(`Searching with criteria:\n${JSON.stringify(searchQuery, null, 2)}`)
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-28 px-4">
      <div className="w-full max-w-md border border-gray-300 bg-white shadow-md rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-6 text-center">Find a Course</h1>

        <div className="space-y-4 text-sm">
          {/* Semester */}
          <div>
            <label className="block font-medium mb-1">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Semester...</option>
              {semesters.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block font-medium mb-1">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Subject...</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Course Number */}
          <div>
            <label className="block font-medium mb-1">Course Number</label>
            <input
              type="text"
              value={courseNumber}
              onChange={(e) => setCourseNumber(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. 4348"
            />
          </div>

          {/* Meeting Times */}
          <div>
            <label className="block font-medium mb-1">Meeting Time</label>
            <select
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Time...</option>
              {times.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Meeting Days */}
          <div>
            <label className="block font-medium mb-1">Meeting Days</label>
            <select
              value={meetingDays}
              onChange={(e) => setMeetingDays(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Days...</option>
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Status...</option>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="pt-4 flex justify-center">
            <Button
                onClick={handleSearch}
                className="bg-gray-900 text-white hover:bg-teal-200 hover:text-black px-4 py-1.5 text-sm rounded"
                disabled={
                    !semester &&
                    !subject &&
                    !courseNumber &&
                    !meetingTime &&
                    !meetingDays &&
                    !status
                  }
                  
            >
                🔍 Search
            </Button>
            </div>

        </div>
      </div>
    </div>
  )
}
