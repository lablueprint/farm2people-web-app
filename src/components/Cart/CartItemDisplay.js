/* Grid Display for reserved listing details */

import { React, useState, useEffect } from 'react';
import Airtable from 'airtable';
import {
  Grid, Typography, IconButton, makeStyles, ButtonBase,
} from '@material-ui/core';
import { Remove, Add } from '@material-ui/icons';
import Delete from '@material-ui/icons/DeleteOutlineOutlined';
import PropTypes from 'prop-types';
import './Cart.css';
import CartDialog from './CartDialog';

// airtable setup
const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

// custom styling
const useStyles = makeStyles({
  // TODO: Look into breakpoints/media queries for adaptive styling
  listingImage: {
    height: '83px',
    width: '83px',
    backgroundColor: 'white',
    border: '1px solid #E0E0E0',
    boxSizing: 'border-box',
    borderRadius: '6px',
  },
  listingCrop: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#373737',
  },
  listingDescription: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '20px',
  },
  listingNumbers: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#373737',
  },
  quantityButtons: {
    color: '#53AA48',
  },
  deleteButton: {
    color: '#FF765D',
    fontSize: '30px',
    marginLeft: '-10px',
  },
  usersInterested: {
    color: '#FF765D',
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 600,
  },
});

export default function CartItemDisplay({
  id, crop, pallets, unitsPerPallet, unitType, price, maxAvailable, usersInterested,
  updateSubtotal, removeListing,
}) {
  // TODO: integrate photos stored in backend and render them in place of this
  const image = 'https://ilovepathology.com/wp-content/uploads/2016/09/cauliflower_PNG12674-1024x887.png';

  const [quantity, setQuantity] = useState(pallets);
  const [removeAlert, setRemoveAlert] = useState(false);
  const [maxAlert, setMaxAlert] = useState(false);
  const classes = useStyles();

  // TODO: style error message display
  const [errorMessage, setErrorMessage] = useState();

  // updates the airtable quantity whenever it is altered
  function updateQuantity() {
    base('Reserved Listings').update([
      {
        id,
        fields: {
          pallets: quantity,
        },
      },
    ], (err) => {
      if (err) {
        setErrorMessage(err);
      }
    });
  }

  useEffect(updateQuantity, [id, quantity]);

  // updates the subtotal and airtable when a listing is deleted
  function removeCartListing() {
    updateSubtotal(-price * quantity);
    removeListing(id);
  }

  // decreases quantity, updates subtotal, and sends an alert if too low
  function decreaseQuantity() {
    if (quantity <= 1) {
      setRemoveAlert(true);
    } else {
      setQuantity(quantity - 1);
      updateSubtotal(-price);
    }
  }

  // increases quantity, updates subtotal, and sends an alert if too high
  function increaseQuantity() {
    if (quantity >= maxAvailable) {
      setMaxAlert(true);
    } else {
      setQuantity(quantity + 1);
      updateSubtotal(price);
    }
  }

  // closes alert and responds to user input on removeAlert close
  function removeAlertClosed(value) {
    setRemoveAlert(false);
    if (value === true) {
      removeCartListing();
    }
  }

  // closes alert on maxAlert close
  function maxAlertClosed(value) {
    setMaxAlert(value);
  }

  return (
    <>
      <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
        {errorMessage && <p>{errorMessage}</p>}
        <Grid item>
          <img src={image} alt="random produce" className={classes.listingImage} />
        </Grid>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" className={classes.listingCrop}>
              {crop}
            </Typography>
            <Typography gutterBottom variant="body2" className={classes.listingDescription}>
              <span className={classes.boldText}>
                {' '}
                {unitsPerPallet}
                {' '}
                units/pallet
                {' '}
              </span>
              Unit type:
              {' '}
              {unitType}
            </Typography>
            {usersInterested > 0
              && (
              <Typography className={classes.listingDescription}>
                <span className={classes.usersInterested}>
                  {usersInterested}
                  {' '}
                  users
                </span>
                {' '}
                currently have this in their cart
                {' '}
              </Typography>
              )}
          </Grid>
        </Grid>
        <Grid item xs={2} align="center">
          <Typography gutterBottom variant="subtitle1" className={classes.listingNumbers}>
            $
            {parseFloat(price).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item container xs={2} alignItems="baseline" align="center" justify="center">
          <IconButton aria-label="decrease" size="small" onClick={decreaseQuantity}>
            <Remove fontSize="inherit" className={classes.quantityButtons} />
          </IconButton>
          <Typography gutterBottom variant="subtitle1" className={[classes.listingNumbers, classes.boldText]}>
            {quantity}
          </Typography>
          <IconButton aria-label="increase" size="small" onClick={increaseQuantity}>
            <Add fontSize="inherit" className={classes.quantityButtons} />
          </IconButton>
        </Grid>
        <Grid item xs={2} align="center">
          <Typography gutterBottom variant="subtitle1" className={classes.listingNumbers}>
            $
            {parseFloat((price * quantity)).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={1} align="center">
          <ButtonBase aria-label="delete" onClick={() => { setRemoveAlert(true); }}>
            <Delete fontSize="inherit" className={classes.deleteButton} />
          </ButtonBase>
        </Grid>
      </Grid>
      <CartDialog
        message="Are you sure that you want to delete this item entirely from your cart?"
        alert={removeAlert}
        close={removeAlertClosed}
        getResponse
      />
      <CartDialog
        message={`You have the maximum available ${crop} in your cart!`}
        alert={maxAlert}
        close={maxAlertClosed}
        getResponse={false}
      />
    </>
  );
}

CartItemDisplay.propTypes = {
  id: PropTypes.string.isRequired,
  crop: PropTypes.string.isRequired,
  pallets: PropTypes.number.isRequired,
  unitsPerPallet: PropTypes.number.isRequired,
  unitType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  maxAvailable: PropTypes.number.isRequired,
  updateSubtotal: PropTypes.func.isRequired,
  removeListing: PropTypes.func.isRequired,
  usersInterested: PropTypes.number.isRequired,
};
