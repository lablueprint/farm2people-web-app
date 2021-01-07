import {
  TextField, Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import './AddFarm.css';

// Airtable set-up here
const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY })
  .base(process.env.REACT_APP_AIRTABLE_BASE_KEY);

export default function AddFarm() {
  const [farmName, setFarmName] = useState(null);
  const [description, setDescription] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  // useStateWithCallbackLazy is a custom hook allowing callbacks like w/ setState
  const [errorMsg, setErrorMsg] = useStateWithCallbackLazy(null);
  // const [showAlert, setAlert] = useState(false);

  /* Handles when the form is submitted, passes info to airtable */
  function handleSubmit(event) {
    event.preventDefault();

    // If form input was valid, create new farm. Otherwise, alert error message(s)
    if (errorMsg === 'No error') {
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
      ], (err) => {
        if (err) {
          setErrorMsg(errorMsg.length === 0 ? err : `${errorMsg},  ${errorMsg}`);
        }
      });

      // Reset state to initial blank values for next form entry
      setFarmName(null);
      setDescription(null);
      setEmail(null);
      setPhone(null);
      setAddress(null);
      setZipCode(null);
      setErrorMsg(null);
      // setAlert(false);
    }
  }

  /* Checks if form fields have valid input: email, phone number (check length), zip code */
  function checkFormInput(event) {
    let output = '';
    // regex check for email, checks that email input has (letters)@(letters).(letters)
    const reg = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (email !== null && reg.test(email) === false) {
      output += 'Email format is invalid \n';
    }
    // Valid zip codes have lengths in between 5-10 and are numbers
    if (zipCode.length < 5 || zipCode.length > 10 || Number.isNaN(Number(zipCode))) {
      output += 'Zipcode format is invalid \n';
    }
    // Valid phone numbers have 9 or more digits
    if (phone === null || phone.length < 9) {
      output += 'Phone number format is invalid \n';
    }

    // Set errorMsg, then handleSubmit (pass as callback so state changes before submit handled)
    setErrorMsg(output === '' ? 'No error' : output, () => handleSubmit(event));
  }

  return (
    <div>
      <form onSubmit={checkFormInput} className="addFarmForm">
        <h1>Register Farm</h1>
        <div>
          <TextField
            className="formFields"
            id="outlined-basic"
            label="Enter your farm name"
            value={farmName || ''}
            required
            onChange={(event) => setFarmName(event.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Enter your description"
            value={description || ''}
            multiline
            rowsMax={4}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <TextField
          id="outlined-basic"
          label="Enter your email"
          value={email || ''}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <div />
        <div>
          <TextField
            id="outlined-basic"
            label="Enter your phone number"
            value={phone || ''}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Enter your address"
            value={address || ''}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Enter your zip code"
            value={zipCode || ''}
            onChange={(event) => setZipCode(event.target.value)}
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
      <h2>{errorMsg || ''}</h2>
    </div>
  );
}
