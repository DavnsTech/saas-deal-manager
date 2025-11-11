import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHandshake, FaChartBar, FaCog } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <ul className="menu">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">
            <FaHome /> Tableau de bord
          </Link>
        </li>
        <li className={location.pathname.startsWith('/deals') ? 'active' : ''}>
          <Link to="/deals">
            <FaHandshake /> Deals
          </Link>
        </li>
        <li className={location.pathname === '/reports' ? 'active' : ''}>
          <Link to="/reports">
            <FaChartBar /> Rapports
          </Link>
        </li>
        <li className={location.pathname === '/settings' ? 'active' : ''}>
          <Link to="/settings">
            <FaCog /> Paramètres
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
