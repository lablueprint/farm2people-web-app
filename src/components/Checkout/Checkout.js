import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {
  Card, CardContent, Typography, makeStyles, Grid, Button, ButtonBase,
  FormControl, FormControlLabel, Checkbox, Select, MenuItem, FormGroup, Divider, FormLabel,
} from '@material-ui/core';

// icons
import ArrowBack from '@material-ui/icons/ArrowBack';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import EditIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Clear';

// components
import CheckoutItem from './CheckoutItem';
import CartDialog from '../Cart/CartDialog'; // now that these dialogs are used in multiple places, it might be good to refactor
import CheckoutProfileNameDialog from './CheckoutProfileNameDialog';
import CheckoutPriceDetails from './CheckoutPriceDetails';
import CheckoutTextField from './CheckoutTextField';
import Fruit3 from '../../assets/images/Fruit3.svg';
import Fruit4 from '../../assets/images/Fruit4.svg';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

// styling
const useStyles = makeStyles({
  container: {
    width: '70%',
    alignSelf: 'center',
    margin: 'auto',
    minWidth: '700px',
    position: 'relative',
    minHeight: '100vh',
  },
  title: {
    fontFamily: 'Work Sans',
    fontWeight: 800,
    fontSize: '50px',
    lineHeight: '59px',
    color: '#373737',
    paddingTop: '2%',
    paddingBottom: '10px',
  },
  inputCards: {
    paddingLeft: '30px',
    paddingRight: '30px',
    marginBottom: '20px',
    margin: 'auto',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
  },
  sectionHeader: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: ' 140%',
    color: '#373737',
    paddingBottom: 10,
  },
  stepNum: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: '23px',
    lineHeight: '140%',
    color: '#FF765D',
    paddingBottom: 10,
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
    fontSize: '17px',
    lineHeight: '140%',
    color: '#373737',
    justifyContent: 'center',
  },
  greenButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '17px',
    lineHeight: '140%',
    color: '#FFFFFF',
    background: '#53AA48',
  },
  greyOutlineButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '17px',
    lineHeight: '140%',
    color: '#373737',
    border: '1px solid #373737',
    boxSizing: 'border-box',
    borderRadius: '4.71186px',
  },
  links: {
    textDecoration: 'none',
  },
  green: {
    color: '#53AA48',
  },
  fieldRow: {
    paddingBottom: 10,
  },
  rowContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
    marginBottom: 10,
  },
  cost: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#373737',
    paddingTop: 10,
    paddingBottom: 10,
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
    paddingBottom: 15,
  },
  subtext: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '140%',
    color: '#373737',
  },
  editButton: {
    paddingInline: 10,
  },
  editButtonText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '21px',
    textDecorationLine: 'underline',
    color: '#373737',
  },
  fruit3: {
    position: 'absolute',
    width: '180px',
    height: 'auto',
    right: '1%',
    bottom: '20%',
    zIndex: '-2',
  },
  fruit4: {
    position: 'absolute',
    width: '180px',
    height: 'auto',
    right: '0%',
    bottom: '6%',
    zIndex: '-1',
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
  const [requesting, setRequesting] = useState(false); // bool whether quote is being requested
  const [updating, setUpdating] = useState(true); // bool whether a profile is being updated
  const [resetErrorDisplay, setResetErrorDisplay] = useState(''); // string used to set error display
  // 'reset' doesn't display until errors edited, 'show' shows all the errors, even unedited

  // bools for launching alerts
  const [saveProfileAlert, setSaveProfileAlert] = useState(false);
  const [updateProfileAlert, setUpdateProfileAlert] = useState(false);
  const [quitEditingAlert, setQuitEditingAlert] = useState(false);
  const [profileNameDialog, setProfileNameDialog] = useState(false);
  // Ref used to ensure profile name loaded before submitting to airtable
  const updatingName = useRef(false);

  // empty profile for new profile creation/ resetting fields
  const emptyProfile = {
    'profile name': '',
    'first name': '',
    'last name': '',
    phone: '',
    email: '',
    'address line 1': '',
    'address line 2': '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    'prefer delivery': false,
    'can ACH': false,
    'can paypal': false,
    'can card': false,
    'can check': false,
  };

  // current profile being used
  const [profile, setProfile] = useState(emptyProfile);

  // initial valid settings
  const emptyValid = {
    'first name': false,
    'last name': false,
    phone: false,
    email: false,
    'address line 1': false,
    'address line 2': true, // always ok, but look into possible validation
    city: false,
    state: false,
    country: false,
    zipcode: false,
  };

  // valid initializer for loading past profiles (guaranteed to be valid)
  const allValid = {
    'first name': true,
    'last name': true,
    phone: true,
    email: true,
    'address line 1': true,
    'address line 2': true,
    city: true,
    state: true,
    country: true,
    zipcode: true,
  };

  // validation state of each text field
  const [valid, setValid] = useState(emptyValid);
  const paymentValid = [profile['can ACH'], profile['can paypal'], profile['can card'], profile['can check']].filter((v) => v).length > 0;

  // Fetches all necessary airtable data on start
  // TODO: only fetch records related to user
  useEffect(() => {
    // fetch all the items in cart and set the subtotal
    setSubtotal(0);
    base('Reserved Listings').select({ view: 'Grid view' }).all().then((records) => {
      records.map((element) => base('Listings').find(element.fields['listing id'][0], (err, record) => {
        const currCartItemPrice = element.fields.pallets * record.fields['standard price per unit'];
        setSubtotal(subtotal + currCartItemPrice);
      }));
      setItems(records);
    });
    // fetch all the checkout profiles
    base('Checkout Profiles').select({ view: 'Grid view' }).all().then((records) => {
      setPastProfiles(records);
    });
  }, []);

  // links to success page
  // runs on successful submission of quote request
  const toSuccess = () => history.push('/cart/success');

  // method to handle text field or checkbox input change
  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (name === 'prefer delivery') { value = !profile['prefer delivery']; }
    setProfile({ ...profile, [name]: value });
  };

  // changes the validation state of a field as specified
  const handleValidation = (name, value) => {
    setValid({ ...valid, [name]: value });
  };

  // returns whether every field within the profile is valid
  // TODO: validate fields before creating profile
  function validate() {
    setResetErrorDisplay('show');
    let val = true;
    Object.entries(valid).forEach(([k, v]) => {
      console.log(k, ':', v);
      if (!v) { val = false; }
    });
    return val && paymentValid;
  }

  // returns error message if field is empty
  // used for simple fields (ex. name, )
  function validateFilled(name) {
    return profile[name] !== '' ? '' : 'This field is required';
  }

  // returns error message if the phone number is improper
  // what format should be preferred?
  // for now it just checks that 10 digits were entered (no country code)
  function validatePhone() {
    // return error if empty
    if (profile.phone === '') { return 'This field is required'; }

    // return error if incorrect # of digits
    return (profile.phone && profile.phone.match(/\d/g).length !== 10) ? 'Phone number should have 10 digits' : '';
  }

  // returns error message if the email is improper
  function validateEmail() {
    // return error if empty
    if (profile.email === '') { return 'This field is required'; }

    // regex check for email, checks that email input has (letters)@(letters).(letters)
    const reg = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    return profile.email !== null && reg.test(profile.email) === false ? 'Invalid email' : '';
  }

  // returns error message if the zipcode is improper
  function validateZip() {
    // return error if empty
    if (profile.zipcode === '') { return 'This field is required'; }

    // check that zip has valid length
    return profile.zipcode.length < 5 || profile.zipcode.length > 10 ? 'Invalid zip code' : '';
  }

  // loads previous profile data to form
  const loadProfile = (checkoutProfile) => {
    // set current profile to the correct pastProfile
    // removing the id field for submitting convenience
    let file = pastProfiles.filter((p) => (p.id === checkoutProfile));
    delete file[0].fields['profile id'];
    delete file[0].fields['quote id'];
    file = file[0].fields;
    setProfile(file);
  };

  // handles the selection of a checkout profile
  const handlePreload = (event) => {
    setEditing(false);
    setSelectedProfile(event.target.value);

    if (event.target.value === '') {
      // initialize to empty
      setProfile(emptyProfile);
      setValid(emptyValid);
      setResetErrorDisplay('reset');
    } else {
      // initialize to filled, load the profile
      setValid(allValid);
      loadProfile(event.target.value);
    }
  };

  // creates a new profile and then runs a callback on the new profile id
  // callback used for creating quotes with new profile id
  // or setting as selected profile if not submitting yet
  function createProfile(callback) {
    // TODO: link user to profile if needed
    base('Checkout Profiles').create([{ fields: profile }],
      (err, records) => {
        if (err) {
          console.err(err);
        } else {
          const p = records[0];
          setPastProfiles([...pastProfiles, p]); // add to pastProfiles array
          callback(p.id);
        }
      });
  }

  // Edits selected profile with current fields
  function editProfile() {
    setEditing(false);
    base('Checkout Profiles').update([{
      id: selectedProfile,
      fields: profile,
    }], (err, records) => {
      if (err) {
        console.err(err);
      }
      // update the profile in the pastProfile array
      const editedProfile = records[0];
      const profiles = pastProfiles.filter((p) => (p.id !== selectedProfile));
      setPastProfiles([editedProfile, ...profiles]);
    });
  }

  // Create a quote with the passed checkoutProfile id
  function createQuote(checkoutProfile) {
    // TODO: update listing pallets pending
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

  // Handles 'Request Quote' button press (submission of form)
  function handleSubmit(e) {
    e.preventDefault();
    setRequesting(true);
    // TODO: do smth else if invalid? send error message?
    if (validate()) {
      // if the user is using a past profile, check that they are done editing else create quote
      if (selectedProfile !== '') {
        if (editing) { setUpdateProfileAlert(true); } else {
          createQuote(selectedProfile);
        }
      } else {
        // if the user is making a new profile (not yet submitted to airtable + added to
        // past profile array) check if they would like to save the profile
        setSaveProfileAlert(true);
      }
    } else {
      // reset requesting if invalid
      // TODO: set all fields to show errors even if unedited
      setRequesting(false);
    }
  }

  // handles the closing of the profile name dialog (used whenever profile saves/edits made)
  function profileNameDialogClosed() {
    setProfileNameDialog(false);
    if (updating) {
      // if the user is trying to update a profile, edit
      editProfile();
      // if also requesting a quote, create that quote
      if (requesting) { createQuote(selectedProfile); }
    } else if (requesting) {
      // if creating a new profile and requesting a quote, create Profile with the quote callback
      createProfile(createQuote);
    } else {
      // if just creating a new profile (not updating or requesting), createProfile and set it as
      // selected profile
      createProfile(setSelectedProfile);
    }
  }

  // used by profile name dialog to pass the name out to the profile
  async function saveProfileName(newName) {
    updatingName.current = true; // used to wait for state to update before closing the dialog
    setProfile({ ...profile, 'profile name': newName });
  }

  // useEffect closes the dialog and continues with submission once the profile name has been saved
  useEffect(() => { if (updatingName.current) { profileNameDialogClosed(); } updatingName.current = false; }, [profile['profile name']]);

  // handles the closing of the saveProfileAlert
  async function saveProfileAlertClosed(value) {
    // TODO: if false save profile w/o user id
    setSaveProfileAlert(false);
    setUpdating(false);

    if (value) {
      // if user wants to save the profile, launch the profile name dialog
      setEditing(false);
      setProfileNameDialog(true);
    } else if (requesting) {
      // otherwise if requesting a quote, just create a unlinked profile and quote
      createProfile(createQuote);
    }
  }

  // handles the closing of the updateProfileAlert
  function updateProfileAlertClosed(value) {
    setUpdateProfileAlert(false);

    // if the user wants to update the profile, launch profile name dialog
    if (value) {
      setUpdating(true);
      setProfileNameDialog(true);

      // if the user doesn't want to update, but is trying to request a quote with an unsaved
      // profile launch save profile dialog
    } else if (requesting) { setSaveProfileAlert(true); }
  }

  // handles closing of quitEditingAlert and resets profile if requested
  function quitEditingAlertClosed(value) {
    setQuitEditingAlert(false);
    if (value) {
      setEditing(false);
      loadProfile(selectedProfile);
    }
  }

  // handles click of editButton
  function editButtonClick() {
    if (editing) {
      // alert user before discarding edits
      setQuitEditingAlert(true);
    } else {
      setEditing(true);
    }
  }

  // TODO:
  // state selector
  // make sure country is always United States?
  return (
    <div>
      <div className={classes.container}>
        <Typography className={classes.title}> Checkout </Typography>
        <div>
          <Select
            value={selectedProfile}
            onChange={handlePreload}
            disabled={editing}
            displayEmpty
            variant="outlined"
            margin="dense"
            style={{ marginBottom: 10 }}
          >
            <MenuItem value="" disabled={selectedProfile === ''}><em>{(selectedProfile === '') ? 'Preload User and Billing Information' : 'None'}</em></MenuItem>
            {pastProfiles.map((p) => (
              <MenuItem key={p.id} value={p.id}>

                {'profile name' in p.fields
                  ? p.fields['profile name'] : `${p.fields['first name']} ${p.fields['last name']}, ${p.fields['address line 1']}`}
              </MenuItem>
            ))}
          </Select>
          { (selectedProfile !== '')
                && (
                <ButtonBase
                  className={classes.editButton}
                  onClick={editButtonClick}
                >
                  {!editing
                    ? <EditIcon className={classes.green} />
                    : <CancelIcon />}
                  <div className={classes.editButtonText}>
                    {!editing ? 'Edit Checkout Profile Information' : 'Editing Checkout Profile Information'}
                  </div>
                </ButtonBase>
                )}
        </div>
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
                  <Grid container spacing={2} className={classes.fieldRow}>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="First Name"
                        name="first name"
                        value={profile['first name']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={valid['first name']}
                        setValid={handleValidation}
                        validate={validateFilled}
                        updateErrorDisplay={resetErrorDisplay}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="Last Name"
                        name="last name"
                        value={profile['last name']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={valid['last name']}
                        setValid={handleValidation}
                        validate={validateFilled}
                        updateErrorDisplay={resetErrorDisplay}
                      />
                    </Grid>
                  </Grid>
                  <Typography className={classes.stepNum}>
                    02
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>Contact Information</span>
                  </Typography>
                  <Grid container spacing={2} className={classes.fieldRow}>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="Phone Number"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={valid.phone}
                        setValid={handleValidation}
                        validate={validatePhone}
                        updateErrorDisplay={resetErrorDisplay}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="Email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={valid.email}
                        setValid={handleValidation}
                        validate={validateEmail}
                        updateErrorDisplay={resetErrorDisplay}
                      />
                    </Grid>
                  </Grid>
                  <Typography className={classes.stepNum}>
                    03
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>
                      Which delivery option do you prefer?
                    </span>
                    <div className={classes.subtext}>Choose One</div>
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<GreenCheckbox icon={<RadioButtonUnchecked />} checkedIcon={<RadioButtonChecked />} checked={!profile['prefer delivery']} onChange={handleChange} name="prefer delivery" />}
                      label="Pick-up"
                      disabled={selectedProfile !== '' && !editing}
                    />
                    <FormControlLabel
                      control={<GreenCheckbox icon={<RadioButtonUnchecked />} checkedIcon={<RadioButtonChecked />} checked={profile['prefer delivery']} onChange={handleChange} name="prefer delivery" />}
                      label="Delivery"
                      disabled={selectedProfile !== '' && !editing}
                    />
                  </FormGroup>
                </CardContent>
              </Card>
              <Typography className={classes.sectionHeader}> Billing Information</Typography>
              <Card className={classes.inputCards}>
                <CardContent>
                  <Typography className={classes.stepNum}>
                    04
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>
                      Which payment methods are you comfortable with using?
                    </span>
                  </Typography>
                  <FormControl required error={!paymentValid}>
                    <FormLabel className={classes.subtext}>Choose one or more</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<GreenCheckbox checked={profile['can ACH']} onChange={handleChange} name="can ACH" />}
                        label="ACH transfer (Automated clearing house)"
                        disabled={selectedProfile !== '' && !editing}
                      />
                      <FormControlLabel
                        control={<GreenCheckbox checked={profile['can paypal']} onChange={handleChange} name="can paypal" />}
                        label="Paypal"
                        disabled={selectedProfile !== '' && !editing}
                      />
                      <FormControlLabel
                        control={<GreenCheckbox checked={profile['can card']} onChange={handleChange} name="can card" />}
                        label="Debit/credit card"
                        disabled={selectedProfile !== '' && !editing}
                      />
                      <FormControlLabel
                        control={<GreenCheckbox checked={profile['can check']} onChange={handleChange} name="can check" />}
                        label="Check"
                        disabled={selectedProfile !== '' && !editing}
                      />
                    </FormGroup>
                  </FormControl>
                  <Typography className={classes.stepNum}>
                    05
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>Billing Address</span>
                  </Typography>
                  <Grid container spacing={2} className={classes.fieldRow}>
                    <Grid item xs={12}>
                      <CheckoutTextField
                        placeholder="Address Line 1"
                        name="address line 1"
                        value={profile['address line 1']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={valid['address line 1']}
                        validate={validateFilled}
                        setValid={handleValidation}
                        updateErrorDisplay={resetErrorDisplay}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CheckoutTextField
                        placeholder="Address Line 2"
                        name="address line 2"
                        value={profile['address line 2']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={valid['address line 2']}
                        setValid={handleValidation}
                        updateErrorDisplay={resetErrorDisplay}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="City"
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={valid.city}
                        validate={validateFilled}
                        setValid={handleValidation}
                        updateErrorDisplay={resetErrorDisplay}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="State"
                        name="state"
                        value={profile.state}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={valid.state}
                        validate={validateFilled}
                        setValid={handleValidation}
                        updateErrorDisplay={resetErrorDisplay}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="Zip Code"
                        name="zipcode"
                        value={profile.zipcode}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        type="number"
                        valid={valid.zipcode}
                        validate={validateZip}
                        setValid={handleValidation}
                        updateErrorDisplay={resetErrorDisplay}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="Country"
                        name="country"
                        value={profile.country}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={valid.country}
                        validate={validateFilled}
                        setValid={handleValidation}
                        updateErrorDisplay={resetErrorDisplay}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <div className={classes.rowContainer}>
                {(selectedProfile === '' || editing) && (
                <Button
                  className={editing ? classes.greyOutlineButton : classes.greenButton}
                  onClick={() => { if (validate()) { setSaveProfileAlert(true); } }}
                >
                  save as new checkout profile
                </Button>
                )}
                {(editing) && (
                <Button
                  className={classes.greenButton}
                  onClick={() => { if (validate()) { setUpdateProfileAlert(true); } }}
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
                    06
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
                  <Divider />
                  <CheckoutPriceDetails />
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
                  className={classes.greenButton}
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
      <CheckoutProfileNameDialog
        alert={profileNameDialog}
        close={profileNameDialogClosed}
        profileName={profile['profile name']}
        saveProfileName={saveProfileName}
        isNew={!updating}
      />
      <img src={Fruit3} alt="" className={classes.fruit3} />
      <img src={Fruit4} alt="" className={classes.fruit4} />
    </div>
  );
}
export default Checkout;
