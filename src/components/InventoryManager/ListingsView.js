import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import ListingManagerCard from './ListingManagerCard';

const useStyles = makeStyles({
  listings: {
    border: '1px solid #F1F2F2',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    zIndex: '2',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    maxWidth: '33%',
    minWidth: '17%',
    position: 'relative',
    marginRight: '30px',
    backgroundColor: '#E3E3E3',
    display: 'inline-block',
    zIndex: '1',
    '&:hover': {
      backgroundColor: '#E3E3E3',
    },
    '&:after': {
      top: '0',
      left: '0',
      height: '100%',
      width: '100%',
      backgroundColor: '#E3E3E3',
      position: 'absolute',
      transform: 'skewX(40deg)',
      zIndex: '-1',
      content: '""',
      webkitTransform: 'skewX(40deg)',
      transformOrigin: '100% 0',
      '&:hover': {
        backgroundColor: '#E3E3E3',
      },
    },
  },
  selectedTab: {
    maxWidth: '33%',
    minWidth: '17%',
    position: 'relative',
    backgroundColor: '#E3E3E3',
    marginRight: '30px',
    display: 'inline-block',
    zIndex: '3',
    '&:hover': {
      backgroundColor: '#E3E3E3',
    },
    '&:after': {
      top: '0',
      left: '0',
      height: '100%',
      width: '100%',
      backgroundColor: '#E3E3E3',
      position: 'absolute',
      transform: 'skewX(40deg)',
      zIndex: '-1',
      content: '""',
      transformOrigin: '100% 0',
      '&:hover': {
        backgroundColor: '#E3E3E3',
      },
    },
  },
});

export default function ListingsView({
  cardListings, selectedCards, updateSelectedCards,
  editRecord, deleteRecord, produceTypes,
  tabLabels, setPrivatizedFilter,
}) {
  const [currentTab, setCurrentTab] = useState(0);
  const getProduceRecord = (id) => (
    produceTypes.find((record) => record.id === id)
  );
  const handleTabClick = (index, filter) => {
    setPrivatizedFilter(filter);
    setCurrentTab(index);
  };
  const classes = useStyles();
  // TODO: Add a message for when user has no listings
  return (
    <>
      <Grid item container xs={12}>
        {
        tabLabels.map((tab, index) => (
          <Button
            onClick={() => handleTabClick(index, tab.filter)}
            className={currentTab === index ? classes.selectedTab : classes.tab}
            key={tab.label}
            disableRipple
            endIcon={<Badge badgeContent={tab.amount} />}
            size="large"
          >
            {`${tab.label}`}
          </Button>
        ))
        }
      </Grid>
      <Grid item container spacing={4} justify="flex-start" className={classes.listings} xs={12}>
        {
        cardListings.map((listing) => {
          const produceRecord = getProduceRecord(listing.fields.produce[0]);
          return (
            <Grid item key={listing.id} justify="center">
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
  tabLabels: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    filter: PropTypes.bool,
    amount: PropTypes.number,
  })).isRequired,
  setPrivatizedFilter: PropTypes.func.isRequired,
};
