import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  inputField: {
    width: '100%',
    height: '100%',
  },
  infoDivider: {
    fontFamily: 'Work Sans',
  },
});

export default function ConfirmationStep(
  listingRecord,
) {
  const classes = useStyles();
  return (
    <>
      <Grid spacing={3} container>
        <Grid item xs={12}>
          01
          <Typography variant="h5" component="h5" className={classes.infoDivider}>Basic Information</Typography>
        </Grid>
        <Grid item xs={12}>
          Produce Name:
          {listingRecord.crop}
        </Grid>
      </Grid>
    </>
  );
}
