import React from 'react';
import {
  TextField, Typography, Dialog, Box, Button,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  container: {
    background: '#ffaaaa',
  },
  box: {
    background: '#aaffaa',
  },
  leftHeading: {
    fontFamily: 'Work Sans',
    fontSize: '28px',
    fontWeight: '700',
    color: '#373737',
    // marginTop: '2.8%',
    // marginBottom: '2.5%',
    textAlign: 'left',
  },
  centerAlignDialogActions: {
    justifyContent: 'center',
  },
});

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
    <Box m={3} p={3} className={classes.box}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <Box p={5}>
          <DialogTitle id="form-dialog-title">
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
            <Box className={classes.box}>
              <TextField />
              TODO: Add form here
            </Box>
          </DialogContent>
          <DialogActions classes={{ root: classes.centerAlignDialogActions }}>

            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Change Password
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
