import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Airtable from 'airtable';
import ListingsView from './ListingsView';
import AddListingButton from './AddListingButton';
import DeleteButton from './DeleteButton';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  dashboard: {
    marginTop: '1%',
  },
  text: {
    fontFamily: 'Work Sans',
  },
});

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const getProduceTypes = () => {
  const produceNames = [];
  base('Produce Type').select({
    fields: ['produce type'],
  }).eachPage((records, fetchNextPage) => {
    records.forEach((record) => (
      produceNames.push(record.get('produce type'))
    ));
    fetchNextPage();
  });
  return produceNames;
};

let initialCardSelect = {};
export default function InventoryManagerScreen() {
  const classes = useStyles();
  const [cardListings, setCardListings] = useState([]);
  const [selectedCards, setSelectedCards] = useState({});
  function createRecord(rec) {
    const record = {
      fields: rec,
    };
    base('Listings').create([record], (err, records) => {
      if (err) {
        return;
      }
      records.forEach((r) => {
        setCardListings([...cardListings, r]);
      });
    });
  }
  function editRecord(id, rec) {
    const record = {
      id,
      fields: rec,
    };
    base('Listings').update([record], (err, records) => {
      if (err) {
        return;
      }
      records.forEach((r) => {
        const oldRecords = cardListings.map((oldRec) => {
          if (oldRec.id === r.id) {
            return r;
          }
          return oldRec;
        });
        setCardListings(oldRecords);
      });
    });
  }
  function deleteSelectedRecords() {
    const ids = Object.keys(selectedCards).filter((key) => (
      selectedCards[key] === true
    ));
    if (ids.length === 0) {
      return;
    }
    base('Listings').destroy(ids, (err) => {
      if (err) {
        return;
      }
      const filteredRecords = cardListings.filter((oldRec) => (
        !ids.includes(oldRec.id)
      ));
      let newSelectedListings = {};
      filteredRecords.forEach((listing) => {
        newSelectedListings = { ...initialCardSelect, [listing.id]: false };
      });
      setCardListings(filteredRecords);
      setSelectedCards(newSelectedListings);
    });
  }

  function updateSelectedCards(key, value) {
    setSelectedCards({ ...selectedCards, [key]: value });
  }
  useEffect(() => {
    base('Listings')
      .select({ view: 'Grid view' })
      .all().then((records) => {
        setCardListings(records);
        console.log(records);
        records.forEach((listing) => {
          initialCardSelect = { ...initialCardSelect, [listing.id]: false };
        });
        setSelectedCards(initialCardSelect);
      });
  }, []);
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={0} className={classes.dashboard}>
          <Grid item xs={1} />
          <Grid container item spacing={3} xs={9} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.text}>
                Seller Dashboard
              </Typography>
            </Grid>
            <Grid container item direction="row" justify="space-between" alignItems="center" spacing={1} xs={12}>
              <Grid item xs={8} />
              <Grid item xs={2}>
                <AddListingButton createRecord={createRecord} getProduceTypes={getProduceTypes} />
              </Grid>
              <Grid item xs={2}>
                <DeleteButton deleteRecords={deleteSelectedRecords} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ListingsView
                cardListings={cardListings}
                selectedCards={selectedCards}
                updateSelectedCards={updateSelectedCards}
                editRecord={editRecord}
              />
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    </>
  );
}
