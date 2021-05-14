import React from 'react';
import {
  Typography, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import QuoteCard from './QuoteCard';

const useStyles = makeStyles({
  root: {
    paddingTop: '4%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  innerContainer: {
    paddingLeft: '66px',
    paddingRight: '70px',
    paddingBottom: '1%',

  },
  orderColText: {
    fontFamily: 'Work Sans',
    fontSize: '18px',
    color: '#414042',
    fontWeight: 600,
  },
  // container: {
  //   paddingLeft: '4%',
  //   paddingRight: '8%',
  // },
  cardContainer: { // Overall card container
    background: '#FFFFFF',
    borderWidth: '0px',
    borderColor: '#2D5496',
    margin: '3%',
    borderRadius: '20px',
    fontFamily: 'Work Sans',
  },
});

export default function OrdersScreen() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Grid container className={classes.innerContainer} spacing={3}>
          <Grid item xs={3}>
            <Typography className={classes.orderColText}>Date Requested</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.orderColText}>Time Remaining</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.orderColText}>Status</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.orderColText}>Cost</Typography>
          </Grid>
        </Grid>
      </div>
      <QuoteCard
        dateRequested="Feb. 07, 2021"
        orderID={12345678}
        daysRemaining={2}
        isReceived={false}
        isApproved={false}
        estimatedArrival=""
        transferLocation=""
        transportationCost={-1}
        processingCost={-1}
        discountAmount={-1}
        costMapping={{}}
        totalCost={-1}
      />
      <QuoteCard
        dateRequested="Feb. 07, 2021"
        orderID={12345678}
        daysRemaining={2}
        isReceived /* implemented for true or false */
        isApproved={false} /* implemented for false */
        estimatedArrival="Jan. 01"
        transferLocation="San Diego, CA 92124"
        costMapping={{
          transportation: 10, processing: 20, taxes: 30, discount: 40,
        }}
        totalCost={100}
      />
    </div>
  );
}
