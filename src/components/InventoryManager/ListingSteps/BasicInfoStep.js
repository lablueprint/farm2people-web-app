import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListingInputField from '../ListingInputField';

const useStyles = makeStyles({
  title: {
    fontFamily: 'Work Sans',
    fontSize: '2.3rem',
    fontWeight: '400',
  },
});

export default function BasicInfoStep({
  listingRecord, produceTypes, onChangeField, setListingRecord, produceRecord, setProduceRecord,
}) {
  // TODO : Load options from airtable
  const Seasons = [
    'Summer',
    'Fall',
    'Winter',
    'Spring',
  ];

  const classes = useStyles();
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h1" component="h1" className={classes.title}>Step 1: Basic Information</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Grid container spacing={1} item xs={5}>
          <ListingInputField
            name="produce"
            label="Produce Name"
            type="autoComplete"
            options={produceTypes}
            getLabel={(option) => (option.fields ? option.fields['produce type'] : '')}
            onChange={(e, newValue) => {
              setProduceRecord(newValue);
              setListingRecord({ ...listingRecord, produce: [newValue.id] });
            }}
            val={produceRecord}
            placeholder="Start typing the name of produce"
          />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid container spacing={1} item xs={3}>
          <ListingInputField
            name="growing season"
            label="Growing Season"
            type="autoComplete"
            options={Seasons}
            onChange={(e, newValue) => setListingRecord({ ...listingRecord, 'growing season': newValue })}
            val={listingRecord['growing season']}
            placeholder="Season"
          />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid container spacing={1} item xs={12}>
          <ListingInputField
            label="Produce Details"
            name="details"
            onChange={onChangeField}
            val={listingRecord.details || ''}
            type="multiline"
            placeholder="Enter any details about the produce such as grade,
            cosmetic defects, and overall condition of the produce. Don't
            worry, you'll input price and sell by dates at a later step."
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

BasicInfoStep.propTypes = {
  listingRecord: PropTypes.shape({
    produce: PropTypes.arrayOf(PropTypes.string),
    'growing season': PropTypes.string,
    details: PropTypes.string,
    'listing picture': PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  setListingRecord: PropTypes.func.isRequired,
  produceTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({}),
  })).isRequired,
  onChangeField: PropTypes.func.isRequired,
  produceRecord: PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({
      'produce type': PropTypes.string,
      'produce picture': PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
      })),
    }),
  }).isRequired,
  setProduceRecord: PropTypes.func.isRequired,
};
