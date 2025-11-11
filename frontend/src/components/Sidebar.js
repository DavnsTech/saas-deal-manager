import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaHandshake, FaChartBar, FaCog, FaPlusCircle } from 'react-icons/fa';

const SidebarContainer = styled.aside`
  width: 250px;
  background: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  height: calc(100vh - 70px); /* Adjust height to account for header */
  position: sticky;
  top: 70px; /* Stick below the header */
  overflow-y: auto; /* Allow scrolling if content exceeds height */
`;

const Menu = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 16px;

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
    font-size: 18px; /* Slightly larger icons */
  }
`;

const MenuSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const CreateDealLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: #fff; /* White text for contrast */
  background: #4361ee; /* Primary button color */
  font-weight: 600;
  transition: background 0.2s ease;
  margin: 20px 20px 0 20px; /* Add some margin */
  border-radius: 4px;

  &:hover {
    background: #3a56d4;
  }

  svg {
    margin-right: 10px;
  }
`;


const Sidebar = () => {
  const location = useLocation(); // Get current location object

  return (
    <SidebarContainer>
      <Menu>
        <MenuItem to="/" className={location.pathname === '/' ? 'active' : ''}>
          <FaHome /> Dashboard
        </MenuItem>
        <MenuItem to="/deals" className={location.pathname.startsWith('/deals') ? 'active' : ''}>
          <FaHandshake /> Deals
        </MenuItem>
      </Menu>

      <CreateDealLink to="/deals/create">
        <FaPlusCircle /> Create New Deal
      </CreateDealLink>

      <MenuSection>
        <MenuItem to="/reports" className={location.pathname === '/reports' ? 'active' : ''}>
          <FaChartBar /> Reports
        </MenuItem>
        <MenuItem to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
          <FaCog /> Settings
        </MenuItem>
      </MenuSection>
    </SidebarContainer>
  );
};

export default Sidebar;

