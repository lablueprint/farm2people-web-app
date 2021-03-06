import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { store } from '../../lib/redux/store';
import { base } from '../../lib/airtable/airtable';
import ListingsView from './ListingsView';
import AddListingButton from './AddListingButton';
import DeleteButton from './DeleteButton';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
    maxWidth: '100%',
  },
  dashboard: {
    marginTop: '2%',
    marginBottom: '2%',
  },
  text: {
    fontFamily: 'Work Sans',
  },
  listings: {
    border: '1px solid #F1F2F2',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    marginTop: '3%',
  },
});

let initialCardSelect = {};
export default function InventoryManagerScreen() {
  const classes = useStyles();
  const [produceTypes, setProduceTypes] = useState([]);
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
  function editRecord(rec) {
    const { 'listing id': id, user, ...fields } = rec;
    const record = {
      id,
      fields,
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
      .select({
        view: 'Grid view',
        filterByFormula: `{user} = "${store.getState().userData.user.id}"`,
      })
      .all().then((records) => {
        setCardListings(records);
        records.forEach((listing) => {
          initialCardSelect = { ...initialCardSelect, [listing.id]: false };
        });
        setSelectedCards(initialCardSelect);
      });
  }, []);
  useEffect(() => {
    base('Produce Type')
      .select({ view: 'Grid view' })
      .all().then((records) => {
        setProduceTypes(records);
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
            <Grid container item direction="row" spacing={1} xs={12}>
              <Grid item xs={8} />
              <Grid item xs={2}>
                <AddListingButton createRecord={createRecord} produceTypes={produceTypes} />
              </Grid>
              <Grid item xs={2}>
                <DeleteButton deleteRecords={deleteSelectedRecords} />
              </Grid>
            </Grid>
            <Grid container item xs={12} className={classes.listings}>
              <ListingsView
                cardListings={cardListings}
                selectedCards={selectedCards}
                updateSelectedCards={updateSelectedCards}
                editRecord={editRecord}
                produceTypes={produceTypes}
              />
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    </>
  );
}
