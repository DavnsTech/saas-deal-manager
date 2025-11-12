import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Assuming Sidebar.css is still relevant

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink></li>
        <li><NavLink to="/deals" className={({ isActive }) => isActive ? "active" : ""}>All Deals</NavLink></li>
        <li><NavLink to="/create-deal" className={({ isActive }) => isActive ? "active" : ""}>Add New Deal</NavLink></li>
        {/* Add more sidebar links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
