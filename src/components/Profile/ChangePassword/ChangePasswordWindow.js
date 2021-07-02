import React, { useState } from 'react';
import {
  Box, Button, Dialog,
} from '@material-ui/core';
import PasswordChangeScreen from './PasswordChangeScreen';
import SuccessChangeScreen from './SuccessChangeScreen';

export default function ChangePasswordWindow() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    confirmPassword: '',
    newPassword: '',
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

  return (
    <Box m={2} p={2}>
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
          <PasswordChangeScreen
            handleClose={handleClose}
            handlePasswordChange={handlePasswordChange}
            passwords={passwords}
            setSubmit={setSubmitted}
          />
        )}
        {isSubmitted && <SuccessChangeScreen handleClose={handleClose} />}
      </Dialog>
    </Box>
  );
}
