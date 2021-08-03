import React from 'react';
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
import { store } from '../../lib/redux/store';

import Fruit2 from '../../assets/images/Fruit2.svg';
import Fruit3 from '../../assets/images/Fruit3.svg';
import Fruit4 from '../../assets/images/Fruit4.svg';
import Fruit1 from '../../assets/images/Fruit1.svg';

const theme = createMuiTheme({
  spacing: 4,
});

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
  cenSubtitleText: {
    fontFamily: 'Work Sans',
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  plainText: {
    fontFamily: 'Work Sans',
  },
  stepper: {
    margin: 'auto',
    width: '60%',
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
  emptyGrid: {
    height: '200px',
    position: 'relative',
  },
  producerSubmitButton: {
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#53AA48',
    },
  },
});

export default function RegistrationLimbo() {
  const classes = useStyles();
  const userRole = store.getState().userData == null ? '' : store.getState().userData.user.fields['user type'];
  function getSteps() {
    if (userRole === 'agency') {
      return ['Step 1', 'Step 2', 'Confirmation'];
    }
    return ['Step 1', 'Step 2', 'Step 3', 'Confirmation'];
  }
  const steps = getSteps();
  return (
    <>
      {userRole === 'agency'
        ? (
          <Box my={5}>
            <Container component="main" maxWidth="md">
              <div>
                <ThemeProvider theme={theme}>
                  <Typography className={classes.titleText} align="center">
                    Agency Registration Form
                  </Typography>
                </ThemeProvider>
                <Stepper activeStep={3} alternativeLabel className={classes.stepper}>
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
                        <Step4
                          currentStep={4}
                          classes={classes}
                        />
                      </Grid>
                    </Container>
                  </Grid>
                </form>
              </div>
            </Container>
          </Box>
        ) : (
          <Box my={5}>
            <Container component="main" maxWidth="md">
              <div>
                <ThemeProvider theme={theme}>
                  <Typography className={classes.titleText} align="center">
                    Producer Registration Form
                  </Typography>
                </ThemeProvider>
                <Stepper activeStep={4} alternativeLabel className={classes.stepper}>
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
                        <Step5
                          currentStep={5}
                          classes={classes}
                        />
                      </Grid>
                    </Container>
                  </Grid>
                </form>
              </div>
            </Container>
          </Box>
        ) }
    </>
  );
}

function Step4({
  currentStep, classes,
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
        Please await Farm2People approval.
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
    </Grid>,
  ];
}

function Step5({
  currentStep, classes,
}) {
  if (currentStep !== 5) {
    return null;
  }
  return [
    <div>
      <div className={classes.cenSubtitleText}>
        Registration Completed!
      </div>
      <div className={classes.plainText}>
        Please await Farm2People approval.
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
    </Grid>,
  ];
}
