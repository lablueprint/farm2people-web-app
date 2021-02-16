import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function CartScreen() {
  const useStyles = makeStyles({
    root: {
      position: 'relative',
      minHeight: '100vh',
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Cart Screen</h1>
    </div>
  );
}
