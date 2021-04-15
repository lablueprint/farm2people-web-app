import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListingInputField from '../ListingInputField';

const useStyles = makeStyles({
  heading: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    textDecoration: '#53AA48 solid underline 2px',
    textUnderlinePosition: 'under',
    fontSize: '1.4rem',
  },
  subheading: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: '1rem',
  },
  title: {
    fontFamily: 'Work Sans',
    fontSize: '2.3rem',
    fontWeight: '400',
  },
  text: {
    paddingLeft: '1rem',
    fontFamily: 'Work Sans',
    fontSize: '1rem',
    fontWeight: '400',
  },
  labels: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: '1.05rem',
  },
});

export default function PricesStep({
  setListingRecord, listingRecord,
}) {
  const classes = useStyles();
  const questions = [
    '1. What is the standard price of your produce?',
    '2. What is the agency price of your produce?',
  ];
  const onChangePrice = (e, newValue, target) => {
    setListingRecord({ ...listingRecord, [target]: newValue });
  };
  return (
    <>
      <Grid spacing={3} container>
        <Grid item container xs={12}>
          <Typography gutterBottom variant="h1" component="h1" className={classes.title}>Step 3: Prices</Typography>
        </Grid>
        <Grid item container xs={12}>
          <Typography variant="h2" component="h2" className={classes.heading}>{questions[0]}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={1} item xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.subheading} variant="h6" component="h6">
                Standard Price per Unit Type 2
              </Typography>
            </Grid>
            <Grid container item xs={12} alignItems="center">
              <ListingInputField
                id="standard-number"
                name="standard price per unit"
                type="currency"
                onChange={(event, value) => onChangePrice(event, value, 'standard price per unit')}
                val={listingRecord['standard price per unit']}
              />
              <Typography display="inline" className={classes.text} variant="h6" component="h6">
                { '  PER ' }
                <Typography display="inline" className={classes.labels} variant="h6" component="h6">
                  {listingRecord['unit type 2'].toUpperCase() || 'UNIT TYPE 2'}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Typography variant="h2" component="h2" className={classes.heading}>{questions[1]}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={1} item xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.subheading} variant="h6" component="h6">
                Agency Price per Unit Type 2
              </Typography>
            </Grid>
            <Grid container item xs={12} alignItems="center">
              <ListingInputField
                id="standard-number"
                name="agency price per unit"
                type="currency"
                onChange={(event, value) => onChangePrice(event, value, 'agency price per unit')}
                val={listingRecord['agency price per unit']}
              />
              <Typography display="inline" className={classes.text} variant="h6" component="h6">
                { '  PER ' }
                <Typography display="inline" className={classes.labels} variant="h6" component="h6">
                  {listingRecord['unit type 2'].toUpperCase() || 'UNIT TYPE 2'}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

PricesStep.propTypes = {
  listingRecord: PropTypes.shape({
    'standard price per unit': PropTypes.number,
    'agency price per unit': PropTypes.number,
    'unit type 1': PropTypes.string,
    'unit type 2': PropTypes.string,
  }).isRequired,
  setListingRecord: PropTypes.func.isRequired,
};
