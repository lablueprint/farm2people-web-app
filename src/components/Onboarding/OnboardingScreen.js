/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
// import './Onboarding.css';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
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

const BUTTONS = [
  { id: 0, title: 'Buyer' },
  { id: 1, title: 'non-profit / agency' },
  { id: 2, title: 'seller' },
];

const styles = ((theme) => ({
  formGroup: {
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
    fontSize: '80px',
    textDecoration: 'underline',
    textDecorationColor: '#373737',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#373737',
      contrastText: '#fff',
    },
    secondary: {
      main: '#5e5e5e',
      contrastText: '#fff',
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
  },
});

const otherTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#53AA48',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
    },
  },
});

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

class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      value: -1,
      formFields: {
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
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    console.log(value);
  }

  handleButton(button) {
    this.setState({
      value: button,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { formFields } = this.state;
  }

  next() {
    console.log('clicked');
    let { currentStep } = this.state;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep,
    });
  }

  prev() {
    let { currentStep } = this.state;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep,
    });
  }

  /*
  * the functions for our button
  */
  previousButton() {
    const { currentStep } = this.state;
    if (currentStep !== 1) {
      return (
        <Button
          type="button"
          onClick={this.prev}
          fullwidth
          color="primary"
          variant="contained"
        >
          Previous
        </Button>
      );
    }
    return null;
  }

  nextButton() {
    const { currentStep } = this.state;
    if (currentStep < 3) {
      return (
        <Grid
          container
          spacing={1}
          alignItems="center"
        >
          <Grid item xs={12}>
            <Button
              type="button"
              onClick={this.next}
              fullwidth
              color="primary"
              variant="contained"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      );
    }
    return null;
  }

  render() {
    const {
      currentStep, value, formFields,
    } = this.state;
    const steps = getSteps();
    return [
      <Box mt={5} mb={5}>
        <Container component="main" maxWidth="xs">
          <div className={styles.paper}>
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
            {/* <div>
              <div>
                <Typography className={styles.instructions}>
                  {getStepContent(currentStep)}
                </Typography>
                <div>
                  <Button
                    disabled={currentStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </div> */}
            <form
              className={styles.form}
              onSubmit={this.handleSubmit}
            >
              <Grid
                container
                spacing={8}
                align="center"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <Step1
                    currentStep={currentStep}
                    handleChange={this.handleChange}
                    handleButton={this.handleButton}
                    value={value}
                    next={this.next}
                  />
                </Grid>
                <Step2
                  currentStep={currentStep}
                  handleChange={this.handleChange}
                  value={value}
                  formFields={formFields}
                  next={this.next}
                  prev={this.prev}
                />
                <Step3
                  currentStep={currentStep}
                  handleChange={this.handleChange}
                />
                {/* <ThemeProvider theme={otherTheme}>
                  <Grid item xs={12}>
                    {this.previousButton()}
                  </Grid>
                  <Grid item xs={12}>
                    {this.nextButton()}
                  </Grid>
                </ThemeProvider> */}
              </Grid>
            </form>
          </div>
        </Container>
      </Box>,
    ];
  }
}

function Step1({
  currentStep, handleChange, handleButton, value, next,
}) {
  if (currentStep !== 1) {
    return null;
  }
  return [
    <div>
      <p className={styles.paper}>
        Are you a...
      </p>
    </div>,
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      {BUTTONS.map((bt) => (
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
            <Button
              type="button"
              key={bt.id}
              fullWidth
              variant="contained"
              style={{ contrastText: '#fff' } && value === bt.id ? { backgroundColor: '#5e5e5e' } : { backgroundColor: '#373737' }}
              color="primary"
              onClick={() => handleButton(bt.id)}
            >
              {bt.title}
            </Button>
          </ThemeProvider>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box mt={5}>
          <Button
            type="button"
            onClick={next}
            fullWidth
            color="primary"
            variant="contained"
            style={{ backgroundColor: '#53AA48' }}
          >
            Next
          </Button>
        </Box>
      </Grid>
    </Grid>,
  ];
}

Step1.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Array).isRequired,
  next: PropTypes.func.isRequired,
};

function Step2({
  currentStep, handleChange, value, formFields, next, prev,
}) {
  if (currentStep !== 2) {
    return null;
  }
  return [
    <div className={styles.paper}>
      <p>
        Create your account
      </p>
    </div>,
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      {value === 0 && (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="fname"
              label="Name"
              name="formFields"
              placeholder="First Name"
              value={formFields.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lname"
              name="formFields"
              placeholder="Last Name"
              value={formFields.lastName}
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
          name="formFields"
          autoComplete="email"
          value={formFields.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="formFields"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formFields.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          type="password"
          fullWidth
          name="formFields"
          id="standard-password-input"
          value={formFields.confirmPassword}
          label="Confirm Password"
          onChange={handleChange}
          // disabled={loading}
        />
      </Grid>
      {value > 0 && (
        <>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="formFields"
              label={value === 1 ? 'Agency' : 'Farm Name'}
              placeholder={value === 1 ? 'Name of Agency/Nonprofit' : ''}
              value={value === 1 ? formFields.agency : formFields.farmName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="contact"
              name="formFields"
              value={formFields.contactName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="phone"
              name="formFields"
              value={formFields.phone}
              onChange={handleChange}
            />
          </Grid>
        </>
      )}
      {value === 2 && (
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="location"
            name="formFields"
            value={formFields.farmLocation}
            onChange={handleChange}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <Button
          type="button"
          onClick={prev}
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
          type="button"
          onClick={next}
          fullWidth
          color="primary"
          variant="contained"
          style={{ backgroundColor: '#53AA48' }}
        >
          Finish
        </Button>
      </Grid>
    </Grid>,
  ];
}
Step2.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  formFields: PropTypes.instanceOf(Object).isRequired,
};

function Step3({
  currentStep, handleChange, value,
}) {
  if (currentStep !== 3) {
    return null;
  }
  return [
    <div>
      {value === 0 ? (
        <p className={styles.paper}>
          Buyer Account Created!
        </p>
      ) : (
        <>
          <p className={styles.paper}>
            Account Created!
          </p>
          <p className={styles.paper}>
            { value === 2 ? 'Please await authentication from Farm2People.'
              : 'Farm2People will be in touch with you shortly.'}
          </p>
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
          >
            {value === 0 ? 'Back To Sign In' : 'Done'}
          </Button>
        </Box>
      </Grid>
    </Grid>,
  ];
}

Step3.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default withStyles(styles)(MasterForm);
