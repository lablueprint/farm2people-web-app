/* Container for all Cart Screen display components */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Airtable from 'airtable';
import {
  Card, CardContent, Grid, Typography, ButtonBase, makeStyles,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CartItem from './CartItem';
import CartCardHeader from './CartCardHeader';
import CartEmptyScreen from './CartEmptyScreen';
import Fruit3 from '../../assets/images/Fruit3.svg';
import Fruit4 from '../../assets/images/Fruit4.svg';
import '../../styles/fonts.css';
import { store } from '../../lib/redux/store';
// import { getUserById } from '../../lib/airtable/request';
// getReservedListingsByIds
// deleteReservedListing

// airtable setup
const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

// custom styling
const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  container: {
    position: 'relative',
    width: '73%',
    alignSelf: 'center',
    margin: 'auto',
    minWidth: '700px',
  },
  cartHeader: {
    fontFamily: 'Work Sans',
    fontWeight: 'bolder',
    fontSize: 50,
    color: '#373737',
    paddingTop: '2%',
  },
  cartCard: {
    paddingTop: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingBottom: '10px',
    margin: 'auto',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
  },
  farmLabel: {
    fontFamily: 'Work Sans',
    fontWeight: '500',
    fontSize: '32px',
    lineHeight: '140%',
    color: '#373737',
    paddingTop: '20px',
    paddingBottom: '15px',
  },
  subtotalLabel: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#373737',
  },
  subtotal: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '140%',
    color: '#373737',
    textDecoration: 'underline',
    textDecorationColor: '#53AA48',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
    paddingTop: '17px',
    marginBottom: '5%',
  },
  continueShoppingButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bolder',
    fontSize: '20px',
    lineHeight: '140%',
    color: '#373737',
  },
  checkoutButton: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '140%',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    padding: 5,
    paddingInline: 20,

    background: '#53AA48',
    borderRadius: '6px',
    textDecoration: 'none',
  },
  fruit3: {
    position: 'absolute',
    width: '180px',
    height: 'auto',
    right: '.5vw',
    top: '50vh',
    zIndex: '-2',
  },
  fruit4: {
    position: 'absolute',
    width: '160px',
    height: 'auto',
    right: '0vw',
    top: '69vh',
    zIndex: '-1',
  },
  green: {
    color: '#53AA48',
  },
});

