import React, { useState } from 'react';
import {
  Card, CardContent, Typography, TextField, makeStyles, Grid,
} from '@material-ui/core';
import CheckoutItemsDisplay from './CheckoutItemsDisplay';

const useStyles = makeStyles({
  // styles temp copied from Cart Screen just to make it easier to read
  container: {
    width: '78%',
    alignSelf: 'center',
    margin: 'auto',
    minWidth: '700px',
    position: 'relative',
    minHeight: '100vh',
  },
  title: {
    fontFamily: 'Work Sans',
    fontWeight: 'bolder',
    fontSize: '50px',
    lineHeight: '59px',
    color: '#373737',
    paddingTop: '2%',
  },
  sectionHeader: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: ' 140%',
    color: '#373737',
    paddingTop: 30,
    paddingBottom: 10,
  },
  inputCards: {
    paddingTop: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    margin: 'auto',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
  },
  stepNum: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: '23px',
    lineHeight: '140%',
    color: '#FF765D',
  },
  stepSlash: {
    fontWeight: '100',
  },
  stepLabel: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#373737',
    textDecoration: 'underline',
    textDecorationColor: '#53AA48',
  },
});

function Checkout() {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (prop) => (event) => {
    setUserDetails({ ...userDetails, [prop]: event.target.value });
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.title}> Checkout </Typography>
      <Grid container spacing={3}>
        <Grid item xs>
          <form>
            <Typography className={classes.sectionHeader}> User Details</Typography>
            <Card className={classes.inputCards}>
              <CardContent>
                <Typography className={classes.stepNum}>
                  01
                  <span className={classes.stepSlash}>/</span>
                  <span className={classes.stepLabel}>Name</span>
                </Typography>
                <span className={classes.fieldRowContainer}>
                  <TextField
                    label="First Name"
                    value={userDetails.firstName}
                    onChange={handleChange('firstName')}
                  />
                  <TextField
                    label="Last Name"
                    value={userDetails.lastName}
                    onChange={handleChange('lastName')}
                  />
                </span>
                <Typography className={classes.stepNum}>
                  02
                  <span className={classes.stepSlash}>/</span>
                  <span className={classes.stepLabel}>Contact Information</span>
                </Typography>
                <span className={classes.fieldRowContainer}>
                  <TextField
                    label="Phone Number"
                    value={userDetails.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                  />
                  <TextField
                    label="Email"
                    value={userDetails.email}
                    onChange={handleChange('email')}
                  />
                </span>
              </CardContent>
            </Card>
            <Typography className={classes.sectionHeader}> Billing Information</Typography>
            <Card className={classes.inputCards}>
              <CardContent>
                <Typography className={classes.stepNum}>
                  04
                  <span className={classes.stepSlash}>/</span>
                  <span className={classes.stepLabel}>Billing Address</span>
                </Typography>
                <TextField
                  label="Address Line 1"
                  value={userDetails.address1}
                  onChange={handleChange('address1')}
                  fullWidth
                  required
                />
                <TextField
                  label="Address Line 2"
                  value={userDetails.address2}
                  onChange={handleChange('address2')}
                  fullWidth
                  required
                />
                <div className={classes.fieldRowContainer}>
                  <TextField
                    label="City"
                    value={userDetails.city}
                    onChange={handleChange('city')}
                    required
                  />
                  <TextField
                    label="State"
                    value={userDetails.state}
                    onChange={handleChange('state')}
                  />
                </div>
                <div className={classes.fieldRowContainer}>
                  <TextField
                    label="Zip Code"
                    value={userDetails.city}
                    onChange={handleChange('zip')}
                    required
                  />
                  <TextField
                    label="United States"
                    value={userDetails.state}
                    onChange={handleChange('state')}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </Grid>
        <Grid item xs={6} sm={6} md={5}>
          <CheckoutItemsDisplay />
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;
