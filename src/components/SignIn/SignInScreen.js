import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, { useMemo, useState, useEffect } from 'react';
import './SignIn.css';
import { loginUser, logoutUser } from '../../lib/airlock/airlock';
import { store } from '../../lib/redux/store';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const onSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      if (!(res.match && res.found)) {
        setErrorMsg('Incorrect username or password');
        setLoading(false);
      } else {
        setDisplayName(`Welcome ${store.getState().userData.user.fields.display_name}`);
        setErrorMsg('');
      }
    } catch (err) {
      setErrorMsg('Incorrect username or password');
      setLoading(false);
    }
    setEmail('');
    setPassword('');
    setLoading(false);
  };

  const logOut = async (evt) => {
    evt.preventDefault();
    try {
      const status = await logoutUser();
      if (!status) {
        setErrorMsg('Error logging out.');
      } else {
        setDisplayName('');
      }
    } catch (err) {
      setErrorMsg('Error logging out.');
    }
  };

  const isInvalid = useMemo(() => password === '' || email === '',
    [email, password]);

  useEffect(() => {
    if (store.getState().authenticated) {
      setDisplayName(`Welcome ${store.getState().userData.user.fields.display_name}`);
    } else {
      setDisplayName('');
    }
  }, [setDisplayName]);

  return (
    <form className="root">
      <div>
        <br />
        <Grid container spacing={2}>
          {!displayName && <Grid item xs={12} className="large-text">Log in to Your Account</Grid>}
          {displayName && <Grid item xs={12} className="large-text">{displayName}</Grid>}
          <Grid item xs={12}>
            <TextField
              className="text-fields"
              required
              autoComplete="email"
              type="email"
              label="Email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              autoFocus
              disabled={loading || displayName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="text-fields"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              disabled={loading || displayName}
            />
          </Grid>
          {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
          <Grid item xs={12}>
            <Button disabled={isInvalid || loading || displayName} className="text-fields" variant="contained" color="primary" type="button" onClick={onSubmit}>
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button disabled={!displayName} className="text-fields" variant="contained" color="primary" type="button" onClick={logOut}>
              Sign Out
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}
