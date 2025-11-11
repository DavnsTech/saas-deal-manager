import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { logoutUser } from '../api/dealsApi'; // Import logoutUser

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px; /* Fixed height for header */
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.h1`
  color: #4361ee;
  font-size: 24px;
  margin: 0;
  cursor: pointer; /* Make logo clickable */
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: none; /* Hide navigation on smaller screens */
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 16px;
  &:hover {
    color: #4361ee;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;
  color: #555;
  display: flex;
  align-items: center;

  &:hover {
    color: #4361ee;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: #dc3545; /* Red color on hover for logout */
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Clear user data from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error, e.g., show a message
    }
  };

  const handleLogoClick = () => {
    navigate('/'); // Navigate to dashboard on logo click
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>Deal Manager</Logo>
      <Nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/deals">Deals</NavLink>
        {/* Add other navigation links here if needed */}
      </Nav>
      <UserActions>
        {isAuthenticated && (
          <>
            <IconWrapper>
              <FaBell size={20} />
              <NotificationBadge>3</NotificationBadge>
            </IconWrapper>
            <IconWrapper>
              <FaUserCircle size={24} />
              {/* You could add a dropdown menu here for user profile */}
            </IconWrapper>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt />
            </LogoutButton>
          </>
        )}
        {!isAuthenticated && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </UserActions>
    </HeaderContainer>
  );
};

export default Header;
