/* eslint-disable no-unused-vars */
// NOTES:
// 1. I think its better if we just replace all the location fields
// with explicitly labeled zipcode fields.
// 2. I think you can use InputLabel from MUI to actually label your text boxes etc.
import React, { useMemo, useState, useCallback } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Grid,
  TextField,
  Container,
  Paper,
  // CardMedia,
  // CardContent,
  // CardActionArea,
  // Card,
  Box,
} from '@material-ui/core';

// const ROLE_TITLES = ['buyer', 'nonprofit', 'seller'];

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
    marginBottom: '5%',
    marginTop: '5%',
  },
  subtitleText: {
    textAlign: 'left',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  regSubtitleText: {
    textAlign: 'left',
    // paddingLeft: '10%',
    // fontSize: '30px',
    marginBottom: '7%',
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
  labelText: {
    fontWeight: 'bold',
  },
  valueText: {
    paddingLeft: '10%',
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
    marginTop: '10%',
  },
  greenButton: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#53AA48',
    },
    marginTop: '10%',
  },
  submitButton: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#53AA48',
    },
    width: '50%',
  },
  textBox: {
    width: '70%',
  },
  card: {
    margin: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'FFFFFF',
    borderRadius: '15px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
  },
  stepper: {
    margin: 'auto',
    width: '60%',
  },
  icon: {
    color: 'red !important',
  },
  testRoot: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  smallButton: {
    // position: 'absolute',
    // width: '104px',
    // height: '33px',
    // left: '1195px',
    // top: '557px',
    // width: '30px',
    /* Web/Navy Blue Accent */
    color: 'white',
    background: '#2D5496',
    borderRadius: '6px',
  },
});

const INITIAL_FORM_STATE = {
  contactName: '',
  agencyName: '',
  taxID: '',
  website: '',
  email: '',
  phone: '',
  addOne: '',
  addTwo: '',
  additionalContact: '',
  socials: '',
  additionalComments: '',
  password: '',
  confirmPassword: '',
  org: '',
  zipcode: '',
  comments: '',
};

function getSteps() {
  return ['Step 1', 'Step 2', 'Confirmation'];
}

