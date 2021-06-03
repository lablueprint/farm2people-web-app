import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import FarmCard from './FarmCard';
import ProduceCard from './ProduceCard';
import MarketplaceHeader from './Header/MarketplaceHeader';
import MarketplaceSidebar from './Sidebar/MarketplaceSidebar';
import '../../styles/fonts.css';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  sidebar: {
    marginLeft: '5px',
    width: '21%',
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
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [produceListings, setProduceListings] = useState([]);
  const [filteredProduce, setFilteredProduce] = useState([]);
  const [tabValue, setTabValue] = useState('all'); // Either 'all' for produce or 'farm' for farms
  const [numResults, setNumResults] = useState(10); // # of results to display
  const [searchTerms, setSearchTerms] = useState(''); // user entered search terms

  const classes = useStyles();
  function getFarmRecords() {
    base('Farms').select({ view: 'Grid view' }).all()
      .then((farmRecords) => {
        setFarmListings(farmRecords);
        setFilteredFarms(farmRecords);
      });
  }

  // Get prod id, grouped unit type, price per grouped unit for each produce record
  function getProduceRecords() {
    // TODO: change Listing UPDATED back to Listings
    base('Listing UPDATED').select({ view: 'Grid view' }).all()
      .then((produceRecords) => {
        const filteredProduceRecords = [];
        produceRecords.forEach((record) => {
          const pricePerGroup = record.fields['standard price per grouped produce type'] || 0;
          const groupPerPallet = record.fields['grouped produce type per pallet'] || 0;
          const palletPrice = pricePerGroup * groupPerPallet;
          const recordInfo = {
            listingID: record.fields['listing id'],
            produceID: record.fields.produce ? record.fields.produce[0] : -1,
            farmID: record.fields['farm id'],
            palletPrice: palletPrice !== 0 ? palletPrice : -1,
            season: record.fields['growing season'] || 'No season',
          };
          filteredProduceRecords.push(recordInfo);
        });
        setProduceListings(filteredProduceRecords);
        setFilteredProduce(filteredProduceRecords);
      });
  }

  // Get records from Airtable whenever DOM mounts and updates/changes
  useEffect(() => {
    getFarmRecords();
    getProduceRecords();
  }, []);

  // Get total number of results depending on if produce or farm
  const totalResults = tabValue === 'all' ? filteredProduce.length : filteredFarms.length;

  // helper fx to check any string for search term
  const checkFieldForSearchTerm = (field) => {
    const reg = new RegExp(searchTerms, 'i');
    return field && reg.test(field);
  };

  const filterFarmsBySearch = () => {
    const filtered = farmListings.filter((farm) => checkFieldForSearchTerm(farm.fields['farm name']) === true);
    setFilteredFarms(filtered);
  };

  // helper fx to async check produce name
  const searchProduceName = (produce) => {
    const { produceID } = produce;
    let containsTerm = false;

    if (produceID === undefined || produceID.length < 5) { return false; }

    return new Promise((resolve) => {
      base('Produce Type').find(produceID).then((produceObj) => {
        if (checkFieldForSearchTerm(produceObj.fields['produce type']) === true) { containsTerm = true; }
        return resolve(containsTerm);
      });
    });
  };

  // helper fx to async check produce farm name
  const searchProduceFarmName = (produce) => {
    const { farmID } = produce;
    let containsTerm = false;

    if (farmID === undefined || farmID[0].length < 5) { return false; }

    const farmArr = farmID.toString().split(',');
    return new Promise((resolve) => {
      base('Farms').find(farmArr[0]).then((farmObj) => {
        if (checkFieldForSearchTerm(farmObj.fields['farm name']) === true) { containsTerm = true; }
        return resolve(containsTerm);
      });
    });
  };

  // helper fx to check individual produce for name or farm name match to search term
  async function searchProduce(produce) {
    return await searchProduceName(produce) || searchProduceFarmName(produce);
  }

  // filter produce by name/farm match to user search terms
  async function filterProducebySearch() {
    const data = Array.from(produceListings);
    Promise.all(data.map((produce) => searchProduce(produce)))
    // Use the result of the promises to filter the produceListings
      .then((result) => setFilteredProduce(data.filter((element, index) => result[index])));
  }

  // run on submit of search bar (search icon or enter clicked)
  // may be useful to add any side bar filtering methods here too
  const filterBySearch = () => {
    filterProducebySearch();
    filterFarmsBySearch();
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.sidebar}>
        {/* Entire marketplace sidebar, contains toolbars for filter selection */}
        <MarketplaceSidebar />
      </Grid>
      <Grid item xs>
        {/* Entire marketplace header, contains tabs, view, and search */}
        <MarketplaceHeader
          tabValue={tabValue}
          setTabValue={setTabValue}
          totalResults={totalResults}
          numResults={numResults}
          setNumResults={setNumResults}
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms}
          filterBySearch={filterBySearch}
        />
        <Grid container direction="row" justify="flex-start">
          {/* Map each array of produceListing info to render a ProduceCard */
            tabValue === 'all' && filteredProduce.map((produce) => (
              <ProduceCard
                key={produce.listingID}
                /* ProduceCard will get produce name, photo, + farm name by ids */
                produceID={produce.produceID || null}
                farmID={produce.farmID || null}
                palletPrice={produce.palletPrice}
                season={produce.season}
              />
            ))
          }
        </Grid>
        {/* Map each array of farmListing info to render a FarmCard */
          tabValue === 'farm' && filteredFarms.map((farm) => (
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
      </Grid>
    </Grid>
  );
}
