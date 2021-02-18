import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import {
  AppBar, IconButton, InputBase, Tab, Tabs, Toolbar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './MarketplaceScreen.css';
import { makeStyles } from '@material-ui/core/styles';
import FarmCard from './FarmCard';
import ProduceCard from './ProduceCard';

// Airtable set-up
const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

// Custom styling
const styles = makeStyles({
  tabBackground: {
    backgroundColor: 'grey',
    color: 'green',
  },
});

export default function MarketplaceScreen() {
  const [farmListings, setFarmListings] = useState([]);
  const [produceListings, setProduceListings] = useState([]);
  // 3 tab states: 0 (purchase buy), 1 (aggregate buy), 2 (distressed buy)
  const [currentTab, setCurrentTab] = useState(0);

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
    console.log(produceListings);
    /* eslint-disable-next-line */
  }, []);

  // Uses farmID to get farmName for produce listing
  /* function getFarmName(farmID) {
    base('Farms').find(farmID).then((record) => {
      console.log(record);
      console.log(record['farm name']);
    });
  } */

  console.log('print produce listing');
  // console.log(produceListings[0]);
  // getFarmName(produceListings[0].fields.id[0]);

  return (
    <div className={styles.tabBackground}>
      <h1> Marketplace Screen :) </h1>
      {/* Search bar element */}
      <div className="searchBarContainer">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="drop down menu"
            >
              <ArrowDropDownIcon />
            </IconButton>
            <InputBase
              placeholder="Search here"
              color="primary"
            />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="search icon"
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      {/* 3-tab buy overview of individual farm listings  */}
      <div className="tabContainer">
        <AppBar position="static">
          <Tabs
            value={currentTab}
            onChange={(event, newTab) => setCurrentTab(newTab)}
            aria-label="Purchase Buy, Aggregate Buy, Distressed Buy tab navigation"
          >
            <Tab label="Purchase Buy" />
            <Tab label="Aggregate Buy" />
            <Tab label="Distressed Buy" />
          </Tabs>
        </AppBar>
        <h1 className={styles.tabBackground}>
          {currentTab}
          {(currentTab === 0
            && (produceListings.map((produceListing) => (
              <ProduceCard
                cropName={produceListing.fields.crop || 'No crop name'}
                farmName="Ryans Rarm"
                unitPrice={produceListing.fields['standard price per unit'] || 'No price'}
                unitType={produceListing.fields['unit type'] || 'unit'}
              />
            ))))}
          {/* Map each array of farmListing info to render a FarmCard */
            currentTab === 1
            && (farmListings.map((farmListing) => (
              <FarmCard
                farmName={farmListing.fields['farm name'] || 'No farm name'}
                address={farmListing.fields.address || 'No address'}
                zipCode={farmListing.fields['zip code'] || -1}
                description={farmListing.fields.description || 'No description'}
                operationTypeTags={farmListing.fields['operation type'] || []}
                marketTags={farmListing.fields.market || ['None specified']}
                isPACA={farmListing.fields['PACA (Perishable Agricultural Commodities Act)']
                  || false}
                isColdChain={farmListing.fields['cold chain capabilities'] || false}
                isDelivery={farmListing.fields['able to deliver'] || false}
              />
            )))
          }
        </h1>
      </div>
    </div>
  );
}
