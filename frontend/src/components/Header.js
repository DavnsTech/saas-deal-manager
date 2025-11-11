import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Header.css'; // Import Header-specific styles

function Header() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Basic auth check for conditional rendering
  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Use navigate for client-side routing
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="logo">Deal Manager</div>
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li><Link to="/">Dashboard</Link></li> {/* Use Link */}
              <li><Link to="/deals">Deals</Link></li> {/* Use Link */}
              <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li> {/* Use Link */}
              <li><Link to="/register">Register</Link></li> {/* Use Link */}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
