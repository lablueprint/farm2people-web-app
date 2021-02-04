import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import Airtable from 'airtable';
import {
  Card, CardContent, Grid, Typography, ButtonBase, Button, makeStyles,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CartItem from './CartItem';
import './Cart.css';
import Fruit3 from '../../Fruit3.svg';
import Fruit4 from '../../Fruit4.svg';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const useStyles = makeStyles({
  cartHeader: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '45px',
    lineHeight: '140%',
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
    fontSize: '36px',
    lineHeight: '140%',
    color: '#373737',
    paddingTop: '20px',
    paddingBottom: '15px',
  },
  columnLabels: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: ' 140%',
    color: '#373737',
    textDecoration: 'underline',
  },
  subtotalLabel: {
    fontFamily: 'Work Sans',
    fontWeight: '500',
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
  },
  continueShoppingButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
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
    position: 'sticky',
    width: '150px',
    height: 'auto',
    left: '95%',
    bottom: '16%',
    zIndex: '-2',
  },
  fruit4: {
    position: 'sticky',
    width: '150px',
    height: 'auto',
    left: '95%',
    bottom: '3%',
    zIndex: '-1',
  },
});

function CartScreen() {
  const [cartListings, setCartListings] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    setSubtotal(0);
    base('Reserved Listings').select({ view: 'Grid view' }).all().then((records) => {
      records.map((element) => base('Listings').find(element.fields['listing id'][0], (err, record) => {
        const temp = element.fields.pallets * record.fields['standard price per unit'];
        setSubtotal((prevTotal) => (prevTotal + temp));
      }));
      setCartListings(records, () => {
        console.log(cartListings);
      });
    });
  }, []);

  function updateSubtotal(change) {
    setSubtotal((prevTotal) => (prevTotal + change));
  }

  function removeListing(id) {
    base('Reserved Listings').destroy([id],
      (err, deletedRecords) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted', deletedRecords);
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
        <Card className={classes.cartCard}>
          <CardContent>
            <TableHeader />
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
        <span className={classes.buttonContainer}>
          <ButtonBase>
            <ArrowBack style={{ color: '#53AA48' }} />
            <div className={classes.continueShoppingButton}>Continue shopping</div>
          </ButtonBase>
          <Button variant="contained" className={classes.checkoutButton}>Checkout</Button>
        </span>
      </div>
      <img src={Fruit3} alt="" className={classes.fruit3} />
      <img src={Fruit4} alt="" className={classes.fruit4} />
    </div>

  );
}

export default CartScreen;

function TableHeader() {
  const classes = useStyles();
  return (
    <Grid container spacing={0} justify="flex-start">
      <Grid item xs>
        <Typography gutterBottom className={classes.columnLabels} style={{ 'text-decoration-color': '#53AA48' }}>
          Item
        </Typography>
      </Grid>
      <Grid item xs={2} align="center">
        <Typography gutterBottom className={classes.columnLabels} style={{ 'text-decoration-color': '#FF765D' }}>
          Price
        </Typography>
      </Grid>
      <Grid item xs={2} align="center">
        <Typography gutterBottom className={classes.columnLabels} style={{ 'text-decoration-color': '#FFB1D8' }}>
          Quantity
        </Typography>
      </Grid>
      <Grid xs={2} align="center">
        <Typography gutterBottom className={classes.columnLabels} style={{ 'text-decoration-color': '#2D5496' }}>
          Total
        </Typography>
      </Grid>
      <Grid item xs={1} align="center">
        <Typography gutterBottom className={classes.columnLabels} style={{ 'text-decoration-color': '#53AA48' }}>
          Delete
        </Typography>
      </Grid>
    </Grid>
  );
}
