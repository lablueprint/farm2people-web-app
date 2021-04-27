import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListingInputField from './ListingInputField';

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
// TODO : update edit listing fields, update stylings
export default function EditListing({
  id, listing, closeDialog, isOpen, modifyListings,
}) {
  // TODO : Update with new inputlistingfield
  const classes = useStyles();
  const [listingRecord, setListingRecord] = useState({});
  useEffect(() => {
    setListingRecord(listing);
  }, [listing]);
  function onSubmit(e) {
    e.preventDefault();
    modifyListings(id, listingRecord);
    closeDialog();
  }
  function onChangeField(e) {
    const { name, type } = e.target;
    let { value } = e.target;
    if (type === 'number') {
      value = +value;
    }
    setListingRecord({ ...listingRecord, [name]: value });
  }
  // TODO: Dynamically load these options from Airtable
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
  // TODO: Split these into steps
  return (
    <Dialog open={isOpen} onClose={closeDialog} fullWidth maxWidth="md">
      <DialogTitle id="form-dialog-title">Edit Listing</DialogTitle>
      <DialogContent>
        <form id="listing-form" onSubmit={onSubmit}>
          <Grid spacing={3} container>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5" className={classes.infoDivider}>Basic Information</Typography>
            </Grid>
            <Grid item xs={12}>
              <ListingInputField
                label="Product Name"
                name="crop"
                onChange={onChangeField}
                val={listingRecord.crop}
              />
            </Grid>
            <Grid item xs={12}>
              <ListingInputField
                label="Product Description"
                name="description"
                onChange={onChangeField}
                val={listingRecord.description}
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
                  value={listingRecord['unit type']}
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
                val={listingRecord['units per pallet']}
              />
            </Grid>
            <Grid item xs={4}>
              <ListingInputField
                id="standard-number"
                label="Pounds per Unit"
                name="lbs per unit"
                type="number"
                onChange={onChangeField}
                val={listingRecord['lbs per unit']}
              />
            </Grid>
            <Grid item container xs={12}>
              <Typography variant="h5" component="h5" className={classes.infoDivider}>Prices</Typography>
            </Grid>
            <Grid item xs={6}>
              <ListingInputField
                id="standard-number"
                label="Standard Price per Pallet"
                name="standard price per pallet"
                type="number"
                onChange={onChangeField}
                val={listingRecord['standard price per pallet']}
              />
            </Grid>
            <Grid item xs={6}>
              <ListingInputField
                id="standard-number"
                label="Restricted Price per Pallet"
                name="restricted price per pallet"
                type="number"
                onChange={onChangeField}
                val={listingRecord['restricted price per pallet']}
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
                val={listingRecord['expiration date']}
              />
            </Grid>
            <Grid item xs={6}>
              <ListingInputField
                id="date"
                label="First Available Date"
                name="first available date"
                type="date"
                onChange={onChangeField}
                val={listingRecord['first available date']}
              />
            </Grid>
            <Grid item xs={6}>
              <ListingInputField
                id="date"
                label="Available Until"
                name="available until"
                type="date"
                onChange={onChangeField}
                val={listingRecord['available until']}
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
                  value={listingRecord['growing season']}
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
                val={listingRecord['pallets available']}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button form="listing-form" type="submit" color="primary">
          Submit Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditListing.defaultProps = {
  id: 0,
  listing: {
    crop: '',
    description: '',
    'unit type': '',
    'units per pallet': 0,
    'lbs per unit': 0.0,
    'standard price per pallet': 0.0,
    'restricted price per pallet': 0.0,
    'expiration date': '',
    'first available date': '',
    'date entered': today,
    'available until': '',
    'growing season': '',
    'pallets available': 0,
    'pallets pending': 0,
    'pallets sold': 0,
  },
  isOpen: false,
};

EditListing.propTypes = {
  id: PropTypes.bool,
  listing: PropTypes.shape({
    crop: PropTypes.string,
    description: PropTypes.string,
    'unit type': PropTypes.string,
    'units per pallet': PropTypes.number,
    'lbs per unit': PropTypes.number,
    'standard price per pallet': PropTypes.number,
    'expiration date': PropTypes.string,
    'first available date': PropTypes.string,
    'date entered': PropTypes.string,
    'available until': PropTypes.string,
    'growing season': PropTypes.string,
    'pallets available': PropTypes.number,
    'pallets pending': PropTypes.number,
    'pallets sold': PropTypes.number,
  }),
  closeDialog: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  modifyListings: PropTypes.func.isRequired,
};
