import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { store } from '../../lib/redux/store';
import '../../styles/fonts.css';
import greenLogo from '../../assets/images/F2P-green-logo.svg';
import blueprintLogo from '../../assets/images/BlueprintLogo.svg';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    lineHeight: 1.75,
    flexWrap: 'wrap',
    padding: '1rem 0rem 1rem 0rem',
    backgroundColor: '#EBD7D0',
    position: 'relative',
    width: '100%',
  },
  footerLogo: {
    paddingLeft: '10%',
    paddingRight: '16%',
    alignSelf: 'center',
  },
  blueprintContainer: {
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    display: 'flex',
    flexDirection: 'rowx',
    alignSelf: 'flex-end',
  },
  createdText: {
    paddingBottom: 10,
    paddingRight: 8,
    fontFamily: 'Work Sans',
    fontWeight: 600,
    fontSize: '15px',
    color: 'rgba(55, 55, 55, 0.8)',
  },
  footerItem: {
    fontFamily: 'Work Sans',
    textDecoration: 'none',
    fontSize: '14px',
    color: '#373737',
  },
  footerItemTitle: {
    fontFamily: 'Work Sans',
    textDecoration: 'none',
    fontSize: '14px',
    color: '#373737',
    fontWeight: 'bold',
  },

  footerList: {
    listStyleType: 'none',

  },
  footerLink: {
    color: '#000000',
    textDecoration: 'none',
    height: '100%',
    '&:hover': {
      fontWeight: 'bold',
      color: '#484848',
      cursor: 'pointer',

    },
  },

  navLinksActive: {
    textDecoration: 'underline',
    textDecorationColor: '#484848',
    textDecorationThickness: '2px',
    textUnderlineOffset: '1.5px',
  },

});
function Footer({
  loading, accountApproved, registrationApproved, handleLogOut,
}) {
  const classes = useStyles();
  const getInitialRole = () => (store.getState().userData == null ? '' : store.getState().userData.user.fields['user type']);
  const userRole = getInitialRole();
  return (
    <div className={classes.root}>
      <NavLink className={classes.footerLogo} to="/">
        <img src={greenLogo} alt="Logo" />
      </NavLink>
      {(userRole === 'vendor' || userRole === 'buyer' || userRole === 'agency') && (accountApproved === 'unapproved' || registrationApproved === 'unapproved')
              && (
                <ul className={classes.footerList}>
                  <li className={classes.footerItemTitle}>
                    Navigation
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/forbuyers"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      For Buyers
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/forsellers"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      For Sellers
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/contact"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/signup"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <div
                      className={classes.footerLink}
                      onClick={handleLogOut}
                      aria-hidden="true"
                    >
                      Sign Out
                    </div>

                  </li>
                </ul>
              )}
      {((userRole === 'buyer' || userRole === 'agency') && (!loading && accountApproved === 'approved' && registrationApproved === 'approved')
              && (
                <ul className={classes.footerList}>
                  <li className={classes.footerItemTitle}>
                    Navigation
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/marketplace"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      Marketplace
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/contact"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/profile"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/cart"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      Cart
                    </NavLink>
                  </li>
                </ul>
              ))}
      {(userRole === 'vendor' && (!loading && accountApproved === 'approved' && registrationApproved === 'approved')
              && (
                <ul className={classes.footerList}>
                  <li className={classes.footerItemTitle}>
                    Navigation
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/inventorymanager"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      Inventory Manager
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/contact"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/profile"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      My Profile
                    </NavLink>
                  </li>
                </ul>
              ))}
      {(userRole === '')
              && (
                <ul className={classes.footerList}>
                  <li className={classes.footerItemTitle}>
                    Navigation
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/forbuyers"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      For Buyers
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/forsellers"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      For Sellers
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/contact"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/signup"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className={classes.footerItem}>
                    <NavLink
                      to="/signin"
                      className={classes.footerLink}
                      activeClassName={classes.navLinksActive}
                    >
                      Sign In
                    </NavLink>
                  </li>
                </ul>
              )}
      <ul className={classes.footerList}>
        <li className={classes.footerItemTitle}>
          Contact
        </li>
        <li className={classes.footerItem}>
          (xxx)xxx-xxxx
        </li>
        <li className={classes.footerItem}>
          farm2people@mail.org
        </li>
        <li className={classes.footerItem}>
          farm2people.org
        </li>
      </ul>
      <div className={classes.blueprintContainer}>
        <p className={classes.createdText}>
          Created by
        </p>
        <a href="https://lablueprint.org/">
          <img src={blueprintLogo} alt="Logo" />
        </a>
      </div>
    </div>
  );
}

export default Footer;

Footer.propTypes = {
  registrationApproved: PropTypes.bool.isRequired,
  accountApproved: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleLogOut: PropTypes.func.isRequired,

};
