import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, FormControl, Typography, Box, Button,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import bcrypt from 'bcryptjs';
import { store } from '../../../lib/redux/store';
import { base } from '../../../lib/airtable/airtable';

const useStyles = makeStyles({
  leftHeading: {
    fontFamily: 'Work Sans',
    fontSize: '28px',
    fontWeight: '700',
    color: '#373737',
    textAlign: 'left',
  },
  errorText: {
    fontFamily: 'Work Sans',
    fontSize: '14px',
    color: '#ff0000',
    textAlign: 'center',
    marginTop: '10px',
    margin: '0px',
  },
  form: {
    width: '400px',
    fontFamily: 'Work Sans',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
  formControl: {
    margin: '0px',
    marginBottom: '10px',
    width: '100%',
  },
  inputLabel: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    color: '#373737',
    '&:after': {
      content: '" *"',
      color: '#f00',
    },
  },
  placeholder: {
    fontFamily: 'Work Sans',
  },
  changePasswordText: {
    fontFamily: 'Work Sans',
  },
  cancelButton: {
    fontFamily: 'Work Sans',
    textTransform: 'none',
    fontWeight: '600',
  },
  closeIcon: {
    color: '#373737',
  },
  centerAlignDialogActions: {
    justifyContent: 'center',
  },
  changePasswordButton: {
    color: '#fff',
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#3D7736',
    },
  },
});

export default function PasswordChangeScreen({
  handleClose, handlePasswordChange, passwords, setSubmit,
}) {
  const classes = useStyles();
  const [noMatchOld, setNoMatchOld] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const buttonEnabled = passwords.newPassword === passwords.confirmPassword && passwords.newPassword !== '';
  const noMatchConfirm = passwords.newPassword !== passwords.confirmPassword && passwords.newPassword !== '' && passwords.confirmPassword !== '';

  const onSubmitClick = async (event) => {
    event.preventDefault();
    const userID = store.getState().userData == null ? ''
      : store.getState().userData.user.id;
    base('Users').find(userID, (err, record) => {
      if (err) { setErrMessage(err); } else {
        const { password } = record.fields;
        const isMatch = bcrypt.compareSync(passwords.oldPassword, password);
        if (isMatch) {
          const salt = bcrypt.genSaltSync(10);
          const newHash = bcrypt.hashSync(passwords.newPassword, salt);
          base('Users').update([
            {
              id: userID,
              fields: {
                password: newHash,
              },
            },
          ], (errorMsg) => {
            if (!errorMsg) {
              setSubmit(true);
            } else {
              setErrMessage(errorMsg);
            }
          });
        } else {
          setNoMatchOld(true);
        }
      }
    });
  };

  return (
    <>
      {errMessage === ''
        ? (
          <Box p={3}>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between">
                <Typography align="center" className={classes.leftHeading}>
                  Change Password
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon className={classes.closeIcon} />
                </IconButton>
              </Box>
            </DialogTitle>
            <form className={classes.form} onSubmit={onSubmitClick} noValidate>
              <DialogContent>
                <Box p={2} pt={6} pb={8} justifyContent="center">
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Typography className={classes.inputLabel}>
                      Old Password
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="password"
                      placeholder="Enter your old password"
                      InputProps={{ className: classes.placeholder }}
                      margin="dense"
                      name="oldPassword"
                      value={passwords.oldPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Typography className={classes.inputLabel}>
                      New Password
                    </Typography>
                    <TextField
                      variant="outlined"
                      type="password"
                      placeholder="Enter a new password"
                      InputProps={{ className: classes.placeholder }}
                      margin="dense"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Typography className={classes.inputLabel}>
                      Confirm New Password
                    </Typography>
                    <TextField
                      variant="outlined"
                      type="password"
                      placeholder="Confirm your new password"
                      InputProps={{ className: classes.placeholder }}
                      margin="dense"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </FormControl>
                  <Typography className={classes.errorText}>
                    {noMatchConfirm && 'Confirm password does not match your new password!'}
                  </Typography>
                  <Typography className={classes.errorText}>
                    {noMatchOld && 'Old password does not match your saved password!'}
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions classes={{ root: classes.centerAlignDialogActions }}>
                <Button onClick={handleClose}>
                  <Typography className={classes.cancelButton}>
                    Cancel
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!buttonEnabled}
                  className={classes.changePasswordButton}
                >
                  <Typography className={classes.changePasswordText}>
                    CHANGE PASSWORD
                  </Typography>
                </Button>
              </DialogActions>
            </form>
          </Box>
        )
        : (<Typography>errMessage</Typography>)}
    </>
  );
}

PasswordChangeScreen.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  passwords: PropTypes.shape({
    oldPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
    newPassword: PropTypes.string,
  }).isRequired,
  setSubmit: PropTypes.func.isRequired,
};
