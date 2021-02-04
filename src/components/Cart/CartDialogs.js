import { React } from 'react';
import {
  Typography, Dialog, DialogContent, DialogActions, Button, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import './Cart.css';

const useStyles = makeStyles({
  alertCard: {
    maxWidth: '350px',
    margin: 'auto',
  },
  alertActionAlign: {
    alignSelf: 'center',
    margin: 'auto',
    paddingBottom: '20px',
  },
  yesButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#FFFFFF',
    background: '#53AA48',
    boxShadow: '-1px 2px 9px rgba(174, 204, 226, 0.49)',
    borderRadius: '6px',
  },
  noButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#53AA48',
    border: '1px solid #53AA48',
    borderRadius: '6px',
  },
  alertText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '17px',
    lineHeight: '140%',
    textAlign: 'center',
    color: '#373737',
  },
});

export function RemoveConfirmationDialog({ alert, close }) {
  const classes = useStyles();

  return (
    <Dialog
      open={alert}
      onClose={() => close(false)}
      aria-labelledby="Removal Confirmation"
      className={classes.alertCard}
    >
      <DialogContent>
        <Typography gutterBottom className={classes.alertText}>
          Are you sure that you want to delete this item entirely from your cart?
        </Typography>
      </DialogContent>
      <DialogActions className={classes.alertActionAlign}>
        <Button variant="outlined" className={classes.noButton} onClick={() => close(false)}>
          No
        </Button>
        <Button variant="contained" className={classes.yesButton} onClick={() => close(true)}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

RemoveConfirmationDialog.propTypes = {
  alert: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export function MaxAvailableDialog({ alert, close, crop }) {
  const classes = useStyles();

  return (
    <Dialog
      open={alert}
      onClose={close}
      aria-labelledby="Max Available"
      className={classes.alertCard}
    >
      <DialogContent>
        <Typography gutterBottom className={classes.alertText}>
          You have the maximum available
          {' '}
          {crop}
          {' '}
          in your cart!
        </Typography>
      </DialogContent>
      <DialogActions className={classes.alertActionAlign}>
        <Button variant="contained" className={classes.yesButton} onClick={() => close(true)}>
          Ok!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MaxAvailableDialog.propTypes = {
  alert: PropTypes.bool.isRequired,
  crop: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
