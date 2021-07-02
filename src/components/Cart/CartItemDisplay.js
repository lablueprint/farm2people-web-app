/* Grid Display for reserved listing details */

import { React, useState, useEffect } from 'react';
import Airtable from 'airtable';
import {
  Grid, Typography, IconButton, makeStyles, ButtonBase,
} from '@material-ui/core';
import { Remove, Add } from '@material-ui/icons';
import Delete from '@material-ui/icons/DeleteOutlineOutlined';
import PropTypes from 'prop-types';
import '../../styles/fonts.css';
import CartDialog from './CartDialog';

// airtable setup
const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

// custom styling
const useStyles = makeStyles({
  listingImageBox: {
    position: 'relative',
    height: '75px',
    width: '75px',
    backgroundColor: 'white',
    border: '1px solid #E0E0E0',
    boxSizing: 'border-box',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  listingImage: {
    position: 'absolute',
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate( -50%, -50%)',
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
  listingAgencyNumbers: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#E81717',
    textDecorationLine: 'underline',
  },
  agencyPrice: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '18px',
    color: '#FFFFFF',
    padding: 5,
    paddingInline: 8,
    marginInline: 8,
    background: '#E81717',
    borderRadius: '5px',
  },
  quantityBox: {
    paddingInline: 5,
    border: '1px solid #C4C4C4',
    boxSizing: 'border-box',
    borderRadius: '3px',
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
  id, farmID, produceID, pallets, unitsPerPallet, unitType, price, maxAvailable, usersInterested,
  updateSubtotal, removeListing, usingAgencyPrice,
}) {
  const [imageURL, setImageURL] = useState('');
  const [produceName, setProduceName] = useState('');
  const [quantity, setQuantity] = useState(pallets);
  const [removeAlert, setRemoveAlert] = useState(false);
  const [maxAlert, setMaxAlert] = useState(false);
  const classes = useStyles();

  // TODO: style error message display
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    base('Produce Type').find(produceID, (err, p) => {
      if (err) { setErrorMessage(err.message); }
      setProduceName(p.fields['produce type']);
      setImageURL((p.fields['produce picture'] ? p.fields['produce picture'][0].url : ''));
    });
  }, []);

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
        setErrorMessage(err.message);
      }
    });
  }

  useEffect(updateQuantity, [id, quantity]);

  // updates the subtotal and airtable when a listing is deleted
  function removeCartListing() {
    updateSubtotal(-price * quantity, farmID);
    removeListing(id, farmID);
  }

  // decreases quantity, updates subtotal, and sends an alert if too low
  function decreaseQuantity() {
    if (quantity <= 1) {
      setRemoveAlert(true);
    } else {
      setQuantity(quantity - 1);
      updateSubtotal(-price, farmID);
    }
  }

  // increases quantity, updates subtotal, and sends an alert if too high
  function increaseQuantity() {
    if (quantity >= maxAvailable) {
      setMaxAlert(true);
    } else {
      setQuantity(quantity + 1);
      updateSubtotal(price, farmID);
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
          <div className={classes.listingImageBox}>
            <img src={imageURL} alt="produce" className={classes.listingImage} />
          </div>
        </Grid>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" className={classes.listingCrop}>
              {produceName}
              {usingAgencyPrice
              && <span className={classes.agencyPrice}>Agency Price</span> }
            </Typography>
            <Typography gutterBottom variant="body2" className={[classes.listingDescription, classes.boldText]}>
              <span className={classes.boldText}>
                {unitsPerPallet}
                {' '}
                {unitType}
                {unitsPerPallet > 1 && 's'}
                /pallet
              </span>
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
        <Grid item xs={2} lg={1.5} align="center">
          <Typography gutterBottom variant="subtitle1" className={usingAgencyPrice ? classes.listingAgencyNumbers : classes.listingNumbers}>
            $
            {parseFloat(price).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={2} lg={1.5} align="center" justify="center">
          <Grid item container alignItems="baseline" align="center" justify="center">
            <IconButton aria-label="decrease" size="small" onClick={decreaseQuantity}>
              <Remove fontSize="inherit" className={classes.quantityButtons} />
            </IconButton>
            <Typography gutterBottom variant="subtitle1" className={[classes.listingNumbers, classes.boldText, classes.quantityBox]}>
              {quantity}
            </Typography>
            <IconButton aria-label="increase" size="small" onClick={increaseQuantity}>
              <Add fontSize="inherit" className={classes.quantityButtons} />
            </IconButton>
          </Grid>
          <Typography className={classes.listingDescription}>
            pallets
          </Typography>
        </Grid>
        <Grid item xs={2} lg={1.5} align="center">
          <Typography gutterBottom variant="subtitle1" className={usingAgencyPrice ? classes.listingAgencyNumbers : classes.listingNumbers}>
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
        message={`You have the maximum available ${produceName} in your cart!`}
        alert={maxAlert}
        close={maxAlertClosed}
        getResponse={false}
      />
    </>
  );
}

CartItemDisplay.propTypes = {
  id: PropTypes.string.isRequired,
  farmID: PropTypes.string.isRequired,
  produceID: PropTypes.arrayOf(PropTypes.string).isRequired,
  pallets: PropTypes.number.isRequired,
  unitsPerPallet: PropTypes.number.isRequired,
  unitType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  maxAvailable: PropTypes.number.isRequired,
  updateSubtotal: PropTypes.func.isRequired,
  removeListing: PropTypes.func.isRequired,
  usersInterested: PropTypes.number.isRequired,
  usingAgencyPrice: PropTypes.bool.isRequired,
};
