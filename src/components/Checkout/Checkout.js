import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardContent, Typography, TextField, makeStyles, Grid, Button, ButtonBase,
  FormControlLabel, Checkbox,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CheckoutItemsDisplay from './CheckoutItemsDisplay';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

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
  backToCartButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bolder',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#373737',
    justifyContent: 'center',
  },
  requestQuoteButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#FFFFFF',
    background: '#53AA48',
  },
  links: {
    textDecoration: 'none',
  },
  green: {
    color: '#53AA48',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
    paddingTop: '17px',
    marginBottom: '5%',
  },
});

function Checkout() {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);

  // switch out when profiles done?
  const [userDetails, setUserDetails] = useState({
    name: '',
    'last name': '',
    phone: '',
    email: '',
    'address line 1': '',
    'address line 2': '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    'payment options': [],
  });

  const [selectors, setSelectors] = useState({
    canCash: false,
    canPaypal: false,
    canCard: false,
    canOther: false,
    canPickup: false,
    canDeliver: false,
    canMeet: false,
  });

  // method to handle text field input
  const handleChange = (prop) => (event) => {
    setUserDetails({ ...userDetails, [prop]: event.target.value });
  };

  // method to handle checkbox input (event.checked not value)
  const handleCheck = (event) => {
    setSelectors({ ...selectors, [event.target.name]: event.target.checked });
  };

  function updatePaymentMethods() {
    const methods = [];

    if (selectors.canCash) { methods.push('cash'); }
    if (selectors.canPaypal) { methods.push('paypal'); }
    if (selectors.canCard) { methods.push('card'); }

    setUserDetails({ ...userDetails, 'payment options': methods });
  }

  function createQuote() {
    updatePaymentMethods().then();
    const record = {
      fields: userDetails,
    };

    base('Quotes').create([record],
      (err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createQuote();
  }

  // TODO: error checking methods

  return (
    <div className={classes.container}>
      <Typography className={classes.title}> Checkout </Typography>
      <Button
        onClick={() => (setEditing(!editing))}
      >
        Edit/Change Information
      </Button>
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset disabled={editing}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography className={classes.sectionHeader}> User Information</Typography>
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
                      value={userDetails.name}
                      onChange={handleChange('name')}
                    />
                    <TextField
                      label="Last Name"
                      value={userDetails['last name']}
                      onChange={handleChange('last name')}
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
                      value={userDetails.phone}
                      onChange={handleChange('phone')}
                    />
                    <TextField
                      label="Email"
                      value={userDetails.email}
                      onChange={handleChange('email')}
                    />
                  </span>
                  <Typography className={classes.stepNum}>
                    03
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>
                      Which delivery options do you prefer?
                    </span>
                  </Typography>
                  <FormControlLabel
                    control={<Checkbox checked={selectors.canPickup} onChange={handleCheck} name="canPickup" />}
                    label="Pick-up"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectors.canDeliver} onChange={handleCheck} name="canDeliver" />}
                    label="Delivery"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectors.canMeet} onChange={handleCheck} name="canMeet" />}
                    label="Location meet-up"
                  />
                </CardContent>
              </Card>
              <Typography className={classes.sectionHeader}> Billing Information</Typography>
              <Card className={classes.inputCards}>
                <CardContent>
                  <Typography className={classes.stepNum}>
                    03
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>
                      Which payment methods are you comfortable with using?
                    </span>
                  </Typography>
                  <FormControlLabel
                    control={<Checkbox checked={selectors.canCash} onChange={handleCheck} name="canCash" />}
                    label="Cash"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectors.canPaypal} onChange={handleCheck} name="canPaypal" />}
                    label="Paypal"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectors.canCard} onChange={handleCheck} name="canCard" />}
                    label="Debit/credit card"
                  />
                  <Typography className={classes.stepNum}>
                    04
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>Billing Address</span>
                  </Typography>
                  <TextField
                    label="Address Line 1"
                    value={userDetails['address line 1']}
                    onChange={handleChange('address line 1')}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Address Line 2"
                    value={userDetails['address line 2']}
                    onChange={handleChange('address line 2')}
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
                      value={userDetails.zipcode}
                      onChange={handleChange('zipcode')}
                      required
                    />
                    <TextField
                      label="Country"
                      value={userDetails.country}
                      onChange={handleChange('country')}
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={5}>
              <CheckoutItemsDisplay />
              <div className={classes.buttonContainer}>
                <Link className={classes.links} to="/cart">
                  <ButtonBase>
                    <ArrowBack className={classes.green} />
                    <div className={classes.backToCartButton}>Back to Cart</div>
                  </ButtonBase>
                </Link>
                <Button
                  className={classes.requestQuoteButton}
                  type="submit"
                  value="submit"
                >
                  Request Quote
                </Button>
              </div>
            </Grid>
          </Grid>
        </fieldset>
      </form>
    </div>
  );
}

export default Checkout;
