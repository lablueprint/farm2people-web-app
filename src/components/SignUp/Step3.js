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

export default function Step3(props) {
  const {
    currentStep, formState, role, handleChange, onPrev, handleSubmit, errorMsg,
    validPhoneAndZipcodeCheck, step3EmptyInputCheck, loading,
  } = props;

  const classes = useStyles();

  const COMPANY_NAMES = ['Company Name', 'Agency', 'Farm Name'];
  if (currentStep !== 3) {
    return null;
  }
  return [
    <div className={classes.subtitleText}>
      Contact Information
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
          name="org"
          label={COMPANY_NAMES[role]}
          value={formState.org}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.textInput}
          variant="outlined"
          required
          fullWidth
          label="Location"
          name="zipcode"
          value={formState.zipcode}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          className={classes.textInput}
          variant="outlined"
          required
          fullWidth
          id="fname"
          label="First Name"
          name="firstName"
          placeholder="First Name"
          value={formState.firstName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          className={classes.textInput}
          variant="outlined"
          required
          fullWidth
          id="lname"
          name="lastName"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.textInput}
          variant="outlined"
          required
          fullWidth
          label="Phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.textInput}
          variant="outlined"
          fullWidth
          label="Comments"
          name="comments"
          value={formState.comments}
          onChange={handleChange}
        />
      </Grid>
      {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
      {validPhoneAndZipcodeCheck && <Grid item xs={12} className="error-msg">{validPhoneAndZipcodeCheck}</Grid>}
      {/* {loading && <Grid item xs={12} className="error-msg">{loading}</Grid>} */}
      {step3EmptyInputCheck && <Grid item xs={12} className="error-msg">{step3EmptyInputCheck}</Grid>}

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
          onClick={handleSubmit}
          fullWidth
          color="primary"
          variant="contained"
          disabled={step3EmptyInputCheck || loading}
        >
          Finish
        </Button>
      </Grid>
    </Grid>,
  ];
}
