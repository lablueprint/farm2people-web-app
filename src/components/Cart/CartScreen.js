/* Container for all Cart Screen display components */

import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import {
  Card, CardContent, Grid, Typography, ButtonBase, Button, makeStyles,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CartItem from './CartItem';
import CartCardHeader from './CartCardHeader';
import './Cart.css';
import Fruit3 from '../../assets/images/Fruit3.svg';
import Fruit4 from '../../assets/images/Fruit4.svg';

// airtable setup
const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

// custom styling
const useStyles = makeStyles({
  cartHeader: {
    fontFamily: 'Work Sans',
    fontWeight: 'bolder',
    fontSize: 50,
    color: '#373737',
  },
  container: {
    width: '78%',
    alignSelf: 'center',
    margin: 'auto',
    minWidth: '700px',
  },
  cartCard: {
    paddingTop: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    margin: 'auto',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
  },
  farmLabel: {
    fontFamily: 'Work Sans',
    fontWeight: '500',
    fontSize: '32px',
    lineHeight: '140%',
    color: '#373737',
    paddingTop: '20px',
    paddingBottom: '15px',
  },
  subtotalLabel: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#373737',
  },
  subtotal: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '140%',
    color: '#373737',
    textDecoration: 'underline',
    textDecorationColor: '#53AA48',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
    paddingTop: '17px',
    marginBottom: '5%',
  },
  continueShoppingButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bolder',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#373737',
  },
  checkoutButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '140%',
    color: '#FFFFFF',
    background: '#53AA48',
  },
  fruit3: {
    position: 'absolute',
    width: '140px',
    height: 'auto',
    right: '1%',
    bottom: '10%',
    zIndex: '-2',
  },
  fruit4: {
    position: 'absolute',
    width: '140px',
    height: 'auto',
    right: '0%',
    bottom: '-2%',
    zIndex: '-1',
  },
});

function CartScreen() {
  const [cartListings, setCartListings] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  // TODO: style error message display
  const [errorMessage, setErrorMessage] = useState();

  const classes = useStyles();

  // calls airtable on start to fetch listings in cart and calculate a subtotal
  useEffect(() => {
    setSubtotal(0);
    base('Reserved Listings').select({ view: 'Grid view' }).all().then((records) => {
      records.map((element) => base('Listings').find(element.fields['listing id'][0], (err, record) => {
        const currCartItemPrice = element.fields.pallets * record.fields['standard price per unit'];
        setSubtotal((prevTotal) => (prevTotal + currCartItemPrice));
      }));
      setCartListings(records);
      setLoading(false);
    })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []);

  // update subtotal function that is passed to each listing detail allowing adjustments
  // (ex. on quantity change, or listing is removed)
  function updateSubtotal(change) {
    setSubtotal((prevTotal) => (prevTotal + change));
  }

  // removes reservedListing from airtable and cartListings state
  // is also passed to detail view that has the delete button
  function removeListing(id) {
    base('Reserved Listings').destroy([id],
      (err) => {
        if (err) {
          console.error(err);
        }
      });

    setCartListings(cartListings.filter((listing) => listing.id !== id));
  }

  return (
    <div>
      <div className={classes.container}>
        <Typography className={classes.cartHeader}>
          Cart
        </Typography>
        <Typography className={classes.farmLabel}>
          Shopping from Farm
        </Typography>

        {!loading && (
          <Card className={classes.cartCard}>
            <CardContent>
              <CartCardHeader />
              { cartListings.map((cartListing) => (
                <CartItem
                  key={cartListing.id}
                  reservedListingID={cartListing.id}
                  pallets={cartListing.fields.pallets}
                  listingID={cartListing.fields['listing id']}
                  updateSubtotal={updateSubtotal}
                  removeListing={removeListing}
                />
              ))}
              <Grid container alignItems="center" justify="flex-end">
                <Grid item xs />
                <Grid item xs={3} md={2}>
                  <Typography gutterBottom className={classes.subtotalLabel} align="center">
                    SUBTOTAL:
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography gutterBottom className={classes.subtotal} align="center">
                    $
                    {parseFloat(subtotal).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        <span className={classes.buttonContainer}>
          <ButtonBase>
            <ArrowBack style={{ color: '#53AA48' }} />
            <div className={classes.continueShoppingButton}>Continue shopping</div>
          </ButtonBase>
          <Button variant="contained" className={classes.checkoutButton}>Checkout</Button>
        </span>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <img src={Fruit3} alt="" className={classes.fruit3} />
      <img src={Fruit4} alt="" className={classes.fruit4} />
    </div>

  );
}

export default CartScreen;
