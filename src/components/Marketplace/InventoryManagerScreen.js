import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListingsView from './ListingsView';
import AddListingButton from './AddListingButton';

export default function InventoryManagerScreen() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AddListingButton />
        </Grid>
        <Grid item xs={12}>
          <ListingsView />
        </Grid>
      </Grid>
    </>
  );
}
