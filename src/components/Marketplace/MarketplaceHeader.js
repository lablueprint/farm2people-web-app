import React from 'react';
import './MarketplaceScreen.css';
import {
  AppBar, Grid, MenuItem, Tab, Tabs, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchIcon from '@material-ui/icons/Search';
import '../../assets/styles/fonts.css';
import Fruit1 from '../../assets/images/Fruit1.svg';
import Fruit2 from '../../assets/images/Fruit2.svg';

const useStyles = makeStyles({
  headerContainer: {
    paddingLeft: '3%',
    paddingRight: '4%',
  },
  marketplaceTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '35px',
    fontWeight: 'bold',
    color: '#373737',
    marginTop: '2.5%',
    marginBottom: '2%',
  },
  // View results styling
  viewContainer: {
    marginTop: '1%',
    width: '25%',
  },
  viewText: {
    fontFamily: 'Work Sans',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#373737',
    marginRight: '3%',
  },
  resultText: {
    fontFamily: 'Work Sans',
    fontSize: '14px',
    color: '#373737',
    marginLeft: '3%',
  },
  resultOptionMenu: {
    marginTop: '-3.5%',
  },
  resultOptionText: {
    fontFamily: 'Work Sans',
    fontSize: '15px',
    color: '#373737',
  },
  // Search text styling
  searchContainer: {
    width: '50%',
  },
  searchText: {
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    color: '#373737',
  },
  locationText: {
    fontFamily: 'Work Sans',
    fontSize: '15.5px',
    color: '#373737',
    fontWeight: 'bold',
  },
  locationIcon: {
    color: '#FF765D',
    marginTop: '2.5%',
    marginRight: '1%',
  },
  // Search bar styling
  searchBarContainer: {
    marginTop: '0.5%',
    width: '68%',
    marginLeft: '3.5%',
  },
  inputText: {
    fontFamily: 'Work Sans',
    fontSize: '15.5px',
    color: '#373737',
    backgroundColor: '#F1F2F2',
    '&::placeholder': { // Styling for placeholder text only
      fontFamily: 'Work Sans',
      fontSize: '15.5px',
      color: '#747474',
      fontStyle: 'italic',
    },
  },
  searchIcon: {
    color: '#717171',
    backgroundColor: '#F1F2F2',
  },
  // TabHeader styling
  tabContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: '1.5%',
    paddingRight: '1%',
  },
  indicator: {
    display: 'flex',
    '& > span': {
      maxWidth: '4px',
      width: '4px',
      backgroundColor: '#53AA48',
    },
    backgroundColor: '#53AA48',
    height: '4px',
  },
  tabTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '24px',
    fontWeight: 'bolder',
    color: '#373737',
    marginBottom: '-1%',
  },
  tabText: {
    textTransform: 'none',
    fontFamily: 'Work Sans',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#373737',
  },
  // Fruit images
  fruit1: {
    position: 'absolute',
    width: '112px',
    height: 'auto',
    right: '60px',
    top: '-20px',
    zIndex: '-2',
  },
  fruit2: {
    position: 'absolute',
    width: '92px',
    height: 'auto',
    right: '2px',
    top: '10px',
    zIndex: '-1',
  },
});

/* Contains title/search text + tab bar, w/ two tabs for all produce + farms */
function TabHeader({ tabValue, setTabValue }) {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AppBar
      position="static"
      className={classes.tabContainer}
      elevation={0}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography className={classes.tabTitleText}>
          {tabValue === 'all' ? 'ALL PRODUCE' : 'ALL FARMS'}
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          classes={{ indicator: classes.indicator }}
        >
          <Tab
            value="all"
            label="Shop All"
            className={classes.tabText}
          />
          <Tab
            value="farm"
            label="Shop by Farm"
            className={classes.tabText}
          />
        </Tabs>
      </Grid>
    </AppBar>
  );
}

/* Contains view results text + selection menu for # of results */
function ViewResults({ numResults, setNumResults, totalResults }) {
  const classes = useStyles();
  const resultOptions = [5, 10, 25, 50, 100];
  // TODO: update to limit # of results shown based on numResults
  const handleChange = (event) => {
    setNumResults(event.target.value);
  };

  return (
    <Grid
      container
      direction="row"
      className={classes.viewContainer}
    >
      <Typography className={classes.viewText}>
        View
      </Typography>
      <TextField
        select
        variant="outlined"
        size="small"
        value={numResults}
        onChange={handleChange}
        className={classes.resultOptionMenu}
      >
        {resultOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
          >
            <Typography className={classes.resultOptionText}>
              {option}
            </Typography>
          </MenuItem>
        ))}
      </TextField>
      <Typography className={classes.resultText}>
        {totalResults === 0 && '0 results'}
        {totalResults > 0 && `1-${numResults} of ${totalResults} results`}
      </Typography>
    </Grid>
  );
}

/* Marketplace header: title, view results, search bar, and tab selector */
export default function MarketplaceHeader({
  tabValue, setTabValue, totalResults, numResults, setNumResults,
}) {
  const classes = useStyles();

  return (
    <div className={classes.headerContainer}>
      <Typography align="center" className={classes.marketplaceTitleText}>
        Marketplace
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
      >
        {/* View results text + limit selection menu */}
        <ViewResults
          numResults={numResults}
          setNumResults={setNumResults}
          totalResults={totalResults}
        />
        {/* Searching near text + icon, search bar */}
        <Grid
          container
          direction="row"
          className={classes.searchContainer}
        >
          <LocationOnOutlinedIcon className={classes.locationIcon} />
          <div>
            <Typography className={classes.searchText}>
              Searching near
            </Typography>
            <Typography className={classes.locationText}>
              {/* TODO: Get location of user */ }
              Real location, CA
            </Typography>
          </div>
          <TextField
            placeholder="Search for produce, farms, etc."
            fullWidth
            variant="outlined"
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.inputText,
                adornedEnd: classes.searchIcon,
              },
              endAdornment: <SearchIcon />,
            }}
            className={classes.searchBarContainer}
            size="small"
            // TODO: onChange fx to actually implement search
          />
        </Grid>
      </Grid>
      {/* Tab title text + 2 tab selectors */}
      <TabHeader tabValue={tabValue} setTabValue={setTabValue} />
      <img
        src={Fruit1}
        alt="fruit1"
        className={classes.fruit1}
      />
      <img
        src={Fruit2}
        alt="fruit2"
        className={classes.fruit2}
      />
    </div>
  );
}

TabHeader.propTypes = {
  tabValue: PropTypes.string.isRequired,
  setTabValue: PropTypes.func.isRequired,
};

ViewResults.propTypes = {
  numResults: PropTypes.number.isRequired,
  setNumResults: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
};

MarketplaceHeader.propTypes = {
  tabValue: PropTypes.string.isRequired,
  setTabValue: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
  numResults: PropTypes.number.isRequired,
  setNumResults: PropTypes.func.isRequired,
};
