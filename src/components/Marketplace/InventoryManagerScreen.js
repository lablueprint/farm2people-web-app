import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ListingsView from './ListingsView';
import AddListingButton from './AddListingButton';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
});

export default function InventoryManagerScreen() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AddListingButton />
          </Grid>
          <Grid item xs={12}>
            <ListingsView />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
