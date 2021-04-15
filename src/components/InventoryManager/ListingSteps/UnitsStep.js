import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UnitTypeCard from './UnitTypeCard';
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

export default function UnitsStep({
  onChangeField, listingRecord, setListingRecord,
}) {
  const classes = useStyles();
  const onCardSelect = (field, label) => {
    setListingRecord({ ...listingRecord, [field]: label });
  };
  const UnitTypes1 = [
    {
      value: 'bunches',
      label: 'bunches',
    },
    {
      value: 'bushels',
      label: 'bushels',
    },
    {
      value: 'each',
      label: 'each',
    },
  ];
  const UnitTypes2 = [
    {
      value: 'case',
      label: 'Case',
    },
    {
      value: 'crate',
      label: 'Crate',
    },
    {
      value: 'bag',
      label: 'Bag',
    },
    {
      value: 'box',
      label: 'Box',
    },
    {
      value: 'sack',
      label: 'Sack',
    },
  ];
  const questions = [
    '1. How is your produce packed?',
    '2. Do you have master units?',
    '3. How many unit type 2/master units of produce do you have?',
    '4. Do you have master pallets?',
    '5. Lastly, enter the number of pallets or master pallets you have.',
  ];
  return (
    <>
      <Grid spacing={3} container>
        <Grid item container xs={12}>
          <Typography gutterBottom variant="h1" component="h1" className={classes.title}>Step 2: Units</Typography>
        </Grid>
        <Grid item container xs={12}>
          <Typography variant="h2" component="h2" className={classes.heading}>{questions[0]}</Typography>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h6" className={classes.subheading}>
              Unit Type 1
            </Typography>
          </Grid>
          {UnitTypes1.map((name) => (
            <Grid item xs={2} key={name.value}>
              <UnitTypeCard onSelect={() => onCardSelect('unit type 1', name.value)} label={name.value} />
            </Grid>
          ))}
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h6" className={classes.subheading}>
              Unit Type 2
            </Typography>
          </Grid>
          {UnitTypes2.map((name) => (
            <Grid item xs={2} key={name.value}>
              <UnitTypeCard onSelect={() => onCardSelect('unit type 2', name.value)} label={name.value} />
            </Grid>
          ))}
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={1} item xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.subheading} variant="h6" component="h6">
                Quantity
              </Typography>
            </Grid>
            <Grid container item xs={12} alignItems="center">
              <ListingInputField
                id="standard-number"
                name="unit type 1 per unit type 2"
                type="number"
                onChange={onChangeField}
                val={listingRecord['unit type 1 per unit type 2']}
              />
              <Typography display="inline" className={classes.text} variant="h6" component="h6">
                <Typography display="inline" className={classes.labels} variant="h6" component="h6">
                  {listingRecord['unit type 1'].toUpperCase() || 'UNIT TYPE 1'}
                </Typography>
                { ' PER ' }
                <Typography display="inline" className={classes.labels} variant="h6" component="h6">
                  {listingRecord['unit type 2'].toUpperCase() || 'UNIT TYPE 2'}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={1} item xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.subheading} variant="h6" component="h6">
                Pounds per Unit Type 2
              </Typography>
            </Grid>
            <Grid container item xs={12} alignItems="center">
              <ListingInputField
                id="standard-number"
                name="lbs per unit type 2"
                type="number"
                onChange={onChangeField}
                val={listingRecord['lbs per unit type 2']}
              />
              <Typography display="inline" className={classes.text} variant="h6" component="h6">
                { 'LBS PER ' }
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
                Quantity
              </Typography>
            </Grid>
            <Grid container item xs={12} alignItems="center">
              <ListingInputField
                id="standard-number"
                name="unit type 2 per master unit"
                type="number"
                onChange={onChangeField}
                val={listingRecord['unit type 2 per master unit']}
              />
              <Typography display="inline" className={classes.text} variant="h6" component="h6">
                <Typography display="inline" className={classes.labels} variant="h6" component="h6">
                  {listingRecord['unit type 2'].toUpperCase() || 'UNIT TYPE 2'}
                </Typography>
                { ' PER ' }
                <Typography display="inline" className={classes.labels} variant="h6" component="h6">
                  {`MASTER ${listingRecord['unit type 2'].toUpperCase() || 'UNIT TYPE 2'}`}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Typography variant="h2" component="h2" className={classes.heading}>{questions[2]}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={1} item xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.subheading} variant="h6" component="h6">
                Quantity
              </Typography>
            </Grid>
            <Grid container item xs={12} alignItems="center">
              <ListingInputField
                id="standard-number"
                name="units per pallet"
                type="number"
                onChange={onChangeField}
                val={listingRecord['units per pallet']}
              />
              <Typography display="inline" className={classes.text} variant="h6" component="h6">
                <Typography display="inline" className={classes.labels} variant="h6" component="h6">
                  {listingRecord['unit type 2'].toUpperCase() || 'UNIT TYPE 2'}
                </Typography>
                { ' PER PALLET' }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Typography variant="h2" component="h2" className={classes.heading}>{questions[3]}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={1} item xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.subheading} variant="h6" component="h6">
                Quantity
              </Typography>
            </Grid>
            <Grid container item xs={12} alignItems="center">
              <ListingInputField
                id="standard-number"
                name="pallets per master pallet"
                type="number"
                onChange={onChangeField}
                val={listingRecord['pallets per master pallet']}
              />
              <Typography display="inline" className={classes.text} variant="h6" component="h6">
                <Typography display="inline" className={classes.labels} variant="h6" component="h6">
                  PALLETS
                </Typography>
                { ' PER ' }
                <Typography display="inline" className={classes.labels} variant="h6" component="h6">
                  MASTER PALLET
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Typography variant="h2" component="h2" className={classes.heading}>{questions[4]}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid container spacing={1} item xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.subheading} variant="h6" component="h6">
                Quantity
              </Typography>
            </Grid>
            <Grid container item xs={12} alignItems="center">
              <ListingInputField
                id="standard-number"
                name="pallets available"
                type="number"
                onChange={onChangeField}
                val={listingRecord['pallets available']}
              />
              <Typography display="inline" className={classes.labels} variant="h6" component="h6">
                PALLETS
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

UnitsStep.propTypes = {
  listingRecord: PropTypes.shape({
    'unit type 1': PropTypes.string,
    'unit type 1 per unit type 2': PropTypes.number,
    'unit type 2': PropTypes.string,
    'lbs per unit type 2': PropTypes.number,
    'unit type 2 per master unit': PropTypes.number,
    'master unit type': PropTypes.string,
    'unit type per pallet': PropTypes.string,
    'units per pallet': PropTypes.number,
    'pallets per master pallet': PropTypes.number,
    'pallets available': PropTypes.number,
  }).isRequired,
  onChangeField: PropTypes.func.isRequired,
  setListingRecord: PropTypes.func.isRequired,
};
