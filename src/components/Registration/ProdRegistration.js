import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme, useTheme } from '@material-ui/core/styles';
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
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import Airtable from 'airtable';
import { history, store } from '../../lib/redux/store';
import Fruit4 from '../../assets/images/Fruit4.svg';
import Fruit1 from '../../assets/images/Fruit1.svg';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

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

// The spaces before the terms, are for formatting purposes
const MARKETS = [
  'SM',
  'SM/SF',
  'NO MRKT',
  'WH/SALE',
  'Salinas',
  'Fresno',
  'Madera',
  'Kern',
  'Kings',
  'Kern County',
  'Fresno/Tulare',
  'Bakersfield',
  'Hollywood',
  'Other',
];

const PRACTICES = [
  'Organic Certified',
  'Organic Non-Certified',
  'Biodynamic',
  'Regenerative Farming Practices',
  'Dry-Farmed',
  'No-Till',
  'Mono-Culture',
  'Other',
];

const OPDEMOGRAPHICS = [
  'Black Owned',
  'BIPOC Owned',
  'Women Owned',
  'Non-Binary/LGBTQIA Owned',
  'First Generation Owned',
  'Latinx Owned',
  'Other',
];

const PICKUP = [
  'Roll Up',
  'Warehouse',
  'Loading Dock',
  'Pallet Jack',
  'Lift Gate',
  'Other',
];

const FARMSIZE = [
  'Small',
  'Mid-size',
  'Large',
  'Large AG',
  'Other',
];

const INITIAL_FORM_STATE = {
  contactName: '',
  farmName: '',
  email: '',
  phone: '',
  county: '',
  website: '',
  addOne: '',
  addTwo: '',
  additionalContact: '',
  market: [],
  additionalComments: '',
  password: '',
  confirmPassword: '',
  org: '',
  zipcode: '',
  comments: '',
  userID: '',
  farmSize: '',
  farmPractices: [],
  opDemographic: [],
  farmDesc: '',
  pickup: [],
  paca: false,
  delivery: false,
  coldChain: false,
  startTime: '',
  endTime: '',
};

const useStyles = makeStyles({
  form: {
    width: '100%',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: '35px',
    color: '#53AA48',
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
    paddingBottom: '3%',
  },
  valueText: {
    paddingLeft: '10%',
  },
  blackButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#53AA48',
    border: '#53AA48',
    color: '#53AA48',
    '&:hover': {
      backgroundColor: '#FFFFFF',
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
  greenButtonSmall: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#53AA48',
    },
    marginTop: '10%',
    width: '50%',
  },
  submitButton: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#53AA48',
    },
  },
  stepper: {
    margin: 'auto',
    width: '60%',
  },
  smallButton: {
    color: 'white',
    background: '#53AA48',
    borderRadius: '6px',
  },
  formControl: {
    margin: 1,
    width: 550,
  },
  registrationFruit4: {
    position: 'absolute',
    right: '-10px',
    top: '160px',
    transform: 'matrix(0.7, 0.47, -0.42, 0.7, 0, 0)',
  },
  registrationFruit1: {
    position: 'absolute',
    right: '100px',
    top: '80px',
    transform: 'scale(0.8)',
  },
  confirmationFruit4: {
    position: 'absolute',
    right: '150px',
    top: '40px',
    transform: 'scale(0.6)',
  },
  confirmationFruit1: {
    position: 'absolute',
    right: '250px',
    top: '40px',
    transform: 'scale(0.8)',
  },
  picContainer: {
    position: 'relative',
  },
  emptyGrid: {
    height: '200px',
    position: 'relative',
  },
});

function getSteps() {
  return ['Step 1', 'Step 2', 'Step 3', 'Confirmation'];
}

