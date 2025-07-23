import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';
import './BookmarksWidget.css';

export default function BookmarksWidget() {
  const [bookmarks, setBookmarks] = useState([]);
  const [form, setForm] = useState({ title: '', url: '' });
  const [err, setErr] = useState('');

  async function fetchBookmarks() {
    try {
      const data = await apiFetch('/bookmarks', 'GET');
      setBookmarks(data);
    } catch (e) { setErr(e.message); }
  }

  useEffect(() => { fetchBookmarks(); }, []);

  async function addBookmark(e) {
    e.preventDefault();
    if (!form.title || !form.url) return;
    try {
      await apiFetch('/bookmarks', 'POST', form);
      setForm({ title: '', url: '' });
      fetchBookmarks();
    } catch (e) { setErr(e.message); }
  }

  async function deleteBookmark(id) {
    try {
      await apiFetch(`/bookmarks/${id}`, 'DELETE');
      fetchBookmarks();
    } catch (e) { setErr(e.message); }
  }

  return (
    <div className="widget-card">
      <h3>Bookmarks</h3>
      {err && <div className="err">{err}</div>}
      <form className="bookmark-form" onSubmit={addBookmark}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          required
        />
        <input
          type="url"
          placeholder="URL"
          value={form.url}
          onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
          required
        />
        <button type="submit">+</button>
      </form>
      <ul className="bookmarks-list">
        {bookmarks.map(bm => (
          <li key={bm._id}>
            <a href={bm.url} target="_blank" rel="noopener noreferrer">{bm.title}</a>
            <button onClick={() => deleteBookmark(bm._id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
