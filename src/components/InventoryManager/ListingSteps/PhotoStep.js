import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListingInputField from '../ListingInputField';

const useStyles = makeStyles({
  inputField: {
    width: '100%',
    height: '100%',
  },
  infoDivider: {
    fontFamily: 'Work Sans',
  },
});

export default function PhotoStep({
  onChangeField, listingRecord,
}) {
  const classes = useStyles();
  return (
    <>
      <Grid spacing={3} container>
        <Grid item container xs={12}>
          <Typography variant="h5" component="h5" className={classes.infoDivider}>Step 5: Photo</Typography>
        </Grid>
        <Grid item xs={6}>
          <ListingInputField
            id="standard-number"
            label="Standard Price per unit"
            name="standard price per unit"
            type="number"
            onChange={onChangeField}
            val={listingRecord['standard price per unit']}
          />
        </Grid>
      </Grid>
    </>
  );
}

PhotoStep.propTypes = {
  listingRecord: PropTypes.shape({
    'standard price per unit': '',
  }).isRequired,
  onChangeField: PropTypes.func.isRequired,
};
