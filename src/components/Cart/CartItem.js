import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import PropTypes from 'prop-types';
import CartItemDisplay from './CartItemDisplay';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

export default function CartItem({
  reservedListingID, pallets, listingID, updateSubtotal, removeListing,
}) {
  const [listingDetails, setListingDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base('Listings').find(listingID[0], (err, record) => {
      if (err) { console.error(err); return; }
      setListingDetails(record);
      setLoading(false);
    });
  });

  if (!loading && reservedListingID) {
    return (
      <CartItemDisplay
        id={reservedListingID}
        crop={listingDetails.fields.crop}
        pallets={pallets}
        unitsPerPallet={listingDetails.fields['units per pallet']}
        unitType={listingDetails.fields['unit type']}
        price={listingDetails.fields['standard price per unit']}
        updateSubtotal={updateSubtotal}
        removeListing={removeListing}
        maxAvailable={listingDetails.fields['pallets available']}
        usersInterested={listingDetails.fields['users interested']}
      />
    );
  }
  return null;
}

CartItem.propTypes = {
  reservedListingID: PropTypes.string.isRequired,
  pallets: PropTypes.number.isRequired,
  listingID: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateSubtotal: PropTypes.func.isRequired,
  removeListing: PropTypes.func.isRequired,
};
