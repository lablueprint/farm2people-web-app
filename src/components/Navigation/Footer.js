import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './Footer.css';
import greenLogo from '../../assets/images/F2P-green-logo.svg';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    lineHeight: 1.75,
    flexWrap: 'wrap',
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#EBD7D0',
    position: 'relative',
    width: '100%',
  },
  footerLogo: {
    paddingLeft: '8%',
    paddingRight: '16%',
    alignSelf: 'center',
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
    },
  },

  navLinksActive: {
    textDecoration: 'underline',
    textDecorationColor: '#484848',
    textDecorationThickness: '2px',
    textUnderlineOffset: '1.5px',
  },

});
function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavLink className={classes.footerLogo} to="/">
        <img src={greenLogo} alt="Logo" />
      </NavLink>
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
            to="/notifications"
            className={classes.footerLink}
            activeClassName={classes.navLinksActive}
          >
            Notifications
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
    </div>
  );
}

export default Footer;
