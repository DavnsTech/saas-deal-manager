import React from 'react';
import './Header.css';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect to login page or update auth state
    window.location.href = '/login';
  };

  return (
    <header className="app-header">
      <div className="logo">Deal Manager</div>
      <nav>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/deals">Deals</a></li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </header>
  );
};

export default Header;
