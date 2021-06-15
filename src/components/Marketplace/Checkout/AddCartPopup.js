import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Dialog, DialogContent, Typography, DialogActions, Button,
  IconButton, DialogTitle,
} from '@material-ui/core';
import {
  Remove, Add, ArrowBack, Close,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import useLongPress from './useLongPress';
import { base } from '../../../lib/airtable/airtable';
import { store, history } from '../../../lib/redux/store';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  loading: {
    height: '100%',
  },
  loadingGrid: {
    height: 400,
  },
  sidebar: {
    marginLeft: '5px',
    width: '21%',
  },
  closeButton: {
    float: 'right',
  },
  outlineBox: {
    background: '#FFFFFF',
    border: '1.5px solid rgba(55, 55, 55, 0.8)',
    boxSizing: 'borderBox',
    bordeRadius: '14.6px',
    borderRadius: '10px',
  },
  quantityButtons: {
    color: '#53AA48',
    width: 40,
    height: 40,
  },
  disabledQuantityButtons: {
    color: '#EBEBE4',
    width: 40,
    height: 40,
  },
  listingNumbers: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '40px',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    color: '#373737',
  },
  titleText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '35px',
  },
  dialogActions: {
    padding: 25,
  },
  button: {
    background: '#53AA48',
    color: '#FFFFFF',
    borderRadius: '6px',
    fontFamily: 'Work Sans',
    fontSize: '15px',
    textTransform: 'uppercase',
    width: '150px',
  },
  disabledButton: {
    background: '#EBEBE4',
    color: '#FFFFFF',
    borderRadius: '6px',
    fontFamily: 'Work Sans',
    fontSize: '15px',
    textTransform: 'uppercase',
    width: '150px',
  },
  divider: {
    flex: '1 0 0',
  },
  cancelButton: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#373737',

  },
  cancelIcon: {
    color: '#53AA48',
  },
  img: {
    width: '80%',
    marginTop: '4%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: '6px',
  },
  cropTitle: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '22px',
    color: '#3D3E3F',
  },
  minorText: {
    fontFamily: 'Work Sans',
    fontSize: '16px',
    color: '#3D3E3F',
  },
  priceText: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: '35px',
    color: '#3D3E3F',

  },
});

