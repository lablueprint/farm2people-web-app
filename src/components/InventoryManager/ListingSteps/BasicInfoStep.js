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
  listingRecord, getProduceTypes, onChangeField, setListingRecord,
}) {
  const Seasons = [
    'Summer',
    'Fall',
    'Winter',
    'Spring',
  ];
  const onChangeAutoComplete = (e, newValue, target) => {
    setListingRecord({ ...listingRecord, [target]: newValue });
  };
  // const [nameInputValue, setNameInputValue] = useState(listingRecord['produce name']);
  const produceTypes = getProduceTypes();
  // console.log(nameInputValue);
  const classes = useStyles();
  return (
    <Grid spacing={3} container>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h1" component="h1" className={classes.title}>Step 1: Basic Information</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Grid container spacing={1} item xs={5}>
          <ListingInputField
            name="produce name"
            label="Produce Name"
            type="autoComplete"
            options={produceTypes}
            onChange={(e, newValue) => onChangeAutoComplete(e, newValue, 'produce name')}
            val={listingRecord['produce name']}
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
            onChange={(e, newValue) => onChangeAutoComplete(e, newValue, 'growing season')}
            val={listingRecord['growing season']}
            placeholder="Season"
          />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid container spacing={1} item xs={11}>
          <ListingInputField
            label="Produce Details"
            name="produce details"
            onChange={onChangeField}
            val={listingRecord['produce details']}
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
    'produce name': '',
    'growing season': '',
    'produce details': '',
  }).isRequired,
  setListingRecord: PropTypes.func.isRequired,
  getProduceTypes: PropTypes.func.isRequired,
  onChangeField: PropTypes.func.isRequired,
};
