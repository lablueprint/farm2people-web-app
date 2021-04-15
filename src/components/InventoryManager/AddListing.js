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
import BasicInfoStep from './ListingSteps/BasicInfoStep';
import UnitsStep from './ListingSteps/UnitsStep';
import PricesStep from './ListingSteps/PricesStep';
import DatesStep from './ListingSteps/DatesStep';
import PhotoStep from './ListingSteps/PhotoStep';
import ConfirmationStep from './ListingSteps/ConfirmationStep';

const today = (new Date()).toISOString().split('T')[0];
// TODO : split up edit and add listing
const initialListing = {
  'produce name': '',
  'growing season': '',
  'produce details': '',
  'unit type 1': '',
  'unit type 1 per unit type 2': 0,
  'unit type 2': '',
  'lbs per unit type 2': 0,
  'unit type 2 per master unit': 0,
  'master unit type': '',
  'unit type per pallet': '',
  'units per pallet': 0.0,
  'pallets per master pallet': 0,
  'standard price per unit': 0.0,
  'agency price per unit': 0.0,
  'date entered': today,
  'first available date': '',
  'sell by date': '',
  'pallets available': 0,
  'pallets pending': 0,
  'pallets sold': 0,
  privatized: false,
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

export default function AddListing({
  closeDialog, isOpen, modifyListings, getProduceTypes,
}) {
  const [listingRecord, setListingRecord] = useState(initialListing);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps();
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };
  function handleClose() {
    closeDialog();
    setActiveStep(0);
    setListingRecord(initialListing);
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
    if (activeStep < 5) {
      handleComplete(activeStep);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      modifyListings(listingRecord);
      handleClose();
    }
    console.log(listingRecord);
  }
  const onChangeField = (e, type) => {
    const { name } = e.target;
    const { value } = e.target;
    if (type === 'number') {
      setListingRecord({ ...listingRecord, [name]: +value });
    } else {
      setListingRecord({ ...listingRecord, [name]: value });
    }
  };
  // TODO: Dynamically load these options from Airtable
  function getStepContent(index) {
    switch (index) {
      case 0:
        return (
          <BasicInfoStep
            setListingRecord={setListingRecord}
            listingRecord={listingRecord}
            getProduceTypes={getProduceTypes}
            onChangeField={(e) => onChangeField(e, 'string')}
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
        return (<PhotoStep setListingRecord={setListingRecord} listingRecord={listingRecord} />);
      case 5:
        return (<ConfirmationStep onChangeField={(e) => onChangeField(e, 'string')} listingRecord={listingRecord} />);
      default:
        return 'Finished';
    }
  }

  return (
    <Dialog open={isOpen} fullWidth maxWidth="lg">
      <DialogTitle id="form-dialog-title">Add Listing</DialogTitle>
      <DialogContent>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                completed={completed[index]}
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
      <DialogActions>
        <Button onClick={handleBack} color="primary">
          {activeStep > 0 ? 'Back' : 'Cancel' }
        </Button>
        <Button form="listing-form" type="submit" color="primary">
          {activeStep < 5 ? 'Next' : 'Submit Changes' }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddListing.defaultProps = {
  isOpen: false,
};

AddListing.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  modifyListings: PropTypes.func.isRequired,
  getProduceTypes: PropTypes.func.isRequired,
};
