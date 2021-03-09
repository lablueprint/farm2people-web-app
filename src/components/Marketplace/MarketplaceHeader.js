import React from 'react';
import './MarketplaceScreen.css';
import {
  AppBar, Grid, MenuItem, Tab, Tabs, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../../assets/styles/fonts.css';

const useStyles = makeStyles({
  headerContainer: {
    paddingLeft: '2.5%',
    paddingRight: '2%',
  },
  marketplaceTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '35px',
    fontWeight: 'bold',
    color: '#373737',
    marginTop: '1.5%',
    marginBottom: '1%',
  },
  // View results styling
  viewText: {
    fontFamily: 'Work Sans',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#373737',
    marginRight: '1%',
  },
  resultText: {
    fontFamily: 'Work Sans',
    fontSize: '14px',
    color: '#373737',
    marginLeft: '1%',
  },
  resultOptionMenu: {
    marginTop: '-0.8%',
  },
  resultOptionText: {
    fontFamily: 'Work Sans',
    fontSize: '15px',
    color: '#373737',
  },
  // TabHeader styling
  tabContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: '1.5%',
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
    marginBottom: '-0.5%',
  },
  tabText: {
    textTransform: 'none',
    fontFamily: 'Work Sans',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#373737',
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

/* Marketplace header: title, view results, search bar, and tab selector */
export default function MarketplaceHeader({
  tabValue, setTabValue, totalResults, numResults, setNumResults,
}) {
  const classes = useStyles();
  const resultOptions = [5, 10, 25, 50, 100];

  const handleChange = (event) => {
    setNumResults(event.target.value);
  };

  return (
    <div className={classes.headerContainer}>
      <Typography align="center" className={classes.marketplaceTitleText}>
        Marketplace
      </Typography>
      {/* View results text + limit selection menu */}
      <Grid
        container
        direction="row"
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
      <TabHeader
        tabValue={tabValue}
        setTabValue={setTabValue}
      />
    </div>
  );
}

TabHeader.propTypes = {
  tabValue: PropTypes.string.isRequired,
  setTabValue: PropTypes.func.isRequired,
};

MarketplaceHeader.propTypes = {
  tabValue: PropTypes.string.isRequired,
  setTabValue: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
  numResults: PropTypes.number.isRequired,
  setNumResults: PropTypes.func.isRequired,
};
