"use client";

import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventClickArg, CalendarApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState<any[]>([]);
  const [selectedView, setSelectedView] = useState("dayGridMonth");
  const [showModal, setShowModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    startTime: "09:00",
    endTime: "10:00"
  });
  const calendarRef = useRef<FullCalendar>(null);
  const selectInfoRef = useRef<DateSelectArg | null>(null);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    selectInfoRef.current = selectInfo;
    setShowModal(true);
  };

  const handleEventSubmit = () => {
    if (eventDetails.title && selectInfoRef.current) {
      const calendarApi = selectInfoRef.current.view.calendar;
      const startDate = `${selectInfoRef.current.startStr.split('T')[0]}T${eventDetails.startTime}:00`;
      const endDate = `${selectInfoRef.current.endStr.split('T')[0]}T${eventDetails.endTime}:00`;

      const newEvent = {
        id: String(Date.now()),
        title: eventDetails.title,
        start: startDate,
        end: endDate,
        allDay: selectInfoRef.current.allDay
      };

      calendarApi.addEvent(newEvent);
      setEvents([...events, newEvent]);
      setShowModal(false);
      setEventDetails({ title: "", startTime: "09:00", endTime: "10:00" });
    }
  };

  const goPrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
  };

  const goNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
  };

  // View change handler
  const changeView = (view: string) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
    }
  };

  // Year selection handler
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = Number(e.target.value);
    setYear(selectedYear);
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.gotoDate(`${selectedYear}-01-01`);
  };

  // Event click handler
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Delete event "${clickInfo.event.title}"?`)) {
      clickInfo.event.remove();
      setEvents(events.filter((event) => event.id !== clickInfo.event.id));
    }
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Navigation Controls */}
      <div className="flex flex-row items-center justify-between mb-4 space-x-2">
        <div className="flex space-x-2">
          <button onClick={goPrev} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">
            ←
          </button>
          <button onClick={goNext} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">
            →
          </button>
        </div>


<div className="flex space-x-2">
  {[
    { view: "dayGridMonth", label: "Month" },
    { view: "timeGridWeek", label: "Week" },
    { view: "timeGridDay", label: "Day" }
  ].map(({ view, label }) => (
    <button
      key={view}
      onClick={() => {
        changeView(view); // Still pass the technical view name
        setSelectedView(view);
      }}
      className={`px-4 py-2 rounded border ${
        selectedView === view 
        ? "bg-gray-900 text-white border-gray-900" 
        : "border-gray-300 hover:bg-gray-100"
      }`}
    >
      {label} {/* Display friendly label */}
    </button>
  ))}
</div>

        <div className="flex space-x-2 items-center">
          <select 
            value={year} 
            onChange={handleYearChange} 
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            {Array.from({ length: 10 }, (_, i) => {
              const yr = new Date().getFullYear() - 5 + i;
              return <option key={yr} value={yr}>{yr}</option>;
            })}
          </select>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-teal-200 hover:text-gray-900"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* Event Modal */}
      {showModal && (
  <div className="fixed inset-0 z-[1000] bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg space-y-4 w-80">
      <h2 className="text-xl font-bold">Create Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={eventDetails.title}
        onChange={(e) => setEventDetails({...eventDetails, title: e.target.value})}
      />
      <div className="flex items-center space-x-2">
        <input
          type="time"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={eventDetails.startTime}
          onChange={(e) => setEventDetails({...eventDetails, startTime: e.target.value})}
        />
        <span className="text-gray-500">to</span>
        <input
          type="time"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={eventDetails.endTime}
          onChange={(e) => setEventDetails({...eventDetails, endTime: e.target.value})}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button 
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded border hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleEventSubmit}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
      {/* Calendar */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        selectable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        editable={true}
        height="75vh"
        events={events}
        eventTimeFormat={{ // Add time format
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }}
      />
    </div>
  );
}