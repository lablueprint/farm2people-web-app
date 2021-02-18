import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import AddFarm from '../AddFarm';
import Checkout from '../Checkout/Checkout';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
});

export default function HomeScreen() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Checkout />
    </div>
  );
}
