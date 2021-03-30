import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import '../../styles/fonts.css';
import logo from '../../assets/images/F2P-logo.svg';

export default function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink to="/" onClick={closeMobileMenu}>
            <img src={logo} alt="Logo" className="navbar-logo" />
          </NavLink>
          <div
            className="menu-icon"
            onClick={handleClick}
            aria-hidden="true"
          >
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink
                to="/marketplace"
                activeClassName="nav-links-active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Marketplace
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                activeClassName="nav-links-active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/notifications"
                activeClassName="nav-links-active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Notifications
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile"
                activeClassName="nav-links-active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                My Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cart"
                activeClassName="nav-links-active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Cart&nbsp;
                <i className="fas fa-shopping-cart" />
              </NavLink>
            </li>
            <li className="nav-item">
              <div
                className="nav-links"
                /* TODO: Incorporate onClick prop that logs user out */
              >
                Sign Out
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
