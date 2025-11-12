import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="logo">Deal Manager</div>
      <nav>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#deals">Deals</a></li>
          <li><a href="#create-deal">Create Deal</a></li>
          <li><a href="#logout">Logout</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