function CartScreen() {
  const [cartListings, setCartListings] = useState([]);
  const [farms, setFarms] = useState({});
  // dictionary of farms in form { id: [name, subtotal]}
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  // TODO: style error message display
  const [errorMessage, setErrorMessage] = useState();

  const classes = useStyles();

  // calls airtable on start to fetch listings in cart, sort by farm, and calculate subtotals
  useEffect(async () => {
    setSubtotal(0);

    base('Users').find(store.getState().userData.user.id, (err, user) => {
      if (err) { setErrorMessage(err); return; }
      let items = [];
      const tempFarms = {};

      // fetch each item in the user's cart
      if (user.fields.cart) {
        user.fields.cart.forEach((id) => {
          base('Reserved Listings').find(id, (e, item) => {
            if (e) { setErrorMessage(e); return; }
            items = [...items, item];
            setCartListings(items);

            // fetch item's farm and add to farms if necessary
            const farmID = item.fields['farm id'];
            base('Farms').find(farmID, (error, farm) => {
              if (error) { setErrorMessage(error); }
              if (!tempFarms[farmID]) {
              // this was my solution to needing to store a subtotal for each farm
                tempFarms[farmID] = { name: farm.fields['farm name'], subtotal: 0 };
              }

              // fetch price of listing and add to farm subtotal and overall subtotal
              // this call is nested to ensure it is called after any farm objects are created
              base('Listings').find(item.fields['listing id'][0], (er, record) => {
                if (er) { setErrorMessage(er); return; }
                // todo: use agency price if appropriate
                const currCartItemPrice = store.getState().userData.user.fields['user type'] === 'agency' && record.fields['agency price per grouped produce type'] ? record.fields['agency price per grouped produce type'] : record.fields['standard price per grouped produce type'];
                const currCartItemCost = item.fields.pallets * currCartItemPrice;
                tempFarms[farmID].subtotal += currCartItemCost;
                setSubtotal((prevTotal) => (prevTotal + currCartItemCost));
              });
            });
            setFarms(tempFarms);
          });
        });
      }
    });
    setLoading(false);
  }, []);

  // todo: update farm subtotals as well
  // update subtotal function that is passed to each listing detail allowing adjustments
  // (ex. on quantity change, or listing is removed)
  function updateSubtotal(change, farmID) {
    const newFarms = farms;
    newFarms[farmID].subtotal += change;
    setFarms(newFarms);
    setSubtotal((prevTotal) => (prevTotal + change));
  }

  // removes reservedListing from airtable and cartListings state
  // is also passed to detail view that has the delete button
  function removeListing(id, farmID) {
    base('Reserved Listings').destroy([id],
      (err) => {
        if (err) {
          setErrorMessage(err);
        }
      });

    // update the listings in the cartListings array
    // remove the farm if it has no remaining listings
    setCartListings((prevListings) => {
      const newListings = prevListings.filter((listing) => listing.id !== id);
      if (newListings.filter((listing) => listing.fields['farm id'][0] === farmID).length === 0) {
        delete farms[farmID];
      }
      return newListings;
    });
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.cartHeader}>
          Cart
        </Typography>
        {!loading && cartListings.length !== 0 ? (
          <>
            { Object.entries(farms).map(([id, farm]) => (
              <>
                <Typography className={classes.farmLabel}>
                  Shopping from
                  {' '}
                  {farm.name}
                </Typography>

                <Card className={classes.cartCard}>
                  <CardContent>
                    <CartCardHeader />
                    { cartListings.filter((listing) => listing.fields['farm id'][0] === id).map((cartListing) => (
                      <CartItem
                        key={cartListing.id}
                        reservedListingID={cartListing.id}
                        pallets={cartListing.fields.pallets}
                        listingID={cartListing.fields['listing id']}
                        farmID={cartListing.fields['farm id'][0]}
                        updateSubtotal={updateSubtotal}
                        removeListing={removeListing}
                      />
                    ))}
                    <Grid container alignItems="center" justify="flex-end">
                      <Grid item xs />
                      <Grid item>
                        <Typography gutterBottom className={classes.subtotalLabel} align="center">
                          SUBTOTAL:
                        </Typography>
                      </Grid>
                      <Grid item xs={3} s={2} lg={2}>
                        <Typography gutterBottom className={classes.subtotal} align="right">
                          $
                          {parseFloat(farm.subtotal).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </>
            ))}

            {Object.entries(farms).length > 1 && (
            <Grid container alignItems="center" justify="flex-end" style={{ paddingTop: 24 }}>
              <Grid item xs />
              <Grid item>
                <Typography gutterBottom className={classes.subtotalLabel} align="center">
                  OVERALL SUBTOTAL:
                </Typography>
              </Grid>
              <Grid item xs={3} s={2} md={2}>
                <Typography gutterBottom className={classes.subtotal} align="center">
                  $
                  {parseFloat(subtotal).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            )}
            <span className={classes.buttonContainer}>
              <ButtonBase>
                <ArrowBack className={classes.green} />
                <div className={classes.continueShoppingButton}>Continue shopping</div>
              </ButtonBase>
              <Link className={classes.checkoutButton} to="/cart/checkout">
                Proceed
              </Link>
            </span>
          </>
        ) : (<CartEmptyScreen />)}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      {!loading && cartListings.length !== 0 && (
        <>
          <img src={Fruit3} alt="" className={classes.fruit3} />
          <img src={Fruit4} alt="" className={classes.fruit4} />
        </>
      )}

    </div>

  );
}

export default CartScreen;
