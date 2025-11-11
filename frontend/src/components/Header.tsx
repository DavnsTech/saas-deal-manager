import React from 'react';
import { HeaderProps } from '../types'; // Import defined prop types
import './Header.css'; // Assuming CSS is kept separate

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="header">
      <div className="logo">Deal Manager</div>
      <nav>
        {user ? (
          <span>Welcome, {user.username}!</span>
        ) : (
          <a href="/login">Login</a>
        )}
        {/* Add other navigation links */}
      </nav>
    </header>
  );
};

export default Header;
