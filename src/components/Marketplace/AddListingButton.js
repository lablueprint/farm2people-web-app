import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AddListing from './AddListing';

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#212121' },
    light: '#484848',
    dark: '#000000',
  },
});

export default function AddListingButton() {
  const [editActive, setEditActive] = useState(false);
  const handleClickOpen = () => {
    setEditActive(true);
  };

  const handleClose = () => {
    setEditActive(false);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button variant="contained" size="medium" color="primary" onClick={handleClickOpen}>
          Add Listing
        </Button>
      </ThemeProvider>
      <Dialog open={editActive} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle id="form-dialog-title">Add Listing</DialogTitle>
        <DialogContent>
          <AddListing closeDialog={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button form="listing-form" type="submit" color="primary">
            Submit Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
