import { useState, useEffect, useCallback } from 'react';
import { CourseSection } from '@/types/course';

interface ScheduleCalendarProps {
  courses?: CourseSection[];
  title?: string;
  highlightToday?: boolean;
}

export default function ScheduleCalendar({ 
  courses = [], 
  highlightToday = true
}: ScheduleCalendarProps) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay()
  
  // Generate time slots from 8 AM to 10 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        slots.push(`${displayHour}:${minute === 0 ? '00' : minute} ${period}`);
      }
    }
    return slots;
  };

  const dayToGridColumn = (day: string | number): number => {
    if (typeof day === 'number') {
      return day + 2; // For backward compatibility with numeric day indices
    }
    
    const dayIndex = daysOfWeek.findIndex(d => d === day);
    return dayIndex > -1 ? dayIndex + 2 : 2; // +2 because column 1 is for time labels
  };

  const timeSlots = generateTimeSlots();

  // Process time string to get hours and minutes in 24-hour format
  const parseTimeString = useCallback((timeString: string) => {
    if (!timeString) return { hours: 0, minutes: 0 };
    
    const [timePart, period] = timeString.split(' ');
    // eslint-disable-next-line prefer-const
    let [hours, minutes] = timePart.split(':').map(Number);
    
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return { hours, minutes };
  }, []);

  // Calculate grid position based on time
  const calculateTimePosition = useCallback((timeString: string) => {
    const { hours, minutes } = parseTimeString(timeString);
    const hoursDiff = hours - 8; // Starting from 8 AM
    const slotIndex = (hoursDiff * 2) + (minutes === 30 ? 1 : 0);
    return Math.max(0, slotIndex); // Ensure we don't get negative values
  }, [parseTimeString]);

  // Calculate event duration in grid slots
  const calculateDuration = useCallback((startTime: string, endTime: string) => {
    const start = calculateTimePosition(startTime);
    const end = calculateTimePosition(endTime);
    return Math.max(1, end - start); // Ensure at least 1 slot of duration
  }, [calculateTimePosition]);

  // Assign consistent colors to courses
  const getCourseColor = (courseName: string) => {
    if (!courseName) return "bg-gray-500";
    
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", 
      "bg-red-500", "bg-yellow-500", "bg-indigo-500", 
      "bg-pink-500", "bg-teal-500"
    ];
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < courseName.length; i++) {
      hash = (hash + courseName.charCodeAt(i)) % colors.length;
    }
    
    return colors[Math.abs(hash)];
  };

  // Create sample demo events if none provided
  const [displayEvents, setDisplayEvents] = useState<Array<CourseSection & {
    startPosition: number;
    duration: number;
    color: string;
  }>>([]);
  
  useEffect(() => {
    if (courses && courses.length > 0) {
      const processed = courses.map(event => ({
        ...event,
        startPosition: calculateTimePosition(event.meetings[0]?.start_time),
        duration: calculateDuration(event.meetings[0]?.start_time, event.meetings[0]?.end_time),
        color: getCourseColor(event.prefix + event.number),
      }));
      setDisplayEvents(processed);
    } else {
      setDisplayEvents([]);
    }
  }, [calculateDuration, calculateTimePosition, courses]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Calendar Header */}
      <div className="grid grid-cols-8 gap-1 p-2 bg-white border-b">
        <div className="p-2 font-bold text-gray-600">Time</div>
        {daysOfWeek.map((day, index) => (
          <div 
            key={index} 
            className={`p-2 font-bold text-center rounded ${
              highlightToday && index === todayIndex 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative grid grid-cols-8 gap-1" style={{ gridTemplateRows: `repeat(${timeSlots.length}, minmax(60px, 1fr))` }}>
          {/* Time labels */}
          {timeSlots.map((time, index) => (
            <div key={`time-${index}`} className="flex justify-end pr-2 text-sm text-gray-500">
              {time}
            </div>
          ))}
          
          {/* Grid background */}
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            Array.from({ length: timeSlots.length }).map((_, timeIndex) => (
              <div 
                key={`grid-${dayIndex}-${timeIndex}`}
                className={`border border-gray-200 ${timeIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                style={{
                  gridColumn: dayIndex + 2,
                  gridRow: timeIndex + 1,
                }}
              />
            ))
          ))}
          
          {/* Course events */}
          {displayEvents.map((event, idx) => 
            event.meetings[0].meeting_days.map((day, dayIdx) => (
              <div
                key={`event-${idx}-day-${dayIdx}`}
                className={`${event.color} rounded text-white overflow-hidden shadow`}
                style={{
                  gridColumn: dayToGridColumn(day),
                  gridRow: `${event.startPosition + 1} / span ${event.duration}`,
                }}
              >
                <div className="font-semibold text-sm pt-2 pl-2">{event.prefix + event.number}</div>
                {event.meetings[0]?.location && <div className="text-xs px-2">{event.meetings[0].location.building + " " + event.meetings[0].location.room}</div>}
                {event.profFirst && <div className="text-xs px-2">{event.profFirst + " " + event.profLast}</div>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}