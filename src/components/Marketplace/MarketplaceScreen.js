import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import { makeStyles } from '@material-ui/core/styles';
import FarmCard from './FarmCard';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
});

// Airtable set-up
const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

export default function MarketplaceScreen() {
  const [farmListings, setFarmListings] = useState([]);
  const classes = useStyles();
  // Get records from Airtable whenever DOM mounts and updates/changes
  useEffect(() => {
    base('Farms').select({ view: 'Grid view' }).all()
      .then((records) => {
        setFarmListings(records);
      });
  }, []);

  return (
    <div className={classes.root}>
      {/* Map each array of farmListing info to render a FarmCard */
        farmListings.map((listing) => (
          <FarmCard
            farmName={listing.fields['farm name'] || 'No farm name'}
            address={listing.fields.address || 'No address'}
            zipCode={listing.fields['zip code'] || -1}
            description={listing.fields.description || 'No description'}
            operationTypeTags={listing.fields['operation type'] || []}
            farmingPracticeTags={listing.fields['farming practice type'] || []}
          />
        ))
      }
    </div>
  );
}
