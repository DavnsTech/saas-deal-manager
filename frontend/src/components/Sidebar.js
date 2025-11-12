import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <h3>Navigation</h3>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/deals">All Deals</a></li>
        <li><a href="/deals/new">Create Deal</a></li>
        {/* Add more sidebar items */}
      </ul>
    </aside>
  );
};

export default Sidebar;
