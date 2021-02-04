import { React, useState, useEffect } from 'react';
import Airtable from 'airtable';
import {
  Grid, Typography, IconButton, makeStyles,
} from '@material-ui/core';
import { Remove, Add } from '@material-ui/icons';
import Delete from '@material-ui/icons/DeleteOutlineOutlined';
import PropTypes from 'prop-types';
import './Cart.css';
import { RemoveConfirmationDialog, MaxAvailableDialog } from './CartDialogs';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const useStyles = makeStyles({
  listingImage: {
    height: '85px',
    width: '85px',
    backgroundColor: 'white',
    border: '1px solid #E0E0E0',
    boxSizing: 'border-box',
    borderRadius: '6px',
  },
  listingCrop: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '29px',
    color: '#373737',
  },
  listingUnitDescription: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '18px',
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
  },
});
export default function CartItemDisplay({
  id, crop, pallets, unitsPerPallet, unitType, price, maxAvailable, updateSubtotal, removeListing,
}) {
  const image = 'https://ilovepathology.com/wp-content/uploads/2016/09/cauliflower_PNG12674-1024x887.png';

  const [quantity, setQuantity] = useState(pallets);
  const [removeAlert, setRemoveAlert] = useState(false);
  const [maxAlert, setMaxAlert] = useState(false);

  const classes = useStyles();

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
        console.error(err);
      }
    });
    console.log('quantity changed');
  }

  function remove() {
    updateSubtotal(-price * quantity);
    removeListing(id);
  }

  function decreaseQuantity() {
    if (quantity <= 1) {
      setRemoveAlert(true);
      console.log('alert!');
    } else {
      setQuantity(quantity - 1);
      updateSubtotal(-price);
    }
  }

  function increaseQuantity() {
    if (quantity >= maxAvailable) {
      setMaxAlert(true);
      console.log('alert!');
    } else {
      setQuantity(quantity + 1);
      updateSubtotal(price);
    }
  }

  useEffect(updateQuantity, [quantity]);

  function removeAlertClosed(value) {
    setRemoveAlert(false);
    if (value === true) {
      remove();
    }
  }

  function maxAlertClosed() {
    setMaxAlert(false);
  }

  return (
    <div>
      <Grid container spacing={2} justify="flex-start" alignContent="center">
        <Grid item>
          <img src={image} alt="random produce" className={classes.listingImage} />
        </Grid>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" className={classes.listingCrop}>
              {crop}
            </Typography>
            <Typography gutterBottom variant="body2" className={classes.listingUnitDescription}>
              {unitsPerPallet}
              {' '}
              units/pallet
            </Typography>
            <Typography variant="body2" className={classes.listingUnitDescription}>
              <span style={{ fontWeight: 600 }}>Unit type:</span>
              {' '}
              {unitType}
            </Typography>
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
          <Typography gutterBottom variant="subtitle1" className={classes.listingNumbers} style={{ fontWeight: 600 }}>
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
          <IconButton aria-label="delete" size="small" onClick={remove}>
            <Delete fontSize="inherit" className={classes.deleteButton} />
          </IconButton>
        </Grid>
      </Grid>
      <RemoveConfirmationDialog alert={removeAlert} close={removeAlertClosed} />
      <MaxAvailableDialog alert={maxAlert} close={maxAlertClosed} crop={crop} />
    </div>
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
};
