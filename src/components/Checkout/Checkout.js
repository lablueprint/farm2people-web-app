import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardContent, Typography, TextField, makeStyles, Grid, Button, ButtonBase,
  FormControlLabel, Checkbox, Select, MenuItem,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CheckoutItem from './CheckoutItem';

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
  cost: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#373737',
    paddingTop: 15,
  },
  costLabel: {
    fontWeight: '700',
  },
  totalLabel: {
    fontFamily: 'Work Sans',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#373737',
    paddingTop: 15,
  },
  total: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '140%',
    color: '#373737',
    textDecoration: 'underline',
    textDecorationColor: '#53AA48',
  },
  farmHeader: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '17px',
    lineHeight: '19px',
    textDecorationLine: 'underline',
    color: '#373737',
    paddingTop: 15,
    paddingBottom: 15,
  },
});

function Checkout() {
  const classes = useStyles();
  const [editing, setEditing] = useState(false); // bool if editing
  const [items, setItems] = useState([]); // items in cart
  const [subtotal, setSubtotal] = useState(0); // subtotal of cart
  const [pastProfiles, setPastProfiles] = useState([]); // array of all profiles related to user
  const [selectedProfile, setSelectedProfile] = useState(''); // id of selected profile

  // empty profile for new profile creation
  const emptyProfile = {
    name: '',
    'last name': '',
    phone: '',
    email: '',
    'address line 1': '',
    'address line 2': '',
    city: '',
    state: '',
    country: '',
    zipcode: 0,
  };

  // current profile being used
  const [profile, setProfile] = useState(emptyProfile);

  const [selectors, setSelectors] = useState({
    canCash: false,
    canPaypal: false,
    canCard: false,
    canOther: false,
    canPickup: false,
    canDeliver: false,
    canMeet: false,
  });

  // TODO: only fetch records related to user
  useEffect(() => {
    // fetch all the items in cart and set the subtotal
    setSubtotal(0);
    base('Reserved Listings').select({ view: 'Grid view' }).all().then((records) => {
      records.map((element) => base('Listings').find(element.fields['listing id'][0], (err, record) => {
        const currCartItemPrice = element.fields.pallets * record.fields['standard price per pallet'];
        setSubtotal((prevTotal) => (prevTotal + currCartItemPrice));
      }));
      setItems(records);
    });

    // fetch all the checkout profiles
    base('Checkout Profiles').select({ view: 'Grid view' }).all().then((records) => {
      setPastProfiles(records);
      console.log(records);
    });
  }, []);

  // method to handle text field input
  const handleChange = (prop) => (event) => {
    setProfile({ ...profile, [prop]: event.target.value });
  };

  // method to handle checkbox input (event.checked not value)
  const handleCheck = (event) => {
    setSelectors({ ...selectors, [event.target.name]: event.target.checked });
  };

  // preloads data to form when requested
  const handlePreload = (event) => {
    setSelectedProfile(event.target.value);
    if (event.target.value === '') {
      setProfile(emptyProfile);
    } else {
      pastProfiles.map((p) => (p.id === event.target.value) && (setProfile(p.fields)));
    }
  };

  /* figure out how to deal with payment methods later
  function updatePaymentMethods() {
    const methods = [];

    if (selectors.canCash) { methods.push('cash'); }
    if (selectors.canPaypal) { methods.push('paypal'); }
    if (selectors.canCard) { methods.push('card'); }

    setUserDetails({ ...userDetails, 'payment options': methods });
  }
  */

  // creates a new profile and then creates a quote if needed
  function createProfile(callback) {
    // TODO: link user to profile
    base('Checkout Profiles').create([{ fields: profile }],
      (err, records) => {
        if (err) {
          console.log(err);
        } else {
          callback(records[0].id);
        }
      });
  }

  // create a quote with the passed checkoutProfile id
  async function createQuote(checkoutProfile) {
    // TODO: save checkout and pickup methods in the quote
    // updatePaymentMethods().then();
    if (checkoutProfile != null) {
      base('Quotes').create([
        {
          fields: {
            // TODO: add buyer id
            'reserved listings': items.map((item) => (item.id)),
            'initial cost': subtotal,
            status: 'In Progress',
            'checkout profile': [checkoutProfile],
          },
        },
      ],
      (err, records) => {
        if (err) {
          console.log(err);
        }
        console.log(records);
      });
    }
  }

  // TODO: validate fields before creating profile
  function validate() {
    return true;
  }

  // handles the submitting the form
  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      if (selectedProfile !== '') {
        createQuote(selectedProfile);
      } else {
        createProfile(createQuote);
      }
    }
  }

  // TODO: error checking methods
  // TODO format form w/ grids + finish styling
  return (
    <div className={classes.container}>
      <Typography className={classes.title}> Checkout </Typography>

      <Select
        value={selectedProfile}
        onChange={handlePreload}
        displayEmpty
      >
        <MenuItem value="">Preload User and Billing Information</MenuItem>
        {pastProfiles.map((p) => (
          <MenuItem key={p.id} value={p.id}>
            {p.fields.name}
            {' '}
            {p.fields['last name']}
            {', '}
            {p.fields['address line 1']}
          </MenuItem>
        ))}
      </Select>
      { (selectedProfile !== '')
        && (
        <Button
          onClick={() => (setEditing(!editing))}
        >
          Edit/Change Information
        </Button>
        )}
      <form onSubmit={(event) => handleSubmit(event)}>
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
                    value={profile.name}
                    onChange={handleChange('name')}
                    required
                    disabled={selectedProfile !== ''}
                  />
                  <TextField
                    label="Last Name"
                    value={profile['last name']}
                    onChange={handleChange('last name')}
                    required
                    disabled={selectedProfile !== ''}
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
                    value={profile.phone}
                    onChange={handleChange('phone')}
                    disabled={selectedProfile !== ''}
                  />
                  <TextField
                    label="Email"
                    value={profile.email}
                    onChange={handleChange('email')}
                    disabled={selectedProfile !== ''}
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
                  value={profile['address line 1']}
                  onChange={handleChange('address line 1')}
                  fullWidth
                  required
                  disabled={selectedProfile !== ''}
                />
                <TextField
                  label="Address Line 2"
                  value={profile['address line 2']}
                  onChange={handleChange('address line 2')}
                  fullWidth
                  disabled={selectedProfile !== ''}
                />
                <div className={classes.fieldRowContainer}>
                  <TextField
                    label="City"
                    value={profile.city}
                    onChange={handleChange('city')}
                    required
                    disabled={selectedProfile !== ''}
                  />
                  <TextField
                    label="State"
                    value={profile.state}
                    onChange={handleChange('state')}
                    disabled={selectedProfile !== ''}
                  />
                </div>
                <div className={classes.fieldRowContainer}>
                  <TextField
                    label="Zip Code"
                    value={profile.zipcode}
                    onChange={handleChange('zipcode')}
                    required
                    disabled={selectedProfile !== ''}
                  />
                  <TextField
                    label="Country"
                    value={profile.country}
                    onChange={handleChange('country')}
                    disabled={selectedProfile !== ''}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={5}>
            <Typography className={classes.sectionHeader}> Your Order</Typography>
            <Card className={classes.inputCards}>
              <CardContent>
                <Typography className={classes.stepNum}>
                  05
                  <span className={classes.stepSlash}>/</span>
                  <span className={classes.stepLabel}>Items</span>
                </Typography>
                <Typography className={classes.farmHeader}>
                  Ryan
                  {'\''}
                  s Ronderful Rarm
                </Typography>
                {items.map((item) => (
                  <CheckoutItem
                    key={item.id}
                    pallets={item.fields.pallets}
                    listingID={item.fields['listing id']}
                  />
                ))}
                <Typography className={classes.cost}>
                  <span className={classes.costLabel}>Cart Subtotal: </span>
                  $
                  {parseFloat(subtotal).toFixed(2)}
                </Typography>
                <Typography className={classes.cost}>
                  <span className={classes.costLabel}>Estimated Transportation Cost: </span>
                  $
                  {parseFloat(20).toFixed(2)}
                </Typography>
                <Typography className={classes.cost}>
                  <span className={classes.costLabel}>Processing Fee: </span>
                  $
                  {parseFloat(5).toFixed(2)}
                </Typography>
                <Typography className={classes.totalLabel}>
                  ESTIMATED TOTAL:
                  {' '}
                  <span className={classes.total}>
                    $
                    {parseFloat(subtotal).toFixed(2)}
                  </span>
                </Typography>
              </CardContent>
            </Card>
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
      </form>
    </div>
  );
}

export default Checkout;
