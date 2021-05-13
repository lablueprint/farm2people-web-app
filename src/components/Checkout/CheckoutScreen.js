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
import { store } from '../../lib/redux/store';

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
    marginBottom: 60,
  },
  title: {
    fontFamily: 'Work Sans',
    fontWeight: 'bolder',
    fontSize: 50,
    color: '#373737',
    paddingTop: '2%',
    paddingBottom: '10px',
  },
  farmTitle: {
    fontFamily: 'Work Sans',
    fontWeight: '500',
    fontSize: '32px',
    lineHeight: '140%',
    color: '#373737',
    paddingBottom: '10px',
  },
  card: {
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
  textFieldRow: {
    paddingBottom: 10,
  },
  buttonRow: {
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
  checkoutWithoutSavingCheckBox: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '15px',
    lineHeight: '19px',
    color: '#373737',
  },
  fruit3: {
    position: 'absolute',
    width: '180px',
    height: 'auto',
    right: '.5vw',
    top: '60vh',
    zIndex: '-2',
  },
  fruit4: {
    position: 'absolute',
    width: '160px',
    height: 'auto',
    right: '0vw',
    top: '79vh',
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

function CheckoutScreen() {
  const classes = useStyles();
  const history = useHistory();
  const [editing, setEditing] = useState(false); // bool if editing
  const [items, setItems] = useState([]); // items in cart
  const [farmsDict, setFarmsDict] = useState({}); // dictionary of item's farms in cart { id: name}
  const [subtotal, setSubtotal] = useState(0); // subtotal of cart
  const [pastProfiles, setPastProfiles] = useState([]); // array of all profiles related to user
  const [selectedProfile, setSelectedProfile] = useState(''); // id of selected profile
  const [requesting, setRequesting] = useState(false); // bool whether quote is being requested
  const [updating, setUpdating] = useState(true); // bool whether a profile is being updated
  const [checkoutWithoutSaving, setCheckoutWithoutSaving] = useState(false);
  const [errorDisplayStatus, setErrorDisplayStatus] = useState(''); // string used to set error display
  // 'reset' doesn't display until errors edited, 'show' shows all the errors, even unedited
  const [airtableError, setAirtableError] = useState('');

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
  const initializeValid = {
    'first name': false,
    'last name': false,
    phone: false,
    email: false,
    'address line 1': false,
    'address line 2': true, // always valid, but look into possible validation
    city: false,
    state: false,
    country: false,
    zipcode: false,
  };

  // valid initializer for loading past profiles (guaranteed to be valid)
  const initializePastProfileValid = {
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
  const [formValid, setFormValid] = useState(initializeValid);
  const paymentValid = [profile['can ACH'], profile['can paypal'], profile['can card'], profile['can check']].filter((v) => v).length > 0;

  // Fetches all necessary airtable data on start
  useEffect(() => {
    // fetch all the items in cart and set the subtotal
    setSubtotal(0);

    base('Users').find(store.getState().userData.user.id, (err, user) => {
      if (err) { setAirtableError(err); return; }
      let tempProfiles = [];
      let tempItems = [];
      const tempFarms = {};

      // fetch each item in the user's cart
      if (user.fields.cart) {
        user.fields.cart.forEach((id) => {
          base('Reserved Listings').find(id, (e, item) => {
            if (e) { setAirtableError(e); return; }
            tempItems = [...tempItems, item];
            setItems(tempItems);

            // fetch item's farm and add to farms if necessary
            const farmID = item.fields['farm id'];
            base('Farms').find(farmID, (error, farm) => {
              if (error) { setAirtableError(error); }
              if (!tempFarms[farmID]) {
                tempFarms[farmID] = farm.fields['farm name'];
              }
            });
            setFarmsDict(tempFarms);

            // fetch price of listing and add to subtotal
            base('Listings').find(item.fields['listing id'][0], (er, record) => {
              if (er) { setAirtableError(er); return; }
              const useAgencyPrice = store.getState().userData.user.fields['user type'] === 'agency' && record.fields['agency price per grouped produce type'] && record.fields['agency price per grouped produce type'] < record.fields['standard price per grouped produce type'];
              const currCartItemPrice = useAgencyPrice ? record.fields['agency price per grouped produce type'] : record.fields['standard price per grouped produce type'];
              const currCartItemCost = item.fields.pallets * record.fields['grouped produce type per pallet'] * currCartItemPrice;
              setSubtotal((prevTotal) => (prevTotal + currCartItemCost));
            });
          });
        });
      }

      // fetch each of the users profiles
      if (user.fields['checkout profiles']) {
        user.fields['checkout profiles'].forEach((id) => {
          base('Checkout Profiles').find(id, (e, p) => {
            if (e) { setAirtableError(e); return; }
            tempProfiles = [...tempProfiles, p];
            setPastProfiles(tempProfiles);
          });
        });
      }
    });
  }, []);

  // links to success page
  // runs on successful submission of quote request
  const onCheckoutSuccess = () => history.push('/cart/success', { farms: Object.entries(farmsDict).map(([, farm]) => farm).join(' & ') });

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
    setFormValid({ ...formValid, [name]: value });
  };

  // returns whether every field within the profile is valid
  function validate() {
    setErrorDisplayStatus('show');
    let val = true;
    Object.entries(formValid).forEach(([, v]) => {
      if (!v) { val = false; }
    });
    return val && paymentValid;
  }

  // resets errorDisplayStatus to '' so each change of state is registered correctly
  useEffect(() => {
    setErrorDisplayStatus('');
  }, [errorDisplayStatus]);

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
    return (profile.phone.match(/\d/g) && profile.phone.match(/\d/g).length === 10) ? '' : 'Phone number should have 10 digits';
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
    delete file[0].fields['user id'];
    file = file[0].fields;
    setProfile(file);
  };

  // handles the selection of a checkout profile
  const handlePreload = (event) => {
    setEditing(false);
    setCheckoutWithoutSaving(false);
    setSelectedProfile(event.target.value);

    if (event.target.value === '') {
      // initialize to empty
      setProfile(emptyProfile);
      setFormValid(initializeValid);
      setErrorDisplayStatus('reset');
    } else {
      // initialize to filled, load the profile
      setFormValid(initializePastProfileValid);
      loadProfile(event.target.value);
    }
  };

  // creates a new profile and then runs a callback on the new profile id
  // callback used for creating quotes with new profile id
  // or setting as selected profile if not submitting yet
  function createProfile(saveToUser, callback) {
    if (saveToUser) {
      profile['user id'] = [store.getState().userData.user.id];
    }

    base('Checkout Profiles').create([{ fields: profile }],
      (err, records) => {
        if (err) {
          setAirtableError(err);
        } else {
          const p = records[0];
          // The profile is saved to the past profile array temporarily regardless of whether the
          // user wants it saved permanently
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
        setAirtableError(err);
      }
      // update the profile in the pastProfile array
      const editedProfile = records[0];
      const profiles = pastProfiles.filter((p) => (p.id !== selectedProfile));
      setPastProfiles([editedProfile, ...profiles]);
    });
  }

  // Create a quote with the passed checkoutProfile id
  function createQuote(checkoutProfile) {
    // TODO: check that listings are available + update listing pallets pending
    if (checkoutProfile != null) {
      base('Quotes').create([
        {
          fields: {
            'buyer id': [store.getState().userData.user.id],
            'reserved listings': items.map((item) => (item.id)),
            'initial cost': subtotal,
            status: 'In Progress',
            'checkout profile': [checkoutProfile],
          },
        },
      ],
      (err) => {
        if (err) {
          setAirtableError(err);
        } else {
          // clear the cart
          base('Users').update([
            {
              id: store.getState().userData.user.id,
              fields: {
                cart: [],
              },
            },
          ],
          (er) => {
            if (er) {
              setAirtableError(er);
            }
          });
          onCheckoutSuccess();
        }
      });
    }
  }

  // Handles 'Request Quote' button press (submission of form)
  function handleSubmit(e) {
    e.preventDefault();
    setRequesting(true);
    if (validate()) {
      // if the user doesn't want to save the form information, immediately go to checkout
      if (checkoutWithoutSaving) {
        createProfile(false, createQuote);
      }
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
      setRequesting(false);
    }
  }

  // handles the closing of the profile name dialog (used whenever profile saves/edits made)
  function profileNameDialogClosed() {
    setProfileNameDialog(false);
    setCheckoutWithoutSaving(false);
    if (updating) {
      // if the user is trying to update a profile, edit
      editProfile();
      // if also requesting a quote, create that quote
      if (requesting) { createQuote(selectedProfile); }
    } else if (requesting) {
      // if creating a new profile and requesting a quote, create Profile with the quote callback
      createProfile(true, createQuote);
    } else {
      // if just creating a new profile (not updating or requesting), createProfile and set it as
      // selected profile
      createProfile(true, setSelectedProfile);
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
    setSaveProfileAlert(false);
    setUpdating(false);

    if (value) {
      // if user wants to save the profile, launch the profile name dialog
      setEditing(false);
      setProfileNameDialog(true);
    } else if (requesting) {
      // otherwise if requesting a quote, just create a unlinked profile and quote
      createProfile(false, createQuote);
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
      setCheckoutWithoutSaving(false);
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
  // style airtable error if necessary
  return (
    <div>
      <div className={classes.container}>
        <Typography className={classes.title}> Checkout </Typography>
        <Typography className={classes.farmTitle}>
          {Object.entries(farmsDict).map(([, farm]) => farm).join(' & ')}
        </Typography>
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
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.stepNum}>
                    01
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>Name</span>
                  </Typography>
                  <Grid container spacing={1} className={classes.textFieldRow}>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="First Name"
                        name="first name"
                        value={profile['first name']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={formValid['first name']}
                        setValid={handleValidation}
                        validate={validateFilled}
                        updateErrorDisplay={errorDisplayStatus}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="Last Name"
                        name="last name"
                        value={profile['last name']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={formValid['last name']}
                        setValid={handleValidation}
                        validate={validateFilled}
                        updateErrorDisplay={errorDisplayStatus}
                      />
                    </Grid>
                  </Grid>
                  <Typography className={classes.stepNum}>
                    02
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>Contact Information</span>
                  </Typography>
                  <Grid container spacing={1} className={classes.textFieldRow}>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="Phone Number"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={formValid.phone}
                        setValid={handleValidation}
                        validate={validatePhone}
                        updateErrorDisplay={errorDisplayStatus}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="Email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={formValid.email}
                        setValid={handleValidation}
                        validate={validateEmail}
                        updateErrorDisplay={errorDisplayStatus}
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
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.stepNum}>
                    04
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>
                      Which payment methods are you comfortable with using?
                    </span>
                  </Typography>
                  <FormControl error={!paymentValid}>
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
                  <Grid container spacing={1} className={classes.textFieldRow}>
                    <Grid item xs={12}>
                      <CheckoutTextField
                        placeholder="Address Line 1"
                        name="address line 1"
                        value={profile['address line 1']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={formValid['address line 1']}
                        validate={validateFilled}
                        setValid={handleValidation}
                        updateErrorDisplay={errorDisplayStatus}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CheckoutTextField
                        placeholder="Address Line 2"
                        name="address line 2"
                        value={profile['address line 2']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={formValid['address line 2']}
                        setValid={handleValidation}
                        updateErrorDisplay={errorDisplayStatus}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="City"
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={formValid.city}
                        validate={validateFilled}
                        setValid={handleValidation}
                        updateErrorDisplay={errorDisplayStatus}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="State"
                        name="state"
                        value={profile.state}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={formValid.state}
                        validate={validateFilled}
                        setValid={handleValidation}
                        updateErrorDisplay={errorDisplayStatus}
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
                        valid={formValid.zipcode}
                        validate={validateZip}
                        setValid={handleValidation}
                        updateErrorDisplay={errorDisplayStatus}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CheckoutTextField
                        placeholder="Country"
                        name="country"
                        value={profile.country}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        valid={formValid.country}
                        validate={validateFilled}
                        setValid={handleValidation}
                        updateErrorDisplay={errorDisplayStatus}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <div className={classes.buttonRow}>
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
              { (editing) && (
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={checkoutWithoutSaving}
                    onChange={(event) => { setCheckoutWithoutSaving(event.target.checked); }}
                    classes={{
                      root: {
                        color: '#373737',
                        '&$checked': {
                          color: '#373737',
                        },
                      },
                    }}
                    color="default"
                  />
                    )}
                label="Checkout with this info without saving"
                disabled={selectedProfile !== '' && !editing}
                classes={{ label: classes.checkoutWithoutSavingCheckBox }}
              />
              )}
            </Grid>
            <Grid item xs={6} md={6} lg={5}>
              <Typography className={classes.sectionHeader}> Your Order</Typography>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.stepNum}>
                    06
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>Items</span>
                  </Typography>
                  {Object.entries(farmsDict).map(([id, farm]) => (
                    <>
                      <Typography className={classes.farmHeader}>
                        {farm}
                      </Typography>
                      {items.filter((listing) => listing.fields['farm id'][0] === id).map((item) => (
                        <CheckoutItem
                          key={item.id}
                          pallets={item.fields.pallets}
                          listingID={item.fields['listing id']}
                        />
                      ))}
                    </>
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
              <div className={classes.buttonRow}>
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
        {airtableError && <p>{airtableError}</p>}
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
export default CheckoutScreen;
