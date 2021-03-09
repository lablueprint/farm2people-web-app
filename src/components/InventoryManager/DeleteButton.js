import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  button: {
    float: 'left',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FAFAFA',
    },
    border: '1px solid gray',
  },
  text: {
    fontFamily: 'Work Sans',
    fontColor: '#000000',
  },
});

export default function DeleteButton({
  deleteRecords,
}) {
  const classes = useStyles();
  const [editActive, setEditActive] = useState(false);
  const handleClickOpen = () => {
    setEditActive(true);
  };

  const handleClose = () => {
    setEditActive(false);
  };
  const handleSubmit = () => {
    deleteRecords();
    handleClose();
  };
  return (
    <>
      <Button variant="contained" size="medium" onClick={handleClickOpen} className={classes.button} classes={{ label: classes.text }}>
        <DeleteOutlineSharpIcon />
        <Typography variant="button" display="block" className={classes.text}>
          DELETE LISTING
        </Typography>
      </Button>
      <Dialog open={editActive} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          Are you sure you want to delete the selected listings?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteButton.propTypes = {
  deleteRecords: PropTypes.func.isRequired,
};
