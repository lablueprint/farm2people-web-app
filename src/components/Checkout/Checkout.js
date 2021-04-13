import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {
  Card, CardContent, Typography, TextField, makeStyles, Grid, Button, ButtonBase,
  FormControlLabel, Checkbox, Select, MenuItem, FormGroup, Divider,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import EditIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Clear';
import CheckoutItem from './CheckoutItem';
import CartDialog from '../Cart/CartDialog'; // now that these dialogs are used in multiple places, it might be good to refactor
import CheckoutProfileNameDialog from './CheckoutProfileNameDialog';
import CheckoutPriceDetails from './CheckoutPriceDetails';
import Fruit3 from '../../assets/images/Fruit3.svg';
import Fruit4 from '../../assets/images/Fruit4.svg';

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
    width: '70%',
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
    fontSize: '18px',
    lineHeight: '140%',
    color: '#373737',
    justifyContent: 'center',
  },
  requestQuoteButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
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
  // false if saving new

  // bools for launching alerts
  const [saveProfileAlert, setSaveProfileAlert] = useState(false);
  const [updateProfileAlert, setUpdateProfileAlert] = useState(false);
  const [quitEditingAlert, setQuitEditingAlert] = useState(false);
  const [profileNameDialog, setProfileNameDialog] = useState(false);
  const updatingName = useRef(false);

  // empty profile for new profile creation
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

  // TODO: only fetch records related to user
  useEffect(() => {
    // fetch all the items in cart and set the subtotal
    setSubtotal(0);
    base('Reserved Listings').select({ view: 'Grid view' }).all().then((records) => {
      records.map((element) => base('Listings').find(element.fields['listing id'][0], (err, record) => {
        // TODO: listing standard price changing
        const currCartItemPrice = element.fields.pallets * record.fields['standard price per unit'];
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
  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (name === 'prefer delivery') { value = !profile['prefer delivery']; }
    setProfile({ ...profile, [name]: value });
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
    delete file[0].fields['quote id'];
    console.log(file[0].fields);
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

  // creates a new profile and then creates a quote orsets as selected profile if needed
  function createProfile(callback) {
    // TODO: link user to profile
    console.log('creating');
    console.log(profile);
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
    // TODO: update listing pallets pending
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
    console.log('submitting');
    setRequesting(true);
    if (validate()) {
      if (selectedProfile !== '') {
        if (editing) { setUpdateProfileAlert(true); } else {
          createQuote(selectedProfile);
        }
      } else {
        setSaveProfileAlert(true);
        // createProfile(createQuote);
      }
    } else {
      setRequesting(false);
    }
  }

  function profileNameDialogClosed() {
    setProfileNameDialog(false);
    if (updating) {
      // if the user is trying to update a profile, edit and submit quote as necessary
      editProfile();
      // if also requesting a quote, create that quote
      if (requesting) { createQuote(selectedProfile); }
    } else if (requesting) {
      // if not updating, but also requesting a quote, create Profile with the quote callback
      createProfile(createQuote);
    } else {
      // if not updating and not requesting, createProfile and set it as selected profile
      createProfile(setSelectedProfile);
    }
  }

  // used by profile name dialog to pass the name out to the profile
  async function saveProfileName(newName) {
    updatingName.current = true;
    setProfile({ ...profile, 'profile name': newName });
  }
  useEffect(() => { if (updatingName.current) { profileNameDialogClosed(); } updatingName.current = false; }, [profile['profile name']]);

  // if the profile name dialog passed a name out, run profileNameDialogClosed
  // after the name is saved

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

  function updateProfileAlertClosed(value) {
    setUpdateProfileAlert(false);
    // if the user wants to update the profile, launch profile name dialog
    if (value) {
      // call backs?
      setUpdating(true);
      setProfileNameDialog(true);
      // if the user doesn't, but is trying to request a quote with an unsaved profile
      // launch save profile dialog
    } else if (requesting) { setSaveProfileAlert(true); }
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

  // TODO:
  // error checking methods
  // state selector
  // info cards for costs
  // find zip code number soln
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
                      <TextField
                        label="First Name"
                        name="first name"
                        value={profile['first name']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        required
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Last Name"
                        name="last name"
                        value={profile['last name']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        required
                        fullWidth
                        variant="outlined"
                        size="small"
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
                      <TextField
                        label="Phone Number"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        fullWidth
                        variant="outlined"
                        size="small"
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
                  <Typography className={classes.stepNum}>
                    05
                    <span className={classes.stepSlash}>/</span>
                    <span className={classes.stepLabel}>Billing Address</span>
                  </Typography>
                  <Grid container spacing={2} className={classes.fieldRow}>
                    <Grid item xs={12}>
                      <TextField
                        label="Address Line 1"
                        name="address line 1"
                        value={profile['address line 1']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address Line 2"
                        name="address line 2"
                        value={profile['address line 2']}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="City"
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="State"
                        name="state"
                        value={profile.state}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Zip Code"
                        name="zipcode"
                        value={profile.zipcode}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        variant="outlined"
                        size="small"
                        type="number"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Country"
                        name="country"
                        value={profile.country}
                        onChange={handleChange}
                        disabled={selectedProfile !== '' && !editing}
                        variant="outlined"
                        size="small"
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
                  onClick={() => { setSaveProfileAlert(true); }}
                >
                  save as new checkout profile
                </Button>
                )}
                {(editing) && (
                <Button
                  className={classes.requestQuoteButton}
                  onClick={() => { setUpdateProfileAlert(true); }}
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
