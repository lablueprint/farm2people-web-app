import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListingManagerCard from './ListingManagerCard';

const useStyles = makeStyles({
  listings: {
    margin: '2% 1%',
  },
});

export default function ListingsView({
  cardListings, selectedCards, updateSelectedCards, editRecord, deleteRecord, produceTypes,
}) {
  const getProduceRecord = (id) => (
    produceTypes.find((record) => record.id === id)
  );
  const classes = useStyles();
  // TODO: Add a message for when user has no listings
  return (
    <>
      <Grid item container spacing={4} justify="flex-start" className={classes.listings}>
        {
        cardListings.map((listing) => {
          const produceRecord = getProduceRecord(listing.fields.produce[0]);
          return (
            <Grid container item s={6} md={4} lg={3} key={listing.id} justify="center">
              <ListingManagerCard
                id={listing.id}
                listing={listing.fields}
                onSelect={updateSelectedCards}
                selected={selectedCards[listing.id]}
                editRecord={editRecord}
                deleteRecord={deleteRecord}
                produceRecord={produceRecord}
                produceTypes={produceTypes}
              />
            </Grid>
          );
        })
        }
      </Grid>
    </>
  );
}

ListingsView.defaultProps = {
  cardListings: [],
  selectedCards: [],
};

ListingsView.propTypes = {
  cardListings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({}),
  })),
  selectedCards: PropTypes.shape([]),
  updateSelectedCards: PropTypes.func.isRequired,
  editRecord: PropTypes.func.isRequired,
  deleteRecord: PropTypes.func.isRequired,
  produceTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({
      produce: PropTypes.string,
    }),
  })).isRequired,
};
