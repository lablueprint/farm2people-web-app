import React, { useEffect, useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history, store } from '../../lib/redux/store';
import MarketplaceScreen from './MarketplaceScreen';
import { base } from '../../lib/airtable/airtable';

export default function MarketplaceRouter() {
  const [allFarmListings, setAllFarmListings] = useState([]);
  const [allProduceListings, setAllProduceListings] = useState([]);

  function getFarmRecords() {
    base('Farms').select({ view: 'Grid view' }).all()
      .then((farmRecords) => {
        setAllFarmListings(farmRecords);
      });
  }

  // Get prod id, grouped unit type, price per grouped unit for each produce record
  const getInitialRole = () => (store.getState().userData == null ? '' : store.getState().userData.user.fields['user type']);
  // Get prod id, grouped unit type, price per grouped unit for each produce record
  function getProduceRecords() {
    base('Listings').select({ view: 'Grid view' }).all()
      .then((produceRecords) => {
        const processedProduceRecords = [];
        produceRecords.forEach((record) => {
          // If this record is private, skip it so it's not displayed
          if (record.fields.privatized) {
            return;
          }
          const pricePerGroup = record.fields['standard price per grouped produce type'] || 0;
          const agencyPricePerGroup = record.fields['agency price per grouped produce type'] || 0;
          const groupPerPallet = record.fields['grouped produce type per pallet'] || 0;
          let palletPrice = pricePerGroup * groupPerPallet;
          let hasAgencyPrice = false;
          const userRole = getInitialRole();
          if (userRole === 'agency' && agencyPricePerGroup < pricePerGroup) {
            hasAgencyPrice = true;
            palletPrice = agencyPricePerGroup * groupPerPallet;
          }
          // Capitalise 1st letter of produce type to match filtering
          let produceType = record.fields['produce category'] ? record.fields['produce category'][0] : 'No category';
          produceType = produceType.charAt(0).toUpperCase() + produceType.slice(1);
          const recordInfo = {
            listingID: record.fields['listing id'],
            produceID: record.fields.produce ? record.fields.produce[0] : -1,
            farmID: record.fields['farm id'],
            palletPrice,
            season: record.fields['growing season'] || 'No season',
            produceType,
            palletsAvailable: record.fields['pallets available'] || 0,
            hasAgencyPrice,
            // fields for sorting
            'sell by date': record.fields['sell by date'] || 0,
            'first available date': record.fields['first available date'] || 0,
            'available until': record.fields['available until'] || 0,
            'date entered': record.fields['data entered'] || 0,
            'produce name': record.fields['produce name'] || 'No name',
          };
          processedProduceRecords.push(recordInfo);
        });
        setAllProduceListings(processedProduceRecords);
      });
  }

  // Get produce and farmfrom Airtable whenever DOM mounts and updates/changes
  useEffect(() => {
    getFarmRecords();
    getProduceRecords();
  }, []);

  const MarketplaceRender = (props) => (
    <MarketplaceScreen
      {...props}
      allFarmListings={allFarmListings}
      allProduceListings={allProduceListings}
    />
  );

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={MarketplaceRender} />
        <Route exact path="/marketplace" render={MarketplaceRender} />
        <Route exact path="/marketplace/:searchTerms" render={MarketplaceRender} />
        <Route exact path="/marketplace/shopByFarm/:farmId" render={MarketplaceRender} />
        <Route exact path="/marketplace/shopByFarm/:farmId/:searchTerms" render={MarketplaceRender} />
      </Switch>
    </Router>
  );
}
