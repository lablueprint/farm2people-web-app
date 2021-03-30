/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// import './Onboarding.css';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {
  Button, FormControl,
  Typography,
  Paper,
  Box,
  Link,
  Grid,
  CssBaseline,
  TextField,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Container,
} from '@material-ui/core';
import { signupUser } from '../../lib/airlock/airlock';

const BUTTONS = [
  { id: 0, title: 'Buyer' },
  { id: 1, title: 'non-profit / agency' },
  { id: 2, title: 'seller' },
];

const ROLE_NAMES = ['Buyer', 'Vendor', 'Agency'];

const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: '#373737',
  //     contrastText: '#fff',
  //   },
  //   secondary: {
  //     main: '#5e5e5e',
  //     contrastText: '#fff',
  //   },
  // },
  // typography: {
  //   h4: {
  //     fontWeight: 700,
  //   },
  // },
  spacing: 4,
});

const useStyles = makeStyles({
  formGroup: {
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  paper: {
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageButtons: {
    marginTop: '50%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  subtitleText: {
    fontSize: '30px',
    textDecoration: 'underline',
    textDecorationColor: '#53AA48',
    marginBottom: '10%',
  },
  grayButton: {
    backgroundColor: '#5e5e5e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5e5e5e',
    },
  },
  blackButton: {
    backgroundColor: '#373737',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#373737',
    },
  },
  greenButton: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#53AA48',
    },
  },
});

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agency: '',
  farmName: '',
  contactName: '',
  phone: '',
  farmLocation: '',
};

