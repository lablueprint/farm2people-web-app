import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, { useMemo, useState } from 'react';
import './SignIn.css';
import Airlock from '@calblueprint/airlock';

Airlock.configure({
  endpointUrl: 'http://localhost:3000',
  apiKey: 'airlock',
});
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;

const base = Airlock.base(BASE_ID);

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUserName] = useState('');
  const onSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const login = await base.login({ username: email, password });
      const { body: { user } } = login;
      setUserName(`Welcome ${user.fields.display_name}!`);
      setErrorMsg('');
      setTimeout(() => { setLoading(false); }, 1000);
    } catch (err) {
      setErrorMsg('Incorrect username or password');
      setLoading(false);
    }
    // TODO: Replace arbitrary time with calling setLoading(false) only when it finished signing up
  };

  const logOut = async (evt) => {
    evt.preventDefault();
    try {
      const status = await base.logout();
      if (!status.body.success) {
        setErrorMsg('Error logging out.');
      } else {
        setUserName('');
      }
    } catch (err) {
      setErrorMsg('Error logging out.');
    }
  };

  const isInvalid = useMemo(() => password === '' || email === '',
    [email, password]);

  return (
    <form className="root">
      <div>
        <br />
        <Grid container spacing={2}>
          {!userName && <Grid item xs={12} className="large-text">Log in to Your Account</Grid>}
          {userName && <Grid item xs={12} className="large-text">{userName}</Grid>}
          <Grid item xs={12}>
            <TextField
              className="text-fields"
              required
              autoComplete="email"
              type="email"
              label="Email"
              onChange={({ target: { value } }) => setEmail(value)}
              autoFocus
              disabled={loading || userName}
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
              disabled={loading || userName}
            />
          </Grid>
          {errorMsg && <Grid item xs={12} className="error-msg">{errorMsg}</Grid>}
          <Grid item xs={12}>
            <Button disabled={isInvalid || loading || userName} className="text-fields" variant="contained" color="primary" type="button" onClick={onSubmit}>
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button disabled={!userName} className="text-fields" variant="contained" color="primary" type="button" onClick={logOut}>
              Sign Out
            </Button>
          </Grid>
          {/* {userlog && <Grid item xs={12} className="error-msg">{userlog}</Grid>} */}
        </Grid>
      </div>
    </form>
  );
}
