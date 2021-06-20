import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, FormControl, Typography, Box, Button,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Airtable from 'airtable';
import {
  withStyles,
} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import bcrypt from 'bcryptjs';
import { store } from '../../lib/redux/store';
import useStyles from './ChangePasswordStyles';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const ChangePasswordButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#3D7736',
    },
  },
})(Button);

export default function ChangePasswordForm({
  handleClose, handlePasswordChange, passwords, validateForm, setSubmit,
}) {
  const classes = useStyles();
  const [noMatchOld, setNoMatchOld] = React.useState(false);
  const submit = async (event) => {
    event.preventDefault();
    const userID = store.getState().userData == null ? ''
      : store.getState().userData.user.id;
    base('Users').find(userID, (err, record) => {
      if (err) { return; }
      const { password } = record.fields;
      const isMatch = bcrypt.compareSync(passwords.oldP, password);
      if (isMatch) {
        const salt = bcrypt.genSaltSync(10);
        const newHash = bcrypt.hashSync(passwords.newP, salt);
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
          }
        });
      } else {
        setNoMatchOld(true);
      }
    });
  };

  const buttonEnabled = passwords.newP === passwords.confirmP && passwords.newP !== '' && validateForm;
  const noMatchConfirm = passwords.newP !== passwords.confirmP && passwords.newP !== '' && passwords.confirmP !== '';

  return (
    <Box p={3}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Typography align="center" className={classes.leftHeading}>
            Change Password
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon style={{ color: '#373737', transform: 'scale(1.2)' }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <form className={classes.form} onSubmit={submit} noValidate>
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
                name="oldP"
                value={passwords.oldP}
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
                name="newP"
                value={passwords.newP}
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
                name="confirmP"
                value={passwords.confirmP}
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
          <ChangePasswordButton
            variant="contained"
            size="large"
            type="submit"
            disabled={!buttonEnabled}
          >
            <Typography className={classes.changePasswordButton}>
              CHANGE PASSWORD
            </Typography>
          </ChangePasswordButton>
        </DialogActions>
      </form>
    </Box>
  );
}

ChangePasswordForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  passwords: PropTypes.shape({
    oldP: PropTypes.string,
    confirmP: PropTypes.string,
    newP: PropTypes.string,
  }).isRequired,
  validateForm: PropTypes.bool.isRequired,
  setSubmit: PropTypes.func.isRequired,
};
