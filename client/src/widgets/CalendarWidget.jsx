import React, { useState } from 'react';
import './CalendarWidget.css';

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function CalendarWidget() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11); setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }
  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0); setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="widget-card">
      <h3>Calendar</h3>
      <div className="calendar-widget">
        <div className="calendar-header">
          <button onClick={prevMonth}>&lt;</button>
          <span>{monthNames[currentMonth]} {currentYear}</span>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <div className="calendar-days-header">
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <span key={i} className="calendar-day-name">{d}</span>
          ))}
        </div>
        <div className="calendar-days-grid">
          {days.map((day, idx) => (
            <span
              key={idx}
              className={
                `calendar-day-cell${
                  day === today.getDate() 
                  && currentMonth === today.getMonth()
                  && currentYear === today.getFullYear()
                  ? ' calendar-today' : ''}`
              }
            >{day || ''}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
