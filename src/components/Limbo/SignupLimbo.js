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

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '60vh',
  },
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

const theme = createMuiTheme({
  spacing: 4,
});

const STEPS = ['Step 1', 'Step 2', 'Step 3', 'Confirmation'];

export default function SignupLimbo() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root} mt={5} mb={5}>
        <Container component="main" maxWidth="md">
          <div>
            <ThemeProvider theme={theme}>
              <Typography className={classes.labelText} color="textPrimary" gutterBottom variant="h4" align="center">
                Sign Up
              </Typography>
            </ThemeProvider>
            <Stepper activeStep={3} alternativeLabel className={classes.stepper}>
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
                <Container maxWidth="sm">
                  <div>
                    <div className={classes.cenSubtitleText}>
                      Account Created!
                    </div>
                    <div className={classes.cenRegSubtitleText}>
                      Please await authentication from Farm2People.
                    </div>
                  </div>
                  <div>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                    />
                  </div>
                </Container>
              </Grid>
            </form>
          </div>
        </Container>
      </Box>
    </>
  );
}