// TODO: Implement popup so when the user presses 'next' at step 3, there is a confirmation message
export default function RegistrationScreen() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  // Role mappings: 0 -> Buyer, 1 -> Agency, 2 -> Seller
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const classes = useStyles();

  const handleChange = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    );
  }, [formState, setFormState]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // res = signupUser(formState.email, formState.password,
      //   ROLE_NAMES[role],
      //   formState.org, parseInt(formState.zipcode, 10),
      // `${formState.firstName} ${formState.lastName}`,
      //   formState.phone, formState.comments);
      setErrorMsg('');
    } catch (err) {
      console.log('error 1');
      if (err) {
        console.log('error 2');
        setErrorMsg(err);
      }
    }

    if (errorMsg) {
      setErrorMsg('Please choose a different email!');
      setLoading(false);
    } else {
      setFormState(INITIAL_FORM_STATE);
      setCurrentStep(currentStep + 1);
    }
  }, [formState, currentStep]);

  const onNext = useCallback(() => {
    if (currentStep >= 3) {
      setCurrentStep(4);
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, formState]);

  const onPrev = useCallback(() => {
    if (currentStep <= 1) {
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const onSelect = useCallback((step) => {
    if (step >= 1 && step <= 3) {
      setCurrentStep(step);
    }
  }, [currentStep]);

  // const isMatchingPasswordInputs = useMemo(() => (
  //   formState.password !== formState.confirmPassword
  //     || formState.password === ''
  //     || formState.email === ''
  // ),
  // [formState]);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const repeatPwdCheck = useMemo(() => {
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

  const step3IsInvalid = useMemo(() => (
    formState.addOne === '' || formState.addTwo === ''
      || formState.additonalContact === '' || formState.socials === ''
  ),
  [formState]);

  const step3Check = useMemo(() => {
    let msg = '';
    if (formState.zipcode !== '' && (!isNumeric(formState.zipcode) || formState.zipcode.length !== 5)) {
      msg = 'Location (zipcode) should hold a five digit number!';
    }
    if (formState.phone !== '' && !isNumeric(formState.phone)) {
      msg = 'Phone should be a number!';
    }
    // console.log(loading);
    // console.log(step3IsInvalid);
    // console.log(isNumeric('12'));
    // console.log(isNumeric('hello'));
    // console.log(formState.zipcode);
    // console.log(isNumeric(formState.zipcode));
    return msg;
  },
  [formState]);

  function Step4() {
    if (currentStep !== 4) {
      return null;
    }
    return [
      <div>
        <div className={classes.cenSubtitleText}>
          Account Created!
        </div>
        <div className={classes.cenRegSubtitleText}>
          Farm2People will be in touch with you shortly.
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
              onClick={onPrev}
            >
              Done
            </Button>
          </Box>
        </Grid>
      </Grid>,
    ];
  }

  const steps = getSteps();
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
              Agency Registration Form
            </Typography>
            )}
          </ThemeProvider>
          <Stepper activeStep={currentStep - 1} alternativeLabel className={classes.stepper}>
            {steps.map((label) => (
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
              <Container maxWidth="sm">
                <Grid item xs={12}>
                  <Step1
                    currentStep={currentStep}
                    formState={formState}
                    classes={classes}
                    handleChange={handleChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    errorMsg={errorMsg}
                    repeatPwdCheck={repeatPwdCheck}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step2
                    currentStep={currentStep}
                    formState={formState}
                    classes={classes}
                    handleChange={handleChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    handleSubmit={handleSubmit}
                    errorMsg={errorMsg}
                    step3Check={step3Check}
                    step3IsInvalid={step3IsInvalid}
                    loading={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step3
                    currentStep={currentStep}
                    formState={formState}
                    classes={classes}
                    handleChange={handleChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    onSelect={onSelect}
                    handleSubmit={handleSubmit}
                    errorMsg={errorMsg}
                    step3Check={step3Check}
                    step3IsInvalid={step3IsInvalid}
                    loading={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step4 />
                </Grid>
              </Container>
            </Grid>
          </form>
        </div>
      </Container>
    </Box>,
  ];
}

function Step1({
  currentStep, formState, classes, handleChange, onNext, errorMsg,
}) {
  if (currentStep !== 1) {
    return null;
  }
  return [
    <div className={classes.subtitleText}>
      Basic Information
    </div>,
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="agencyname"
          label="Agency Name"
          name="agencyname"
          disabled
        >
          {formState.agencyName}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="location"
          label="Location"
          id="location"
          disabled
        >
          {formState.zipcode}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="fullname"
          label="Contact Name"
          name="agencyname"
          disabled
        >
          {formState.contactName}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="taxid"
          label="Federal Tax ID"
          name="taxID"
          value={formState.taxID}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="website"
          label="Website"
          name="website"
          value={formState.website}
          onChange={handleChange}
        />
      </Grid>
      {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
      <Grid item xs={12} sm={6}>
        <Button
          className={classes.greenButton}
          type="button"
          onClick={onNext}
          fullWidth
          color="primary"
          variant="contained"
          // disabled={}
        >
          Next
        </Button>
      </Grid>
    </Grid>,
  ];
}

function Step2({
  currentStep, formState, classes, handleChange, onPrev, handleSubmit, errorMsg,
  step3Check, step3IsInvalid, loading, onNext,
}) {
  if (currentStep !== 2) {
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
          variant="outlined"
          required
          fullWidth
          id="phone"
          label="Phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="add1"
          name="addOne"
          placeholder="Address Line 1"
          value={formState.addOne}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="add2"
          name="addTwo"
          placeholder="Address Line 2"
          value={formState.addTwo}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="additionalContact"
          name="additionalContact"
          placeholder="Additional Contact Information"
          value={formState.additionalContact}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="socials"
          name="socials"
          placeholder="Social Media"
          value={formState.socials}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="additionalComments"
          name="additionalComments"
          placeholder="Additional Comments"
          value={formState.additionalComments}
          onChange={handleChange}
          rows={3}
          multiline
        />
      </Grid>
      {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
      {step3Check && <Grid item xs={12} className="error-msg">{step3Check}</Grid>}

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
          disabled={step3IsInvalid || loading}
        >
          Finish
        </Button>
      </Grid>
    </Grid>,
  ];
}

function Step3({
  currentStep, formState, classes, handleChange, onNext, errorMsg, onPrev,
  onSelect,
}) {
  if (currentStep !== 3) {
    return null;
  }
  const fields = [
    {
      heading: 'Basic Information',
      page: 1,
      body: [
        { name: 'Agency Name', value: formState.agencyName },
        { name: 'Agency Location', value: formState.zipcode },
        { name: 'Contact Name', value: formState.contactName },
        { name: 'EIN', value: formState.taxID },
        { name: 'Website', value: formState.website },
      ],
    },
    {
      heading: 'Contact Information',
      page: 2,
      body: [
        { name: 'Email', value: formState.email },
        { name: 'Phone', value: formState.phone },
        { name: 'Address Line 1', value: formState.addOne },
        { name: 'Address Line 2', value: formState.addTwo },
        { name: 'Additional Contact', value: formState.additionalContact },
        { name: 'Social Media', value: formState.socials },
        { name: 'Additional Comments', value: formState.additionalComments },
      ],
    },
  ];

  return [
    <div className={classes.subtitleText}>
      Confirmation
    </div>,
    <div className={classes.regSubtitleText}>
      Please confirm that the information about your agency is correct.
    </div>,
    <Grid container spacing={2}>
      {fields.map((field) => (
        <>
          <Grid item container direction="column" align="left" xs={12} sm={9}>
            <Typography gutterBottom className={classes.underlinedSubtitleText}>
              {field.heading}
            </Typography>
            <Grid container align="left">
              {field.body.map((info) => (
                <React.Fragment key={info.name}>
                  <Grid item xs={5}>
                    <Typography gutterBottom className={classes.labelText}>{info.name}</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography gutterBottom className={classes.valueText}>{info.value}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3} align="right">
            <Button className={classes.smallButton} onClick={() => onSelect(field.page)}>
              Edit
            </Button>
          </Grid>
        </>
      ))}
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
          // disabled={step3IsInvalid || loading}
        >
          Finish
        </Button>
      </Grid>
    </Grid>,
    // <Grid container spacing={1} className={classes.testRoot}>
    //   <Grid container item xs={12} spacing={3}>
    //     <HeadingRow classes={classes} />
    //   </Grid>
    //   <Grid container item xs={12} spacing={3}>
    //     <FormRow />
    //   </Grid>
    //   <Grid container item xs={12} spacing={3}>
    //     <FormRow />
    //   </Grid>
    // </Grid>,
  ];
}
