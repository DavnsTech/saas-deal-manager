import React from 'react';
import './Header.css'; // Assuming CSS is imported

interface HeaderProps {
  title: string;
  // Add other props as needed, e.g., user info, logout function
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="app-header">
      <div className="header-title">
        <h1>{title}</h1>
      </div>
      {/* Add user profile or logout button here if applicable */}
      <div className="header-actions">
        {/* For example: <button>Logout</button> */}
      </div>
    </header>
  );
};

export default Header;
