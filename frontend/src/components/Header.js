import React from 'react';
import './Header.css'; // Assuming CSS is imported

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-title">
        <h1>Deal Manager</h1>
      </div>
      {/* Add user profile or logout button here if applicable */}
      <div className="header-actions">
        {/* For example: <button>Logout</button> */}
        <button onClick={() => localStorage.removeItem('token')}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
