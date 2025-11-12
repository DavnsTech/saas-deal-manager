import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
        <li><NavLink to="/deals" activeClassName="active">All Deals</NavLink></li>
        <li><NavLink to="/create-deal" activeClassName="active">Add New Deal</NavLink></li>
        {/* Add more sidebar links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
