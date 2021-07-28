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
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import LockIcon from '@material-ui/icons/Lock';
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
  deleteButton: {
    backgroundColor: '#FF765D',
    color: '#FFFFFF',
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    '&:hover': {
      backgroundColor: '#ff3511',
    },
  },

  publicizeButton: {
    backgroundColor: '#FFFFFF',
    color: '#373737',
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    border: '.08rem solid black',
    '&:hover': {
      backgroundColor: '#e4e4e4',
    },
  },
  selectedButton: {
    backgroundColor: '#cdcdcd',
    color: '#373737',
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    border: '.08rem solid black',
  },
  dialogContent: {
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
});

export default function EditListingPopup({
  listing, closeDialog, isOpen, editRecord,
  deleteRecord, produceTypes, produceRecord, setPrivatized,
}) {
  const classes = useStyles();
  const [listingRecord, setListingRecord] = useState(listing);
  const [localProduceRecord, setLocalProduceRecord] = useState(produceRecord);
  const [privatizedSelection, setPrivatizedSelection] = useState();
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
    setPrivatizedSelection();
  };
  function onChangeField(e, type) {
    const { name } = e.target;
    let { value } = e.target;
    if (type === 'number') {
      value = +value;
    }
    setListingRecord({ ...listingRecord, [name]: value });
  }

  const onSaveClick = () => {
    editRecord(listingRecord);
    setPrivatized(listingRecord.privatized || false);
    closeDialog();
  };

  const onDeleteClick = () => {
    deleteRecord([listingRecord['listing id']]);
    closeDialog();
  };
  // right now, saves the privatized change only after clicking save
  const onPrivatizeClick = () => {
    setListingRecord({ ...listingRecord, privatized: true });
    setPrivatizedSelection(false);
  };

  const onPublicizeClick = () => {
    setListingRecord({ ...listingRecord, privatized: false });
    setPrivatizedSelection(true);
  };

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
        onChange: (e) => onChangeField(e, 'string'),
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
        onChange: (e) => onChangeField(e, 'number'),
        val: listingRecord['individual produce units per grouped produce type'],
        placeholder: 'Quantity',
        onButtonClick,
        size: 12,
      },
      'lbs per grouped produce type': {
        id: 'standard-number',
        name: 'lbs per grouped produce type',
        type: 'number',
        onChange: (e) => onChangeField(e, 'number'),
        val: listingRecord['lbs per grouped produce type'],
        placeholder: 'Pounds per Grouped Produce Type',
        onButtonClick,
        label: `lbs per **${listingRecord['grouped produce type']}**`,
        size: 12,
      },
      'grouped produce type per pallet': {
        id: 'standard-number',
        name: 'grouped produce type per pallet',
        type: 'number',
        onChange: (e) => onChangeField(e, 'number'),
        val: listingRecord['grouped produce type per pallet'],
        placeholder: 'Grouped Produce Type per Pallet',
        onButtonClick,
        label: `**${listingRecord['grouped produce type']}** per **PALLET**`,
        size: 12,
      },
      'grouped produce type per master unit': {
        id: 'standard-number',
        name: 'grouped produce type per master unit',
        type: 'number',
        onChange: (e) => onChangeField(e, 'number'),
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
        onChange: (e) => onChangeField(e, 'number'),
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
        onChange: (e) => onChangeField(e, 'number'),
        val: listingRecord['pallets per master pallet'],
        placeholder: 'Pallets per Master Pallet',
        onButtonClick,
        label: '**PALLETS** per **MASTER PALLET**',
        size: 12,
      },
      pallets: {
        id: 'standard-number',
        name: 'pallets available',
        type: 'number',
        onChange: (e) => onChangeField(e, 'number'),
        val: listingRecord['pallets available'],
        placeholder: 'Number of Pallets',
        onButtonClick,
        label: '**PALLETS**',
        size: 12,
      },
      'master pallets': {
        id: 'standard-number',
        name: 'master pallets',
        type: 'number',
        onChange: (e) => onChangeField(e, 'number'),
        val: listingRecord['master pallets'],
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
        onChange: (e) => onChangeField(e, 'date'),
        val: listingRecord['first available date'],
        size: 12,
      },
      'sell by date': {
        id: 'date',
        label: 'Sell By Date',
        name: 'sell by date',
        type: 'date',
        onChange: (e) => onChangeField(e, 'date'),
        val: listingRecord['sell by date'],
        size: 12,
      },
      'available until': {
        id: 'date',
        label: 'Available Until',
        name: 'available until',
        type: 'date',
        onChange: (e) => onChangeField(e, 'date'),
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
    <Dialog open={isOpen} fullWidth maxWidth="md">
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
      <DialogContent className={classes.dialogContent}>
        <Grid spacing={3} container>
          <Grid item xs={12}>
            <EditListingBlock
              getListingRecord={getBasicInfo}
              name="Basic Information"
              index={1}
            />
          </Grid>
          <Grid item xs={12}>
            <EditListingBlock
              getListingRecord={getUnitInfo}
              name="Units"
              index={2}
            />
          </Grid>
          <Grid item xs={12}>
            <EditListingBlock
              getListingRecord={getPriceInfo}
              name="Price"
              index={3}
            />
          </Grid>
          <Grid item xs={12}>
            <EditListingBlock
              getListingRecord={getDateInfo}
              name="Available Dates"
              index={4}
            />
          </Grid>
          <Grid item xs={12}>
            <EditListingBlock
              getListingRecord={getPhotoInfo}
              name="Photo"
              index={5}
              image
            />
          </Grid>
          <Grid container item xs={12} justify="flex-start" spacing={4}>
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                type="submit"
                className={
                privatizedSelection === false
                  ? classes.selectedButton
                  : classes.publicizeButton
                }
                startIcon={<LockIcon />}
                onClick={() => onPrivatizeClick()}
              >
                MAKE PRIVATE
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                type="submit"
                className={
                privatizedSelection
                  ? classes.selectedButton
                  : classes.publicizeButton
                }
                startIcon={<LockOpenOutlinedIcon />}
                onClick={() => onPublicizeClick()}
              >
                MAKE PUBLIC
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                type="submit"
                className={classes.deleteButton}
                startIcon={<DeleteOutlineSharpIcon />}
                onClick={onDeleteClick}
              >
                DELETE LISTING
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} justify="center">
            <Button
              variant="contained"
              size="large"
              type="submit"
              className={classes.saveButton}
              onClick={onSaveClick}
            >
              SAVE CHANGES
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

EditListingPopup.defaultProps = {
  isOpen: false,
};

EditListingPopup.propTypes = {
  listing: PropTypes.shape({}).isRequired,
  closeDialog: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  editRecord: PropTypes.func.isRequired,
  deleteRecord: PropTypes.func.isRequired,
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
  setPrivatized: PropTypes.func.isRequired,
};
