import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import {
  Typography, makeStyles, Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const useStyles = makeStyles({
  // TODO: Look into breakpoints/media queries for adaptive styling
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
  listingDetail: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '20px',
  },
});

function CheckoutItem({ listingID, pallets }) {
  // TODO: integrate photos stored in backend and render them in place of this
  const image = 'https://i.ebayimg.com/images/i/350982650852-0-1/s-l1000.jpg';

  const [listingDetails, setListingDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: style error message display
  const [errorMessage, setErrorMessage] = useState();

  const classes = useStyles();

  useEffect(() => {
    base('Listings').find(listingID[0], (err, record) => {
      if (err) { setErrorMessage(err); return; }
      setListingDetails(record);
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
                  {listingDetails.fields.crop}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" className={classes.listingDescription}>
                  <span className={classes.listingDetail}>Quantity:</span>
                  {' '}
                  {pallets}
                  {' '}
                  pallets
                </Typography>
                <Typography gutterBottom variant="subtitle1" className={classes.listingDescription}>
                  <span className={classes.listingDetail}>Price: </span>
                  $
                  {parseFloat((listingDetails.fields['standard price per pallet'] * pallets)).toFixed(2)}
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
