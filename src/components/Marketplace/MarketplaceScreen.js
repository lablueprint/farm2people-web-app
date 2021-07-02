/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import AddCartPopup from './Checkout/AddCartPopup';
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

const INITIAL_POPUP_PRODUCE = {
  crop: '',
  price: 0,
  farmName: '',
  palletsAvailable: 0,
  produceImg: '',
  listingID: '',
  farmID: '',
};

export default function MarketplaceScreen({ match }) {
  const shopByFarmID = match.params.farmId; // id of the farm being shopped from if applicable
  const [farmListings, setFarmListings] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [produceListings, setProduceListings] = useState([]);
  const [filteredProduce, setFilteredProduce] = useState([]);
  const [shopByFarmProduce, setShopByFarmProduce] = useState([]);
  const [filteredShopByFarmProduce, setFilteredShopByFarmProduce] = useState([]);
  // TODO: filtering methods of shopByFarmProduce
  const [tabValue, setTabValue] = useState('all'); // Either 'all' for produce or 'farm' for farms
  const [numResults, setNumResults] = useState(10); // # of results to display
  const [popupProduce, setPopupProduce] = useState(INITIAL_POPUP_PRODUCE);
  const [open, setOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState(''); // user entered search terms
  const [errorMessage, setErrorMessage] = useState(null);

  const classes = useStyles();
  function getFarmRecords() {
    setShopByFarmProduce([]);
    base('Farms').select({ view: 'Grid view' }).all()
      .then((farmRecords) => {
        setFarmListings(farmRecords);
        setFilteredFarms(farmRecords);
      });
  }

  // Get prod id, grouped unit type, price per grouped unit for each produce record
  function getProduceRecords() {
    base('Listings').select({ view: 'Grid view' }).all()
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
            palletsAvailable: record.fields['pallets available'] || 0,
          };
          filteredProduceRecords.push(recordInfo);
        });
        setProduceListings(filteredProduceRecords);
        setFilteredProduce(filteredProduceRecords);
      });
  }

  const shopByFarm = (farmID) => {
    // TODO: error check for no produce from farm + use some signal to show loading if needed
    setShopByFarmProduce([]);
    setFilteredShopByFarmProduce([]);
    base('Farms').find(farmID, (err, farm) => {
      if (err) { setErrorMessage(err.message); } else if (farm.fields.listings) {
        farm.fields.listings.forEach((id) => {
          base('Listings').find(id, (e, record) => {
            if (e) { setErrorMessage(e.message); }
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
            setShopByFarmProduce((lastProduce) => lastProduce.concat(recordInfo));
            setFilteredShopByFarmProduce((lastProduce) => lastProduce.concat(recordInfo));
          });
        });
      } else {
        console.log('no listings for this farm');
        console.log(farm);
      }
    });
  };

  // Get produce records from Airtable whenever DOM mounts and updates/changes
  useEffect(() => {
    getProduceRecords();
    console.log('fetching produce');
  }, []);

  // Get farm records or produce of specific farm whenever DOM or link updates/changes
  useEffect(() => {
    if (shopByFarmID) {
      shopByFarm(shopByFarmID);
    } else {
      getFarmRecords();
    }
  }, [shopByFarmID]);

  const handleOpenCartPopup = () => {
    setOpen(true);
  };
  const handleCloseCartPopup = () => {
    setOpen(false);
  };

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
  async function filterProducebySearch(listings, setListings) {
    const data = Array.from(listings);
    Promise.all(data.map((produce) => searchProduce(produce)))
    // Use the result of the promises to filter the produceListings
      .then((result) => setListings(data.filter((element, index) => result[index])));
  }

  // run on submit of search bar (search icon or enter clicked)
  // may be useful to add any side bar filtering methods here too
  const filterBySearch = () => {
    filterProducebySearch(produceListings, setFilteredProduce);
    if (shopByFarmID === undefined) {
      filterFarmsBySearch();
    } else {
      filterProducebySearch(shopByFarmProduce, setFilteredShopByFarmProduce);
    }
  };

  return (
    <Grid container className={classes.root}>
      <AddCartPopup
        popupProduce={popupProduce}
        open={open}
        handleCloseCartPopup={handleCloseCartPopup}
      />
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
                listingID={produce.listingID}
                handleOpenCartPopup={handleOpenCartPopup}
                setPopupProduce={setPopupProduce}
                /* ProduceCard will get produce name, photo, + farm name by ids */
                produceID={produce.produceID || null}
                farmID={produce.farmID || null}
                palletPrice={produce.palletPrice}
                palletsAvailable={produce.palletsAvailable}
                season={produce.season}
              />
            ))
          }
        </Grid>
        {/* Map each array of farmListing info to render a FarmCard */
          tabValue === 'farm'
          && (
            shopByFarmID === undefined
              ? filteredFarms.map((farm) => (
                <FarmCard
                  key={farm.id}
                  farmID={farm.id}
                  farmName={farm.fields['farm name'] || 'No farm name'}
                  address={farm.fields.address || 'No address'}
                  zipCode={farm.fields['zip code'] || -1}
                  description={farm.fields.description || 'No description'}
                  operationTypeTags={farm.fields['operation type'] || []}
                  farmingPracticeTags={farm.fields['farming practice type'] || []}
                  shopByFarm={shopByFarm}
                />
              ))
              : (
                <Grid container direction="row" justify="flex-start">
                  {filteredShopByFarmProduce.map((produce) => (
                    <ProduceCard
                      key={produce.listingID}
                      listingID={produce.listingID}
                      handleOpenCartPopup={handleOpenCartPopup}
                      setPopupProduce={setPopupProduce}
                      produceID={produce.produceID || null}
                      farmID={produce.farmID || null}
                      palletPrice={produce.palletPrice}
                      season={produce.season}
                    />
                  ))}
                </Grid>
              )

          )
        }
      </Grid>
      <p>{errorMessage}</p>
    </Grid>
  );
}
