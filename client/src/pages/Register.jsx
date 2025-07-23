// Register.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiFetch } from '../api/api';
import './Register.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    setErr(''); setMsg('');
    try {
      await apiFetch("/auth/register", "POST", form);
      setMsg("Registration successful! You can login now.");
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>AiO Register</h2>
      {err && <div className="err">{err}</div>}
      {msg && <div style={{color:"green"}}>{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
