import React, { useState } from 'react';
import {
  AppBar, IconButton, InputBase, Tab, Tabs, Toolbar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './MarketplaceScreen.css';

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
        </h1>
      </div>
    </div>
  );
}
