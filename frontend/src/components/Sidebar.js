import React from 'react';
import { NavLink } from 'react-router-dom'; // Assuming React Router is used for navigation
import './Sidebar.css'; // Assuming CSS is imported

interface SidebarProps {
  // Add any props if needed, e.g., user roles to conditionally render links
}

const Sidebar: React.FC<SidebarProps> = () => {
  // Define navigation links, potentially dynamically based on user roles or permissions
  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/deals', label: 'Deals' },
    { to: '/create-deal', label: 'Create Deal' },
    // Add other navigation items
    // { to: '/users', label: 'Users' },
  ];

  return (
    <aside className="app-sidebar">
      <nav>
        <ul>
          {navLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => isActive ? 'active' : ''}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
