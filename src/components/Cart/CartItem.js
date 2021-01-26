import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import PropTypes from 'prop-types';
import CartItemDisplay from './CartItemDisplay';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

export default function CartItem({ reservedListingID, units, listingID }) {
  const [listingDetails, setListingDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base('Listings').find(listingID[0], (err, record) => {
      if (err) { console.error(err); return; }
      setListingDetails(record);
      setLoading(false);
    });
  }, []);

  if (!loading && reservedListingID) {
    return (
      <CartItemDisplay
        id={reservedListingID}
        crop={listingDetails.fields.crop}
        units={units}
        unitsPerPallet={listingDetails.fields['units per pallet']}
        unitType={listingDetails.fields['unit type']}
        price={listingDetails.fields['standard price per unit']}
      />
    );
  }
  return null;
}

CartItem.propTypes = {
  reservedListingID: PropTypes.string.isRequired,
  units: PropTypes.number.isRequired,
  listingID: PropTypes.arrayOf(PropTypes.string).isRequired,
};
