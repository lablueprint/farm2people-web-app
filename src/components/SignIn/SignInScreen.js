import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { history, store } from '../../lib/redux/store';
import { loginUser } from '../../lib/airlock/airlock';
import fruitImg from '../../assets/images/sign-in-fruit.svg';
import '../../styles/fonts.css';

const useStyles = makeStyles({
  root: {
    marginTop: '5%',
    minHeight: '100vh',
  },
  textInput: {
    width: '40%',
    fontFamily: 'Work Sans',
    zIndex: 0,
  },
  title: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '40px',
    lineHeight: '59px',
    color: '#373737',
  },
  signinButton: {
    fontFamily: 'Work Sans',
    background: '#53AA48',
    borderRadius: '6px',
    width: '10%',
    minWidth: 100,
    /* The size of the fruit images so we can center the button */
    marginRight: 188.64,
    '&:hover': {
      background: '#53AA48',
    },
  },
  horizontalContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  questionText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    lineHeight: '140%',
  },
  signupText: {
    fontFamily: 'Work Sans',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '140%',
    textDecorationLine: 'underline',
    cursor: 'pointer',
    color: '#2D5496',
  },
  displayNameText: {
    fontSize: 'large',
    width: '40%',
    fontWeight: 'bold',
    color: 'blue',
  },
  errorMsg: {
    fontFamily: 'Work Sans',
    color: 'red',
  },
});

export default function SignInScreen(props) {
  const {
    /* authenticated is a boolean and userRole is a string that can be
    can either be: {'', 'buyer', 'seller', 'agency'} */
    setAuthAndRefreshNavbar,
    setUserRoleAndRefreshNavbar,
  } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  /* TODO: remove this display name. Currently here to showcase to devs how to access redux store */
  const [displayName, setDisplayName] = useState('');

  const classes = useStyles();

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      if (!(res.match && res.found)) {
        setErrorMsg('Incorrect username or password');
        setLoading(false);
      } else {
        setDisplayName(`Welcome ${store.getState().userData.user.fields['contact name']}`);
        setErrorMsg('');
        setAuthAndRefreshNavbar(true);
        setUserRoleAndRefreshNavbar(store.getState().userData.user.fields['user type']);
        history.push('/');
      }
    } catch (err) {
      setErrorMsg('Incorrect username or password');
      setLoading(false);
    }
    setEmail('');
    setPassword('');
    setLoading(false);
  };

  const isInvalid = useMemo(() => password === '' || email === '',
    [email, password]);

  useEffect(() => {
    if (store.getState().authenticated) {
      setDisplayName(`Welcome ${store.getState().userData.user.fields['contact name']}`);
    } else {
      setDisplayName('');
    }
  }, [setDisplayName]);

  return (
    <form className={classes.root}>
      <div>
        <Grid container spacing={2}>
          {!displayName && <Grid item xs={12} align="center" className={classes.title}> Sign In</Grid>}
          {displayName && <Grid item xs={12} align="center" className={classes.displayNameText}>{displayName}</Grid>}
          <Grid item xs={12} align="center">
            <TextField
              variant="outlined"
              className={classes.textInput}
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
          <Grid item xs={12} align="center">
            <TextField
              variant="outlined"
              className={classes.textInput}
              required
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              disabled={loading || displayName}
            />
          </Grid>
          {errorMsg && <Grid item xs={12} align="center" className={classes.errorMsg}>{errorMsg}</Grid>}
          <Grid container justify="center">
            <div className={classes.horizontalContainer}>
              <img src={fruitImg} alt="" />
              <Button disabled={isInvalid || loading || displayName} className={classes.signinButton} variant="contained" color="primary" type="button" onClick={onSubmit}>
                Sign In
              </Button>
            </div>
          </Grid>
          <Grid container justify="center">
            <div className={classes.horizontalContainer}>
              <Typography
                className={classes.questionText}
              >
                Don&apos;t have an account?&nbsp;&nbsp;&nbsp;
              </Typography>
              <Typography className={classes.signupText}>Sign Up</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}

SignInScreen.propTypes = {
  setAuthAndRefreshNavbar: PropTypes.func.isRequired,
  setUserRoleAndRefreshNavbar: PropTypes.func.isRequired,

};
