import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {
  Card, CardContent, Typography, TextField, makeStyles, Grid, Button, ButtonBase,
  FormControlLabel, Checkbox, Select, MenuItem, FormGroup,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import CheckoutItem from './CheckoutItem';
import CartDialog from '../Cart/CartDialog';

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
    paddingBottom: '10px',
  },
  sectionHeader: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: ' 140%',
    color: '#373737',
    paddingBottom: 10,
  },
  inputCards: {
    paddingLeft: '30px',
    paddingRight: '30px',
    marginBottom: '20px',
    margin: 'auto',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
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
  fieldRow: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  rowContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
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

const GreenCheckbox = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function Checkout() {
  const classes = useStyles();
  const history = useHistory();
  const [editing, setEditing] = useState(false); // bool if editing
  const [items, setItems] = useState([]); // items in cart
  const [subtotal, setSubtotal] = useState(0); // subtotal of cart
  const [pastProfiles, setPastProfiles] = useState([]); // array of all profiles related to user
  const [selectedProfile, setSelectedProfile] = useState(''); // id of selected profile

  // bools for launching alerts
  const [saveProfileAlert, setSaveProfileAlert] = useState(false);
  const [updateProfileAlert, setUpdateProfileAlert] = useState(false);
  const [quitEditingAlert, setQuitEditingAlert] = useState(false);

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
    canACH: false,
    canPaypal: false,
    canCard: false,
    canCheck: false,
    preferPickup: true,
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
    // TODO: only fetch appropriate fields in the first place
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
    setSelectors({ ...selectors, [event.target.name]: !selectors[event.target.name] });
  };

  // TODO: validate fields before creating profile
  function validate() {
    return true;
  }

  // links to success page
  const toSuccess = () => history.push('/cart/success');

  // loads profile data to form
  const loadProfile = (checkoutProfile) => {
    // set current profile to the correct pastProfile
    // removing the id field for editing convenience
    const file = pastProfiles.filter((p) => (p.id === checkoutProfile));
    delete file[0].fields['profile id'];
    setProfile(file[0].fields);
  };

  // handles the selection of a checkout profile
  const handlePreload = (event) => {
    setEditing(false);
    setSelectedProfile(event.target.value);
    if (event.target.value === '') {
      setProfile(emptyProfile);
    } else {
      loadProfile(event.target.value);
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
          const p = records[0];
          setPastProfiles([...pastProfiles, p]);
          callback(p.id);
        }
      });
  }

  // edits selected profile
  function editProfile() {
    setEditing(false);
    base('Checkout Profiles').update([{
      id: selectedProfile,
      // TODO: only update edited fields
      fields: profile,
    }], (err, records) => {
      if (err) {
        console.log(err);
      }
      // update the profile in the pastProfile array
      const editedProfile = records[0];
      const profiles = pastProfiles.filter((p) => (p.id !== selectedProfile));
      setPastProfiles([editedProfile, ...profiles]);
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
      (err) => {
        if (err) {
          console.log(err);
        } else {
          toSuccess();
        }
      });
    }
  }

  // handles the submitting the form
  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      if (selectedProfile !== '') {
        if (editing) { setUpdateProfileAlert(true); } else {
          createQuote(selectedProfile);
        }
      } else {
        setSaveProfileAlert(true);
        // createProfile(createQuote);
      }
    }
  }

  function saveProfileAlertClosed(value) {
    // TODO: if false save profile w/o user id
    setSaveProfileAlert(false);
    createProfile(createQuote);
    console.log(value ? 'new profile saved' : 'info not saved');
  }

  function quitEditingAlertClosed(value) {
    setQuitEditingAlert(false);
    if (value) {
      setEditing(false);
      loadProfile(selectedProfile);
    }
  }

  function editButtonClick() {
    if (editing) {
      setQuitEditingAlert(true);
    } else {
      setEditing(true);
    }
  }

  function updateProfileAlertClosed(value) {
    setUpdateProfileAlert(false);
    if (value) {
      editProfile();
      createQuote(selectedProfile);
    } else {
      setSaveProfileAlert(true);
    }
  }

  // TODO: error checking methods
  // TODO format form w/ grids + finish styling
  return (
    <div className={classes.container}>
      <Typography className={classes.title}> Checkout </Typography>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Grid container spacing={3}>
          <Grid item xs>
            <div className={classes.rowContainer}>
              <Select
                value={selectedProfile}
                onChange={handlePreload}
                displayEmpty
                label="Preload User and Billing Information"
              >
                <MenuItem value="">{(selectedProfile === '') ? 'Preload User and Billing Information' : 'None'}</MenuItem>
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
                  onClick={editButtonClick}
                >
                  {!editing ? 'Edit Checkout Profile Information' : 'Editing Checkout Profile Information'}
                </Button>
                )}
            </div>
            <Typography className={classes.sectionHeader}> User Information</Typography>
            <Card className={classes.inputCards}>
              <CardContent>
                <Typography className={classes.stepNum}>
                  01
                  <span className={classes.stepSlash}>/</span>
                  <span className={classes.stepLabel}>Name</span>
                </Typography>
                <Grid container spacing={1} className={classes.fieldRow}>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      value={profile.name}
                      onChange={handleChange('name')}
                      required
                      fullWidth
                      disabled={selectedProfile !== '' && !editing}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      value={profile['last name']}
                      onChange={handleChange('last name')}
                      required
                      fullWidth
                      disabled={selectedProfile !== '' && !editing}
                    />
                  </Grid>
                </Grid>
                <Typography className={classes.stepNum}>
                  02
                  <span className={classes.stepSlash}>/</span>
                  <span className={classes.stepLabel}>Contact Information</span>
                </Typography>
                <Grid container spacing={1} className={classes.fieldRow}>
                  <Grid item xs={6}>
                    <TextField
                      label="Phone Number"
                      value={profile.phone}
                      onChange={handleChange('phone')}
                      disabled={selectedProfile !== '' && !editing}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Email"
                      value={profile.email}
                      onChange={handleChange('email')}
                      disabled={selectedProfile !== '' && !editing}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Typography className={classes.stepNum}>
                  03
                  <span className={classes.stepSlash}>/</span>
                  <span className={classes.stepLabel}>
                    Which delivery option do you prefer?
                  </span>
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<GreenCheckbox icon={<RadioButtonUnchecked />} checkedIcon={<RadioButtonChecked />} checked={selectors.preferPickup} onChange={handleCheck} name="preferPickup" />}
                    label="Pick-up"
                  />
                  <FormControlLabel
                    control={<GreenCheckbox icon={<RadioButtonUnchecked />} checkedIcon={<RadioButtonChecked />} checked={!selectors.preferPickup} onChange={handleCheck} name="preferPickup" />}
                    label="Delivery"
                    fullWidth
                  />
                </FormGroup>
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
                <FormGroup>
                  <FormControlLabel
                    control={<GreenCheckbox checked={selectors.canCash} onChange={handleCheck} name="canACH" />}
                    label="ACH transfer (Automated clearing house)"
                  />
                  <FormControlLabel
                    control={<GreenCheckbox checked={selectors.canPaypal} onChange={handleCheck} name="canPaypal" />}
                    label="Paypal"
                  />
                  <FormControlLabel
                    control={<GreenCheckbox checked={selectors.canCard} onChange={handleCheck} name="canCard" />}
                    label="Debit/credit card"
                  />
                  <FormControlLabel
                    control={<GreenCheckbox checked={selectors.canCheck} onChange={handleCheck} name="canCheck" />}
                    label="Check"
                  />
                </FormGroup>
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
                  disabled={selectedProfile !== '' && !editing}
                />
                <TextField
                  label="Address Line 2"
                  value={profile['address line 2']}
                  onChange={handleChange('address line 2')}
                  fullWidth
                  disabled={selectedProfile !== '' && !editing}
                />
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      label="City"
                      value={profile.city}
                      onChange={handleChange('city')}
                      required
                      disabled={selectedProfile !== '' && !editing}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="State"
                      value={profile.state}
                      onChange={handleChange('state')}
                      disabled={selectedProfile !== '' && !editing}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      label="Zip Code"
                      value={profile.zipcode}
                      onChange={handleChange('zipcode')}
                      disabled={selectedProfile !== '' && !editing}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Country"
                      value={profile.country}
                      onChange={handleChange('country')}
                      disabled={selectedProfile !== '' && !editing}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <div className={classes.rowContainer}>
              {(selectedProfile === '' || editing) && (
              <Button
                className={classes.requestQuoteButton}
                onClick={() => { createProfile(setSelectedProfile); }}
              >
                create new profile
              </Button>
              )}
              {(editing) && (
              <Button
                className={classes.requestQuoteButton}
                onClick={editProfile}
              >
                update existing profile
              </Button>
              )}
            </div>
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
                  <span className={classes.costLabel}>Transportation Cost: </span>
                  TBD
                </Typography>
                <Typography className={classes.cost}>
                  <span className={classes.costLabel}>Processing Fees: </span>
                  TBD
                </Typography>
                <Typography className={classes.cost}>
                  <span className={classes.costLabel}>Additional Taxes: </span>
                  TBD
                </Typography>
                <Typography className={classes.cost}>
                  <span className={classes.costLabel}>Administration Fees: </span>
                  TBD
                </Typography>
                <Typography>
                  The agency cost will be TBD.
                  F2P will investigate how much money they can save you.
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
            <div className={classes.rowContainer}>
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
      <CartDialog
        message="Save information as a new checkout profile?"
        alert={saveProfileAlert}
        close={saveProfileAlertClosed}
        getResponse
      />
      <CartDialog
        title="Quit editing?"
        message="Changes you made will not be saved."
        alert={quitEditingAlert}
        close={quitEditingAlertClosed}
        getResponse
      />
      <CartDialog
        title="Update checkout profile?"
        message="Changes you made will override the current info."
        alert={updateProfileAlert}
        close={updateProfileAlertClosed}
        getResponse
      />
    </div>
  );
}

export default Checkout;
