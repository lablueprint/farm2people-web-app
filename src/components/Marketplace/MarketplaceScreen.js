import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import {
  AppBar, IconButton, InputBase, Tab, Tabs, Toolbar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './MarketplaceScreen.css';
import FarmCard from './FarmCard';

/* const operationTypeTags = [
  { key: 0, label: 'Women owned' },
  { key: 1, label: 'BIPOC owned' },
];

const marketTags = [
  { key: 0, label: 'NO MKRT' },
  { key: 1, label: 'Kern' },
  { key: 2, label: 'Kings' },
];

const description = 'Hello I am a farm I sell farm items like apples pigs n yummy farm food.'; */

// Airtable set-up
const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

export default function MarketplaceScreen() {
  const [farmListings, setFarmListings] = useState([]);
  // Get records from Airtable whenever DOM mounts and updates/changes
  useEffect(() => {
    base('Farms').select({ view: 'Grid view' }).all()
      .then((records) => {
        // records array contains every record in Main View
        console.log('records');
        // records.map((record) => console.log(record));
        console.log(farmListings);
        setFarmListings(records);
      });
  });

  console.log('done w/ farmlisting');
  farmListings.map((listing) => console.log(listing.fields['farm name']));
  // 3 tab states: 0 (purchase buy), 1 (aggregate buy), 2 (distressed buy)
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
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
        <h1>
          {currentTab}
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
          {/* <FarmCard
            farmName="farm Name"
            address="123 drive"
            zipCode={12345}
            operationTypeTags={operationTypeTags}
            marketTags={marketTags}
            description={description}
            isPACA
            isColdChain={false}
            isDelivery
          />
          <FarmCard
            farmName="farm Name"
            address="123 drive"
            zipCode={12345}
            operationTypeTags={operationTypeTags}
            marketTags={marketTags}
            description={description}
            isPACA
            isColdChain={false}
            isDelivery={false}
          /> */}
        </h1>
      </div>
    </div>
  );
}
