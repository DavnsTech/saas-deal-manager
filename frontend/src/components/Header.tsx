import React from 'react';
import './Header.css'; // Assuming Header.css is used for styling

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="app-header">
      <h1>{title}</h1>
      <nav>
        {/* Navigation links can be added here */}
        <a href="/">Dashboard</a>
        <a href="/deals">Deals</a>
        {/* Add login/logout links as needed */}
      </nav>
    </header>
  );
};

export default Header;
