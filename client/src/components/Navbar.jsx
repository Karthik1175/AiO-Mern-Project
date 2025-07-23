// Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <span className="nav-logo">AiO</span>
      <div>
        {isLoggedIn() ? (
          <>
            <Link className={location.pathname === '/dashboard' ? 'active' : ''} to="/dashboard">Dashboard</Link>
            <button className="nav-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link className={location.pathname === '/login' ? 'active' : ''} to="/login">Login</Link>
            <Link className={location.pathname === '/register' ? 'active' : ''} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
