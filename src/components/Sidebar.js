import React from 'react';
import styled from 'styled-components';
import { FaHome, FaHandshake, FaChartBar, FaCog } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation

const SidebarContainer = styled.aside`
  width: 250px;
  background: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  height: calc(100vh - 70px); /* Adjust height to account for header */
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f0f4f8;
    color: #4361ee;
  }
  
  &.active {
    background: #eef4ff;
    color: #4361ee;
    border-left: 4px solid #4361ee;
  }
  
  svg {
    margin-right: 10px;
  }
`;

const MenuSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const Sidebar = () => {
  const location = useLocation(); // Get current location object

  return (
    <SidebarContainer>
      <MenuItem to="/" className={location.pathname === '/' ? 'active' : ''}>
        <FaHome /> Tableau de bord
      </MenuItem>
      <MenuItem to="/deals" className={location.pathname.startsWith('/deals') ? 'active' : ''}>
        <FaHandshake /> Deals
      </MenuItem>
      
      <MenuSection>
        <MenuItem to="/reports" className={location.pathname === '/reports' ? 'active' : ''}>
          <FaChartBar /> Rapports
        </MenuItem>
        <MenuItem to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
          <FaCog /> Paramètres
        </MenuItem>
      </MenuSection>
    </SidebarContainer>
  );
};

export default Sidebar;
