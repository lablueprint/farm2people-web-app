import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Farm2People
            <i className="fas fa-tractor" />
          </Link>
          {/* eslint-disable-next-line */}
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/marketplace" className="nav-links" onClick={closeMobileMenu}>
                Marketplace
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/quotes" className="nav-links" onClick={closeMobileMenu}>
                Quotes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/notifications"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Notifications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/account"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Account
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/sign-in"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
