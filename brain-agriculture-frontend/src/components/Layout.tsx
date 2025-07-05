import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Navbar = styled.nav`
  background-color: #ffffff;
  padding: 0 40px;
  height: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 24px;
    color: #007bff;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 30px;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 18px;
  color: #555;
  padding: 10px 0;
  position: relative;

  &.active {
    color: #007bff;
    font-weight: bold;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #007bff;
    }
  }

  &:hover {
    color: #007bff;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 40px;
`;


export const Layout: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Navbar>
          <h1>Brain Agriculture</h1>
          <NavLinks>
            <li>
              <StyledNavLink to="/">Dashboard</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/producers">Produtores</StyledNavLink>
            </li>
          </NavLinks>
        </Navbar>
        <MainContent>
          <Outlet />
        </MainContent>
      </AppContainer>
    </>
  );
};