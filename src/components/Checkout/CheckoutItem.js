/**
 * CheckoutItem
 * Displays details about listing within cart at checkout
 */

import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import {
  Typography, makeStyles, Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { store } from '../../lib/redux/store';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const useStyles = makeStyles({
  listingImage: {
    height: '80px',
    width: '80px',
    backgroundColor: 'white',
    border: '1px solid #E0E0E0',
    boxSizing: 'border-box',
    borderRadius: '6px',
  },
  listingCrop: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bolder',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#373737',
  },
  listingDescription: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '20px',
  },
  listingDetail: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '20px',
  },
  listingAgencyDescription: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '20px',
    color: '#E81717',
    textDecorationLine: 'underline',
  },
  agencyPrice: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
    lineHeight: '13px',
    color: '#FFFFFF',

    padding: 5,
    paddingInline: 8,
    marginInline: 8,
    background: '#E81717',
    borderRadius: '5px',
  },
});

function CheckoutItem({ listingID, pallets }) {
  // TODO: integrate photos stored in backend and render them in place of this
  const image = 'https://i.ebayimg.com/images/i/350982650852-0-1/s-l1000.jpg';

  const [produceName, setProduceName] = useState('');
  const [listingDetails, setListingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingAgencyPrice, setUsingAgencyPrice] = useState(false);

  // TODO: style error message display
  const [errorMessage, setErrorMessage] = useState();

  const classes = useStyles();

  useEffect(() => {
    base('Listings').find(listingID[0], (err, record) => {
      if (err) { setErrorMessage(err); return; }
      setListingDetails(record);
      setUsingAgencyPrice(store.getState().userData.user.fields['user type'] === 'agency' && record.fields['agency price per grouped produce type']);
      base('Produce Type').find(record.fields.produce, (er, p) => {
        if (err) { setErrorMessage(er); }
        setProduceName(p.fields['produce type']);
      });
      setLoading(false);
    });
  });

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      {!loading
        && (
        <>
          <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
            <Grid item>
              <img src={image} alt="random produce" className={classes.listingImage} />
            </Grid>
            <Grid item xs container direction="column" spacing={0} justify="space-evenly">
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" className={classes.listingCrop}>
                  {produceName}
                  {usingAgencyPrice
                    && <span className={classes.agencyPrice}>Agency Price</span> }
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" className={classes.listingDescription}>
                  <span className={classes.listingDetail}>Quantity:</span>
                  {' '}
                  {pallets}
                  {' '}
                  pallet
                  {pallets > 1 && 's'}
                </Typography>
                <Typography gutterBottom variant="subtitle1" className={classes.listingDescription}>
                  <span className={classes.listingDetail}>Price: </span>
                  $
                  {usingAgencyPrice
                    ? parseFloat((listingDetails.fields['agency price per grouped produce type'] * pallets)).toFixed(2)
                    : parseFloat((listingDetails.fields['standard price per grouped produce type'] * pallets)).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </>
        )}
    </>
  );
}

export default CheckoutItem;

CheckoutItem.propTypes = {
  pallets: PropTypes.number.isRequired,
  listingID: PropTypes.arrayOf(PropTypes.string).isRequired,
};
