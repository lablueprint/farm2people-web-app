import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Image from 'material-ui-image';

const useStyles = makeStyles({
  heading: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    textDecoration: '#53AA48 solid underline 2px',
    textUnderlinePosition: 'under',
    fontSize: '1.4rem',
  },
  subheading: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: '1rem',
  },
  text: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
    fontWeight: '400',
  },
  title: {
    fontFamily: 'Work Sans',
    fontSize: '2.3rem',
    fontWeight: '400',
  },
});

export default function PhotoStep({
  produceRecord,
}) {
  const classes = useStyles();
  // TODO : set listing picture to default picture, implement photo upload
  return (
    <>
      <Grid spacing={3} container>
        <Grid item container xs={12}>
          <Typography variant="h5" component="h5" className={classes.title}>Step 5: Photo</Typography>
        </Grid>
        <Grid item container xs={12}>
          <Typography className={classes.heading}>
            Upload a photo for your produce.
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Typography className={classes.text}>
            This will be your default photo.
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Image
          // TODO : add placeholder image, right now it just loads forever if no image
            src={produceRecord.fields ? produceRecord.fields['produce picture'][0].url : ''}
          />
        </Grid>
      </Grid>
    </>
  );
}

PhotoStep.propTypes = {
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
