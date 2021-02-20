import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListingsView from './ListingsView';
import AddListingButton from './AddListingButton';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  dashboard: {
    marginTop: '1%',
  },
  text: {
    fontFamily: 'Work Sans',
  },
});

export default function InventoryManagerScreen() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={0} className={classes.dashboard}>
          <Grid item xs={1} />
          <Grid container item spacing={3} xs={9} alignItems="center" justify="center">
            <Grid item xs={3}>
              <Typography variant="h4" className={classes.text}>
                Seller Dashboard
              </Typography>
            </Grid>
            <Grid item xs={9} />
            <Grid item xs={11}>
              <AddListingButton />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={12}>
              <ListingsView />
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    </>
  );
}
