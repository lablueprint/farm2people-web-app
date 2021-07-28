import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { store } from '../../lib/redux/store';
import { base } from '../../lib/airtable/airtable';
import ListingsView from './ListingsView/ListingsView';
import AddListingButton from './Header/AddListingButton';
import DeleteButton from './Header/DeleteButton';
import InventoryManagerSidebar from './Sidebar/InventoryManagerSidebar';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
    maxWidth: '100%',
  },
  dashboard: {
    marginTop: '2%',
    marginBottom: '2%',
    paddingLeft: '5rem',
  },
  text: {
    fontFamily: 'Work Sans',
  },

});

let initialCardSelect = {};
export default function InventoryManagerScreen() {
  const classes = useStyles();
  const [produceTypes, setProduceTypes] = useState([]);
  const [cardListings, setCardListings] = useState([]);
  const [selectedCards, setSelectedCards] = useState({});
  const [produceCategoryFilter, setProduceCategoryFilter] = useState([]);
  const [sellByFilter, setSellByFilter] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [priceFilter, setPriceFilter] = useState([-1, -1]);
  const [privatizedFilter, setPrivatizedFilter] = useState();
  // remove filter if it is in the array, add it if not
  const updateFilter = (option, filter, setFilter) => {
    // reset array if option is an empty array
    if (Array.isArray(option)) {
      const newFilter = [];
      setFilter(newFilter);
      return;
    }
    // add option to array if not already in
    // remove otherwise
    const newFilter = [...filter];
    const index = newFilter.indexOf(option);
    if (index > -1) {
      newFilter.splice(index, 1);
    } else {
      newFilter.push(option);
    }
    setFilter(newFilter);
  };

  const filterByProduceCategory = (listing, filter) => (
    // filter length of zero means no filters to apply
    filter.length === 0
    || (listing.fields['produce category']
      ? filter.includes(listing.fields['produce category'][0])
      : false)
  );
  const filterByAvailability = (listing, filter) => {
    if (filter.length === 0) {
      return true;
    }
    let condition = false;
    if (filter.includes('available')) {
      condition = condition || listing.fields['pallets available'] > 0;
    }
    if (filter.includes('sold out')) {
      condition = condition || listing.fields['pallets available'] <= 0;
    }
    return condition;
  };
  const filterBySellByDate = (listing, filter) => {
    if (filter.length === 0) {
      return true;
    }
    let condition = false;
    if (filter.includes('past sell by date')) {
      condition = condition || Date.parse(listing.fields['sell by date']) < new Date();
    }
    if (filter.includes('before sell by date')) {
      condition = condition || Date.parse(listing.fields['sell by date']) > new Date();
    }
    return condition;
  };
  const filterByPrice = (listing, filter) => {
    let condition = true;
    const price = listing.fields['standard price per grouped produce type'];
    if (filter[0] > 0) {
      condition = condition && price > priceFilter[0];
    }
    if (filter[1] > 0) {
      condition = condition && price < priceFilter[1];
    }
    return condition;
  };
  const filterByPrivatized = (listing, filter) => {
    if (filter !== undefined) {
      return (listing.fields.privatized || false) === filter;
    }
    return true;
  };

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
    base('Produce Type')
      .select({ view: 'Grid view' })
      .all().then((records) => {
        setProduceTypes(records);
      });
  }, []);

  // calculate listings from each filter
  // RETURNS : object of shape {
  //   [optionType] : {
  //     label: [option]
  //     amount: [numberOfListings]
  //   }
  // }
  const getFilterOptionsAndAmounts = () => {
    // options for each type of filter
    // to add a new option, just change up here
    const sellByOptions = ['Past Sell By Date', 'Before Sell By Date'];
    const availabilityOptions = ['Available', 'Sold Out'];
    const produceCategoryOptions = ['Vegetable', 'Fruit', 'Legume', 'Grain', 'Oat'];
    return {

      sellByOptions: sellByOptions.map((option) => (
        {
          label: option,
          amount: cardListings.filter((listing) => (
            filterBySellByDate(listing, option.toLowerCase())
          )).length,
        }
      )),
      availabilityOptions: availabilityOptions.map((option) => (
        {
          label: option,
          amount: cardListings.filter((listing) => (
            filterByAvailability(listing, option.toLowerCase())
          )).length,
        }
      )),
      produceCategoryOptions: produceCategoryOptions.map((option) => (
        {
          label: option,
          amount: cardListings.filter((listing) => (
            filterByProduceCategory(listing, option.toLowerCase())
          )).length,
        }
      )),
    };
  };
  const getTabLabelsAndAmounts = () => {
    const tabs = [
      { label: 'All Listings', filter: undefined },
      { label: 'Public', filter: false },
      { label: 'Private', filter: true },
    ];
    return tabs.map((tab) => (
      {
        ...tab,
        amount: cardListings.filter((listing) => (
          filterByPrivatized(listing, tab.filter)
        )).length,
      }
    ));
  };
  // filter listings by each possible filter
  const filteredListings = cardListings.filter((listing) => (
    filterByProduceCategory(listing, produceCategoryFilter)
    && filterBySellByDate(listing, sellByFilter)
    && filterByAvailability(listing, availabilityFilter)
    && filterByPrice(listing, priceFilter)
    && filterByPrivatized(listing, privatizedFilter)
  ));
  // sort by provided sortOrder if there is one, otherwise no sort
  filteredListings.sort((firstListing, secondListing) => (
    firstListing.fields[sortOrder] > secondListing.fields[sortOrder] ? 1 : -1
  ));
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
    // take out any lookup fields before sending the update
    const {
      'listing id': id,
      user,
      'produce category': category,
      'produce name': name,
      ...fields
    } = rec;
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
  const getSelectedRecordIDs = () => (
    Object.keys(selectedCards).filter((key) => (
      selectedCards[key] === true
    ))
  );
  function deleteRecords(ids) {
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
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.dashboard} justify="center">
          <Grid container item spacing={3} xs={9} alignContent="flex-start">
            <Grid container item xs={12} alignContent="flex-start">
              <Typography variant="h4" className={classes.text}>
                Seller Dashboard
              </Typography>
            </Grid>
            <Grid container item spacing={1} xs={12} justify="flex-end">
              <Grid item>
                <AddListingButton createRecord={createRecord} produceTypes={produceTypes} />
              </Grid>
              <Grid item>
                <DeleteButton deleteRecords={() => deleteRecords(getSelectedRecordIDs())} />
              </Grid>
            </Grid>
            <Grid container item className={classes.listings} xs={12}>
              <ListingsView
                cardListings={filteredListings}
                selectedCards={selectedCards}
                updateSelectedCards={updateSelectedCards}
                editRecord={editRecord}
                deleteRecord={deleteRecords}
                produceTypes={produceTypes}
                tabLabels={getTabLabelsAndAmounts()}
                setPrivatizedFilter={setPrivatizedFilter}
              />
            </Grid>
          </Grid>
          <Grid container item xs={3} justify="center">
            <Grid item md={11} lg={10}>
              <InventoryManagerSidebar
                updateProduceCategoryFilter={
                  (option) => updateFilter(option, produceCategoryFilter, setProduceCategoryFilter)
                }
                updateSellByFilter={
                  (option) => updateFilter(option, sellByFilter, setSellByFilter)
                }
                updateAvailabilityFilter={
                  (option) => updateFilter(option, availabilityFilter, setAvailabilityFilter)
                }
                updatePriceFilter={setPriceFilter}
                updateSortOrder={setSortOrder}
                optionsInfo={getFilterOptionsAndAmounts()}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
