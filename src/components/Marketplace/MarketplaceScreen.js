import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import './MarketplaceScreen.css';
import { makeStyles } from '@material-ui/core/styles';
import FarmCard from './FarmCard';
import ProduceCard from './ProduceCard';

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
  const [produceListings, setProduceListings] = useState([]);

  const classes = useStyles();
  // Get records from Airtable whenever DOM mounts and updates/changes
  useEffect(() => {
    base('Farms').select({ view: 'Grid view' }).all()
      .then((farmRecords) => {
        setFarmListings(farmRecords);
      });
    base('Listings').select({ view: 'Grid view' }).all()
      .then((produceRecords) => {
        setProduceListings(produceRecords);
      });
  }, []);

  console.log(produceListings);

  return (
    <div className={classes.root}>
      {/* Map each array of produceListing info to render a ProduceCard */
        produceListings.map((produce) => (
          <ProduceCard
            cropName={produce.fields.crop || 'No crop name'}
            farmName={"Ryan's Rarm"}
            unitPrice={produce.fields['standard price per pallet'] || -1}
            unitType={produce.fields['unit type'] || 'pallet'}
          />
        ))
      }
      {/* Map each array of farmListing info to render a FarmCard */
        farmListings.map((farm) => (
          <FarmCard
            farmName={farm.fields['farm name'] || 'No farm name'}
            address={farm.fields.address || 'No address'}
            zipCode={farm.fields['zip code'] || -1}
            description={farm.fields.description || 'No description'}
            operationTypeTags={farm.fields['operation type'] || []}
            farmingPracticeTags={farm.fields['farming practice type'] || []}
          />
        ))
      }
    </div>
  );
}
