import React, { useState, useCallback } from 'react';
import Airtable from 'airtable';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const INITIAL_FORM_STATE = {
  username: '',
  fullname: '',
  password: '',
  role: '',
};

const ROLES = [
  {
    value: 'vendor',
    label: 'Vendor',
  },
  {
    value: 'buyer',
    label: 'Buyer',
  },
  {
    value: 'agency',
    label: 'Agency',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

// Main fields are, username (email), password, First Name, Last Name, Role
export default function SignUpForm() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  // const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles();
  // function(err, records) {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     records.forEach(function (record) {
  //       console.log(record.getId());
  //     });
  //   });
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    base('Users').create([
      {
        fields: {
          username: formState.username,
          password: formState.password,
          'user type': formState.role,
          'display name': formState.fullname,
          approval: 'unapproved',
          'seller quotes': [
            'recJFletqOGSpcwxu',
            'rec2NN9Uc2gVMAD6O',
          ],
        },
      },
    ]);
    // firebase.auth().createUserWithEmailAndPassword(formState.email, formState.password)
    //   .then((userCredential) => firebase.collection('users')
    //     .doc(userCredential.user.uid)
    //     .set({
    //       email: formState.email,
    //       role: formState.role,
    //     }))
    //   .then(() => {
    //     history.push(ROUTES.RESOURCES);
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error.message);
    //   });
  }, [formState.username, formState.fullname, formState.password, formState.role]);

  const onChange = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  }, [formState]);

  // const isInvalid = useMemo(() => (
  //   formState.password !== formState.confirmPassword
  //     || formState.password === ''
  //     || formState.email === ''
  //     || formState.username === ''
  //     || formState.role === ''),
  // [formState.confirmPassword, formState.email, formState.password,
  //   formState.role, formState.username]);

  // const roleRadioButtons = Object.entries(ROLES).map((kv, i) => (
  //   <label htmlFor={i}>
  //     <input
  //       name="role"
  //       id={i}
  //       key={kv[0]}
  //       type="radio"
  //       onChange={onChange}
  //       value={kv[0]}
  //     />
  //     {kv[0]}
  //   </label>
  // ));

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <TextField
        required
        name="username"
        id="username"
        value={formState.username}
        onChange={onChange}
        defaultValue="Email Address"
      />
      <TextField
        required
        name="display name"
        id="fullname"
        value={formState.displayName}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <TextField
        required
        name="password"
        id="standard-password-input"
        value={formState.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <TextField
        required
        id="role-select"
        select
        label="Select"
        value={formState.role}
        onChange={onChange}
        helperText="Please select your role"
      >
        {ROLES.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <button type="submit">
        Sign Up
      </button>
      {/* {errorMessage && <p>{errorMessage}</p>} */}
    </form>
  );
}
