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
  const [produceListings, setProduceListings] = useState([]);
  const [tabValue, setTabValue] = useState('all'); // Either 'all' for produce or 'farm' for farms
  const [numResults, setNumResults] = useState(10); // # of results to display
  const [filteredProduce, setFilteredProduce] = useState(null);

  function getFarmRecords() {
    base('Farms').select({ view: 'Grid view' }).all()
      .then((farmRecords) => {
        setFarmListings(farmRecords);
      });
  }

  // Get prod id, grouped unit type, price per grouped unit for each produce record
  function getProduceRecords() {
    base('Listings').select({ view: 'Grid view' }).all()
      .then((produceRecords) => {
        const processedProduceRecords = [];
        produceRecords.forEach((record) => {
          const pricePerGroup = record.fields['standard price per grouped produce type'] || 0;
          const groupPerPallet = record.fields['grouped produce type per pallet'] || 0;
          const palletPrice = pricePerGroup * groupPerPallet;
          // Capitalise 1st letter of produce type to match filtering
          let produceType = record.fields['produce category'] ? record.fields['produce category'][0] : 'No category';
          produceType = produceType.charAt(0).toUpperCase() + produceType.slice(1);
          const recordInfo = {
            listingID: record.fields['listing id'],
            produceID: record.fields.produce ? record.fields.produce[0] : -1,
            farmID: record.fields['farm id'],
            palletPrice: palletPrice !== 0 ? palletPrice : -1,
            season: record.fields['growing season'] || 'No season',
            produceType,
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
  const onProduceFilterChange = (newFilters) => {
    setProdFilters(newFilters);
  };
  const produceTypeFilters = ['Vegetable', 'Fruit', 'Legume', 'Grain', 'Oat'];
  const [itemsPerProdType, setProdItems] = useState([]);

  // Manages pallet price filtering
  const [priceFilters, setPriceFilters] = useState([]);
  const [appliedRange, setAppliedRange] = useState([]); // [] if no applied min/max
  const onPriceFilterChange = (newFilters) => {
    // Parse the min + max #s from each range by splitting + filtering the string
    const newPriceRanges = [];
    newFilters.forEach((prices) => {
      let nums = prices.replace(/\D/g, '#'); // regex expr to replace non-digits w/ #
      nums = nums.split('#').filter((elem) => elem !== ''); // split into array, filter to only get nums
      if (prices.includes('APPLIED')) { // Apply new min/max range
        setAppliedRange(nums);
      } else if (prices.includes('UNAPPLY')) { // Unapply range
        setAppliedRange([]);
      } else { // Filter option
        newPriceRanges.push(nums);
      }
    });
    setPriceFilters(newPriceRanges);
  };
  const priceOptions = [0, 15, 30, 45, 60, 75];
  const [itemsPerPrice, setPriceItems] = useState([]);

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

    // Get items per price range (0-15, 15-30, 30-45, 45-60, 60-75)
    const perPrice = [0, 0, 0, 0, 0];
    produceListings.forEach((listing) => {
      const thisPrice = listing.palletPrice;
      if (thisPrice >= priceOptions[0] && thisPrice <= priceOptions[1]) {
        perPrice[0] += 1;
      }
      if (thisPrice >= priceOptions[1] && thisPrice <= priceOptions[2]) {
        perPrice[1] += 1;
      }
      if (thisPrice >= priceOptions[2] && thisPrice <= priceOptions[3]) {
        perPrice[2] += 1;
      }
      if (thisPrice >= priceOptions[3] && thisPrice <= priceOptions[4]) {
        perPrice[3] += 1;
      }
      if (thisPrice >= priceOptions[4] && thisPrice <= priceOptions[5]) {
        perPrice[4] += 1;
      }
    });
    setPriceItems(perPrice);
  }
  // TODO: sort by, item type

  // Go through the selected filter ranges + check if this price w/in any of them
  function inFilterPriceRange(num) {
    let output = false;
    priceFilters.forEach((range) => {
      const priceMin = parseInt(range[0], 10);
      const priceMax = parseInt(range[1], 10);
      if (num >= priceMin && num <= priceMax) {
        output = true;
      }
    });
    return output;
  }

  function inAppliedRange(num) {
    const priceMin = parseInt(appliedRange[0], 10);
    const priceMax = parseInt(appliedRange[1], 10);
    if (num >= priceMin && num <= priceMax) {
      return true;
    }
    return false;
  }

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
    // If applied range exists, hard limit to min/max
    if (appliedRange.length > 0) {
      filteredListings = filteredListings.filter(
        (listing) => inAppliedRange(listing.palletPrice),
      );
    }
    if (priceFilters.length > 0) {
      filteredListings = filteredListings.filter(
        (listing) => inFilterPriceRange(listing.palletPrice),
      );
    }
    setFilteredProduce(filteredListings);
  }

  // Get records from Airtable whenever DOM mounts and updates/changes
  useEffect(() => {
    getFarmRecords();
    getProduceRecords();
  }, []);
  // Make sure # of produce items per category updates whenever produce listings change
  useEffect(() => {
    getNumItemsPerCategory();
  }, [produceListings]);
  // Make sure that filterProduce + isfilter bool updates whenever any of the filters change
  const [isFiltered, setIsFiltered] = useState(false); // True if any filter types are checked
  useEffect(() => {
    filterProduce();
    const newIsFiltered = !(seasonFilters.length === 0 && prodFilters.length === 0
      && priceFilters.length === 0 && appliedRange.length === 0);
    setIsFiltered(newIsFiltered);
  }, [seasonFilters, prodFilters, priceFilters, appliedRange]);

  const classes = useStyles();
  // Get total number of results depending on if produce or farm
  const totalResults = tabValue === 'all' ? produceListings.length : farmListings.length;

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.sidebar}>
        {/* Entire marketplace sidebar, contains toolbars for filter selection */}
        <MarketplaceSidebar
          prodTypeFilters={produceTypeFilters}
          itemsPerProdType={itemsPerProdType}
          onProduceFilterChange={onProduceFilterChange}
          priceOptions={priceOptions}
          itemsPerPrice={itemsPerPrice}
          onPriceFilterChange={onPriceFilterChange}
          farmSeasonFilters={farmSeasonFilters}
          itemsPerFarmSeason={itemsPerFarmSeason}
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
        />
        <Grid container direction="row" justify="flex-start">
          {/* Map each array of produceListing info to render a ProduceCard */
            tabValue === 'all' && !isFiltered && produceListings.map((produce) => (
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
          {/* Map each array of produceListing info to render a ProduceCard */
            tabValue === 'all' && isFiltered && filteredProduce.map((produce) => (
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
      </Grid>
    </Grid>
  );
}
