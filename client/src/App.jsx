import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import { isLoggedIn } from './utils/auth';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
