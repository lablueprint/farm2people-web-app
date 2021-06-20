import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SignInScreen from '../SignIn';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
});

export default function ContactScreen() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SignInScreen />
    </div>
  );
}
