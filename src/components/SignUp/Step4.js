import React from 'react';
import {
  Button,
  Grid,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  submitButton: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#53AA48',
    },
    width: '50%',
  },
  cenSubtitleText: {
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  cenRegSubtitleText: {
    textAlign: 'center',
    paddingLeft: '10%',
    fontSize: '30px',
    marginBottom: '2%',
  },
});

export default function Step4(props) {
  const {
    currentStep, role, handleDone,
  } = props;

  const classes = useStyles();
  if (currentStep !== 4) {
    return null;
  }
  return [
    <div>
      <div className={classes.cenSubtitleText}>
        Account Created!
      </div>
      <div className={classes.cenRegSubtitleText}>
        { role === 1 ? 'Please await authentication from Farm2People.'
          : 'Farm2People will be in touch with you shortly.'}
      </div>
    </div>,
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      <Grid item xs={12}>
        <Box mt={5}>
          <Button
            type="button"
            className={classes.submitButton}
            color="primary"
            variant="contained"
            style={{ backgroundColor: '#53AA48' }}
            onClick={handleDone}
          >
            Done
          </Button>
        </Box>
      </Grid>
    </Grid>,
  ];
}
