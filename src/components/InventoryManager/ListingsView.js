import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import ListingManagerCard from './ListingManagerCard';

export default function ListingsView({
  cardListings, selectedCards, updateSelectedCards, editRecord, produceTypes,
}) {
  const getProduceRecord = (id) => (
    produceTypes.find((record) => record.id === id)
  );

  return (
    <>
      <Grid container spacing={2}>
        {
        cardListings.map((listing) => {
          const produceRecord = getProduceRecord(listing.fields.produce[0]);
          return (
            <Grid item s={4} md={3} key={listing.id}>
              <ListingManagerCard
                id={listing.id}
                listing={listing.fields}
                onSelect={updateSelectedCards}
                selected={selectedCards[listing.id]}
                editRecord={editRecord}
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
  produceTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({
      produce: PropTypes.string,
    }),
  })).isRequired,
};
