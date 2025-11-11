import React from 'react';
import './Header.css'; // Assuming Header will have its own CSS

function Header() {
  return (
    <header className="app-header">
      <div className="logo">Deal Manager</div>
      <nav>
        <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href="/deals">Deals</a></li>
          <li><a href="/create">New Deal</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
