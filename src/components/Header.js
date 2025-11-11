import React from 'react';
import styled from 'styled-components';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: #4361ee;
  font-size: 24px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;
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

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Deal Manager</Logo>
      <Nav>
        <NavLink href="/">Tableau de bord</NavLink>
        <NavLink href="/deals">Deals</NavLink>
      </Nav>
      <UserActions>
        <IconWrapper>
          <FaBell size={20} />
          <NotificationBadge>3</NotificationBadge>
        </IconWrapper>
        <FaUserCircle size={24} />
      </UserActions>
    </HeaderContainer>
  );
};

export default Header;
