import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';
import './TodosWidget.css';

export default function TodosWidget() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [err, setErr] = useState('');

  async function fetchTodos() {
    try {
      const data = await apiFetch('/todos', 'GET');
      setTodos(data);
    } catch (e) { setErr(e.message); }
  }

  useEffect(() => { fetchTodos(); }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!text) return;
    try {
      await apiFetch('/todos', 'POST', { text });
      setText('');
      fetchTodos();
    } catch (e) { setErr(e.message); }
  }

  async function toggleDone(id, current) {
    try {
      await apiFetch(`/todos/${id}`, 'PUT', { completed: !current });
      fetchTodos();
    } catch (e) { setErr(e.message); }
  }

  async function deleteTodo(id) {
    try {
      await apiFetch(`/todos/${id}`, 'DELETE');
      fetchTodos();
    } catch (e) { setErr(e.message); }
  }

  return (
    <div className="widget-card">
      <h3>To-do List</h3>
      {err && <div className="err">{err}</div>}
      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a task..."
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button type="submit">+</button>
      </form>
      <ul className="todos-list">
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              className={todo.completed ? 'done' : ''}
              onClick={() => toggleDone(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
