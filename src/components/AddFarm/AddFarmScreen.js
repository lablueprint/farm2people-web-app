import {
  TextField, Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import './AddFarmScreen.css';
import { makeStyles } from '@material-ui/core/styles';
import { base } from '../../lib/airtable/airtable';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
});

export default function AddFarmScreen() {
  const [farmName, setFarmName] = useState(null);
  const [description, setDescription] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showAlert, setAlert] = useState(false);
  const classes = useStyles();

  /* Checks if form fields have valid input: email, phone number (check length), zip code */
  function checkFormInput(event) {
    event.preventDefault();

    let output = '';
    // regex check for email, checks that email input has (letters)@(letters).(letters)
    const reg = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (email !== null && reg.test(email) === false) {
      output += 'Email format is invalid. \n';
    }
    // Valid zip codes have lengths in between 5-10 and are numbers
    if (zipCode.length < 5 || zipCode.length > 10 || Number.isNaN(Number(zipCode))) {
      if (output.length > 0) {
        output += ' ';
      }
      output += 'Zipcode format is invalid. \n';
    }
    // Valid phone numbers have 9 or more digits
    if (phone.length < 9) {
      if (output.length > 0) {
        output += ' ';
      }
      output += 'Phone number format is invalid. \n';
    }
    return output;
  }

  /* Handles when the form is submitted, passes info to airtable */
  function handleSubmit(event) { // event
    event.preventDefault(); // Prevent auto refresh
    const formInputError = checkFormInput(event);

    // If form input was valid, create new farm. Otherwise, alert error message(s)
    if (formInputError === '') {
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
          setErrorMsg(errorMsg.length === 0 ? err : `${errorMsg},  ${formInputError}`);
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
    } else {
      setErrorMsg(formInputError);
      setAlert(true);
    }
  }

  return (
    <div className={classes.root}>
      {(showAlert && errorMsg)
        && (
          <Alert severity="error" className="errorAlert" onClose={() => setAlert(false)}>
            <AlertTitle> Input error </AlertTitle>
            {errorMsg}
          </Alert>
        )}
      <form onSubmit={(event) => handleSubmit(event)} className="addFarmForm">
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
            required
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
            required
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Enter your address"
            value={address || ''}
            required
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Enter your zip code"
            value={zipCode || ''}
            required
            onChange={(event) => setZipCode(event.target.value)}
          />
        </div>
        <div>
          <Button
            type="submit"
            value="submit"
            variant="contained"
            color="primary"
          >
            Submit!
          </Button>
        </div>
      </form>
    </div>
  );
}
