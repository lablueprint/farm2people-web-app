import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import { makeStyles } from '@material-ui/core/styles';
import FarmCard from './FarmCard';
import ProduceCard from './ProduceCard';
import MarketplaceHeader from './Header/MarketplaceHeader';
import '../../styles/fonts.css';

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
  const [tabValue, setTabValue] = useState('all'); // Either 'all' for produce or 'farm' for farms
  const [numResults, setNumResults] = useState(10); // # of results to display

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

  // Get total number of results depending on if produce or farm
  const totalResults = tabValue === 'all' ? produceListings.length : farmListings.length;

  return (
    <div className={classes.root}>
      {/* Entire marketplace header, contains tabs, view, and search */}
      <MarketplaceHeader
        tabValue={tabValue}
        setTabValue={setTabValue}
        totalResults={totalResults}
        numResults={numResults}
        setNumResults={setNumResults}
      />
      {/* Map each array of produceListing info to render a ProduceCard */
        tabValue === 'all' && produceListings.map((produce) => (
          <ProduceCard
            key={produce.id}
            cropName={produce.fields.crop || 'No crop name'}
            farmID={produce.fields['farm id'] || null}
            unitPrice={produce.fields['standard price per pallet'] || -1}
            unitType={produce.fields['unit type'] || 'pallet'}
          />
        ))
      }
      {/* Map each array of farmListing info to render a FarmCard */
        tabValue === 'farm' && farmListings.map((farm) => (
          <FarmCard
            key={farm.id}
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
