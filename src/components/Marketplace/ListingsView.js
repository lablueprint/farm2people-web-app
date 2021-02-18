import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ListingCard from './ListingCard';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);
// const selectedCardStates = {};
let initialCardSelect = {};
export default function ListingsView() {
  const [cardListings, setCardListings] = useState([]);
  const [selectedCards, setSelectedCards] = useState({});
  function updateSelectedCards(key, value) {
    setSelectedCards({ ...selectedCards, [key]: value });
    console.log(selectedCards);
  }
  // function setupListingStates(listing) {
  //   selectedCardStates[listing.id] = false;
  // }
  useEffect(() => {
    base('Listings')
      .select({ view: 'Grid view' })
      .all().then((records) => {
        setCardListings(records);
        records.forEach((listing) => {
          initialCardSelect = { ...initialCardSelect, [listing.id]: false };
        });
        setSelectedCards(initialCardSelect);
      });
  }, []);
  console.log(cardListings);
  function getListing(id) {
    return cardListings.find((listing) => listing.id === id).fields;
  }
  return (
    <>
      <Grid container spacing={2} justify="left" align="center">
        {
        cardListings.map((listing) => (
          <Grid item xs={3}>
            <ListingCard
              id={listing.id}
              getListing={getListing}
              onSelect={updateSelectedCards}
              selected={selectedCards[listing.id]}
            />
          </Grid>
        ))
        }
      </Grid>
    </>
  );
}
