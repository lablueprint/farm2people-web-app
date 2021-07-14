import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import UnitTypeCard from './UnitTypeCard';
import ListingInputField from '../ListingInputField';
import Bag from '../../../assets/images/bag.svg';
import Box from '../../../assets/images/box.svg';
import Bunch from '../../../assets/images/bunch.svg';
import Bushel from '../../../assets/images/bushel.svg';
import Cartons from '../../../assets/images/cartons.svg';
import Case from '../../../assets/images/case.svg';
import Crate from '../../../assets/images/crate.svg';
import Each from '../../../assets/images/each.svg';

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

const toPlural = (input) => (
  input === 'box' ? input.concat('es') : input.concat('s')
);

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
  const IndividualProduceUnits = [
    {
      value: 'bunches',
      label: 'bunches',
      url: Bunch,
    },
    {
      value: 'bushels',
      label: 'bushels',
      url: Bushel,
    },
    {
      value: 'each',
      label: 'each',
      url: Each,
    },
  ];
  const GroupedProduceTypes = [
    {
      value: 'case',
      label: 'Case',
      url: Case,
    },
    {
      value: 'crate',
      label: 'Crate',
      url: Crate,
    },
    {
      value: 'bag',
      label: 'Bag',
      url: Bag,
    },
    {
      value: 'box',
      label: 'Box',
      url: Box,
    },
    {
      value: 'carton',
      label: 'Carton',
      url: Cartons,
    },
  ];
  const questions = [
    '1. How is your produce packed?',
    '2. Do you have master units?',
    '3. How many grouped produce type units of produce do you have?',
    '4. Do you have master pallets?',
    '5. Lastly, enter the number of pallets or master pallets you have.',
  ];
  return (
    <>
      <Grid spacing={2} container>
        <Grid item container xs={12}>
          <Typography className={classes.title}>Step 2: Units</Typography>
        </Grid>
        <Grid item container xs={12}>
          <Typography className={classes.heading}>{questions[0]}</Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.subheading}>
              Individual Produce Unit
            </Typography>
          </Grid>
          {IndividualProduceUnits.map((name) => (
            <Grid item xs={2} key={name.value}>
              <UnitTypeCard
                onSelect={() => onSelect('individual produce unit', name.value)}
                label={name.value}
                selected={name.value === listingRecord['individual produce unit']}
                url={name.url}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.subheading}>
              Grouped Produce Type
            </Typography>
          </Grid>
          {GroupedProduceTypes.map((name) => (
            <Grid item xs={2} key={name.value}>
              <UnitTypeCard
                onSelect={() => onSelect('grouped produce type', name.value)}
                label={name.value}
                selected={name.value === listingRecord['grouped produce type']}
                url={name.url}
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
          label={`**${toPlural(listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE')}** per **MASTER ${listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE'}**`}
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
          label={`**MASTER ${toPlural(listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE')}** PER PALLET`}
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
          label={`**${toPlural(listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE')}** PER PALLET`}
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
        {(listingRecord['has master pallets'])
        && (
        <ListingInputField
          id="standard-number"
          name="master pallets"
          type="number"
          onChange={onChangeField}
          val={listingRecord['master pallets']}
          onButtonClick={onButtonClick}
          placeholder="Quantity"
          label="**master pallets**"
        />
        )}
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
    'master pallets': PropTypes.number,
  }).isRequired,
  onChangeField: PropTypes.func.isRequired,
  setListingRecord: PropTypes.func.isRequired,
};
