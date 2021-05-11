import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import PropTypes from 'prop-types';
import CartItemDisplay from './CartItemDisplay';
import { store } from '../../lib/redux/store';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

export default function CartItem({
  reservedListingID, pallets, listingID, updateSubtotal, removeListing, farmID,
}) {
  const [listingDetails, setListingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingAgencyPrice, setUsingAgencyPrice] = useState(false);

  // TODO: style error message display
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    base('Listings').find(listingID[0], (err, record) => {
      if (err) { setErrorMessage(err); return; }
      setListingDetails(record);
      setLoading(false);
      // should the agency tag only be used if the agency price is different than the standard?
      setUsingAgencyPrice(store.getState().userData.user.fields['user type'] === 'agency' && record.fields['agency price per grouped produce type']);
    });
  }, []);

  // TODO: talk to ryan about which fields to use here
  if (!loading && reservedListingID) {
    return (
      <>
        {errorMessage && <p>{errorMessage}</p>}
        <CartItemDisplay
          id={reservedListingID}
          farmID={farmID}
          produce={listingDetails.fields.produce}
          pallets={pallets}
          unitsPerPallet={listingDetails.fields['grouped produce type per pallet']}
          unitType={listingDetails.fields['grouped produce type']}
          price={usingAgencyPrice ? listingDetails.fields['agency price per grouped produce type'] : listingDetails.fields['standard price per grouped produce type']}
          updateSubtotal={updateSubtotal}
          removeListing={removeListing}
          maxAvailable={listingDetails.fields['pallets available']}
          usersInterested={listingDetails.fields['users interested']}
          usingAgencyPrice={usingAgencyPrice}
        />
      </>
    );
  }
  return null;
}

CartItem.propTypes = {
  reservedListingID: PropTypes.string.isRequired,
  pallets: PropTypes.number.isRequired,
  listingID: PropTypes.arrayOf(PropTypes.string).isRequired,
  farmID: PropTypes.string.isRequired,
  updateSubtotal: PropTypes.func.isRequired,
  removeListing: PropTypes.func.isRequired,
};
