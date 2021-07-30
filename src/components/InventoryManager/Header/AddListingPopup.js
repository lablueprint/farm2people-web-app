import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddListingConnector from './AddListingConnector';
import AddListingStepIcons from './AddListingStepIcons';
import BasicInfoStep from './ListingSteps/BasicInfoStep';
import UnitsStep from './ListingSteps/UnitsStep';
import PricesStep from './ListingSteps/PricesStep';
import DatesStep from './ListingSteps/DatesStep';
import PhotoStep from './ListingSteps/PhotoStep';
import ConfirmationStep from './ListingSteps/ConfirmationStep';
import SuccessStep from './ListingSteps/SuccessStep';
import { store } from '../../../lib/redux/store';

const useStyles = makeStyles({
  dialogTitle: {
    padding: '1rem 3rem 0rem 3rem',
  },
  dialogContent: {
    padding: '1rem 3rem 0rem 3rem',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  dialogButtons: {
    padding: '1rem 3rem',
  },
  heading: {
    fontFamily: 'Work Sans',
    fontSize: '3rem',
    fontWeight: '700',
  },
  nextButton: {
    backgroundColor: '#53AA48',
    color: '#FFFFFF',
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
  backButton: {
    color: '#53AA48',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
  },
});

const today = (new Date()).toISOString().split('T')[0];
// TODO : add finished screen

const initialProduce = {
  id: '',
  fields: {
    'produce type': '',
    'produce picture': [],
  },
};

function getSteps() {
  return [
    'Step 1',
    'Step 2',
    'Step 3',
    'Step 4',
    'Step 5',
    'Confirmation',
  ];
}

export default function AddListingPopup({
  closeDialog, isOpen, modifyListings, produceTypes,
}) {
  const initialListing = {
    'user id': [store.getState().userData.user.id],
    produce: [],
    'growing season': '',
    details: '',
    'individual produce unit': '',
    'individual produce units per grouped produce type': 0,
    'grouped produce type': '',
    'lbs per grouped produce type': 0,
    'has master units': false,
    'grouped produce type per master unit': 0,
    'master units per pallet': 0,
    'grouped produce type per pallet': 0.0,
    'has master pallets': false,
    'pallets per master pallet': 0,
    'master pallets': 0,
    'standard price per grouped produce type': 0.0,
    'agency price per grouped produce type': 0.0,
    'date entered': today,
    'first available date': '',
    'sell by date': '',
    'available until': '',
    'pallets available': 0,
    'pallets pending': 0,
    'pallets sold': 0,
    'listing picture': [],
    privatized: false,
    'users interested': 0,
  };

  const classes = useStyles();
  const [produceRecord, setProduceRecord] = useState(initialProduce);
  const [listingRecord, setListingRecord] = useState(initialListing);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps();
  const handleStepComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };
  function handleClose() {
    closeDialog();
    setActiveStep(0);
    setListingRecord(initialListing);
    setProduceRecord(initialProduce);
    setCompleted({});
  }
  function handleBack() {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      handleClose();
    }
  }

  function handleNext(e) {
    e.preventDefault();
    if (activeStep === 5) {
      modifyListings(listingRecord);
    }
    handleStepComplete(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const onChangeField = (e, type) => {
    const { name, value } = e.target;
    if (type === 'number') {
      setListingRecord({ ...listingRecord, [name]: +value });
    } else {
      setListingRecord({ ...listingRecord, [name]: value });
    }
  };
  function getStepContent(index) {
    switch (index) {
      case 0:
        return (
          <BasicInfoStep
            setListingRecord={setListingRecord}
            listingRecord={listingRecord}
            produceTypes={produceTypes}
            onChangeField={(e) => onChangeField(e, 'string')}
            produceRecord={produceRecord}
            setProduceRecord={setProduceRecord}
          />
        );
      case 1:
        return (
          <UnitsStep
            onChangeField={(e) => onChangeField(e, 'number')}
            listingRecord={listingRecord}
            setListingRecord={setListingRecord}
          />
        );
      case 2:
        return (<PricesStep setListingRecord={setListingRecord} listingRecord={listingRecord} />);
      case 3:
        return (<DatesStep onChangeField={(e) => onChangeField(e, 'date')} listingRecord={listingRecord} />);
      case 4:
        return (<PhotoStep produceRecord={produceRecord} />);
      case 5:
        return (
          <ConfirmationStep
            listingRecord={listingRecord}
            produceRecord={produceRecord}
            setStep={setActiveStep}
          />
        );
      case 6:
        return (<SuccessStep closeDialog={handleClose} />);
      default:
        return 'Finished';
    }
  }

  return (
    <Dialog open={isOpen} fullWidth maxWidth="lg">
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography className={classes.heading}>
              Add Listing
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
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<AddListingConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                completed={completed[index]}
                StepIconComponent={AddListingStepIcons}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleNext} id="listing-form">
          {getStepContent(activeStep)}
        </form>
      </DialogContent>
      {activeStep < 6 && (
        <DialogActions className={classes.dialogButtons}>
          <Box flexGrow={1}>
            <Button onClick={handleBack} className={classes.backButton} variant="contained">
              {activeStep > 0 ? 'Back' : 'Cancel' }
            </Button>
          </Box>
          <Box>
            <Button form="listing-form" type="submit" className={classes.nextButton} variant="contained">
              {activeStep < 5 ? 'Next' : 'Submit Changes' }
            </Button>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
}

AddListingPopup.defaultProps = {
  isOpen: false,
};

AddListingPopup.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  modifyListings: PropTypes.func.isRequired,
  produceTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({}),
  })).isRequired,
};
