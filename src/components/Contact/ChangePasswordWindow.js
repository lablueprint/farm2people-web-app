import React from 'react';
import {
  Box, Button, Dialog,
} from '@material-ui/core';
import useStyles from './ChangePasswordStyles';
import ChangePasswordForm from './ChangePasswordForm';
import ChangePasswordSuccess from './ChangePasswordSuccess';

export default function ChangePasswordWindow() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isSubmitted, setSubmit] = React.useState(false);
  const [passwords, setPasswords] = React.useState({
    oldP: '',
    confirmP: '',
    newP: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const onSubmit = () => {
    setSubmit(true);
  };

  // TODO: Add validation details (confirm password matching, etc.)
  const validate = () => false;

  return (
    <Box m={2} p={2} className={classes.box}>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Change Password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        {!isSubmitted && (
          <ChangePasswordForm
            handleClose={handleClose}
            onSubmit={onSubmit}
            handlePasswordChange={handlePasswordChange}
            passwords={passwords}
            validateForm={validate}
          />
        )}
        {isSubmitted && <ChangePasswordSuccess handleClose={handleClose} />}
      </Dialog>
    </Box>
  );
}
