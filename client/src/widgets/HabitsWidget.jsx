import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';
import './HabitsWidget.css';

export default function HabitsWidget() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  async function fetchHabits() {
    try {
      const data = await apiFetch('/habits', 'GET');
      setHabits(data);
    } catch (e) { setErr(e.message); }
  }

  useEffect(() => { fetchHabits(); }, []);

  async function addHabit(e) {
    e.preventDefault();
    if (!name) return;
    try {
      await apiFetch('/habits', 'POST', { name });
      setName('');
      fetchHabits();
    } catch (e) { setErr(e.message); }
  }

  async function deleteHabit(id) {
    try {
      await apiFetch(`/habits/${id}`, 'DELETE');
      fetchHabits();
    } catch (e) { setErr(e.message); }
  }

  return (
    <div className="widget-card">
      <h3>Habits</h3>
      {err && <div className="err">{err}</div>}
      <form className="habit-form" onSubmit={addHabit}>
        <input
          type="text"
          placeholder="Habit (e.g. Drink water)"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button type="submit">+</button>
      </form>
      <ul className="habits-list">
        {habits.map(h => (
          <li key={h._id}>
            <span>{h.name}{typeof h.streak === "number" ? ` (${h.streak} days)` : ''}</span>
            <button onClick={() => deleteHabit(h._id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
