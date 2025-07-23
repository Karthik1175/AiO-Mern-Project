import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';
import './NotesWidget.css';

export default function NotesWidget() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [err, setErr] = useState('');

  async function fetchNotes() {
    try {
      const data = await apiFetch('/notes', 'GET');
      setNotes(data);
    } catch (e) { setErr(e.message); }
  }

  useEffect(() => { fetchNotes(); }, []);

  async function addNote(e) {
    e.preventDefault();
    if (!content) return;
    try {
      await apiFetch('/notes', 'POST', { content });
      setContent('');
      fetchNotes();
    } catch (e) { setErr(e.message); }
  }

  async function deleteNote(id) {
    try {
      await apiFetch(`/notes/${id}`, 'DELETE');
      fetchNotes();
    } catch (e) { setErr(e.message); }
  }

  return (
    <div className="widget-card">
      <h3>Notes</h3>
      {err && <div className="err">{err}</div>}
      <form className="note-form" onSubmit={addNote}>
        <input
          type="text"
          placeholder="Add a note..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button type="submit">+</button>
      </form>
      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note._id}>
            {note.content}
            <button onClick={() => deleteNote(note._id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
