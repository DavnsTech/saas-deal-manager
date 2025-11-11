import React from 'react';
import './Header.css'; // Import Header-specific styles

function Header() {
  // Basic auth check for conditional rendering
  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect to login page (using window.location for simplicity, ideally use useNavigate)
    window.location.href = '/login';
  };

  return (
    <header className="app-header">
      <div className="logo">Deal Manager</div>
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li><a href="/">Dashboard</a></li>
              <li><a href="/deals">Deals</a></li>
              <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
            </>
          ) : (
            <>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
