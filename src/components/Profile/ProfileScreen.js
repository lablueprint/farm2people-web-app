import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChangePasswordWindow from './ChangePassword/ChangePasswordWindow';
import '../../styles/fonts.css';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '75vh',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Work Sans',
    paddingTop: '20vh',
  },
});

export default function ProfileScreen() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* TODO: Complete rest of profile screen */}
      <h1 className={classes.title}>My Profile</h1>
      <ChangePasswordWindow />
    </div>
  );
}
