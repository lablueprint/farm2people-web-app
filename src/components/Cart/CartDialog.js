/* Dialogs for cart quantity change extremes */

import { React } from 'react';
import {
  Typography, Dialog, DialogContent, DialogActions, Button, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import '../../styles/fonts.css';

// custom styling
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
  buttonSpace: {
    marginRight: '20px',
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
  alertTitle: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '17px',
    lineHeight: '140%',
    textAlign: 'center',
    color: '#373737',
  },
});

function CartDialog({
  alert, title, message, close, getResponse,
}) {
  const classes = useStyles();

  return (
    <Dialog
      open={alert}
      onClose={() => close(false)}
      aria-labelledby="Alert Dialog"
      className={classes.alertCard}
    >

      <DialogContent>
        {title != null
        && (
        <Typography gutterBottom className={classes.alertTitle}>
          {title}
        </Typography>
        )}
        <Typography gutterBottom className={classes.alertText}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.alertActionAlign}>
        {getResponse
          ? (
            <div className={classes.buttonContainer}>
              <Button variant="outlined" className={[classes.noButton, classes.buttonSpace]} onClick={() => close(false)}>
                No
              </Button>
              <Button variant="contained" className={classes.yesButton} onClick={() => close(true)}>
                Yes
              </Button>
            </div>
          )
          : (
            <Button variant="contained" className={classes.yesButton} onClick={() => close(false)}>
              Ok
            </Button>
          )}
      </DialogActions>
    </Dialog>
  );
}

CartDialog.propTypes = {
  alert: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  getResponse: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

CartDialog.defaultProps = {
  title: null,
};

export default CartDialog;
