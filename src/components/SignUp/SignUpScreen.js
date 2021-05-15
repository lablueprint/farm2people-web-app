import React, { useMemo, useState, useCallback } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {
  Typography,
  Grid,
  Container,
  Box,
} from '@material-ui/core';
import { signupUser } from '../../lib/airlock/airlock';
import { history } from '../../lib/redux/store';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const ROLE_NAMES = ['buyer', 'vendor', 'agency'];
const ROLE_TITLES = ['buyer', 'nonprofit', 'seller'];

const theme = createMuiTheme({
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
    width: '100%',
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
  underlinedSubtitleText: {
    textDecoration: 'underline',
    textDecorationColor: '#53AA48',
    fontWeight: 'bold',
    marginBottom: '2%',

  },
  subtitleText: {
    textAlign: 'left',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  labelText: {
    fontWeight: 'bold',
  },
  grayButton: {
    backgroundColor: '#5e5e5e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5e5e5e',
    },
  },
  textBox: {
    width: '70%',
  },
  stepper: {
    margin: 'auto',
    width: '60%',
  },
  icon: {
    color: 'red !important',
  },
});

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  org: '',
  phone: '',
  zipcode: '',
  comments: '',
};

const STEPS = ['Step 1', 'Step 2', 'Step 3', 'Confirmation'];

// TODO: Implement popup so when the user presses 'next' at step 3, there is a confirmation message
export default function SignUpScreen() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  // Role mappings: 0 -> Buyer, 1 -> Agency, 2 -> Seller
  const [role, setRole] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const classes = useStyles();

  const handleChange = useCallback((event) => {
    event.preventDefault();
    if (errorMsg === 'Error: That email is already in use' && event.currentTarget.name === 'email') {
      setErrorMsg('');
    }
    setFormState(
      {
        ...formState,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    );
  }, [formState, setFormState, errorMsg]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    let res = null;
    let regApproval = '';
    if (role === 0) {
      regApproval = 'approved';
    } else {
      regApproval = 'unapproved';
    }
    try {
      res = signupUser(formState.email, formState.password,
        ROLE_NAMES[role],
        formState.org, parseInt(formState.zipcode, 10), `${formState.firstName} ${formState.lastName}`,
        formState.phone, formState.comments, regApproval);
      res.then((result) => {
        if (result.body.success === false) {
          if (result.body.message === 'User exists') {
            setErrorMsg('Error: That email is already in use');
          } else {
            setErrorMsg(`Error: ${result.body.message}`);
          }
          setCurrentStep(2);
        } else {
          setFormState(INITIAL_FORM_STATE);
          setCurrentStep(currentStep + 1);
        }
      });
    } catch (err) {
      if (err) {
        setErrorMsg(err);
      }
    }
    setLoading(false);
  }, [formState, role, currentStep]);

  const handleDone = useCallback(() => {
    history.push('/');
  }, []);

  const onNext = useCallback(() => {
    if (currentStep >= 3) {
      setCurrentStep(4);
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, role]);

  const onPrev = useCallback(() => {
    if (currentStep <= 1) {
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const roleChange = useCallback((event) => {
    event.preventDefault();
    setRole(parseInt(event.currentTarget.value, 10));
    setCurrentStep(currentStep + 1);
  }, [currentStep, role]);

  const isMatchingPasswordInputs = useMemo(() => (
    formState.password !== formState.confirmPassword
      || formState.password === ''
      || formState.email === ''
  ),
  [formState]);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const repeatPwdGenerateErrorMsg = useMemo(() => {
    let msg = '';
    if (formState.password === '' && formState.confirmPassword === '') {
      msg = '';
    } else if (formState.password !== '' && formState.confirmPassword !== '') {
      if (formState.password !== formState.confirmPassword) {
        msg = "Passwords don't match!";
      }
    }
    if (formState.email !== '' && !validateEmail(formState.email)) {
      msg = 'Email is not valid';
    }
    return msg;
  },
  [formState]);

  function isNumeric(str) {
    if (typeof str !== 'string') return false;
    return !Number.isNaN(str)
    && !Number.isNaN(parseFloat(str));
  }

  const step3EmptyInputCheck = useMemo(() => (
    formState.zipcode === '' || formState.firstName === ''
      || formState.lastName === '' || formState.org === '' || formState.phone === ''
  ),
  [formState]);

  const validPhoneAndZipcodeCheck = useMemo(() => {
    let msg = '';
    if (formState.zipcode !== '' && (!isNumeric(formState.zipcode) || formState.zipcode.length !== 5)) {
      msg = 'Location (zipcode) should hold a five digit number!';
    }
    if (formState.phone !== '' && !isNumeric(formState.phone)) {
      msg = 'Phone should be a number!';
    }
    return msg;
  },
  [formState]);

  return [
    <Box mt={5} mb={5}>
      <Container component="main" maxWidth="md">
        <div>
          <ThemeProvider theme={theme}>
            {(currentStep === 1 || currentStep === 4) && (
            <Typography className={classes.labelText} color="textPrimary" gutterBottom variant="h4" align="center">
              Sign Up
            </Typography>
            )}
            {(currentStep === 2 || currentStep === 3) && (
            <Typography color="textPrimary" gutterBottom variant="h4" align="center">
              Sign up as a&nbsp;
              <span className={classes.underlinedSubtitleText}>
                {ROLE_TITLES[role]}
              </span>
              {(role === 1)
                && (
                <>
                  &nbsp;or&nbsp;
                  <span className={classes.underlinedSubtitleText}>
                    agency
                  </span>
                </>
                )}
            </Typography>
            )}
          </ThemeProvider>
          <Stepper activeStep={currentStep - 1} alternativeLabel className={classes.stepper}>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <form
            className={classes.form}
          >
            <Grid
              container
              align="center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12}>
                <Step1
                  currentStep={currentStep}
                  classes={classes}
                  roleChange={roleChange}
                />
              </Grid>
              <Container maxWidth="sm">
                <Grid item xs={12}>
                  <Step2
                    currentStep={currentStep}
                    formState={formState}
                    classes={classes}
                    handleChange={handleChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    errorMsg={errorMsg}
                    repeatPwdGenerateErrorMsg={repeatPwdGenerateErrorMsg}
                    isMatchingPasswordInputs={isMatchingPasswordInputs}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step3
                    currentStep={currentStep}
                    formState={formState}
                    classes={classes}
                    role={role}
                    handleChange={handleChange}
                    onPrev={onPrev}
                    handleSubmit={handleSubmit}
                    errorMsg={errorMsg}
                    validPhoneAndZipcodeCheck={validPhoneAndZipcodeCheck}
                    step3EmptyInputCheck={step3EmptyInputCheck}
                    loading={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step4
                    currentStep={currentStep}
                    classes={classes}
                    role={role}
                    handleDone={handleDone}
                  />
                </Grid>
              </Container>
            </Grid>
          </form>
        </div>
      </Container>
    </Box>,
  ];
}
