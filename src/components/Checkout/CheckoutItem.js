/**
 * CheckoutItem
 * Displays details about listing within cart at checkout
 */

import React, { useState, useEffect } from 'react';
import {
  Typography, makeStyles, Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { store } from '../../lib/redux/store';
import { base } from '../../lib/airtable/airtable';

const useStyles = makeStyles({
  listingRow: {
    paddingBottom: 10,
  },
  listingImageBox: {
    position: 'relative',
    height: '80px',
    width: '80px',
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
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    padding: 5,
    paddingInline: 8,
    marginInline: 8,
    background: '#E81717',
    borderRadius: '5px',
  },
});

function CheckoutItem({ listingID, pallets }) {
  const [imageURL, setImageURL] = useState('');
  const [produceName, setProduceName] = useState('');
  const [listingDetails, setListingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingAgencyPrice, setUsingAgencyPrice] = useState(false);

  // TODO: style error message display
  const [errorMessage, setErrorMessage] = useState();

  const classes = useStyles();

  useEffect(() => {
    base('Listings').find(listingID[0], (err, record) => {
      if (err) { setErrorMessage(err.message); return; }
      setListingDetails(record);
      setUsingAgencyPrice(store.getState().userData.user.fields['user type'] === 'agency' && record.fields['agency price per grouped produce type'] && record.fields['agency price per grouped produce type'] < record.fields['standard price per grouped produce type']);
      base('Produce Type').find(record.fields.produce, (er, p) => {
        if (err) { setErrorMessage(er.message); }
        setProduceName(p.fields['produce type']);
        setImageURL((p.fields['produce picture'] ? p.fields['produce picture'][0].url : ''));
      });
      setLoading(false);
    });
  }, []);

  return (
    <div className={classes.listingRow}>
      {errorMessage && <p>{errorMessage}</p>}
      {!loading
        && (
        <>
          <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
            <Grid item>
              <div className={classes.listingImageBox}>
                <img src={imageURL} alt="produce" className={classes.listingImage} />
              </div>
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
                  {parseFloat(pallets * listingDetails.fields['grouped produce type per pallet']
                    * (usingAgencyPrice ? listingDetails.fields['agency price per grouped produce type'] : listingDetails.fields['standard price per grouped produce type'])).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </>
        )}
    </div>
  );
}

export default CheckoutItem;

CheckoutItem.propTypes = {
  pallets: PropTypes.number.isRequired,
  listingID: PropTypes.arrayOf(PropTypes.string).isRequired,
};
