import React from 'react';
import './Sidebar.css'; // Assuming Sidebar.css is used for styling

const Sidebar: React.FC = () => {
  return (
    <aside className="app-sidebar">
      <h2>Navigation</h2>
      <ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/deals">All Deals</a></li>
        <li><a href="/deals/create">Create New Deal</a></li>
        {/* Add other navigation items as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
