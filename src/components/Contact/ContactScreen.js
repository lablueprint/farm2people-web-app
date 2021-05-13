import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Airtable from 'airtable';
import {
  Typography,
} from '@material-ui/core';
import Image1 from './top.png';
import Circle from './Circle Logo.png';
import FB from './FB.png';
import LI from './LI.png';
import IG from './IG.png';
import TW from './TW.png';
import image2 from './image2.png';

const useStyles = makeStyles({

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    /* for horizontal aligning of child divs */
    justifyContent: 'center',
    /* for vertical aligning */
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

  ListItem: {
    fontFamily: 'Work Sans',
    textDecoration: 'none',
    fontSize: '20px',
    color: '#373737',
    fontStyle: 'normal',
  },
  ListItemTitle: {
    fontFamily: 'Work Sans',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#373737',
    textTransform: 'uppercase',
    fontStyle: 'normal',
  },

  List: {
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

  navLinksActive: {
    textDecoration: 'underline',
    textDecorationColor: '#484848',
    textDecorationThickness: '2px',
    textUnderlineOffset: '1.5px',
  },
  inputField: {
    fontFamily: 'Work Sans',
    width: '100%',
    backgroundColor: 'white',

  },
  inputFieldModified: {
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
  noSpacingGrid: {
    height: 0,
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

  image1: {
    filter: 'brightness(80%)',
    paddingBottom: '60px',
  },

  btn: {
    backgroundColor: '#53AA48',
    paddingBottom: '30px',
    width: '150%',
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

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

export default function ContactScreen() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);

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
  };
  const classes = useStyles();
  return (

    <div className={classes.root}>
      <img src={Image1} alt="" className={classes.image1} />
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

        <ul className={classes.List}>
          <li className={classes.ListItemTitle}>
            Location
          </li>
          <li className={classes.ListItemTitle}>
            Phone Number
          </li>
          <li className={classes.ListItemTitle}>
            Email
          </li>
          <li className={classes.ListItemTitle}>
            Operating Times
          </li>
        </ul>

        <ul className={classes.List}>
          <li className={classes.ListItem}>
            Los Angeles - CA
          </li>
          <li className={classes.ListItem}>
            (123) 456-7890
          </li>
          <li className={classes.ListItem}>
            farm2people@mail.org
          </li>
          <li className={classes.ListItem}>
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

              <ul className={classes.List}>
                <li className={classes.ListItem}>
                  9AM - 5PM
                </li>
                <li className={classes.ListItem}>
                  9AM - 8PM
                </li>
                <li className={classes.ListItem}>
                  9AM - 8PM
                </li>
                <li className={classes.ListItem}>
                  9AM - 8PM
                </li>
                <li className={classes.ListItem}>
                  9AM - 8PM
                </li>
                <li className={classes.ListItem}>
                  9AM - 8PM
                </li>
                <li className={classes.ListItem}>
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
              <img className={classes.emailImg} src={image2} alt="" />
            </Grid>

            <Grid
              className={classes.emailForm}
              item
              xs={7}
              container
              spacing={0}
            >
              <Grid item xs={12} className={classes.noSpacingGrid}>
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
