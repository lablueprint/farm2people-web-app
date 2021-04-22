import React from 'react';
import {
  Box, Button,
} from '@material-ui/core';
import useStyles from './ChangePasswordStyles';
import ChangePasswordForm from './ChangePasswordForm';
import ChangePasswordSuccess from './ChangePasswordSuccess';

export default function ChangePasswordWindow() {
  const classes = useStyles();
  const [formOpen, formSetOpen] = React.useState(false);
  const [successOpen, successSetOpen] = React.useState(false);

  const handleFormClickOpen = () => {
    formSetOpen(true);
  };

  const handleFormClose = () => {
    formSetOpen(false);
  };

  const handleSuccessClose = () => {
    successSetOpen(false);
  };

  // const handleChange = (input, e) => {
  //   setState({ [input]: e.target.value });
  // };

  const onSubmit = () => {
    formSetOpen(false);
    successSetOpen(true);
  };

  return (
    <Box m={2} p={2} className={classes.box}>
      <Button variant="outlined" color="primary" onClick={handleFormClickOpen}>
        Change Password
      </Button>
      <ChangePasswordForm
        handleClose={handleFormClose}
        open={formOpen}
        onSubmit={onSubmit}
      />
      <ChangePasswordSuccess
        handleClose={handleSuccessClose}
        open={successOpen}
      />
    </Box>
  );
}
