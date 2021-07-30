import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {
  Button,
  Typography,
  Grid,
  TextField,
  Container,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@material-ui/core';

import { base } from '../../lib/airtable/airtable';
import { history, store } from '../../lib/redux/store';

import Fruit2 from '../../assets/images/Fruit2.svg';
import Fruit3 from '../../assets/images/Fruit3.svg';

const theme = createMuiTheme({
  spacing: 4,
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

const POPULATIONS = [
  'Serves Black',
  'Serves BIPOC',
  'Serves LGBTQIA+',
  'Serves Senior',
  'Serves Latinx',
  'Serves Asian and Pacific Islander',
  'Serves Unhoused',
];

const useStyles = makeStyles({
  form: {
    width: '100%',
  },
  titleText: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '35px',
    color: '#2D5496',
  },
  underlinedSubtitleText: {
    fontFamily: 'Work Sans',
    textDecoration: 'underline',
    textDecorationColor: '#2D5496',
    fontWeight: 'bold',
    marginBottom: '5%',
    marginTop: '5%',
  },
  subtitleText: {
    fontFamily: 'Work Sans',
    textAlign: 'left',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  regSubtitleText: {
    fontFamily: 'Work Sans',
    textAlign: 'left',
    marginBottom: '7%',
  },
  cenSubtitleText: {
    fontFamily: 'Work Sans',
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  labelText: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    paddingBottom: '3%',
  },
  valueText: {
    fontFamily: 'Work Sans',
    paddingLeft: '10%',
  },
  plainText: {
    fontFamily: 'Work Sans',
  },
  blackButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#2D5496',
    border: '#2D5496',
    color: '#2D5496',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    marginTop: '10%',
  },
  greenButton: {
    backgroundColor: '#2D5496',
    '&:hover': {
      backgroundColor: '#2D5496',
    },
    marginTop: '10%',
  },
  greenButtonSmall: {
    backgroundColor: '#2D5496',
    '&:hover': {
      backgroundColor: '#2D5496',
    },
    marginTop: '10%',
    width: '50%',
  },
  submitButton: {
    backgroundColor: '#2D5496',
    '&:hover': {
      backgroundColor: '#2D5496',
    },
    width: '50%',
  },
  stepper: {
    margin: 'auto',
    width: '60%',
  },
  smallButton: {
    color: 'white',
    background: '#2D5496',
    borderRadius: '6px',
  },
  formControl: {
    margin: 1,
    width: 550,
  },
  registrationFruit2: {
    position: 'absolute',
    right: '-10px',
    top: '160px',
    transform: 'matrix(0.7, 0.47, -0.42, 0.7, 0, 0)',
  },
  registrationFruit3: {
    position: 'absolute',
    right: '0px',
    top: '60px',
    transform: 'scale(0.6)',
  },
  confirmationFruit2: {
    position: 'absolute',
    right: '150px',
    top: '100px',
    transform: 'matrix(0.7, 0.47, -0.42, 0.7, 0, 0)',
  },
  confirmationFruit3: {
    position: 'absolute',
    right: '170px',
    top: '0px',
    transform: 'scale(0.6)',
  },
  picContainer: {
    position: 'relative',
  },
  emptyGrid: {
    height: '200px',
    position: 'relative',
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
  zipcode: '',
  popServed: [],
  userID: '',
};

function getSteps() {
  return ['Step 1', 'Step 2', 'Confirmation'];
}

export default function RegistrationScreen() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const classes = useStyles();

  useEffect(() => {
    base('Users').find(store.getState().userData.user.fields['user id']).then((record) => {
      setFormState(
        {
          ...formState,
          agencyName: record.fields.organization,
          zipcode: record.fields.zipcode,
          contactName: record.fields['contact name'],
          phone: record.fields.phone,
          email: record.fields.username,
          userID: record.fields['user id'],
        },
      );
    });
  }, []);

  const handleChange = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    );
  }, [formState, setFormState]);

  const handleSelect = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  }, [formState, setFormState]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      base('Agencies').create([
        {
          fields: {
            'contact name': formState.contactName,
            'agency name': formState.agencyName,
            'federal tax id': Number(formState.taxID),
            'user id': [formState.userID],
            phone: formState.phone,
            email: formState.email,
            website: formState.website,
            'address line 1': formState.addOne,
            'address line 2': formState.addTwo,
            zipcode: Number(formState.zipcode),
            'social media': formState.socials,
            'additional comments': formState.additionalComments,
            'population served': formState.popServed,
            'additional contact information': formState.additionalContact,
          },
        },
      ], (err) => {
        setErrorMsg(err);
      });
    } catch (err) {
      if (err) {
        setErrorMsg(err);
      }
    }
    if (errorMsg) {
      setErrorMsg('Please choose a different email!');
      setLoading(false);
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [formState, currentStep]);

  const homeRedirect = () => {
    const path = '/';
    history.push(path);
  };

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

  const onSelectStep = useCallback((step) => {
    if (step >= 1 && step <= 3) {
      setCurrentStep(step);
    }
  }, [currentStep]);

  const step3IsInvalid = useMemo(() => (
    formState.addOne === ''
  ),
  [formState]);

  const federalTaxIDCheck = useMemo(() => {
    if (formState.taxID !== '' && (!Number(formState.taxID) || formState.taxID.length !== 9)) {
      return 'Make sure your Tax ID is a nine digit number!';
    }
    return '';
  },
  [formState]);

  const step1IsInvalid = useMemo(() => (
    formState.taxID === '' || !Number(formState.taxID)
  ),
  [formState]);

  const steps = getSteps();
  return [
    <Box my={5}>
      <Container component="main" maxWidth="md">
        {(currentStep < 4) && (
        <div className={classes.picContainer}>
          <img src={Fruit2} className={classes.registrationFruit2} aria-hidden alt="" />
          <img src={Fruit3} className={classes.registrationFruit3} aria-hidden alt="" />

        </div>
        )}
        <div>
          <ThemeProvider theme={theme}>
            <Typography className={classes.titleText} align="center">
              Agency Registration Form
            </Typography>
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
                    federalTaxIDCheck={federalTaxIDCheck}
                    step1IsInvalid={step1IsInvalid}
                    classes={classes}
                    handleChange={handleChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    errorMsg={errorMsg}
                    handleSelect={handleSelect}
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
                    errorMsg={errorMsg}
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
                    onSelectStep={onSelectStep}
                    handleSubmit={handleSubmit}
                    errorMsg={errorMsg}
                    step3IsInvalid={step3IsInvalid}
                    loading={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step4
                    currentStep={currentStep}
                    homeRedirect={homeRedirect}
                    classes={classes}
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

function Step1({
  currentStep, formState, classes, handleChange, onNext, errorMsg, handleSelect,
  federalTaxIDCheck, step1IsInvalid,
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
          fullWidth
          id="agencyname"
          label="Legal Agency Name"
          name="agencyname"
          variant="filled"
          disabled
          value={formState.agencyName}
        >
          {formState.agencyName}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="zipcode"
          label="Location"
          id="location"
          value={formState.zipcode}
          variant="filled"
          disabled
        >
          {formState.zipcode}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="fullname"
          label="Contact Name"
          name="contactName"
          value={formState.contactName}
          variant="filled"
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
          fullWidth
          id="website"
          label="Website"
          name="website"
          value={formState.website}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="mutiple-name-label">Population Served</InputLabel>
          <Select
            id="demo-mutiple-name"
            multiple
            value={formState.popServed}
            onChange={handleSelect}
            input={<Input />}
            MenuProps={MenuProps}
            name="popServed"
            label="Population Served"
          >
            {POPULATIONS.map((peoples) => (
              <MenuItem
                key={peoples}
                value={peoples}
              >
                {peoples}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
      {federalTaxIDCheck && <Grid item xs={12} className="error-msg">{federalTaxIDCheck}</Grid>}

      <Grid item xs={12}>
        <Button
          className={classes.greenButtonSmall}
          type="button"
          onClick={onNext}
          color="primary"
          variant="contained"
          center
          disabled={step1IsInvalid}
        >
          Next
        </Button>
      </Grid>
    </Grid>,
  ];
}

function Step2({
  currentStep, formState, classes, handleChange, onPrev, errorMsg,
  step3IsInvalid, loading, onNext,
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
          fullWidth
          id="phone"
          label="Phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          variant="filled"
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          variant="filled"
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
          label="Address Line 1"
          value={formState.addOne}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          id="add2"
          name="addTwo"
          placeholder="Address Line 2"
          label="Address Line 2"
          value={formState.addTwo}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          id="additionalContact"
          name="additionalContact"
          placeholder="Additional Contact Information"
          label="Additional Contact Information"
          value={formState.additionalContact}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          id="socials"
          name="socials"
          placeholder="Social Media"
          label="Social Media"
          value={formState.socials}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          id="additionalComments"
          name="additionalComments"
          placeholder="Additional Comments"
          label="Additional Comments"
          value={formState.additionalComments}
          onChange={handleChange}
          rows={3}
          multiline
        />
      </Grid>
      {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}

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
  currentStep, formState, classes, onPrev, handleSubmit,
  onSelectStep,
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
        { name: 'Population Served', value: formState.popServed.join() },
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
            <Button className={classes.smallButton} onClick={() => onSelectStep(field.page)}>
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
          onClick={handleSubmit}
          fullWidth
          color="primary"
          variant="contained"
        >
          Finish
        </Button>
      </Grid>
    </Grid>,
  ];
}

function Step4({
  currentStep, homeRedirect, classes,
}) {
  if (currentStep !== 4) {
    return null;
  }
  return [
    <div>
      <div className={classes.cenSubtitleText}>
        Registration Completed!
      </div>
      <div className={classes.plainText}>
        We have set up your profile linked to your account.
      </div>
    </div>,
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      <Grid item xs={12}>
        <div className={classes.emptyGrid}>
          <img src={Fruit2} className={classes.confirmationFruit2} aria-hidden alt="" />
          <img src={Fruit3} className={classes.confirmationFruit3} aria-hidden alt="" />
        </div>
      </Grid>

      <Grid item xs={12}>
        <Box mt={5}>
          <Button
            type="button"
            className={classes.submitButton}
            color="primary"
            variant="contained"
            style={{ backgroundColor: '#2D5496' }}
            onClick={homeRedirect}
          >
            Back To Home
          </Button>
        </Box>
      </Grid>
    </Grid>,
  ];
}
