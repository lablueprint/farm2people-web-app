import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import ConfirmationBlock from './ConfirmationBlock';

export default function ConfirmationStep({
  listingRecord, setStep, produceRecord,
}) {
  const getBasicInfo = () => (
    {
      'produce name': produceRecord.fields['produce type'],
      'growing season': listingRecord['growing season'],
      'produce details': listingRecord.details,
    }
  );
  const getUnitInfo = () => {
    const info = {
      'individual produce unit': listingRecord['individual produce unit'],
      'grouped produce type': listingRecord['grouped produce type'],
      [`${listingRecord['individual produce unit']} per ${listingRecord['grouped produce type']}`]: listingRecord['individual produce units per grouped produce type'],
      [`lbs per ${listingRecord['grouped produce type']}`]: listingRecord['lbs per grouped produce type'],
    };
    if (listingRecord['has master units']) {
      info['grouped produce type per master unit'] = listingRecord['grouped produce type per master unit'];
    }
    info.Pallets = listingRecord['pallets available'];
    if (listingRecord['has master pallets']) {
      info['pallets per master pallet'] = listingRecord['pallets per master pallet'];
      info['Master Pallets'] = listingRecord['pallets available'];
    }
    return info;
  };
  const getPriceInfo = () => (
    {
      [`standard price per ${listingRecord['grouped produce type']}`]: `$${Number(listingRecord['standard price per grouped produce type']).toFixed(2)}`,
      [`agency price per ${listingRecord['grouped produce type']}`]: `$${Number(listingRecord['agency price per grouped produce type']).toFixed(2)}`,
    }
  );
  const getDateInfo = () => (
    {
      'first available date': listingRecord['first available date'],
      'sell by date': listingRecord['sell by date'],
      'available until': listingRecord['available until'],
    }
  );
  const getPhotoInfo = () => (
    {
      'listing photo': produceRecord.fields['produce picture'] ? produceRecord.fields['produce picture'][0].url : '',
    }
  );
  return (
    <>
      <Grid spacing={3} container>
        <Grid item xs={12}>
          <ConfirmationBlock getListingRecord={getBasicInfo} name="Basic Information" index={1} setStep={setStep} />
        </Grid>
        <Grid item xs={12}>
          <ConfirmationBlock getListingRecord={getUnitInfo} name="Units" index={2} setStep={setStep} />
        </Grid>
        <Grid item xs={12}>
          <ConfirmationBlock getListingRecord={getPriceInfo} name="Price" index={3} setStep={setStep} />
        </Grid>
        <Grid item xs={12}>
          <ConfirmationBlock getListingRecord={getDateInfo} name="Available Dates" index={4} setStep={setStep} />
        </Grid>
        <Grid item xs={12}>
          <ConfirmationBlock getListingRecord={getPhotoInfo} name="Photo" index={5} setStep={setStep} image />
        </Grid>
      </Grid>
    </>
  );
}

ConfirmationStep.propTypes = {
  listingRecord: PropTypes.shape({
    produce: PropTypes.arrayOf(PropTypes.string),
    'growing season': '',
    details: '',
    'individual produce unit': PropTypes.string,
    'individual produce units per grouped produce type': PropTypes.number,
    'grouped produce type': PropTypes.string,
    'lbs per grouped produce type': PropTypes.number,
    'has master units': PropTypes.bool,
    'grouped produce type per master unit': PropTypes.number,
    'master units per pallet': PropTypes.number,
    'grouped produce type per pallet': PropTypes.number,
    'has master pallets': PropTypes.bool,
    'pallets per master pallet': PropTypes.number,
    'pallets available': PropTypes.number,
    'standard price per grouped produce type': PropTypes.number,
    'agency price per grouped produce type': PropTypes.number,
    'first available date': PropTypes.string,
    'sell by date': PropTypes.string,
    'available until': PropTypes.string,
  }).isRequired,
  setStep: PropTypes.func.isRequired,
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
