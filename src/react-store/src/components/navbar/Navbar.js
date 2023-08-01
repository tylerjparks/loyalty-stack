import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

// Navbar styling

// Nav style
// (bar on the left side of screen)
export const Nav = styled.nav`
  height: 100%;

  background: #00001a;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;

  width: 90px;
  overflow: hidden;
  transition: width 0.2s linear;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.5);
  z-index: 9999;

  &:hover {
    width: 280px;
    transition: all 0.5s ease;
  }
`;

// NavMenu style
// (submenu for items to be contained in)
export const NavMenu = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  left: 0;
  background: #fff;
  width: 90px;
  overflow: hidden;
  transition: width 0.2s linear;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.5);

  &:hover {
    width: 280px;
    transition: all 0.5s ease;
  }
`;
// NavLink style
// (items inside menu)
export const NavLink = styled(Link)`
  h1 {
    display: inline-block;
    margin-left: 72px;
    font-size: 32px;
  }

  h2 {
    display: inline-block;
    margin-left: 48px;
    font-size: 18px;
    padding: 14px 0;
  }

  h3 {
    padding-left: 6px;
  }

  position: relative;
  color: rgb(85, 83, 83);
  display: table;
  width: 280px;
  padding: 16px 16px 16px 18px;
  background: #fff;

  &:hover {
    background: #eee;
  }
`;
