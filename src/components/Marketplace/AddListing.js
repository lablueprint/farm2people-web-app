import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListingInputField from './ListingInputField';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const useStyles = makeStyles({
  inputField: {
    width: '100%',
    height: '100%',
  },
  infoDivider: {
    fontWeight: 'bold',
  },
});

const today = new Date().toDateString();
export default function AddListing({
  id, listing, edit, closeDialog,
}) {
  const classes = useStyles();
  const [ListingRecord, setListingRecord] = useState(listing);

  function createOrEditRecord(e) {
    e.preventDefault();
    if (edit) {
      const record = {
        id,
        fields: ListingRecord,
      };
      base('Listings').update([record]).then(closeDialog());
    } else {
      const record = {
        fields: ListingRecord,
      };
      base('Listings').create([record]).then(closeDialog());
    }
  }
  function onChangeField(e) {
    const { name, type } = e.target;
    let { value } = e.target;
    if (type === 'number') {
      value = +value;
    }
    setListingRecord({ ...ListingRecord, [name]: value });
  }
  function onChangeCheckbox(e) {
    setListingRecord({ ...ListingRecord, [e.target.name]: e.target.checked });
  }

  const UnitTypes = [
    {
      value: 'box',
      label: 'Box',
    },
    {
      value: 'case',
      label: 'Case',
    },
    {
      value: 'bag',
      label: 'Bag',
    },
    {
      value: 'pallet',
      label: 'Pallet',
    },
  ];

  const Seasons = [
    {
      value: 'Summer',
      label: 'Summer',
    },
    {
      value: 'Winter',
      label: 'Winter',
    },
    {
      value: 'Fall',
      label: 'Fall',
    },
    {
      value: 'Spring',
      label: 'Spring',
    },
  ];
  return (
    <form id="listing-form" onSubmit={createOrEditRecord}>
      <Grid spacing={3} container className="listing-form">
        <Grid item xs={12}>
          <Typography variant="h5" component="h5" className={classes.infoDivider}>Basic Information</Typography>
        </Grid>
        <Grid item xs={12}>
          <ListingInputField
            label="Product Name"
            name="crop"
            onChange={onChangeField}
            val={ListingRecord.crop}
          />
        </Grid>
        <Grid item xs={12}>
          <ListingInputField
            label="Product Description"
            name="description"
            onChange={onChangeField}
            val={ListingRecord.description}
            multiline
          />
        </Grid>
        <Grid item container xs={12}>
          <Typography variant="h5" component="h5" className={classes.infoDivider}>Units</Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.inputField} variant="outlined">
            <Typography variant="h6" component="h4">
              Unit Type
            </Typography>
            <Select
              name="unit type"
              onChange={onChangeField}
              defaultValue=""
              value={ListingRecord['unit type']}
              required
            >
              {UnitTypes.map((name) => (
                <MenuItem value={name.value}>
                  {name.label}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <ListingInputField
            id="standard-number"
            label="Units per Pallet"
            name="units per pallet"
            type="number"
            onChange={onChangeField}
            val={ListingRecord['units per pallet']}
          />
        </Grid>
        <Grid item xs={4}>
          <ListingInputField
            id="standard-number"
            label="Pounds per Unit"
            name="lbs per unit"
            type="number"
            onChange={onChangeField}
            val={ListingRecord['lbs per unit']}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h5" className={classes.infoDivider}>Prices</Typography>
          <ListingInputField
            id="standard-number"
            label="Standard Price per Unit"
            name="standard price per unit"
            type="number"
            onChange={onChangeField}
            val={ListingRecord['standard price per unit']}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h5" className={classes.infoDivider}>Dates</Typography>
        </Grid>
        <Grid item xs={6}>
          <ListingInputField
            id="date"
            label="Expiration Date"
            name="expiration date"
            type="date"
            onChange={onChangeField}
            val={ListingRecord['expiration date']}
          />
        </Grid>
        <Grid item xs={6}>
          <ListingInputField
            id="date"
            label="First Available Date"
            name="first available date"
            type="date"
            onChange={onChangeField}
            val={ListingRecord['first available date']}
          />
        </Grid>
        <Grid item xs={6}>
          <ListingInputField
            id="date"
            label="Available Until"
            name="available until"
            type="date"
            onChange={onChangeField}
            val={ListingRecord['available until']}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl
            className={classes.inputField}
            variant="outlined"
          >
            <Typography variant="h6" component="h6">
              Season
            </Typography>
            <Select
              name="growing season"
              onChange={onChangeField}
              defaultValue=""
              value={ListingRecord['growing season']}
              required
            >
              {Seasons.map((name) => (
                <MenuItem value={name.value}>
                  {name.label}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <ListingInputField
            id="standard-number"
            label="Pallets Available"
            name="pallets available"
            type="number"
            onChange={onChangeField}
            val={ListingRecord['pallets available']}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" component="h6">
            Distressed Status
          </Typography>
          <FormControlLabel
            control={(
              <Checkbox
                checked={ListingRecord.distressed}
                onChange={onChangeCheckbox}
                name="distressed"
                color="primary"
              />
              )}
            label="Distressed"
          />
        </Grid>
      </Grid>
    </form>
  );
}

AddListing.defaultProps = {
  id: 0,
  listing: {
    crop: '',
    description: '',
    'unit type': '',
    'units per pallet': 0,
    'lbs per unit': 0.0,
    'standard price per unit': 0.0,
    'expiration date': '',
    'first available date': '',
    'date entered': today,
    'available until': '',
    'growing season': '',
    'pallets available': 0,
    'pallets pending': 0,
    'pallets sold': 0,
    distressed: false,
  },
  edit: false,
};

AddListing.propTypes = {
  id: PropTypes.bool,
  listing: PropTypes.shape({
    crop: PropTypes.string,
    description: PropTypes.string,
    'unit type': PropTypes.string,
    'units per pallet': PropTypes.number,
    'lbs per unit': PropTypes.number,
    'standard price per unit': PropTypes.number,
    'expiration date': PropTypes.string,
    'first available date': PropTypes.string,
    'date entered': PropTypes.string,
    'available until': PropTypes.string,
    'growing season': PropTypes.string,
    'pallets available': PropTypes.number,
    'pallets pending': PropTypes.number,
    'pallets sold': PropTypes.number,
    distressed: PropTypes.bool,
  }),
  edit: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
};
