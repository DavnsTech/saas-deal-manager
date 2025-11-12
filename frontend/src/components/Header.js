import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Assuming Header.css exists for styling

/**
 * Header component for the application.
 * Displays the logo, navigation links, and a logout button.
 */
const Header = () => {
  const navigate = useNavigate();

  /**
   * Handles user logout by removing the token from localStorage
   * and navigating the user to the login page.
   */
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
