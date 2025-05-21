'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Meeting } from '../types/meeting';
import { mockMeetings } from '../data/mockData';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  onMeetingSelect: (meeting: Meeting) => void;
}

export default function Calendar({ onDateSelect, onMeetingSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  
  useEffect(() => {
    // En un caso real, aquí cargaríamos las reuniones desde una API
    setMeetings(mockMeetings);
  }, []);
  
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            const prevMonth = new Date(currentDate);
            prevMonth.setMonth(prevMonth.getMonth() - 1);
            setCurrentDate(prevMonth);
          }}
          className="p-2 rounded-full hover:bg-gray-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold">
          {format(currentDate, 'MMMM yyyy', { locale: es })}
        </h2>
        <button
          onClick={() => {
            const nextMonth = new Date(currentDate);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            setCurrentDate(nextMonth);
          }}
          className="p-2 rounded-full hover:bg-gray-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };
  
  const renderDays = () => {
    const days = [];
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-gray-400 py-2">
          {weekDays[i]}
        </div>
      );
    }
    
    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, 'd');
        const dayMeetings = meetings.filter(meeting => 
          isSameDay(new Date(meeting.start), day)
        );
        
        days.push(
          <div
            key={day.toString()}
            className={`min-h-[100px] p-2 border border-gray-800 rounded-md ${
              !isSameMonth(day, monthStart)
                ? 'text-gray-600 bg-gray-900'
                : isSameDay(day, new Date())
                ? 'bg-purple-900/30 text-white'
                : 'bg-gray-800 text-white'
            } cursor-pointer hover:bg-gray-700 transition`}
            onClick={() => onDateSelect(cloneDay)}
          >
            <div className="flex justify-between">
              <span className={`text-sm font-medium ${
                isSameDay(day, new Date()) ? 'text-purple-300' : ''
              }`}>
                {formattedDate}
              </span>
              {dayMeetings.length > 0 && (
                <span className="text-xs bg-purple-600 text-white rounded-full px-2 py-0.5">
                  {dayMeetings.length}
                </span>
              )}
            </div>
            <div className="mt-2 space-y-1 overflow-y-auto max-h-[80px]">
              {dayMeetings.map(meeting => (
                <div
                  key={meeting.id}
                  className="text-xs p-1 bg-purple-800 rounded truncate"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMeetingSelect(meeting);
                  }}
                >
                  {format(new Date(meeting.start), 'HH:mm')} - {meeting.title}
                </div>
              ))}
            </div>
          </div>
        );
        
        day = addDays(day, 1);
      }
      
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      
      days = [];
    }
    
    return <div className="space-y-1">{rows}</div>;
  };
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
