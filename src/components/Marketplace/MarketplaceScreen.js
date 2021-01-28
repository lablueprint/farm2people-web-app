import React, { useState } from 'react';
import {
  AppBar, IconButton, InputBase, Tab, Tabs, Toolbar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './MarketplaceScreen.css';
import FarmCard from './FarmCard';

const operationTypeTags = [
  { key: 0, label: 'Women owned' },
  { key: 1, label: 'BIPOC owned' },
];

const marketTags = [
  { key: 0, label: 'NO MKRT' },
  { key: 1, label: 'Kern' },
  { key: 2, label: 'Kings' },
];

const miscTags = [
  { key: 0, label: 'Delivery' },
  { key: 1, label: 'PACA Certified' },
];

const description = 'Hello I am a farm I sell many farm items like apples pigs and yummy farm food.';

export default function MarketplaceScreen() {
  // 3 tab states: 0 (purchase buy), 1 (aggregate buy), 2 (distressed buy)
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <div>
      <h1> Marketplace Screen :) </h1>
      {/* Search bar element */ }
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
          <FarmCard
            operationTypeTags={operationTypeTags}
            marketTags={marketTags}
            miscTags={miscTags}
            description={description}
          />
        </h1>
      </div>
    </div>
  );
}
