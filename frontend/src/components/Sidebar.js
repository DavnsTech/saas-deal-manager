import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css'; // Assuming Sidebar.css exists for styling

const Sidebar = () => {
  const location = useLocation();

  // Function to determine the class for active links
  const getNavLinkClass = (path) => {
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  return (
    <aside className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li>
          <NavLink to="/dashboard" className={getNavLinkClass('/dashboard')}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/deals" className={getNavLinkClass('/deals')}>
            All Deals
          </NavLink>
        </li>
        <li>
          <NavLink to="/deals/new" className={getNavLinkClass('/deals/new')}>
            Add New Deal
          </NavLink>
        </li>
        {/* Add more sidebar links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
