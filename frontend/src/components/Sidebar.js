import React from 'react';
import './Sidebar.css'; // Import Sidebar-specific styles

function Sidebar() {
  return (
    <aside className="app-sidebar">
      <h3>Navigation</h3>
      <ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/deals">All Deals</a></li>
        <li><a href="/deals/new">Create New Deal</a></li>
        {/* Add more navigation items as needed */}
      </ul>
    </aside>
  );
}

export default Sidebar;
