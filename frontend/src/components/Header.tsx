import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo">Deal Manager</div>
      <nav>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#deals">Deals</a></li>
          <li><a href="#create-deal">Create Deal</a></li>
          {/* In a real app, you'd conditionally render logout based on auth state */}
          <li><a href="#logout">Logout</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
