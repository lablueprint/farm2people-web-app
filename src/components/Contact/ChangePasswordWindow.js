import React from 'react';
import {
  Box, Button, Dialog,
} from '@material-ui/core';
import useStyles from './ChangePasswordStyles';
import ChangePasswordForm from './ChangePasswordForm';
import ChangePasswordSuccess from './ChangePasswordSuccess';

// const bcrypt = require('bcryptjs');

// const handlePassword = async (p, e) => {
//   e.preventDefault();
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync('B4c0/', salt);
//   console.log(hash);
//   // Load hash from your password DB.
//   const val1 = bcrypt.compareSync('B4c0/', hash); // true
//   const val2 =
//   bcrypt.compareSync(p, '$2b$05$4f.ByS6lAOUc5qwRvG8KqOP.oesYlpLyrk2gzLa3LHqX.e1xrDwDG'); // false
//   console.log(val1);
//   console.log(val2);
//   // try {
//   //  const status = await logoutUser();
//   //  if (!status) {
//   //   setErrorMsg(‘Error logging out.‘);
//   //  } else {
//   //   setDisplayName(‘’);
//   //  }
//   // } catch (err) {
//   //  setErrorMsg(‘Error logging out.’);
//   // }
// };

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
  const validate = () => true;

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
