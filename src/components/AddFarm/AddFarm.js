import {
  TextField, Button,
} from '@material-ui/core';
import React from 'react';
import './AddFarm.css';

// Airtable set-up here
const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY })
  .base(process.env.REACT_APP_AIRTABLE_BASE_KEY);

export default class AddFarm extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor sb printed');
    this.state = {
      farmName: null,
      description: null,
      /* userID: null, */
      email: null,
      phone: null,
      address: null,
      zipCode: null,
      error: null,
      // showAlert: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFormInput = this.checkFormInput.bind(this);
  }

  /* Handles when the form is submitted, passes info to airtable */
  handleSubmit(event) {
    event.preventDefault();
    const {
      farmName, description, email, phone, address, zipCode, error,
    } = this.state;
    this.setState({ error: this.checkFormInput() });

    console.log(`form error = ${error}`);

    if (error === 'No error') {
      base('Farms').create([
        {
          fields: {
            'farm name': farmName,
            description,
            email,
            phone,
            address,
            'zip code': Number(zipCode),
          },
        },
      ], (err, records) => {
        if (err) {
          console.error(`error: ${err}`);
          return;
        }
        records.forEach((record) => {
          console.log(`record id: ${record.getId()}`);
        });
      });

      this.setState({ // Reset state to initial blank values
        farmName: null,
        description: null,
        // userID: null,
        email: null,
        phone: null,
        address: null,
        zipCode: null,
        error: null,
        // showAlert: false,
      });
    } else {
      // this.setState({ showAlert: true });
    }

    console.log(`user submitted farm info'${farmName || 'null'}`);
  }

  /* Checks if form fields have valid input: email, phone number (check length), zip code */
  checkFormInput() {
    const { email, phone, zipCode } = this.state;
    let output = '';
    const reg = /^([A-Za-z0-9_\-\\.])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/;
    if (email !== null && reg.test(email) === false) {
      output += 'Email format is invalid \n';
    }
    if (zipCode !== parseInt(zipCode, 10)) {
      output += 'Zipcode format is invalid \n';
    }
    if (phone === null || phone.length < 9) {
      output += 'Phone number format is invalid \n';
    }

    return output === '' ? 'No error' : output;
  }

  render() {
    const {
      farmName, description, email, phone, address, zipCode, error,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>
            {farmName || 'no farm name :('}
            {description || 'no description :('}
            {email || 'no email :('}
            {phone || 'no phone :('}
            {address || 'no address :('}
            {zipCode || 'no zip code :('}
          </h1>
          <div>
            <TextField
              id="outlined-basic"
              label="Enter your farm name"
              value={farmName || ''}
              required
              onChange={(event) => this.setState({ farmName: event.target.value })}
            />
          </div>
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="Enter your description"
              value={description || ''}
              multiline
              rowsMax={4}
              onChange={(event) => this.setState({ description: event.target.value })}
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Enter your email"
            value={email || ''}
            required
            onChange={(event) => this.setState({ email: event.target.value })}
          />
          <div />
          <div>
            <TextField
              id="outlined-basic"
              label="Enter your phone number"
              value={phone || ''}
              onChange={(event) => this.setState({ phone: event.target.value })}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Enter your address"
              value={address || ''}
              onChange={(event) => this.setState({ address: event.target.value })}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Enter your zip code"
              value={zipCode || ''}
              onChange={(event) => this.setState({ zipCode: event.target.value })}
            />
          </div>
          <div>
            <Button
              type="submit"
              value="submit"
            >
              Submit!
            </Button>
          </div>
        </form>
        <h2>{error || ''}</h2>
      </div>
    );
  }
}
