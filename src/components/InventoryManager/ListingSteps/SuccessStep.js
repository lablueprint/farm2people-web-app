import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  message: {
    fontFamily: 'Work Sans',
    fontSize: '2rem',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#428839',
    },
  },
  popup: {
    minHeight: '50vh',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: '1.6rem',
    fontFamily: 'Work Sans',
  },
});

export default function SuccessStep({
  closeDialog,
}) {
  const classes = useStyles();
  return (
    <>
      <Grid item container xs={12} justify="center" alignItems="flex-start" alignContent="flex-start" className={classes.popup} spacing={8}>
        <Grid item container xs={12} justify="center">
          <Typography className={classes.message}>
            Congratulations! You&apos;ve successfully added a listing.
          </Typography>
        </Grid>
        <Grid item container xs={12} alignContent="center" justify="center">
          <Button onClick={closeDialog} variant="contained" size="large" color="primary" className={classes.button}>
            <Typography className={classes.buttonText}>
              Go back to Dashboard
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

SuccessStep.propTypes = {
  closeDialog: PropTypes.func.isRequired,
};