export default function AddCartPopup(props) {
  const classes = useStyles();
  const {
    popupProduce, open, handleCloseCartPopup,
  } = props;
  const [cartCount, setCartCount] = useState(0);
  /* popupStep 1 corresponds with screen 1 where we have yet to add a cart item */
  /* popupStep 2 corresponds with screen 2 when we have already added a cart item */
  const [popupStep, setPopupStep] = useState(1);
  const [userID, setUserID] = useState('');
  const [loading, setLoading] = useState(false);
  const setPopupStep1 = () => {
    setPopupStep(1);
  };
  const setPopupStep2 = () => {
    setPopupStep(2);
  };
  const getCurrentUserID = () => (store.getState().userData == null ? '' : store.getState().userData.user.id);

  /* Ensures that when the popup of our produce changes, we reset
  the cart and go back to step 1 of our popup */
  useEffect(() => {
    setCartCount(0);
    setPopupStep1();
  }, [popupProduce]);

  /* Grabs the current user id we are on so when we add an
  item to the cart, we can connect it to the correct account */
  useEffect(() => {
    const currUserID = getCurrentUserID();
    setUserID(currUserID);
  }, []);

  const incrementCartCount = () => {
    if (cartCount < popupProduce.palletsAvailable) {
      setCartCount(cartCount + 1);
    }
  };

  const decrementCartCount = () => {
    if (cartCount > 0) {
      setCartCount(cartCount - 1);
    }
  };

  const handleExitCartPopup = () => {
    handleCloseCartPopup();
  };

  const onAddToCartClick = () => {
    /* First check if the reserved listing already exists and update it if so
    instead of creating a new one */
    setLoading(true);
    base('Reserved Listings').select({ view: 'Grid view' }).all()
      .then((reservedRecords) => {
        const existingReservedListing = reservedRecords.filter((record) => record.fields['listing id'] && record.fields['user id']
         && record.fields['listing id'][0] === popupProduce.listingID && record.fields['user id'][0] === userID);
        /* Case where we update the item in cart's quantity */
        if (existingReservedListing.length !== 0) {
          const existingID = existingReservedListing[0].id;
          base('Reserved Listings').update([
            {
              id: existingID,
              fields: {
                pallets: cartCount,
              },
            },
          ], (err) => {
            if (err) {
              console.error(err);
            }
            setLoading(false);
          });
          /* Case where add a listing to the cart */
        } else {
          base('Reserved Listings').create([
            {
              fields: {
                pallets: cartCount,
                'user id': [
                  userID,
                ],
                'listing id': [
                  popupProduce.listingID,
                ],
                'quote id': [
                ],
                'farm id': [
                  popupProduce.farmID,
                ],
              },
            },
          ], (err) => {
            if (err) {
              console.error(err);
            }
            setLoading(false);
          });
        }
      });
    setPopupStep2();
  };

  const viewCartClick = () => { history.push('/cart'); };

  const longPressIncrementEvent = useLongPress(incrementCartCount, 100);
  const longPressDecrementEvent = useLongPress(decrementCartCount, 100);

  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleExitCartPopup} open={open}>
      {loading && (
      <Grid
        container
        spacing={0}
        align="center"
        justify="center"
        direction="column"
        className={classes.loadingGrid}
      >
        <Grid item>
          <CircularProgress align="center" className={classes.loading} />
        </Grid>
      </Grid>
      )}
      {popupStep === 1 && !loading
      && (
      <>
        <DialogTitle onClose={handleExitCartPopup}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleCloseCartPopup}
          >
            <Close />
          </IconButton>
          <Typography className={classes.titleText} align="center">How many would you like to add to cart?</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center" align="center" alignItems="center">
            <Grid xs={3} />
            <Grid xs={5} container className={classes.outlineBox} justify="center" align="center" alignItems="center">
              <IconButton {...longPressDecrementEvent} onClick={decrementCartCount} disabled={cartCount <= 0} align="right" aria-label="increase">
                <Remove fontSize="inherit" className={cartCount <= 0 ? classes.disabledQuantityButtons : classes.quantityButtons} />
              </IconButton>
              <Typography gutterBottom variant="subtitle1" className={[classes.listingNumbers, classes.boldText]}>
                {cartCount}
              </Typography>
              <IconButton {...longPressIncrementEvent} onClick={incrementCartCount} disabled={cartCount >= popupProduce.palletsAvailable} aria-label="decrease">
                <Add fontSize="inherit" className={cartCount >= popupProduce.palletsAvailable ? classes.disabledQuantityButtons : classes.quantityButtons} />
              </IconButton>
            </Grid>
            <Grid xs={3} />
          </Grid>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <IconButton className={classes.cancelButton} onClick={handleExitCartPopup} aria-label="back">
            <ArrowBack className={classes.cancelIcon} />
          &nbsp;Cancel
          </IconButton>
          <div className={classes.divider} />
          <Button disabled={cartCount <= 0} className={cartCount <= 0 ? classes.disabledButton : classes.button} autoFocus onClick={onAddToCartClick} color="primary">
            Add To Cart
          </Button>
        </DialogActions>
      </>
      )}
      {popupStep === 2 && !loading
      && (
      <>
        <DialogTitle onClose={handleExitCartPopup}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleCloseCartPopup}
          >
            <Close />
          </IconButton>
          <Typography className={classes.titleText} align="center">Added To Cart</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container align="center" alignItems="center">
            <Grid xs={6}>
              <img
                className={classes.img}
                src={popupProduce.produceImg}
                alt="produce"
              />
            </Grid>
            <Grid xs={6} container direction="column" alignItems="baseline">
              <Typography className={classes.cropTitle} gutterBottom>
                {popupProduce.crop}
              </Typography>
              <Typography className={classes.minorText} gutterBottom>
                {popupProduce.farmName}
              </Typography>
              <Grid xs={12} container direction="row" alignItems="baseline">
                <Typography className={classes.priceText} gutterBottom>
                  $
                  {popupProduce.price.toFixed(2)}
                </Typography>
                <Typography className={classes.minorText} gutterBottom>
                  &nbsp;/pallet
                </Typography>
              </Grid>
              <Typography className={classes.minorText} gutterBottom>
                Quantity:&nbsp;&nbsp;
                {cartCount}
              </Typography>
              <Typography className={classes.minorText} gutterBottom>
                Total Price:&nbsp;&nbsp;
                $
                {cartCount * popupProduce.price.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <IconButton className={classes.cancelButton} onClick={setPopupStep1} aria-label="back">
            <ArrowBack className={classes.cancelIcon} />
          &nbsp;Back
          </IconButton>
          <div className={classes.divider} />
          <Button onClick={viewCartClick} className={classes.button} autoFocus color="primary">
            View Cart
          </Button>
        </DialogActions>
      </>
      )}
    </Dialog>
  );
}

AddCartPopup.propTypes = {
  popupProduce: PropTypes.shape({
    crop: PropTypes.string,
    price: PropTypes.number,
    farmName: PropTypes.string,
    palletsAvailable: PropTypes.number,
    produceImg: PropTypes.string,
    farmID: PropTypes.string,
    listingID: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseCartPopup: PropTypes.func.isRequired,
};
