import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="app-sidebar">
      <h3>Navigation</h3>
      <ul>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#deals">All Deals</a></li>
        <li><a href="#create-deal">Add New Deal</a></li>
        {/* Add more sidebar links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
