import React, { useEffect, useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from '../../lib/redux/store';
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
  function getProduceRecords() {
    base('Listings').select({ view: 'Grid view' }).all()
      .then((produceRecords) => {
        const processedProduceRecords = [];
        produceRecords.forEach((record) => {
          const pricePerGroup = record.fields['standard price per grouped produce type'] || 0;
          const groupPerPallet = record.fields['grouped produce type per pallet'] || 0;
          const palletPrice = pricePerGroup * groupPerPallet;
          // Capitalise 1st letter of produce type to match filtering
          let produceType = record.fields['produce category'] ? record.fields['produce category'][0] : 'No category';
          produceType = produceType.charAt(0).toUpperCase() + produceType.slice(1);
          const recordInfo = {
            listingID: record.fields['listing id'],
            produceID: record.fields.produce ? record.fields.produce[0] : -1,
            farmID: record.fields['farm id'],
            palletPrice: palletPrice !== 0 ? palletPrice : -1,
            season: record.fields['growing season'] || 'No season',
            produceType,
            palletsAvailable: record.fields['pallets available'] || 0,
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
