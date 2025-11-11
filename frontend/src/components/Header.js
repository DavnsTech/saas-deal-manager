import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">Deal Manager</Link>
      </div>
      <nav className="nav">
        {isAuthenticated ? (
          <>
            <Link to="/">Tableau de bord</Link>
            <Link to="/deals">Deals</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      {isAuthenticated && (
        <div className="user-actions">
          <div className="notification">
            <FaBell size={20} />
            <span className="badge">3</span>
          </div>
          <FaUserCircle size={24} />
        </div>
      )}
    </header>
  );
}

export default Header;
