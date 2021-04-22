import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Dialog, Box, Button,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Fruit1 from '../../assets/images/Fruit1.svg';
import Fruit2 from '../../assets/images/Fruit2.svg';
import Fruit3 from '../../assets/images/Fruit3.svg';

const useStyles = makeStyles({
  // box: {
  //   background: '#aaffaa',
  // },
  centerHeading: {
    fontFamily: 'Work Sans',
    fontSize: '24px',
    fontWeight: '700',
    color: '#373737',
    textAlign: 'center',
  },
  successSubtitle: {
    fontFamily: 'Work Sans',
    fontSize: '20px',
    fontWeight: '400',
    color: '#373737',
    textAlign: 'center',
  },
  form: {
    // background: 'pink',
    width: '400px',
    fontFamily: 'Work Sans',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
  formControl: {
    margin: '10px',
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
  changePasswordButton: {
    fontFamily: 'Work Sans',
  },
  cancelButton: {
    fontFamily: 'Work Sans',
    textTransform: 'none',
    fontWeight: '600',
  },
  centerAlignDialogActions: {
    justifyContent: 'center',
  },
  fruit1: {
    width: '80px',
    height: 'auto',
    margin: '10px',
  },
});

const DoneButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#53AA48',
    width: '200px',
    '&:hover': {
      backgroundColor: '#3D7736',
    },
  },
})(Button);

export default function ChangePasswordSuccess({ handleClose, open }) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <Box p={3}>
        <DialogTitle>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleClose}>
              <CloseIcon style={{ color: '#373737', transform: 'scale(1.2)' }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.box} style={{ textAlign: 'center' }}>
            <img
              src={Fruit1}
              alt="fruit1"
              className={classes.fruit1}
            />
            <img
              src={Fruit2}
              alt="fruit2"
              className={classes.fruit1}
            />
            <img
              src={Fruit3}
              alt="fruit3"
              className={classes.fruit1}
            />
          </Box>
          <Box p={6} pt={2} pb={6} className={classes.box} justifyContent="center">
            <Typography className={classes.centerHeading}>
              Password Successfully Changed!
            </Typography>
            <Typography className={classes.successSubtitle} style={{ marginTop: '10px' }}>
              You can now use your new password to login to your account.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions classes={{ root: classes.centerAlignDialogActions }}>
          <DoneButton variant="contained" size="large" onClick={handleClose}>
            <Typography className={classes.changePasswordButton}>
              DONE
            </Typography>
          </DoneButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

ChangePasswordSuccess.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
