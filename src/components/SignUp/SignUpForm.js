import React, { useState, useCallback } from 'react';
import Airtable from 'airtable';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import './SignUp.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const INITIAL_FORM_STATE = {
  username: '',
  fullname: '',
  password: '',
};

// Main fields are, username (email), password, First Name, Last Name, Role
export default function SignUpForm() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [role, setRole] = React.useState('');

  const roleChange = (event) => {
    setRole(event.target.value);
  };
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    base('Users').create([
      {
        fields: {
          username: formState.username,
          password: formState.password,
          'user type': role,
          'display name': formState.fullname,
          approval: 'unapproved',
          'seller quotes': [
            'recJFletqOGSpcwxu',
            'rec2NN9Uc2gVMAD6O',
          ],
        },
      },
    ]);
  }, [formState.username, formState.fullname, formState.password, role]);

  const onChange = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  }, [formState]);

  return (
    <form className="root" onSubmit={onSubmit}>
      <div>
        <h1>
          Create an Account
        </h1>
        <br />
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              className="text-fields"
              required
              name="fullname"
              id="fullname"
              value={formState.fullname}
              onChange={onChange}
              placeholder="Full Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="text-fields"
              required
              name="username"
              id="username"
              value={formState.username}
              onChange={onChange}
              placeholder="Email Address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="text-fields"
              required
              name="password"
              id="standard-password-input"
              value={formState.password}
              onChange={onChange}
              type="password"
              placeholder="Password"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel
              style={{ disableAnimation: false }}
              disableAnimation={false}
              htmlFor="searchCriteria"
            >
              Role
            </InputLabel>
            <Select
              className="text-fields"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              onChange={roleChange}
            >
              <MenuItem value="vendor">Vendor</MenuItem>
              <MenuItem value="buyer">Buyer</MenuItem>
              <MenuItem value="agency">Agency</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button className="text-fields" variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}
