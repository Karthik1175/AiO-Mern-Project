// Dashboard.jsx
import React from 'react';
import NotesWidget from '../widgets/NotesWidget.jsx';
import TodosWidget from '../widgets/TodosWidget.jsx';
import BookmarksWidget from '../widgets/BookmarksWidget.jsx';
import HabitsWidget from '../widgets/HabitsWidget.jsx';
import CalendarWidget from '../widgets/CalendarWidget.jsx';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-main">
      <h2>Welcome to AiO Dashboard</h2>
      <div className="widgets-grid">
        <NotesWidget />
        <TodosWidget />
        <BookmarksWidget />
        <HabitsWidget />
        <CalendarWidget />
      </div>
    </div>
  );
}
