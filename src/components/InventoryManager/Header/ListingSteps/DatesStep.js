import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListingInputField from '../../ListingInputField';

const useStyles = makeStyles({
  heading: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    textDecoration: '#53AA48 solid underline 2px',
    textUnderlinePosition: 'under',
    fontSize: '1.4rem',
  },
  title: {
    fontFamily: 'Work Sans',
    fontSize: '2.3rem',
    fontWeight: '400',
  },
});

export default function DatesStep({
  onChangeField, listingRecord,
}) {
  // TODO : Make the calendar button open the date picker
  const classes = useStyles();
  const question = 'When is your produce available?';
  return (
    <>
      <Grid spacing={3} container>
        <Grid item container xs={12}>
          <Typography gutterBottom variant="h1" component="h1" className={classes.title}>Step 4: Dates</Typography>
        </Grid>
        <Grid item container xs={12}>
          <Typography variant="h2" component="h2" className={classes.heading}>{question}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={0} item xs={12} alignItems="center">
            <ListingInputField
              id="date"
              label="First Available Date"
              name="first available date"
              type="date"
              onChange={onChangeField}
              val={listingRecord['first available date']}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={0} item xs={4}>
            <ListingInputField
              id="date"
              label="Sell By Date"
              name="sell by date"
              type="date"
              onChange={onChangeField}
              val={listingRecord['sell by date']}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={0} item xs={4}>
            <ListingInputField
              id="date"
              label="Available Until"
              name="available until"
              type="date"
              onChange={onChangeField}
              val={listingRecord['available until']}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

DatesStep.propTypes = {
  listingRecord: PropTypes.shape({
    'first available date': PropTypes.string,
    'sell by date': PropTypes.string,
    'available until': PropTypes.string,
  }).isRequired,
  onChangeField: PropTypes.func.isRequired,
};