function getSteps() {
  return ['Step 1', 'Step 2', 'Confirmation'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

export default function OnboardingScreen() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [role, setRole] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const classes = useStyles();

  const roleChange = useCallback((event) => {
    // event.preventDefault();
    // console.log(event.currentTarget);
    // let temp =  ~~(event.currentTarget.value);
    setRole(parseInt(event.currentTarget.value, 10));
    // console.log(role);
    // console.log(event.currentTarget.value);
    // console.log(typeof (role));
    // console.log(typeof (event.currentTarget.value));
  });

  const handleChange = useCallback((event) => {
    console.log(event.currentTarget.value);
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    );
  }, [formState, setFormState]);

  // const handleButton = useMemo((btid) => {
  //   setRole(btid);
  // }, [role]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    try {
      /* eslint-disable */
      const res = signupUser(formState.email, formState.password, formState.firstName, ROLES_NAMES[role]);

    } catch (err) {
      if (err) {
        setErrorMsg(err);
      }
      
    }
    setFormState(INITIAL_FORM_STATE);
    setRole(-1);
    setLoading(false);
  }, [formState]);

  const onNext = useCallback((event) => {
    if (currentStep >= 2) {
      setCurrentStep(3);
    } else {
      setCurrentStep(currentStep + 1);
    }

  }, [currentStep, role]);

  const onPrev = useCallback((event) => {
    console.log('clicked');
    if (currentStep <= 1) {
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const isInvalid = useMemo(() => (
    formState.password !== formState.confirmPassword
      || formState.password === ''
      || formState.email === ''
      ),
  [formState]);

  const repeatPwdCheck = useMemo(() => {
    let msg = '';
    if (formState.password === '' && formState.confirmPassword === '') {
      msg = '';
    } else if (formState.password !== '' && formState.confirmPassword !== '') {
      if (formState.password !== formState.confirmPassword) {
        msg = "Passwords don't match!";
      }
    }
    return msg;
  },
  [formState]);

  function Step1() {
    if (currentStep !== 1) {
      return null;
    }
    return [
      <div className={classes.subtitleText}>
        Are you a...
      </div>,
      <Grid
        container
        spacing={2}
        alignItems="center"
      >
        {BUTTONS.map((bt) => (
          <Grid item xs={12}>
            <Button
              className={role === bt.id ? classes.grayButton : classes.blackButton}
              type="button"
              key={bt.id}
              fullWidth
              variant="contained"
              // style={{ contrastText: '#ff0' } && role === bt.id ? { backgroundColor: '#5e5e5e' } : { backgroundColor: '#373737' }}
              // color={role === bt.id ? "secondary" : "primary"}
              value={bt.id}
              onClick={roleChange}
            >
              {bt.title}
            </Button>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box mt={5}>
            <Button
              className={classes.greenButton}
              type="button"
              onClick={onNext}
              fullWidth
              color="primary"
              variant="contained"
              // style={{ backgroundColor: '#53AA48' }}
              disabled={role === -1}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>,
    ];
  }

  function Step3() {
    if (currentStep !== 3) {
      return null;
    }
    return [
      <div>
        {role === 0 ? (
          <div className={classes.subtitleText}>
            Buyer Account Created!
          </div>
        ) : (
          <>
            <div className={classes.subtitleText}>
              Account Created!
            </div>
            <div className={classes.subtitleText}>
              { role === 2 ? 'Please await authentication from Farm2People.'
                : 'Farm2People will be in touch with you shortly.'}
            </div>
          </>
        )}
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
              fullWidth
              color="primary"
              variant="contained"
              style={{ backgroundColor: '#53AA48' }}
              onClick={onPrev}
            >
              {role === 0 ? 'Back To Sign In' : 'Done'}
            </Button>
          </Box>
        </Grid>
      </Grid>,
    ];
  }

  const steps = getSteps();
  return [
    <Box mt={5} mb={5}>
      <Container component="main" maxWidth="xs">
        <div>
          <ThemeProvider theme={theme}>
            <Typography color="textPrimary" gutterBottom variant="h4" align="center">
              Sign Up
            </Typography>
          </ThemeProvider>
          <Stepper activeStep={currentStep - 1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <Grid
              container
              align="center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12}>
                <Step1 />
              </Grid>
              <Grid item xs={12}>
                <Step2
                  currentStep={currentStep} 
                  formState={formState} 
                  classes={classes} 
                  role={role} 
                  handleChange={handleChange} 
                  onPrev={onPrev} 
                  onNext={onNext} 
                  errorMsg={errorMsg} 
                  repeatPwdCheck={repeatPwdCheck}
                />
              </Grid>
              <Grid item xs={12}>
                <Step3 />
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Box>,
  ];
}

function Step2({currentStep, formState, classes, role, handleChange, onPrev, onNext, errorMsg, repeatPwdCheck}) {
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
      {role === 0 && (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="fname"
              label="Name"
              name="firstName"
              placeholder="First Name"
              value={formState.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
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
        </>
      )}
      <Grid item xs={12}>
        <TextField
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
          variant="outlined"
          required
          type="password"
          fullWidth
          name="confirmPassword"
          id="standard-password-input"
          value={formState.confirmPassword}
          label="Confirm Password"
          onChange={handleChange}
          // disabled={loading}
        />
      </Grid>
      {role > 0 && (
        <>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name={role === 1 ? "agency" : "farmName"}
              label={role === 1 ? 'Agency' : 'Farm Name'}
              placeholder={role === 1 ? 'Name of Agency/Nonprofit' : ''}
              value={role === 1 ? formState.agency : formState.farmName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Contact"
              name="contactName"
              value={formState.contactName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
            />
          </Grid>
        </>
      )}
      {role === 2 && (
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Location"
            name="formState"
            value={formState.farmLocation}
            onChange={handleChange}
          />
        </Grid>
      )}
      {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
      {repeatPwdCheck && <Grid item xs={12} className="error-msg">{repeatPwdCheck}</Grid>}
      <Grid item xs={12} sm={6}>
        <Button
          type="button"
          onClick={onPrev}
          fullWidth
          color="primary"
          variant="contained"
          style={{ backgroundColor: '#373737' }}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          className={classes.greenButton}
          type="submit"
          onClick={onNext}
          fullWidth
          color="primary"
          variant="contained"
          // disabled={isInvalid || loading}
          // style={{ backgroundColor: '#53AA48' }}
        >
          Finish
        </Button>
      </Grid>
    </Grid>,
  ];
}