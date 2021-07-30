import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import '../../styles/fonts.css';
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@material-ui/lab';
import logo from '../../assets/images/F2P-logo.svg';
import { logoutUser } from '../../lib/airlock/airlock';
import { history } from '../../lib/redux/store';

export default function Navbar(props) {
  /* authenticated is a boolean and userRole is a string that can be
    can either be: {'', 'buyer', 'vendor', 'agency'} */
  const {
    authenticated, userRole, setAuthAndRefreshNavbar, setUserRoleAndRefreshNavbar, loading,
    accountApproved, registrationApproved,
  } = props;
  const path = useLocation().pathname;
  const [click, setClick] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showAlert, setAlert] = useState(false);
  const [showDefaultNavbar, setShowDefaultNavbar] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const onShowDefaultNavbar = () => {
    if (window.innerWidth <= 1200) {
      setShowDefaultNavbar(false);
    } else {
      setShowDefaultNavbar(true);
    }
  };
  const handleLogOut = async (evt) => {
    evt.preventDefault();
    try {
      const status = await logoutUser();
      if (!status) {
        setErrorMsg('Error logging out.');
        setAlert(true);
      } else {
        setAuthAndRefreshNavbar(false);
        setUserRoleAndRefreshNavbar('');
        history.push('/');
      }
    } catch (err) {
      setErrorMsg('Error logging out.');
      setAlert(true);
    }
  };

  useEffect(() => {
    onShowDefaultNavbar();
  }, []);
  window.addEventListener('resize', onShowDefaultNavbar);

  return (
    <>
      {(showAlert && errorMsg)
        && (
          <Alert severity="error" className="errorAlert" onClose={() => setAlert(false)}>
            <AlertTitle> Input error </AlertTitle>
            {errorMsg}
          </Alert>
        )}
      {/* TODO: Right here, we were are able to put in different styles depending on the paths.
      For the first 'navbar', we need to replace that with the transparent navbar stylings  */}
      <nav className={(authenticated === false && path === '/') || path === '/forbuyers'
       || path === '/forsellers' || path === '/about' ? 'navbar' : 'navbar'}
      >
        <div className="navbar-container">
          {(!authenticated
          || (!loading && accountApproved !== false && registrationApproved !== false)) && (
          <>

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
          </>
          )}

          {authenticated && (accountApproved === 'approved' && registrationApproved === 'approved') && accountApproved !== false && registrationApproved !== false && (
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              {(click || showDefaultNavbar) && (
              <>
                {(userRole === 'buyer' || userRole === 'agency')
              && (
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
              )}
                {(userRole === 'vendor'
              && (
              <li className="nav-item">
                <NavLink
                  to="/inventorymanager"
                  activeClassName="nav-links-active"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Inventory Manager
                </NavLink>
              </li>
              ))}
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
                    to="/profile"
                    activeClassName="nav-links-active"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    My Profile
                  </NavLink>
                </li>
                {(userRole === 'buyer' || userRole === 'agency') && (
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
                )}
                <li className="nav-item">
                  <div
                    className="nav-links"
                    onClick={handleLogOut}
                    aria-hidden="true"
                  >
                    Sign Out
                  </div>
                </li>
              </>
              )}
            </ul>
          )}

          {(authenticated && (accountApproved === 'unapproved' || registrationApproved === 'unapproved')) && accountApproved !== false && registrationApproved !== false && (
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {(click || showDefaultNavbar) && (
            <>
              <li className="nav-item">
                <NavLink
                  to="/forbuyers"
                  activeClassName="nav-links-active"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  For Buyers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/forsellers"
                  activeClassName="nav-links-active"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  For Sellers
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
                  to="/about"
                  activeClassName="nav-links-active"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/signup"
                  activeClassName="nav-links-active"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <div
                  className="nav-links"
                  onClick={handleLogOut}
                  aria-hidden="true"
                >
                  Sign Out
                </div>
              </li>
            </>
            )}
          </ul>
          )}

          {(!authenticated) && (
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              {(click || showDefaultNavbar) && (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/forbuyers"
                      activeClassName="nav-links-active"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      For Buyers
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/forsellers"
                      activeClassName="nav-links-active"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      For Sellers
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
                      to="/about"
                      activeClassName="nav-links-active"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/signup"
                      activeClassName="nav-links-active"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/signin"
                      activeClassName="nav-links-active"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      Sign In
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  setAuthAndRefreshNavbar: PropTypes.func.isRequired,
  setUserRoleAndRefreshNavbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  accountApproved: PropTypes.string.isRequired,
  registrationApproved: PropTypes.string.isRequired,

};
