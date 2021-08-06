import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Circle from '../../assets/images/CircleLogo.svg';
import ContactBanner from '../../assets/images/ContactBanner.png';
import FB from '../../assets/images/FB.svg';
import LI from '../../assets/images/LI.svg';
import IG from '../../assets/images/IG.svg';
import TW from '../../assets/images/TW.svg';
import farmerSideImg from '../../assets/images/FarmerContact.png';
import { base } from '../../lib/airtable/airtable';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lower: {
    paddingTop: '40px',
  },
  topList: {
    display: 'flex',
    lineHeight: 3,
    position: 'relative',
  },
  innerDoubleList: {
    display: 'flex',
    lineHeight: '28px',
    flexWrap: 'wrap',
    marginTop: '1rem',
    position: 'relative',
    width: '100%',
  },
  innerListTitle: {
    fontFamily: 'Work Sans',
    textDecoration: 'none',
    fontSize: '20px',
    color: '#373737',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  listItem: {
    fontFamily: 'Work Sans',
    textDecoration: 'none',
    fontSize: '20px',
    color: '#373737',
    fontStyle: 'normal',
  },
  listItemTitle: {
    fontFamily: 'Work Sans',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#373737',
    textTransform: 'uppercase',
    fontStyle: 'normal',
  },
  list: {
    listStyleType: 'none',

  },
  innerList: {
    paddingInlineStart: '0px',
    listStyleType: 'none',

  },
  img: {
    paddingRight: 12,
  },
  emailImg: {
    width: '100%',
    height: '100%',
    paddingBottom: 0,
    filter: 'brightness(80%)',
  },
  emailForm: {
    backgroundColor: '#F1F2F2',
    marginBottom: 0,
    paddingLeft: 70,
    fontFamily: 'Work Sans',
    paddingTop: 50,
    paddingBottom: 40,
  },
  inputField: {
    fontFamily: 'Work Sans',
    width: '100%',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'Work Sans',
    fontSize: '1.3em',
    fontWeight: 'bold',
    paddingTop: '30px',
    paddingBottom: '10px',
    textTransform: 'uppercase',
  },
  inputTitle: {
    paddingBottom: 0,
    paddingTop: 0,
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    '&:after': {
      content: '" *"',
      color: '#f00',
    },
  },
  contactBanner: {
    filter: 'brightness(80%)',
    paddingBottom: '40px',
  },
  btn: {
    backgroundColor: '#53AA48',
    paddingBottom: '30px',
    width: '150%',
  },
  alertModal: {
    fontFamily: 'Work Sans',
    fontSize: '15px',
    color: '#373737',
  },
});

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function ContactScreen() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const onChange = (event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  };
  const onSubmit = (event) => {
    event.preventDefault();
    base('Email').create([{
      fields:
      {
        message: formState.message,
        subject: formState.subject,
        'first name': formState.firstName,
        'last name': formState.lastName,
        email: formState.email,
        phone: formState.phone,
      },
    }]);
    setFormState(INITIAL_FORM_STATE);
    setShowAlert(true);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog
        open={showAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText className={classes.alertModal}>
            Your email has been sent to Farm2People!
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <img src={ContactBanner} alt="" className={classes.contactBanner} />
      <div>
        <img src={Circle} alt="" />
        <br />
        <br />
        <Typography className={classes.text}> Follow</Typography>
        <img className={classes.img} src={IG} alt="" />
        <img className={classes.img} src={FB} alt="" />
        <img className={classes.img} src={LI} alt="" />
        <img className={classes.img} src={TW} alt="" />
      </div>
      <div className={classes.topList}>
        <ul className={classes.list}>
          <li className={classes.listItemTitle}>
            Location
          </li>
          <li className={classes.listItemTitle}>
            Phone Number
          </li>
          <li className={classes.listItemTitle}>
            Email
          </li>
          <li className={classes.listItemTitle}>
            Operating Times
          </li>
        </ul>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            Los Angeles - CA
          </li>
          <li className={classes.listItem}>
            (123) 456-7890
          </li>
          <li className={classes.listItem}>
            farm2people@mail.org
          </li>
          <li className={classes.listItem}>
            <div className={classes.innerDoubleList}>
              <ul className={classes.innerList}>
                <li className={classes.innerListTitle}>
                  Sunday
                </li>
                <li className={classes.innerListTitle}>
                  Monday
                </li>
                <li className={classes.innerListTitle}>
                  Tuesday
                </li>
                <li className={classes.innerListTitle}>
                  Wednesday
                </li>
                <li className={classes.innerListTitle}>
                  Thursday
                </li>
                <li className={classes.innerListTitle}>
                  Friday
                </li>
                <li className={classes.innerListTitle}>
                  Saturday
                </li>
              </ul>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  9AM - 5PM
                </li>
                <li className={classes.listItem}>
                  9AM - 8PM
                </li>
                <li className={classes.listItem}>
                  9AM - 8PM
                </li>
                <li className={classes.listItem}>
                  9AM - 8PM
                </li>
                <li className={classes.listItem}>
                  9AM - 8PM
                </li>
                <li className={classes.listItem}>
                  9AM - 8PM
                </li>
                <li className={classes.listItem}>
                  9AM - 5PM
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <form onSubmit={onSubmit}>
        <div className={classes.lower}>
          <br />
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <img className={classes.emailImg} src={farmerSideImg} alt="" />
            </Grid>

            <Grid
              className={classes.emailForm}
              item
              xs={7}
              container
              spacing={0}
            >
              <Grid item xs={12}>
                <Typography className={classes.inputTitle}>
                  Name
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  value={formState.firstName || ''}
                  margin="dense"
                  id="outlined-required"
                  variant="outlined"
                  className={classes.inputField}
                  required
                  name="firstName"
                  onChange={onChange}
                  placeholder="First Name"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={formState.lastName || ''}
                  margin="dense"
                  id="outlined-required"
                  variant="outlined"
                  className={classes.inputField}
                  required
                  name="lastName"
                  onChange={onChange}
                  placeholder="Last Name"
                />
              </Grid>

              <Grid item xs={8}>
                <Typography className={classes.inputTitle}>
                  Email associated with account
                </Typography>
                <TextField
                  value={formState.email || ''}
                  margin="dense"
                  id="outlined-required"
                  variant="outlined"
                  className={classes.inputField}
                  required
                  name="email"
                  onChange={onChange}
                  placeholder="Email"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.inputTitle}>
                  Phone
                </Typography>
                <TextField
                  value={formState.phone || ''}
                  margin="dense"
                  id="outlined-required"
                  variant="outlined"
                  className={classes.inputField}
                  name="phone"
                  onChange={onChange}
                  placeholder="Phone"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.inputTitle}>
                  Subject
                </Typography>
                <TextField
                  value={formState.subject || ''}
                  margin="dense"
                  id="outlined-required"
                  variant="outlined"
                  className={classes.inputField}
                  required
                  name="subject"
                  onChange={onChange}
                  placeholder="Subject"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.inputTitle}>
                  Message
                </Typography>
                <TextField
                  value={formState.message || ''}
                  margin="dense"
                  id="outlined-required"
                  multiline
                  rows={4}
                  variant="outlined"
                  className={classes.inputField}
                  required
                  name="message"
                  onChange={onChange}
                  placeholder="Message"
                />
              </Grid>
              <Grid item xs={12}>
                <Button classname={classes.btn} color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
}
