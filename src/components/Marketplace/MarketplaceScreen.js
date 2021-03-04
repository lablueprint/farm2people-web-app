import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import './MarketplaceScreen.css';
import {
  AppBar, Grid, Tab, Tabs, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FarmCard from './FarmCard';
import ProduceCard from './ProduceCard';
import '../../assets/styles/fonts.css';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  tabContainer: {
    backgroundColor: '#FFFFFF',
    paddingLeft: '2.5%',
    paddingRight: '2%',
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
  },
  tabText: {
    textTransform: 'none',
    fontFamily: 'Work Sans',
    fontSize: '17px',
    fontWeight: 'bold',
    color: '#373737',
  },
});

// Airtable set-up
const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

/* Contains title/search text + tab bar, w/ two tabs for all produce + farms */
function TabHeader({ tabValue, setTabValue }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AppBar position="static" className={classes.tabContainer}>
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
export default function MarketplaceScreen() {
  const [farmListings, setFarmListings] = useState([]);
  const [produceListings, setProduceListings] = useState([]);
  const [tabValue, setTabValue] = useState();

  const classes = useStyles();
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
  }, []);

  return (
    <div className={classes.root}>
      <TabHeader
        tabValue={tabValue}
        setTabValue={setTabValue}
      />
      {/* Map each array of produceListing info to render a ProduceCard */
        tabValue === 'all' && produceListings.map((produce) => (
          <ProduceCard
            // key={TODO, no unique identifiers in table}
            cropName={produce.fields.crop || 'No crop name'}
            farmID={produce.fields['farm id'] || null}
            unitPrice={produce.fields['standard price per pallet'] || -1}
            unitType={produce.fields['unit type'] || 'pallet'}
          />
        ))
      }
      {/* Map each array of farmListing info to render a FarmCard */
        tabValue === 'farm' && farmListings.map((farm) => (
          <FarmCard
            // key={TODO, no unique identifiers in table}
            farmName={farm.fields['farm name'] || 'No farm name'}
            address={farm.fields.address || 'No address'}
            zipCode={farm.fields['zip code'] || -1}
            description={farm.fields.description || 'No description'}
            operationTypeTags={farm.fields['operation type'] || []}
            farmingPracticeTags={farm.fields['farming practice type'] || []}
          />
        ))
      }
    </div>
  );
}

TabHeader.propTypes = {
  tabValue: PropTypes.number.isRequired,
  setTabValue: PropTypes.func.isRequired,
};
