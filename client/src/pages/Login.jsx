// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { saveToken } from '../utils/auth';
import { apiFetch } from '../api/api';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const data = await apiFetch("/auth/login", "POST", form);
      saveToken(data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to AiO Dashboard</h2>
      {err && <div className="err">{err}</div>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
