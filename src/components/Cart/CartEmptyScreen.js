/**
 * Cart Empty Screen
 * Redirect screen to the marketplace if the cart is empty
 */

import React from 'react';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Asset2 from '../../assets/images/Asset2.svg';
import Fruit1 from '../../assets/images/Fruit1.svg';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  container: {
    width: '40%',
    alignSelf: 'center',
    margin: 'auto',
    marginTop: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '33px',
    lineHeight: '140%',
    textAlign: 'center',
    color: '#000000',
  },
  returnButton: {
    // text style
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#FFFFFF',
    marginTop: '5%',

    // button style
    paddingInline: 20,
    background: '#53AA48',
    borderRadius: '6px',

    // center align
    left: '50%',
    transform: 'translateX(-50%)',
  },
  picContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  asset2: {
    position: 'relative',
    width: '140px',
    height: 'auto',
    left: 27,
    filter: 'brightness(0) saturate(100%) invert(78%) sepia(1%) saturate(16%) hue-rotate(105deg) brightness(98%) contrast(99%)',
  },
  fruit1: {
    position: 'relative',
    left: -27,
    width: '98px',
    height: 'auto',
    filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(4190%) hue-rotate(220deg) brightness(120%) contrast(76%)',
    transform: 'rotate(58.68deg)',
    zIndex: -1,
  },
  links: {
    textDecoration: 'none',
  },
});

function CartEmptyScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.text}>
          Your cart is empty.
        </Typography>
        <div className={classes.picContainer}>
          <img src={Asset2} alt="" className={classes.asset2} />
          <img src={Fruit1} alt="" className={classes.fruit1} />
        </div>
        <Link className={classes.links} to="/marketplace">
          <Button className={classes.returnButton}>
            Return to marketplace
          </Button>
        </Link>

      </div>
    </div>
  );
}

export default CartEmptyScreen;
