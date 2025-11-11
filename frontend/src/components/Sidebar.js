import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Sidebar.css'; // Import Sidebar-specific styles

function Sidebar() {
  // Sidebar should ideally be conditionally rendered based on authentication status
  // This is handled in App.js now.

  return (
    <aside className="app-sidebar">
      <h3>Navigation</h3>
      <ul>
        <li><Link to="/">Dashboard</Link></li> {/* Use Link */}
        <li><Link to="/deals">All Deals</Link></li> {/* Use Link */}
        <li><Link to="/deals/new">Create New Deal</Link></li> {/* Use Link */}
        {/* Add more navigation items as needed */}
      </ul>
    </aside>
  );
}

export default Sidebar;
