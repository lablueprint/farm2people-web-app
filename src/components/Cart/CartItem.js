import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CartItemDisplay from './CartItemDisplay';
import { store } from '../../lib/redux/store';
import { base } from '../../lib/airtable/airtable';

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
      if (err) { setErrorMessage(err.message); return; }
      setListingDetails(record);
      setLoading(false);
      setUsingAgencyPrice(store.getState().userData.user.fields['user type'] === 'agency' && record.fields['agency price per grouped produce type'] && record.fields['agency price per grouped produce type'] < record.fields['standard price per grouped produce type']);
    });
  }, []);

  if (!loading && reservedListingID) {
    return (
      <>
        {errorMessage && <p>{errorMessage}</p>}
        <CartItemDisplay
          id={reservedListingID}
          farmID={farmID}
          produceID={listingDetails.fields.produce}
          pallets={pallets}
          unitsPerPallet={listingDetails.fields['grouped produce type per pallet']}
          unitType={listingDetails.fields['grouped produce type']}
          price={listingDetails.fields['grouped produce type per pallet'] * (usingAgencyPrice ? listingDetails.fields['agency price per grouped produce type'] : listingDetails.fields['standard price per grouped produce type'])}
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
