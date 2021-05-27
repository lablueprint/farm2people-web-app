import React from 'react';
import {
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  subtitleText: {
    textAlign: 'left',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  blackButton: {
    backgroundColor: '#373737',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#373737',
    },
    marginTop: '10%',
  },
  greenButton: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#53AA48',
    },
    marginTop: '10%',
  },
  textInput: {
    fontFamily: 'Work Sans',
    zIndex: 0,
  },
});

export default function Step2(props) {
  const {
    currentStep, formState, handleChange, onPrev, onNext, errorMsg, repeatPwdGenerateErrorMsg,
    isMatchingPasswordInputs,
  } = props;

  const classes = useStyles();

  if (currentStep !== 2) {
    return null;
  }
  return [
    <div className={classes.subtitleText}>
      Create your account
    </div>,
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      <Grid item xs={12}>
        <TextField
          className={classes.textInput}
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formState.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.textInput}
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formState.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.textInput}
          variant="outlined"
          required
          type="password"
          fullWidth
          name="confirmPassword"
          id="standard-password-input"
          value={formState.confirmPassword}
          label="Confirm Password"
          onChange={handleChange}
        />
      </Grid>
      {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
      {repeatPwdGenerateErrorMsg && <Grid item xs={12} className="error-msg">{repeatPwdGenerateErrorMsg}</Grid>}
      <Grid item xs={12} sm={6}>
        <Button
          type="button"
          onClick={onPrev}
          fullWidth
          color="primary"
          variant="contained"
          className={classes.blackButton}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          className={classes.greenButton}
          type="button"
          onClick={onNext}
          fullWidth
          color="primary"
          variant="contained"
          disabled={isMatchingPasswordInputs}
        >
          Next
        </Button>
      </Grid>
    </Grid>,
  ];
}
