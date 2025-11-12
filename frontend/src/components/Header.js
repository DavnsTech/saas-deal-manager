import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Assuming Header.css exists for styling

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Use navigate for programmatic routing
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="logo">Deal Manager</div>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/deals">Deals</Link></li>
          {/* Removed "Create Deal" from header to keep it cleaner, can be added back if desired */}
          <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#dc3545' }}>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
