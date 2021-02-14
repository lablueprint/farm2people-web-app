import React from 'react';
import {
  Grid, Typography, makeStyles,
} from '@material-ui/core';
import './Cart.css';

// custom styling
const useStyles = makeStyles({
  columnLabels: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: ' 140%',
    color: '#373737',
    textDecoration: 'underline',
  },
});

// returns the headers for the cart grid, separated for readability
function CartCardHeader() {
  const classes = useStyles();
  return (
    <Grid container spacing={0} justify="flex-start">
      <Grid item xs>
        <Typography gutterBottom className={classes.columnLabels} style={{ textDecorationColor: '#53AA48' }}>
          Item
        </Typography>
      </Grid>
      <Grid item xs={2} align="center">
        <Typography gutterBottom className={classes.columnLabels} style={{ textDecorationColor: '#FF765D' }}>
          Price
        </Typography>
      </Grid>
      <Grid item xs={2} align="center">
        <Typography gutterBottom className={classes.columnLabels} style={{ textDecorationColor: '#FFB1D8' }}>
          Quantity
        </Typography>
      </Grid>
      <Grid xs={2} align="center">
        <Typography gutterBottom className={classes.columnLabels} style={{ textDecorationColor: '#2D5496' }}>
          Total
        </Typography>
      </Grid>
      <Grid item xs={1} align="center">
        <Typography gutterBottom className={classes.columnLabels} style={{ textDecorationColor: '#53AA48' }}>
          Delete
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CartCardHeader;
