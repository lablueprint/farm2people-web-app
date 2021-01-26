import { React, useState, useEffect } from 'react';
import Airtable from 'airtable';
import {
  Grid, Typography, makeStyles, IconButton,
} from '@material-ui/core';
import { Remove, Add } from '@material-ui/icons';
import PropTypes from 'prop-types';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const useStyles = makeStyles(() => ({
  image: {
    height: '85px',
    width: '85px',
    backgroundColor: 'white',
  },
}));

export default function CartItemDisplay({
  id, crop, units, unitsPerPallet, unitType, price,
}) {
  const image = 'https://ilovepathology.com/wp-content/uploads/2016/09/cauliflower_PNG12674-1024x887.png';
  const styles = useStyles();

  const [quantity, setQuantity] = useState(units);
  function updateQuantity() {
    base('Reserved Listings').update([
      {
        id,
        fields: {
          units: quantity,
        },
      },
    ], (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  function decreaseQuantity() {
    setQuantity(quantity - 1);
  }

  function increaseQuantity() {
    setQuantity(quantity + 1);
    console.log('Increased', quantity);
  }

  useEffect(updateQuantity, [quantity]);

  return (
    <Grid container spacing={2} justify="flex-start">
      <Grid item xs={1}>
        <img src={image} alt="random produce" className={styles.image} />
      </Grid>
      <Grid item xs container direction="column" spacing={2}>
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1">
            {crop}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {unitsPerPallet}
            {' '}
            units/pallet
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Unit type:
            {' '}
            {unitType}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Typography gutterBottom variant="subtitle1">
          $
          {price}
        </Typography>
      </Grid>
      <Grid item container xs={1} alignItems="baseline" justify="flex-start">
        <IconButton aria-label="decrease" size="small" onClick={decreaseQuantity}>
          <Remove fontSize="inherit" />
        </IconButton>
        <Typography gutterBottom variant="subtitle1">
          {quantity}
        </Typography>
        <IconButton aria-label="increase" size="small" onClick={increaseQuantity}>
          <Add fontSize="inherit" />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <Typography gutterBottom variant="subtitle1">
          $
          {(price * quantity)}
        </Typography>
      </Grid>
    </Grid>
  );
}

CartItemDisplay.propTypes = {
  id: PropTypes.string.isRequired,
  crop: PropTypes.string.isRequired,
  units: PropTypes.number.isRequired,
  unitsPerPallet: PropTypes.number.isRequired,
  unitType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
