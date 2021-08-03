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
    fontFamily: 'Work Sans',
    fontSize: '1rem',
    fontWeight: '400',
  },
  labels: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: '1.05rem',
  },
  unitLabel: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
    fontWeight: '400',
    paddingLeft: '.5rem',
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
  const validPrices = `${listingRecord['has master units'] ? 'Master Unit/' : ''}Pallet${listingRecord['has master pallets'] ? '/Master Pallet' : ''}`;
  const getPrices = (basePrice) => {
    const prices = {};
    if (listingRecord['has master units']) {
      prices.masterUnitPrice = listingRecord['grouped produce type per master unit'] * basePrice;
    } else {
      prices.masterUnitPrice = 0;
    }
    prices.palletPrice = basePrice * listingRecord['grouped produce type per pallet'];
    prices.masterPalletPrice = prices.palletPrice * listingRecord['pallets per master pallet'];
    return prices;
  };

  const standardPrices = getPrices(listingRecord['standard price per grouped produce type']);
  const agencyPrices = getPrices(listingRecord['agency price per grouped produce type']);
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
            <ListingInputField
              type="currency"
              onChange={(event, value) => onChangePrice(event, value, 'standard price per grouped produce type')}
              val={listingRecord['standard price per grouped produce type']}
              label={`PER **${listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE'}**`}
              placeholder="Standard Price per Grouped Produce Type"
            />
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={12}>
                <Typography className={classes.text}>
                  {`This is what your prices per ${validPrices} will be:`}
                </Typography>
              </Grid>
              {listingRecord['has master units']
              && (
              <Grid item xs={12}>
                <Typography className={classes.labels}>
                  Standard Price per Master Unit:
                  <Typography display="inline" className={classes.unitLabel}>
                    $
                  </Typography>
                  <Typography display="inline" className={classes.text}>
                    {`${Number(standardPrices.masterUnitPrice).toFixed(2) || '0.00'} `}
                    per Master
                    {` ${listingRecord['grouped produce type']}`}
                  </Typography>
                </Typography>
              </Grid>
              )}
              <Grid item xs={12}>
                <Typography className={classes.labels}>
                  Standard Price per Pallet:
                  <Typography display="inline" className={classes.unitLabel}>
                    $
                  </Typography>
                  <Typography display="inline" className={classes.text}>
                    {`${Number(standardPrices.palletPrice).toFixed(2) || '0.00'} `}
                    per Pallet
                  </Typography>
                </Typography>
              </Grid>
              {listingRecord['has master pallets']
              && (
              <Grid item xs={12}>
                <Typography className={classes.labels}>
                  Standard Price per Master Pallet:
                  <Typography display="inline" className={classes.unitLabel}>
                    $
                  </Typography>
                  <Typography display="inline" className={classes.text}>
                    {`${Number(standardPrices.masterPalletPrice).toFixed(2) || '0.00'} `}
                    per Master Pallet
                  </Typography>
                </Typography>
              </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Typography variant="h2" component="h2" className={classes.heading}>{questions[1]}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={1} item xs={12}>
            <Grid container item xs={12} alignItems="center">
              <ListingInputField
                id="standard-number"
                name="agency price grouped produce type"
                type="currency"
                onChange={(event, value) => onChangePrice(event, value, 'agency price per grouped produce type')}
                val={listingRecord['agency price per grouped produce type']}
                label={`PER **${listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE'}**`}
                placeholder="Agency Price per Grouped Produce Type"
              />
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={12}>
                <Typography className={classes.text}>
                  {`This is what your prices per ${validPrices} will be:`}
                </Typography>
              </Grid>
              {listingRecord['has master units']
              && (
              <Grid item xs={12}>
                <Typography className={classes.labels}>
                  Agency Price per Master Unit:
                  <Typography display="inline" className={classes.unitLabel}>
                    $
                  </Typography>
                  <Typography display="inline" className={classes.text}>
                    {`${Number(agencyPrices.masterUnitPrice).toFixed(2) || '0.00'} `}
                    per Master
                    {` ${listingRecord['grouped produce type']}`}
                  </Typography>
                </Typography>
              </Grid>
              )}
              <Grid item xs={12}>
                <Typography className={classes.labels}>
                  Agency Price per Pallet:
                  <Typography display="inline" className={classes.unitLabel}>
                    $
                  </Typography>
                  <Typography display="inline" className={classes.text}>
                    {`${Number(agencyPrices.palletPrice).toFixed(2) || '0.00'} `}
                    per Pallet
                  </Typography>
                </Typography>
              </Grid>
              {listingRecord['has master pallets']
              && (
              <Grid item xs={12}>
                <Typography className={classes.labels}>
                  Agency Price per Master Pallet:
                  <Typography display="inline" className={classes.unitLabel}>
                    $
                  </Typography>
                  <Typography display="inline" className={classes.text}>
                    {`${Number(agencyPrices.masterPalletPrice).toFixed(2) || '0.00'} `}
                    per Master Pallet
                  </Typography>
                </Typography>
              </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

PricesStep.propTypes = {
  listingRecord: PropTypes.shape({
    'standard price per grouped produce type': PropTypes.number,
    'agency price per grouped produce type': PropTypes.number,
    'has master units': PropTypes.bool,
    'grouped produce type per pallet': PropTypes.number,
    'master units per pallet': PropTypes.number,
    'grouped produce type per master unit': PropTypes.number,
    'has master pallets': PropTypes.bool,
    'pallets per master pallet': PropTypes.number,
    'grouped produce type': PropTypes.string,
  }).isRequired,
  setListingRecord: PropTypes.func.isRequired,
};
