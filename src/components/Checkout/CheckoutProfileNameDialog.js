/* Dialogs for changing the checkout profile name */

import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, ButtonBase,
  makeStyles, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import '../../styles/fonts.css';

// custom styling
const useStyles = makeStyles({
  alertActionAlign: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
    marginTop: 20,
  },
  saveButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#FFFFFF',
    background: '#53AA48',
    boxShadow: '-1px 2px 9px rgba(174, 204, 226, 0.49)',
    borderRadius: '6px',
  },
  skipButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#979797',
    textDecorationLine: 'underline',
  },
  alertTitle: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '30px',
    lineHeight: '140%',
    color: '#373737',
  },
});

function CheckoutProfileNameDialog({
  alert, close, profileName, saveProfileName, isNew,
}) {
  const classes = useStyles();
  const [newName, setNewName] = useState(profileName);

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <Dialog
      open={alert}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="Checkout Profile Name Dialog"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <div className={classes.alertTitle}>Checkout Profile Name</div>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={newName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
        />
        <div className={classes.alertActionAlign}>
          <ButtonBase className={classes.skipButton} onClick={close}>
            skip
          </ButtonBase>
          <Button variant="contained" className={classes.saveButton} onClick={() => { saveProfileName(newName); }}>
            {isNew ? 'save as new checkout profile' : 'update existing profile'}
          </Button>
        </div>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
}

CheckoutProfileNameDialog.propTypes = {
  alert: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  isNew: PropTypes.bool.isRequired,
  saveProfileName: PropTypes.func.isRequired,
  profileName: PropTypes.string,
};

CheckoutProfileNameDialog.defaultProps = {
  profileName: null,
};

export default CheckoutProfileNameDialog;
