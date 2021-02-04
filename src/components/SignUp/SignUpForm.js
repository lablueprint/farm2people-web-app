import React, { useState, useCallback, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import './SignUp.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { signupUser } from '../../lib/airlock/airlock';

const INITIAL_FORM_STATE = {
  username: '',
  fullname: '',
  password: '',
  confirmPassword: '',
};

export default function SignUpForm() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [role, setRole] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const roleChange = (event) => {
    setRole(event.target.value);
  };
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    try {
      /* eslint-disable */
      // TODO: Figure out if user, token variables need to persist
      const res = signupUser(formState.username, formState.password, formState.fullname, role);

    } catch (err) {
      console.log("Error in signupuser func")
      if (err) {
        setErrorMsg(err);
      }
      
    }
    setFormState(INITIAL_FORM_STATE);
    setRole('');
    // TODO: Replace arbitrary time with calling setLoading(false) only when it finished signing up
    setTimeout(() => { setLoading(false); }, 1000);
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

  const isInvalid = useMemo(() => (
    formState.password !== formState.confirmPassword
      || formState.password === ''
      || formState.email === ''
      || formState.username === ''
      || role === ''),
  [formState.confirmPassword, formState.email, formState.password,
    role, formState.username]);

  const repeatPwdCheck = useMemo(() => {
    let msg = '';
    if (formState.password === '' && formState.confirmPassword === '') {
      msg = '';
    } else if (formState.password !== '' && formState.confirmPassword !== '') {
      if (formState.password !== formState.confirmPassword) {
        msg = "Passwords don't match!";
      }
    }
    return msg;
  },
  [formState.confirmPassword, formState.password]);

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
              autoFocus
              className="text-fields"
              required
              name="fullname"
              id="fullname"
              value={formState.fullname}
              onChange={onChange}
              placeholder="Full Name"
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="text-fields"
              required
              name="confirmPassword"
              id="standard-password-input"
              value={formState.confirmPassword}
              onChange={onChange}
              type="password"
              placeholder="Confirm Password"
              disabled={loading}
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
              disabled={loading}
            >
              <MenuItem value="vendor">Vendor</MenuItem>
              <MenuItem value="buyer">Buyer</MenuItem>
              <MenuItem value="agency">Agency</MenuItem>
            </Select>
          </Grid>
          {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
          {repeatPwdCheck && <Grid item xs={12} className="error-msg">{repeatPwdCheck}</Grid>}
          <Grid item xs={12}>
            <Button disabled={isInvalid || loading} className="text-fields" variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}