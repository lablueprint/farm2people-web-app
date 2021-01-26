import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import {
  Card, CardContent, Grid, Typography, makeStyles, Button,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CartItem from './CartItem';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: 20,
    padding: 5,
    background: '#EBEBEB',
    width: '85%',
    margin: 'auto',
  },
  header: {
    'font-weight': 'bold',
    'font-size': '28px',
    'text-align': 'center',
    color: '#000000',
  },
  botButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '85%',
    margin: 'auto',
    padding: 10,
  },
}));

function CartScreen() {
  const [cartListings, setCartListings] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const styles = useStyles();

  function callback(temp) {
    setSubtotal(temp);
    console.log(subtotal);
  }

  function findTotal() {
    let temp = 0;
    let itemsProcessed = 0;
    cartListings.forEach((element, index, array) => base('Listings').find(element.fields['listing id'][0], (err, record) => {
      if (err) { console.error(err); return; }
      console.log(record);
      temp += element.fields.units * record.fields['standard price per unit'];
      itemsProcessed += 1;
      if (itemsProcessed === array.length) {
        callback(temp);
      }
    }));
  }

  // cartListings.forEach((element) => base('Listings').find(listingID[0], (err, record) => {
  //   if (err) { console.error(err); return; }
  //   console.log('Retrieved', record);
  //   setListingDetails(record);
  //   setLoading(false);
  // }));

  useEffect(() => {
    base('Reserved Listings').select({ view: 'Grid view' }).all().then((records) => {
      setCartListings(records);
      findTotal();
    });
  }, []);

  return (
    <div className="CartScreen">
      <Typography className={styles.header}>
        Cart - Shopping from Farm
      </Typography>
      <Card className={styles.card}>
        <CardContent>
          <TableHeader />
          { cartListings.map((cartListing) => (
            <CartItem
              key={cartListing.id}
              reservedListingID={cartListing.id}
              units={cartListing.fields.units}
              listingID={cartListing.fields['listing id']}
            />
          ))}
          <div>
            <Typography gutterBottom align="right">
              SUBTOTAL:
              {' '}
              {subtotal}
              {' '}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <span className={styles.botButtonContainer}>
        <Button startIcon={<ArrowBack />}>Continue shopping</Button>
        <Button variant="contained">Checkout</Button>
      </span>
    </div>
  );
}

export default CartScreen;

function TableHeader() {
  return (
    <Grid container spacing={2} justify="flex-start">
      <Grid item xs>
        <Typography gutterBottom variant="subtitle1">
          ITEM
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography gutterBottom variant="subtitle1">
          PRICE
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography gutterBottom variant="subtitle1">
          QUANTITY
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography gutterBottom variant="subtitle1">
          TOTAL
        </Typography>
      </Grid>
    </Grid>
  );
}
