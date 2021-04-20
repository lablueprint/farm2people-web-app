import React from 'react';
import {
  Grid, Typography, makeStyles,
} from '@material-ui/core';
import '../../styles/fonts.css';

const useStyles = makeStyles({
  columnLabels: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: ' 140%',
    color: '#373737',
    textDecoration: 'underline',
  },
  greenUnderline: {
    textDecorationColor: '#53AA48',
  },
  orangeUnderline: {
    textDecorationColor: '#FF765D',
  },
  pinkUnderline: {
    textDecorationColor: '#FFB1D8',
  },
  blueUnderline: {
    textDecorationColor: '#2D5496',
  },
});

// returns the headers for the cart grid, separated for readability
function CartCardHeader() {
  const classes = useStyles();
  return (
    <Grid container spacing={0} justify="flex-start">
      <Grid item xs>
        <Typography gutterBottom className={[classes.columnLabels, classes.greenUnderline]}>
          Item
        </Typography>
      </Grid>
      <Grid item xs={2} align="center">
        <Typography gutterBottom className={[classes.columnLabels, classes.orangeUnderline]}>
          Price
        </Typography>
      </Grid>
      <Grid item xs={2} align="center">
        <Typography gutterBottom className={[classes.columnLabels, classes.pinkUnderline]}>
          Quantity
        </Typography>
      </Grid>
      <Grid xs={2} align="center">
        <Typography gutterBottom className={[classes.columnLabels, classes.blueUnderline]}>
          Total
        </Typography>
      </Grid>
      <Grid item xs={1} align="center">
        <Typography gutterBottom className={[classes.columnLabels, classes.greenUnderline]}>
          Delete
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CartCardHeader;
