import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
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
    whiteSpace: 'nowrap',
  },
});

export default function AddListingButton({
  createRecord,
}) {
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
      <AddListing closeDialog={handleClose} isOpen={editActive} modifyListings={createRecord} />
    </>
  );
}

AddListingButton.propTypes = {
  createRecord: PropTypes.func.isRequired,
};
