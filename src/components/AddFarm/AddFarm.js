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

    console.log(`error = ${error}`);

    if (error === 'No error') {
      console.log('submit to airtable');
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
          this.setState({ error: error.length === 0 ? err : `${error},  ${err}` });
          // console.error(`error: ${err}`);
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
    }
  }

  /* Checks if form fields have valid input: email, phone number (check length), zip code */
  checkFormInput(event) {
    const { email, phone, zipCode } = this.state;
    let output = '';
    const reg = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    // const reg = /^([A-Za-z0-9_\-\\.])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/;
    if (email !== null && reg.test(email) === false) {
      console.log('email is bad');
      output += 'Email format is invalid \n';
    }
    if (zipCode.length < 5 || Number.isNaN(Number(zipCode))) {
      console.log('zip code is bad');
      output += 'Zipcode format is invalid \n';
    }
    if (phone === null || phone.length < 9) {
      console.log('phone is bad');
      output += 'Phone number format is invalid \n';
    }

    this.setState({
      error: output === '' ? 'No error' : output,
    }, () => { this.handleSubmit(event); });
  }

  render() {
    const {
      farmName, description, email, phone, address, zipCode, error,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.checkFormInput} className="addFarmForm">
          <h1>Register Farm</h1>
          <div>
            <TextField
              className="formFields"
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
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
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
