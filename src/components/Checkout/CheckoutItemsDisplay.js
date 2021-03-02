import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
// import PropTypes from 'prop-types';
import {
  Card, CardContent, Typography, makeStyles,
} from '@material-ui/core';
import CheckoutItem from './CheckoutItem';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const useStyles = makeStyles({
  inputCards: {
    paddingTop: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    margin: 'auto',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
  },
  sectionHeader: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: ' 140%',
    color: '#373737',
    paddingTop: 30,
    paddingBottom: 10,
  },
  farmHeader: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '17px',
    lineHeight: '19px',
    textDecorationLine: 'underline',
    color: '#373737',
    paddingTop: 15,
    paddingBottom: 15,
  },
  stepNum: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: '23px',
    lineHeight: '140%',
    color: '#FF765D',
  },
  stepSlash: {
    fontWeight: '100',
  },
  stepLabel: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#373737',
    textDecoration: 'underline',
    textDecorationColor: '#53AA48',
  },
  cost: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#373737',
    paddingTop: 15,
  },
  costLabel: {
    fontWeight: '700',
  },
  totalLabel: {
    fontFamily: 'Work Sans',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#373737',
    paddingTop: 15,
  },
  total: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '140%',
    color: '#373737',
    textDecoration: 'underline',
    textDecorationColor: '#53AA48',
  },

});

function CheckoutItemsDisplay() {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setSubtotal(0);
    base('Reserved Listings').select({ view: 'Grid view' }).all().then((records) => {
      records.map((element) => base('Listings').find(element.fields['listing id'][0], (err, record) => {
        const currCartItemPrice = element.fields.pallets * record.fields['standard price per pallet'];
        setSubtotal((prevTotal) => (prevTotal + currCartItemPrice));
      }));
      setItems(records);
    });
  }, []);

  return (
    <>
      <Typography className={classes.sectionHeader}> Your Order</Typography>
      <Card className={classes.inputCards}>
        <CardContent>
          <Typography className={classes.stepNum}>
            05
            <span className={classes.stepSlash}>/</span>
            <span className={classes.stepLabel}>Items</span>
          </Typography>
          <Typography className={classes.farmHeader}>
            Ryan
            {'\''}
            s Ronderful Rarm
          </Typography>
          {items.map((item) => (
            <CheckoutItem
              key={item.id}
              pallets={item.fields.pallets}
              listingID={item.fields['listing id']}
            />
          ))}
          <Typography className={classes.cost}>
            <span className={classes.costLabel}>Cart Subtotal: </span>
            $
            {parseFloat(subtotal).toFixed(2)}
          </Typography>
          <Typography className={classes.cost}>
            <span className={classes.costLabel}>Estimated Transportation Cost: </span>
            $
            {parseFloat(20).toFixed(2)}
          </Typography>
          <Typography className={classes.cost}>
            <span className={classes.costLabel}>Processing Fee: </span>
            $
            {parseFloat(5).toFixed(2)}
          </Typography>
          <Typography className={classes.totalLabel}>
            ESTIMATED TOTAL:
            {' '}
            <span className={classes.total}>
              $
              {parseFloat(subtotal).toFixed(2)}
            </span>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default CheckoutItemsDisplay;
