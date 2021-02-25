import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import AddListing from './AddListing';

const useStyles = makeStyles({
  button: {
    float: 'right',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  text: {
    fontFamily: 'Work Sans',
  },
});

export default function AddListingButton() {
  const classes = useStyles();
  const [editActive, setEditActive] = useState(false);
  const handleClickOpen = () => {
    setEditActive(true);
  };

  const handleClose = () => {
    setEditActive(false);
  };
  return (
    <>
      <Button variant="contained" size="medium" color="primary" onClick={handleClickOpen} className={classes.button} classes={{ label: classes.text }}>
        <AddIcon />
        <Typography variant="button" display="block" className={classes.text}>
          Add Listing
        </Typography>
      </Button>
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
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
