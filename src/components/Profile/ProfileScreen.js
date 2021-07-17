import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChangePasswordWindow from './ChangePassword/ChangePasswordWindow';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
});

export default function ProfileScreen() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* TODO: Complete rest of profile screen */}
      <h1>Profile Screen</h1>
      <ChangePasswordWindow />
    </div>
  );
}
