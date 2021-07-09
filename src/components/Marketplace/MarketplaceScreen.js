import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import AddCartPopup from './Checkout/AddCartPopup';
import FarmCard from './FarmCard';
import ProduceCard from './ProduceCard';
import MarketplaceHeader from './Header/MarketplaceHeader';
import MarketplaceSidebar from './Sidebar/MarketplaceSidebar';
import '../../styles/fonts.css';
import { base } from '../../lib/airtable/airtable';
import { store } from '../../lib/redux/store';

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

const INITIAL_POPUP_PRODUCE = {
  crop: '',
  price: 0,
  farmName: '',
  palletsAvailable: 0,
  produceImg: '',
  listingID: '',
  farmID: '',
};

export default function MarketplaceScreen() {
  const [farmListings, setFarmListings] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [produceListings, setProduceListings] = useState([]);
  const [filteredProduce, setFilteredProduce] = useState([]);
  const [tabValue, setTabValue] = useState('all'); // Either 'all' for produce or 'farm' for farms
  const [numResults, setNumResults] = useState(10); // # of results to display
  const [popupProduce, setPopupProduce] = useState(INITIAL_POPUP_PRODUCE);
  const [open, setOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState(''); // user entered search terms

  function getFarmRecords() {
    base('Farms').select({ view: 'Grid view' }).all()
      .then((farmRecords) => {
        setFarmListings(farmRecords);
        setFilteredFarms(farmRecords);
      });
  }

  const getInitialRole = () => (store.getState().userData == null ? '' : store.getState().userData.user.fields['user type']);
  // Get prod id, grouped unit type, price per grouped unit for each produce record
  function getProduceRecords() {
    base('Listings').select({ view: 'Grid view' }).all()
      .then((produceRecords) => {
        const processedProduceRecords = [];
        produceRecords.forEach((record) => {
          const pricePerGroup = record.fields['standard price per grouped produce type'] || 0;
          const agencyPricePerGroup = record.fields['agency price per grouped produce type'] || 0;
          const groupPerPallet = record.fields['grouped produce type per pallet'] || 0;
          let palletPrice = pricePerGroup * groupPerPallet;
          let hasAgencyPrice = false;
          const userRole = getInitialRole();
          if (userRole === 'agency' && agencyPricePerGroup < pricePerGroup) {
            hasAgencyPrice = true;
            palletPrice = agencyPricePerGroup * groupPerPallet;
          }
          // Capitalise 1st letter of produce type to match filtering
          let produceType = record.fields['produce category'] ? record.fields['produce category'][0] : 'No category';
          produceType = produceType.charAt(0).toUpperCase() + produceType.slice(1);
          const recordInfo = {
            listingID: record.fields['listing id'],
            produceID: record.fields.produce ? record.fields.produce[0] : -1,
            farmID: record.fields['farm id'],
            palletPrice,
            season: record.fields['growing season'] || 'No season',
            produceType,
            palletsAvailable: record.fields['pallets available'] || 0,
            hasAgencyPrice,
          };
          processedProduceRecords.push(recordInfo);
        });
        setProduceListings(processedProduceRecords);
      });
  }

  // Manages farm season filtering (fx, filter options, # of items per option)
  const [seasonFilters, setSeasonFilters] = useState([]);
  // Called by child comp when season filters changed, sets new filters or empty [] if none/reset
  const onSeasonFilterChange = (newFilters) => {
    setSeasonFilters(newFilters);
  };
  const farmSeasonFilters = ['Fall', 'Winter', 'Summer', 'Spring'];
  const [itemsPerFarmSeason, setSeasonItems] = useState([]);

  // Manages produce type filtering
  const [prodFilters, setProdFilters] = useState([]);
  // Called by child comp when season filters changed, sets new filters or empty [] if none/reset
  const onProduceFilterChange = (newFilters) => {
    setProdFilters(newFilters);
  };
  const produceTypeFilters = ['Vegetable', 'Fruit', 'Legume', 'Grain', 'Oat'];
  const [itemsPerProdType, setProdItems] = useState([]);

  // Fx to get # of items per filter option to display in the filter menus
  function getNumItemsPerCategory() {
    // Get items per farming season
    const perSeason = [];
    farmSeasonFilters.forEach((season) => {
      const currentSeasonItems = produceListings.filter(
        (listing) => listing.season === season,
      );
      perSeason.push(currentSeasonItems.length);
    });
    setSeasonItems(perSeason);

    // Get items per produce type
    const perProdType = [];
    produceTypeFilters.forEach((prodType) => {
      const currentProdItems = produceListings.filter(
        (listing) => listing.produceType === prodType,
      );
      perProdType.push(currentProdItems.length);
    });
    setProdItems(perProdType);
  }
  // TODO: sort by, item type, price

  // Limits rendered produced cards to only those matching the selected filters
  function filterProduce() {
    let filteredListings = produceListings;
    if (seasonFilters.length > 0) {
      filteredListings = filteredListings.filter(
        (listing) => seasonFilters.includes(listing.season),
      );
    }
    if (prodFilters.length > 0) {
      filteredListings = filteredListings.filter(
        (listing) => prodFilters.includes(listing.produceType),
      );
    }
    setFilteredProduce(filteredListings);
  }

  // Get records from Airtable whenever DOM mounts and updates/changes
  useEffect(() => {
    getFarmRecords();
    getProduceRecords();
  }, []);
  // Make sure that filterProduce + isfilter bool updates whenever filters change
  const [isFiltered, setIsFiltered] = useState(false); // True if any current filters
  useEffect(() => {
    filterProduce();
    const newIsFiltered = !(seasonFilters.length === 0
       && prodFilters.length === 0);
    setIsFiltered(newIsFiltered);
  }, [seasonFilters, prodFilters]);
  useEffect(() => {
    filterProduce();
  }, [seasonFilters, prodFilters]);
  // Make sure # of produce items per category updates whenever produce listings change
  useEffect(() => {
    getNumItemsPerCategory();
  }, [produceListings]);

  const classes = useStyles();
  // Get total number of results depending on if (filtered/unfiltered) produce or farm
  // eslint-disable-next-line no-nested-ternary
  const totalResults = tabValue === 'all'
    ? (isFiltered ? filteredProduce.length : produceListings.length) : farmListings.length;
  const handleOpenCartPopup = () => {
    setOpen(true);
  };
  const handleCloseCartPopup = () => {
    setOpen(false);
  };

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
      <AddCartPopup
        popupProduce={popupProduce}
        open={open}
        handleCloseCartPopup={handleCloseCartPopup}
      />
      <Grid item className={classes.sidebar}>
        {/* Entire marketplace sidebar, contains toolbars for filter selection */}
        <MarketplaceSidebar
          prodTypeFilters={produceTypeFilters}
          farmSeasonFilters={farmSeasonFilters}
          itemsPerProdType={itemsPerProdType}
          itemsPerFarmSeason={itemsPerFarmSeason}
          onProduceFilterChange={onProduceFilterChange}
          onSeasonFilterChange={onSeasonFilterChange}
        />
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
            tabValue === 'all' && seasonFilters.length === 0 && prodFilters.length === 0 && produceListings.map((produce) => (
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
                hasAgencyPrice={produce.hasAgencyPrice}
              />
            ))
          }
          {/* Map each array of produceListing info to render a ProduceCard */
            tabValue === 'all' && (seasonFilters.length > 0 || prodFilters.length > 0) && filteredProduce.map((produce) => (
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
                hasAgencyPrice={produce.hasAgencyPrice}
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
