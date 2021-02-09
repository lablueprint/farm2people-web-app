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
  // Get records from Airtable whenever DOM mounts and updates/changes
  useEffect(() => {
    base('Farms').select({ view: 'Grid view' }).all()
      .then((records) => {
        setFarmListings(records);
      });
  });

  // 3 tab states: 0 (purchase buy), 1 (aggregate buy), 2 (distressed buy)
  const [currentTab, setCurrentTab] = useState(0);

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
          <ProduceCard />
          {/* Map each array of farmListing info to render a FarmCard */
            farmListings.map((listing) => (
              <FarmCard
                farmName={listing.fields['farm name'] || 'No farm name'}
                address={listing.fields.address || 'No address'}
                zipCode={listing.fields['zip code'] || -1}
                description={listing.fields.description || 'No description'}
                operationTypeTags={listing.fields['operation type'] || []}
                marketTags={listing.fields.market || ['None specified']}
                isPACA={listing.fields['PACA (Perishable Agricultural Commodities Act)']
                  || false}
                isColdChain={listing.fields['cold chain capabilities'] || false}
                isDelivery={listing.fields['able to deliver'] || false}
              />
            ))
          }
        </h1>
      </div>
    </div>
  );
}
