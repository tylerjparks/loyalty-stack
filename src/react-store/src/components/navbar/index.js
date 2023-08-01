import React from 'react';
import {Nav, NavLink, NavMenu} from './Navbar';
import {FaCartPlus, FaCreativeCommonsBy, FaCogs, FaSearch, FaSignInAlt, FaStar, FaHome} from 'react-icons/fa';
import atariLogo from '../../atariLogo.png';

// Navigation bar driver code

// calls the navbar
// which contains one NavMenu containing many NavLinks
const Navbar = ({cart, points}) => {
  return (
    <>
      <Nav>
        <NavMenu>

          <NavLink to="/">
              {
                /*
                  atari icon
                  <img style={{display: 'block', width: 50, height: 38, zIndex: 999 }} src={atariLogo} alt="logo"/>
                */
              }
              <h1>World of Atari</h1>
          </NavLink>

          <NavLink to="/">
            <FaHome size={42}/>
            <h2>Home</h2>            
          </NavLink>

          <NavLink to="/loyalty">
            <FaStar size={42} color={'gold'}/>
              
            <h2>Loyalty Service</h2>
            {points > 0 &&
            <h3>{points}</h3>
            }
          </NavLink>

          <NavLink to="/browse">
            <FaSearch size={42}/><h2>Browse</h2>
          </NavLink>
          
          <NavLink to="/shoppingCart">
            <FaCartPlus size={42}/><h2>Shopping Cart</h2>
            {cart.salesOrderDetails.length > 0 &&
              <h3><b>{cart.salesOrderDetails.length}</b></h3>
            }
          </NavLink>

          <NavLink to="/profile">
            <FaCreativeCommonsBy size={42}/><h2>Profile</h2>
          </NavLink>
{/*
          <NavLink to="/contact">
            <FaCogs size={42}/><h2>Settings</h2>
          </NavLink>
*/}
          <NavLink to="/signin">
            <FaSignInAlt size={42}/><h2>Sign In</h2>
          </NavLink>

        </NavMenu>
      </Nav>
    </>
  )
}

// export the navbar
export default Navbar
