import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import EditListingBlock from './EditListingBlock';

const useStyles = makeStyles({
  dialog: {
    padding: '1rem 3rem 0rem 3rem',
  },
  heading: {
    fontFamily: 'Work Sans',
    fontSize: '3rem',
    fontWeight: '700',
  },
  saveButton: {
    backgroundColor: '#53AA48',
    color: '#FFFFFF',
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
});

const today = new Date().toDateString();
export default function EditListing({
  listing, closeDialog, isOpen, modifyListings, produceTypes, produceRecord,
}) {
  const classes = useStyles();
  const [listingRecord, setListingRecord] = useState(listing);
  const [localProduceRecord, setLocalProduceRecord] = useState(produceTypes);
  useEffect(() => {
    setListingRecord(listing);
    setLocalProduceRecord(produceRecord);
  }, [listing, produceRecord]);
  const onButtonClick = (field, value) => {
    const currentValue = listingRecord[field];
    setListingRecord({ ...listingRecord, [field]: currentValue + value });
  };
  // TODO: Dynamically load these options from Airtable
  const individualUnitTypes = [
    'bunches',
    'bushels',
    'each',
  ];
  const groupedProduceTypes = [
    'case',
    'crate',
    'bag',
    'box',
    'sack',
  ];
  const Seasons = [
    'Summer',
    'Fall',
    'Winter',
    'Spring',
  ];
  const handleClose = () => {
    closeDialog();
    setLocalProduceRecord(produceRecord);
    setListingRecord(listing);
  };
  function onSubmit(e) {
    e.preventDefault();
    modifyListings(listingRecord);
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
  // props taken from AddListing steps to render ListingInputFields for each of these
  const getBasicInfo = () => (
    {
      'produce name': {
        name: 'produce',
        label: 'Produce Name',
        type: 'autoComplete',
        options: produceTypes,
        getLabel: (option) => (option.fields ? option.fields['produce type'] : ''),
        onChange: (e, newValue) => {
          setLocalProduceRecord(newValue);
          setListingRecord({ ...listingRecord, produce: [newValue.id] });
        },
        val: localProduceRecord,
        placeholder: 'Start typing the name of produce',
        size: 5,
      },
      'growing season': {
        name: 'growing season',
        label: 'Growing Season',
        type: 'autoComplete',
        options: Seasons,
        onChange: (e, newValue) => setListingRecord({ ...listingRecord, 'growing season': newValue }),
        val: listingRecord['growing season'],
        placeholder: 'Season',
        size: 5,
      },
      'produce details': {
        label: 'Produce Details',
        name: 'details',
        onChange: onChangeField,
        val: listingRecord.details,
        type: 'multiline',
        placeholder: "Enter any details about the produce such as grade cosmetic defects, and overall condition of the produce. Don't worry, you'll input price and sell by dates at a later step",
        size: 11,
      },
    }
  );
  // TODO : conditionally render master units/pallets, add option for has master units/pallets
  const getUnitInfo = () => (
    {
      'individual produce unit': {
        label: 'Individual Produce Unit',
        name: 'individual produce unit',
        type: 'autoComplete',
        onChange: (e, newValue) => setListingRecord({ ...listingRecord, 'individual produce unit': newValue }),
        options: individualUnitTypes,
        val: listingRecord['individual produce unit'],
        placeholder: 'Individual Produce Unit',
        size: 6,
      },
      'grouped produce type': {
        label: 'Grouped Produce Type',
        name: 'grouped produce type',
        type: 'autoComplete',
        onChange: (e, newValue) => setListingRecord({ ...listingRecord, 'grouped produce type': newValue }),
        val: listingRecord['grouped produce type'],
        options: groupedProduceTypes,
        placeholder: 'Grouped Produce Type',
        size: 6,
      },
      'individual produce units per grouped produce type': {
        id: 'standard-number',
        label: `**${listingRecord['individual produce unit']}** per **${listingRecord['grouped produce type']}**`,
        name: 'individual produce units per grouped produce type',
        type: 'number',
        onChange: onChangeField,
        val: listingRecord['individual produce units per grouped produce type'],
        placeholder: 'Quantity',
        onButtonClick,
        size: 12,
      },
      'lbs per grouped produce type': {
        id: 'standard-number',
        name: 'lbs per grouped produce type',
        type: 'number',
        onChange: onChangeField,
        val: listingRecord['lbs per grouped produce type'],
        placeholder: 'Pounds per Grouped Produce Type',
        onButtonClick,
        label: `lbs per **${listingRecord['grouped produce type']}**`,
        size: 12,
      },
      'grouped produce type per master unit': {
        id: 'standard-number',
        name: 'grouped produce type per master unit',
        type: 'number',
        onChange: onChangeField,
        val: listingRecord['grouped produce type per master unit'],
        placeholder: 'Grouped Produce Type per Master Unit',
        onButtonClick,
        label: `**${listingRecord['grouped produce type']}** per **MASTER ${listingRecord['grouped produce type']}**`,
        size: 12,
      },
      'master units per pallet': {
        id: 'standard-number',
        name: 'master units per pallet',
        type: 'number',
        onChange: onChangeField,
        val: listingRecord['master units per pallet'],
        placeholder: 'Master Units per Pallet',
        onButtonClick,
        label: `**MASTER ${listingRecord['grouped produce type']}** per **PALLET**`,
        size: 12,
      },
      'pallets per master pallet': {
        id: 'standard-number',
        name: 'pallets per master pallet',
        type: 'number',
        onChange: onChangeField,
        val: listingRecord['pallets per master pallet'],
        placeholder: 'Pallets per Master Pallet',
        onButtonClick,
        label: '**PALLETS** per **MASTER PALLET**',
        size: 12,
      },
      'pallets available': {
        id: 'standard-number',
        name: 'pallets per master pallet',
        type: 'number',
        onChange: onChangeField,
        val: listingRecord['pallets available'],
        placeholder: 'Number of Master Pallets',
        onButtonClick,
        label: '**MASTER PALLETS**',
        size: 12,
      },
    }
  );
  const getPriceInfo = () => (
    {
      'standard price per grouped produce type': {
        id: 'standard-number',
        name: 'standard price per unit',
        type: 'currency',
        onChange: (event, value) => setListingRecord({ ...listingRecord, 'standard price per grouped produce type': value }),
        val: listingRecord['standard price per grouped produce type'],
        label: `PER **${listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE'}**`,
        placeholder: 'Standard Price per Grouped Produce Type',
        size: 12,
      },
      'agency price per grouped produce type': {
        id: 'standard-number',
        name: 'standard price per unit',
        type: 'currency',
        onChange: (event, value) => setListingRecord({ ...listingRecord, 'agency price per grouped produce type': value }),
        val: listingRecord['agency price per grouped produce type'],
        label: `PER **${listingRecord['grouped produce type'] || 'GROUPED PRODUCE TYPE'}**`,
        placeholder: 'Agency Price per Grouped Produce Type',
        size: 12,
      },
    }
  );
  const getDateInfo = () => (
    {
      'first available date': {
        id: 'date',
        label: 'First Available Date',
        name: 'first available date',
        type: 'date',
        onChange: onChangeField,
        val: listingRecord['first available date'],
        size: 12,
      },
      'sell by date': {
        id: 'date',
        label: 'Sell By Date',
        name: 'sell by date',
        type: 'date',
        onChange: onChangeField,
        val: listingRecord['sell by date'],
        size: 12,
      },
      'available until': {
        id: 'date',
        label: 'Available Until',
        name: 'available until',
        type: 'date',
        onChange: onChangeField,
        val: listingRecord['available until'],
        size: 12,
      },
    }
  );
  const getPhotoInfo = () => (
    {
      'listing photo': {
        size: 3,
        url: produceRecord.fields['produce picture'] ? produceRecord.fields['produce picture'][0].url : '',
      },
    }
  );
  return (
    <Dialog open={isOpen} fullWidth maxWidth="lg">
      <DialogTitle id="form-dialog-title" className={classes.dialog}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography className={classes.heading}>
              Edit Listing
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <form id="listing-form" onSubmit={onSubmit}>
          <Grid spacing={3} container>
            <Grid item xs={12}>
              <EditListingBlock getListingRecord={getBasicInfo} name="Basic Information" index={1} />
            </Grid>
            <Grid item xs={12}>
              <EditListingBlock getListingRecord={getUnitInfo} name="Units" index={2} />
            </Grid>
            <Grid item xs={12}>
              <EditListingBlock getListingRecord={getPriceInfo} name="Price" index={3} />
            </Grid>
            <Grid item xs={12}>
              <EditListingBlock getListingRecord={getDateInfo} name="Available Dates" index={4} />
            </Grid>
            <Grid item xs={12}>
              <EditListingBlock getListingRecord={getPhotoInfo} name="Photo" index={5} image />
            </Grid>
            <Grid container item xs={12} justify="center">
              <Button variant="contained" size="medium" type="submit" className={classes.saveButton}>
                SAVE CHANGES
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

EditListing.defaultProps = {
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
  produceTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({}),
  })).isRequired,
  produceRecord: PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({
      'produce type': PropTypes.string,
      'produce picture': PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
      })),
    }),
  }).isRequired,
};
