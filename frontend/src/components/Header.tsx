import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming Header.css is still relevant

const Header: React.FC = () => {
  const handleLogout = (): void => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="app-header">
      <div className="logo">Deal Manager</div>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/deals">Deals</Link></li>
          <li><Link to="/create-deal">Create Deal</Link></li>
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