export default function RegistrationScreen() {
  const reactTheme = useTheme();
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

  const handleBool = useCallback((event) => {
    setFormState(
      {
        ...formState,
        [event.target.name]: !((event.target.value === 'true')),
      },
    );
  }, [formState, setFormState]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    try {
      base('Farms').create([
        {
          fields: {
            'farm name': formState.farmName,
            'user id': [formState.userID],
            'contact name': formState.contactName,
            description: formState.farmDesc,
            email: formState.email,
            county: formState.county,

            'call during': `${formState.startTime}-${formState.endTime}`,
            website: formState.website,
            'phone string': Number(formState.phone),
            'address line 1': formState.addOne,
            'address line 2': formState.addTwo,
            'additional contact information': formState.additionalContact,
            'zip code': Number(formState.zipcode),
            market: formState.market,
            'farm size': formState.farmSize,
            'pick up options': formState.pickup,
            'PACA (Perishable Agricultural Commodities Act)': formState.paca,
            'operation type': formState.opDemographic,
            'farming practice type': formState.farmPractices,
            'able to deliver': formState.delivery,
            'cold chain capabilities': formState.coldChain,
            'additional comments': formState.additionalComments,
            approved: false,
          },
        },
      ], (err) => {
        if (err) {
          setErrorMsg(errorMsg.length === 0 ? err : `${errorMsg}`);
        } else {
          setErrorMsg('');
        }
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

  const routeChange = () => {
    const path = '/';
    history.push(path);
  };

  const onNext = useCallback(() => {
    if (currentStep >= 5) {
      setCurrentStep(5);
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

  const step2IsInvalid = useMemo(() => (
    formState.addOne === '' || formState.addTwo === ''
      || formState.additonalContact === '' || formState.socials === ''
  ),
  [formState]);

  const step3IsInvalid = useMemo(() => (
    formState.farmSize === '' || formState.market === [] || formState.farmPractices === []
    || formState.opDemographic === [] || formState.farmDesc === '' || formState.pickup === []
  ),
  [formState]);

  const Step1Check = useMemo(() => {
    if (formState.taxID !== '' && !Number(formState.taxID)) {
      return 'Make sure your Tax ID is a number!';
    }
    return '';
  },
  [formState]);

  const steps = getSteps();
  return [
    <Box my={5}>
      <Container component="main" maxWidth="md">
        {(currentStep < 5) && (
        <div className={classes.picContainer}>
          <img src={Fruit4} className={classes.registrationFruit4} aria-hidden alt="" />
          <img src={Fruit1} className={classes.registrationFruit1} aria-hidden alt="" />

        </div>
        )}
        <div>
          <ThemeProvider theme={theme}>
            <Typography className={classes.titleText} align="center">
              Producer Registration Form
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
                    Step1Check={Step1Check}
                    classes={classes}
                    handleChange={handleChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    errorMsg={errorMsg}
                    reactTheme={reactTheme}
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
                    step2IsInvalid={step2IsInvalid}
                    loading={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step3
                    currentStep={currentStep}
                    formState={formState}
                    classes={classes}
                    handleChange={handleChange}
                    handleSelect={handleSelect}
                    onPrev={onPrev}
                    onNext={onNext}
                    errorMsg={errorMsg}
                    step3IsInvalid={step3IsInvalid}
                    loading={loading}
                    handleBool={handleBool}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step4
                    currentStep={currentStep}
                    formState={formState}
                    classes={classes}
                    handleChange={handleChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    onSelect={onSelect}
                    handleSubmit={handleSubmit}
                    errorMsg={errorMsg}
                    loading={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Step5
                    currentStep={currentStep}
                    routeChange={routeChange}
                    classes={classes}
                    onPrev={onPrev}
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
  currentStep, formState, classes, handleChange, onNext, errorMsg,
}) {
  if (currentStep !== 1) {
    return null;
  }
  return [
    <div className={classes.subtitleText}>
      Basic Contact Information
    </div>,
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          id="farmname"
          label="Farm Name"
          name="farmName"
          disabled
          value={formState.farmName}
        >
          {formState.farmName}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          name="zipcode"
          label="Location"
          id="location"
          value={formState.zipcode}
          disabled
        >
          {formState.zipcode}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          id="fullname"
          label="Contact Name"
          name="contactName"
          value={formState.contactName}
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
          id="county"
          name="county"
          placeholder="County"
          value={formState.county}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={2}>
        <InputLabel id="time-label">Call During</InputLabel>
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="time"
          labelId="time-label"
          name="startTime"
          onChange={handleChange}
          type="time"
          defaultValue="00:00"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          value={formState.startTime}
        />
      </Grid>
      <Grid item xs={1}>
        ~
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="time"
          name="endTime"
          onChange={handleChange}
          type="time"
          defaultValue="12:00"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          value={formState.endTime}
        />
      </Grid>
      {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}

      <Grid item xs={12}>
        <Button
          className={classes.greenButtonSmall}
          type="button"
          onClick={onNext}
          color="primary"
          variant="contained"
          center
        >
          Next
        </Button>
      </Grid>
    </Grid>,
  ];
}

function Step2({
  currentStep, formState, classes, handleChange, onPrev, errorMsg,
  step2IsInvalid, loading, onNext,
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
          id="website"
          name="website"
          placeholder="Website"
          value={formState.website}
          onChange={handleChange}
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
          disabled={step2IsInvalid || loading}
        >
          Next
        </Button>
      </Grid>
    </Grid>,
  ];
}

function Step3({
  currentStep, formState, classes, handleChange, onPrev, errorMsg,
  step3IsInvalid, loading, onNext, handleSelect, handleBool,
}) {
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
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="mutiple-name-label">Market</InputLabel>
          <Select
            id="demo-mutiple-name"
            multiple
            value={formState.market}
            onChange={handleSelect}
            input={<Input />}
            MenuProps={MenuProps}
            name="market"
            label="Population Served"
            required
          >
            {MARKETS.map((market) => (
              <MenuItem
                key={market}
                value={market}
              >
                {market}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="single-name-label">Farm Size</InputLabel>
          <Select
            labelId="simple-select-label"
            id="demo-single-name"
            value={formState.farmSize}
            onChange={handleSelect}
            name="farmSize"
            label="Farm Size"
            placeholder="Farm Size"
            required
            fullWidth
          >
            {FARMSIZE.map((size) => (
              <MenuItem
                key={size}
                value={size}
              >
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="mutiple-name-label">Farming Practices</InputLabel>
          <Select
            id="demo-mutiple-name"
            multiple
            value={formState.farmPractices}
            onChange={handleSelect}
            input={<Input />}
            MenuProps={MenuProps}
            name="farmPractices"
            label="Population Served"
            required
          >
            {PRACTICES.map((p) => (
              <MenuItem
                key={p}
                value={p}
              >
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="mutiple-name-label">Ownership and Operation</InputLabel>
          <Select
            id="demo-mutiple-name"
            multiple
            value={formState.opDemographic}
            onChange={handleSelect}
            input={<Input />}
            MenuProps={MenuProps}
            name="opDemographic"
            label="Ownership and Operation"
          >
            {OPDEMOGRAPHICS.map((o) => (
              <MenuItem
                key={o}
                value={o}
              >
                {o}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="farmDesc"
          name="farmDesc"
          placeholder="300 Characters Max"
          label="Farm Description"
          value={formState.farmDesc}
          onChange={handleChange}
          multiline
          rows={4}
          rowsMax={4}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="mutiple-name-label">Pick-Up Options</InputLabel>
          <Select
            id="demo-mutiple-name"
            multiple
            value={formState.pickup}
            onChange={handleSelect}
            input={<Input />}
            MenuProps={MenuProps}
            name="pickup"
            label="Pick-Up Options"
          >
            {PICKUP.map((p) => (
              <MenuItem
                key={p}
                value={p}
              >
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="paca" value={formState.paca} onChange={handleBool} />}
            label="PACA"
          />
          <FormControlLabel
            control={<Checkbox name="delivery" value={formState.delivery} onChange={handleBool} />}
            label="Able to Deliver Products"
          />
          <FormControlLabel
            control={<Checkbox name="coldChain" value={formState.coldChain} onChange={handleBool} />}
            label="Cold Chain Capabilities"
          />
        </FormGroup>
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
          Next
        </Button>
      </Grid>
    </Grid>,
  ];
}

function Step4({
  currentStep, formState, classes, onPrev, handleSubmit,
  onSelect,
}) {
  if (currentStep !== 4) {
    return null;
  }
  const fields = [
    {
      heading: 'Basic Contact Information',
      page: 1,
      body: [
        { name: 'Farm Name', value: formState.farmName },
        { name: 'Farm Location', value: formState.zipcode },
        { name: 'Contact Name', value: formState.contactName },
        { name: 'Phone', value: formState.phone },
        { name: 'Email', value: formState.email },
        { name: 'County', value: formState.county },
        { name: 'Call During', value: `${formState.startTime}~${formState.endTime}` },
      ],
    },
    {
      heading: 'Additional Contact Information',
      page: 2,
      body: [
        { name: 'Website', value: formState.website },
        { name: 'Address Line 1', value: formState.addOne },
        { name: 'Address Line 2', value: formState.addTwo },
        { name: 'Additional Contact', value: formState.additionalContact },
      ],
    },
    {
      heading: 'Additional Contact Information',
      page: 3,
      body: [
        { name: 'Market', value: formState.market.join() },
        { name: 'Farm Size', value: formState.farmSize },
        { name: 'Farming Practice', value: formState.farmPractices.join() },
        { name: 'Ownership & Operation', value: formState.opDemographic.join() },
        { name: 'Farm Description', value: formState.farmDesc },
        { name: 'Pickup Options', value: formState.pickup.join() },
        { name: 'PACA', value: (formState.paca ? 'Yes' : 'No') },
        { name: 'Able to Deliver', value: (formState.delivery ? 'Yes' : 'No') },
        { name: 'Cold Chain', value: (formState.coldChain ? 'Yes' : 'No') },
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

function Step5({
  currentStep, routeChange, classes, onPrev,
}) {
  if (currentStep !== 5) {
    return null;
  }
  return [
    <div>
      <div className={classes.cenSubtitleText}>
        Registration Completed!
      </div>
      <div>
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
          <img src={Fruit4} className={classes.confirmationFruit4} aria-hidden alt="" />
          <img src={Fruit1} className={classes.confirmationFruit1} aria-hidden alt="" />
        </div>
      </Grid>

      <Grid item xs={6}>
        <Button
          type="button"
          className={classes.submitButton}
          color="primary"
          variant="contained"
          style={{ backgroundColor: '#53AA48' }}
          onClick={routeChange}
          fullWidth
        >
          Back To Home
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          type="button"
          className={classes.submitButton}
          color="primary"
          variant="contained"
          style={{ backgroundColor: '#53AA48' }}
          onClick={onPrev}
          fullWidth
        >
          Add a Farm
        </Button>
      </Grid>
    </Grid>,
  ];
}
