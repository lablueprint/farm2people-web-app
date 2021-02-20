import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
});
export default function MarketplaceScreen() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Marketplace Screen</h1>
    </div>
  );
}
