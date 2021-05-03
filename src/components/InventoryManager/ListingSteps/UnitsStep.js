import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
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

const GreenCheckbox = withStyles({
  root: {
    color: '#53AA48',
    '&$checked': {
      color: '#53AA48',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function UnitsStep({
  onChangeField, listingRecord, setListingRecord,
}) {
  const classes = useStyles();
  const onSelect = (field, label) => {
    setListingRecord({ ...listingRecord, [field]: label });
  };
  const onButtonClick = (field, value) => {
    const currentValue = listingRecord[field];
    setListingRecord({ ...listingRecord, [field]: currentValue + value });
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
  // TODO : Add form validation for number fields (min: 1)
  return (
    <>
      <Grid spacing={2} container>
        <Grid item container xs={12}>
          <Typography className={classes.title}>Step 2: Units</Typography>
        </Grid>
        <Grid item container xs={12}>
          <Typography className={classes.heading}>{questions[0]}</Typography>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography className={classes.subheading}>
              Individual Produce Unit
            </Typography>
          </Grid>
          {UnitTypes1.map((name) => (
            <Grid item xs={2} key={name.value}>
              <UnitTypeCard
                onSelect={() => onSelect('individual produce unit', name.value)}
                label={name.value}
                selected={name.value === listingRecord['individual produce unit']}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography className={classes.subheading}>
              Grouped Produce Type
            </Typography>
          </Grid>
          {UnitTypes2.map((name) => (
            <Grid item xs={2} key={name.value}>
              <UnitTypeCard
                onSelect={() => onSelect('grouped produce type', name.value)}
                label={name.value}
                selected={name.value === listingRecord['grouped produce type']}
              />
            </Grid>
          ))}
        </Grid>
        <ListingInputField
          id="standard-number"
          name="individual produce units per grouped produce type"
          type="number"
          onChange={onChangeField}
          val={listingRecord['individual produce units per grouped produce type']}
          onButtonClick={onButtonClick}
          placeholder="Quantity"
          label={`**${listingRecord['individual produce unit'] || 'INDIVIDUAL PRODUCE UNIT'}** PER **${listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE'}**`}
        />
        <ListingInputField
          id="standard-number"
          name="lbs per grouped produce type"
          type="number"
          onChange={onChangeField}
          val={listingRecord['lbs per grouped produce type']}
          onButtonClick={onButtonClick}
          placeholder="Pounds per Grouped Produce Type"
          label={`lbs per **${listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE'}**`}
        />
        <Grid item container xs={12}>
          <Typography className={classes.heading}>{questions[1]}</Typography>
        </Grid>
        <Grid item container xs={12}>
          {/* TODO : reset master unit count when checbox unchecked */}
          <Typography className={classes.text}>
            <GreenCheckbox
              checked={listingRecord['has master units']}
              onChange={() => onSelect('has master units', !listingRecord['has master units'])}
            />
            Yes, I do have master units.
          </Typography>
        </Grid>
        {(listingRecord['has master units'])
        && (
        <ListingInputField
          id="standard-number"
          name="grouped produce type per master unit"
          type="number"
          onChange={onChangeField}
          val={listingRecord['grouped produce type per master unit']}
          onButtonClick={onButtonClick}
          placeholder="Quantity"
          label={`**${listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE'}** per **MASTER ${listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE'}**`}
        />
        )}
        <Grid item container xs={12}>
          <Typography className={classes.heading}>{questions[2]}</Typography>
        </Grid>
        {listingRecord['has master units']
        && (
        <ListingInputField
          id="standard-number"
          name="master units per pallet"
          type="number"
          onChange={onChangeField}
          val={listingRecord['master units per pallet']}
          onButtonClick={onButtonClick}
          placeholder="Quantity"
          label={`**MASTER ${listingRecord['grouped produce type'].toUpperCase() || 'GROUPED PRODUCE TYPE'}** PER PALLET`}
        />
        )}
        <ListingInputField
          id="standard-number"
          name="grouped produce type per pallet"
          type="number"
          onChange={onChangeField}
          val={listingRecord['grouped produce type per pallet']}
          onButtonClick={onButtonClick}
          placeholder="Quantity"
          label={`**${listingRecord['grouped produce type'].toUpperCase() || 'GROUPED PRODUCE TYPE'}** PER PALLET`}
        />
        <Grid item container xs={12}>
          <Typography className={classes.heading}>{questions[3]}</Typography>
        </Grid>
        <Grid item container xs={12}>
          {/* TODO : reset master pallet count when checbox unchecked */}
          <Typography className={classes.text}>
            <GreenCheckbox
              checked={listingRecord['has master pallets']}
              onChange={() => onSelect('has master pallets', !listingRecord['has master pallets'])}
            />
            Yes, I do have master pallets.
          </Typography>
        </Grid>
        {(listingRecord['has master pallets'])
        && (
        <ListingInputField
          id="standard-number"
          name="pallets per master pallet"
          type="number"
          onChange={onChangeField}
          val={listingRecord['pallets per master pallet']}
          onButtonClick={onButtonClick}
          placeholder="Quantity"
          label="**pallets** per **master pallet**"
        />
        )}
        <Grid item container xs={12}>
          <Typography className={classes.heading}>{questions[4]}</Typography>
        </Grid>
        <ListingInputField
          id="standard-number"
          name="pallets available"
          type="number"
          onChange={onChangeField}
          val={listingRecord['pallets available']}
          onButtonClick={onButtonClick}
          placeholder="Quantity"
          label="**pallets**"
        />
      </Grid>
    </>
  );
}

UnitsStep.propTypes = {
  listingRecord: PropTypes.shape({
    'individual produce unit': PropTypes.string,
    'individual produce units per grouped produce type': PropTypes.number,
    'grouped produce type': PropTypes.string,
    'lbs per grouped produce type': PropTypes.number,
    'grouped produce type per master unit': PropTypes.number,
    'has master units': PropTypes.bool,
    'master units per pallet': PropTypes.number,
    'grouped produce type per pallet': PropTypes.number,
    'has master pallets': PropTypes.bool,
    'pallets per master pallet': PropTypes.number,
    'pallets available': PropTypes.number,
  }).isRequired,
  onChangeField: PropTypes.func.isRequired,
  setListingRecord: PropTypes.func.isRequired,
};
