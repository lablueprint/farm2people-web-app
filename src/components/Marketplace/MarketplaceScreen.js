import React from 'react';
import {
  AppBar, IconButton, InputBase, Toolbar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './MarketplaceScreen.css';

export default function MarketplaceScreen() {
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
      {/* 3-tab buy overview of individual farm listings */}
    </div>
  );
}
