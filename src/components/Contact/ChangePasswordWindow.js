// TODO: Transform this to a mother component of ChangePassword and
// ChangePasswordSuccess with states and handle props

import React from 'react';
import {
  TextField, FormControl, Typography, Dialog, Box, Button,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  withStyles,
} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './ChangePasswordStyles';

const ChangePasswordButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#3D7736',
    },
  },
})(Button);

export default function ChangePasswordWindow() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box m={2} p={2} className={classes.box}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
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
          <DialogContent>
            <Box p={6} pt={4} pb={6} className={classes.box} justifyContent="center">
              <form className={classes.form} noValidate>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Typography className={classes.inputLabel}>
                    Old Password
                  </Typography>
                  <TextField
                    variant="outlined"
                    type="password"
                    placeholder="Enter your old password"
                    InputProps={{ className: classes.placeholder }}
                    margin="dense"
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
                    required
                  />
                </FormControl>
              </form>
            </Box>
          </DialogContent>
          <DialogActions classes={{ root: classes.centerAlignDialogActions }}>
            <Button onClick={handleClose}>
              <Typography className={classes.cancelButton}>
                Cancel
              </Typography>
            </Button>
            <ChangePasswordButton variant="contained" size="large" onClick={handleClose}>
              <Typography className={classes.changePasswordButton}>
                CHANGE PASSWORD
              </Typography>
            </ChangePasswordButton>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
