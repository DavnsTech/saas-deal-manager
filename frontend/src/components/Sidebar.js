import React from 'react';
import styled from 'styled-components';
import { FaHome, FaHandshake, FaChartBar, FaCog, FaUsers } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const SidebarContainer = styled.aside`
  position: fixed;
  top: 70px;
  left: 0;
  bottom: 0;
  width: 250px;
  background: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  overflow-y: auto;
  z-index: 90;

  @media (max-width: 768px) {
    width: 70px;
    span {
      display: none;
    }
  }
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
    min-width: 20px;
  }
`;

const MenuSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <MenuItem to="/" className={location.pathname === '/' ? 'active' : ''}>
        <FaHome /> <span>Tableau de bord</span>
      </MenuItem>
      <MenuItem to="/deals" className={location.pathname.startsWith('/deals') ? 'active' : ''}>
        <FaHandshake /> <span>Deals</span>
      </MenuItem>
      
      <MenuSection>
        <MenuItem to="/reports" className={location.pathname === '/reports' ? 'active' : ''}>
          <FaChartBar /> <span>Rapports</span>
        </MenuItem>
        <MenuItem to="/clients" className={location.pathname === '/clients' ? 'active' : ''}>
          <FaUsers /> <span>Clients</span>
        </MenuItem>
        <MenuItem to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
          <FaCog /> <span>Paramètres</span>
        </MenuItem>
      </MenuSection>
    </SidebarContainer>
  );
};

export default Sidebar;
