/**
 * Checkout Success
 * Success screen after successful checkout
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, makeStyles } from '@material-ui/core';
import './WorkSans.css';
import Asset1 from '../../assets/images/Asset1.svg';
import PeaceLogo from '../../assets/images/PeaceLogo.svg';

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
  confirmationText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '33px',
    lineHeight: '140%',
    textAlign: 'center',
    color: '#000000',
  },
  instructionText: {
    marginTop: '5%',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '25px',
    lineHeight: '148.69%',
    textAlign: 'center',
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
  asset1: {
    position: 'absolute',
    width: '140px',
    height: 'auto',
    left: '10%',
    top: '35%',
  },
  peaceLogo: {
    position: 'absolute',
    width: '250px',
    height: 'auto',
    top: '0%',
    right: '8%',
  },
});

function CheckoutSuccess({ farms = "Ryan's Ronderful Rarm" }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography style={{ fontWeight: 700 }} className={classes.confirmationText}>
          Yay!
        </Typography>
        <Typography className={classes.confirmationText}>
          You have successfully submitted a quote for the items from
          {' '}
          {farms}
          . Please wait
          <span style={{ fontWeight: 700 }}> at most 2 business days </span>
          for the final order details from Farm2People.
          {' '}
        </Typography>
        <Typography className={classes.instructionText}>
          When your order is ready for review, you will get a notification and an email.
        </Typography>
        <Button className={classes.returnButton}>
          View order in profile
        </Button>
      </div>
      <img src={Asset1} alt="" className={classes.asset1} />
      <img src={PeaceLogo} alt="" className={classes.peaceLogo} />
    </div>
  );
}

export default CheckoutSuccess;

CheckoutSuccess.propTypes = {
  farms: PropTypes.string.isRequired,
};
