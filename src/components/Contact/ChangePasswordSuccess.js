import React from 'react';
import {
  Typography, Dialog, Box, Button,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  box: {
    // background: '#aaffaa',
  },
  leftHeading: {
    fontFamily: 'Work Sans',
    fontSize: '28px',
    fontWeight: '700',
    color: '#373737',
    textAlign: 'left',
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
});

const DoneButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#53AA48',
    '&:hover': {
      backgroundColor: '#3D7736',
    },
  },
})(Button);

export default function AddListing() {
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
              Yass
            </Box>
          </DialogContent>
          <DialogActions classes={{ root: classes.centerAlignDialogActions }}>
            <DoneButton />
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
