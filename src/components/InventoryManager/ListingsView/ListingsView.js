import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import ListingManagerCard from './ListingManagerCard';

const useStyles = makeStyles({
  listings: {
    border: '1px solid #F1F2F2',
    boxShadow: '0px 0px 1px 2px rgba(0, 0, 0, 0.1)',
    zIndex: '2',
    backgroundColor: '#FFFFFF',
    margin: '-2px 0px 16px 0px',
    paddingBottom: '15px',
  },
  tab: {
    color: '#979797',
    maxWidth: '30%',
    minWidth: '20%',
    position: 'relative',
    marginRight: '30px',
    backgroundColor: '#F1F2F2',
    display: 'inline-block',
    zIndex: '1',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#E3E3E3',
    },
    '&:after': {
      top: '0',
      left: '0',
      height: '100%',
      width: '100%',
      backgroundColor: 'inherit',
      position: 'absolute',
      transform: 'skewX(40deg)',
      zIndex: '-1',
      content: '""',
      webkitTransform: 'skewX(40deg)',
      transformOrigin: '100% 0',
    },
  },
  selectedTab: {
    maxWidth: '33%',
    minWidth: '22%',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    marginRight: '30px',
    display: 'inline-block',
    zIndex: '3',
    borderLeft: '1px solid #F1F2F2',
    boxShadow: '-2px 0px rgba(0,0,0,.1), 0px -2px rgba(0,0,0,0.05)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    '&:after': {
      top: '0',
      left: '0',
      height: '100%',
      width: '100%',
      backgroundColor: 'inherit',
      position: 'absolute',
      transform: 'skewX(40deg)',
      zIndex: '-1',
      content: '""',
      transformOrigin: '100% 0',
      boxShadow: '2px 0px rgba(0,0,0,.1), 0px -2px rgba(0,0,0,0.05)',
    },
  },
  amountIcon: {
    position: 'absolute',
    right: '1rem',
    alignSelf: 'center',
  },
  startIcon: {
    position: 'absolute',
    left: '1rem',
  },
  selectedAmountCircle: {
    backgroundColor: '#373737',
  },
  amountCircle: {
    backgroundColor: '#979797',
  },
  amount: {
    fontFamily: 'Work Sans',
    fontColor: '#000000',
    whiteSpace: 'nowrap',
    display: 'flex',
  },
  text: {
    fontFamily: 'Work Sans',
    fontColor: '#000000',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    fontWeight: 'bold',
    display: 'inline',
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
  const getListingTypeIcon = (filter) => {
    if (filter === undefined) {
      return <></>;
    }
    return filter ? <LockIcon /> : <LockOpenIcon />;
  };
  const classes = useStyles();
  // TODO: Add a message for when user has no listings
  return (
    <>
      <Grid item container xs={12} alignItems="flex-start" justify="flex-start">
        {
        tabLabels.map((tab, index) => (
          <Button
            onClick={() => handleTabClick(index, tab.filter)}
            className={currentTab === index ? classes.selectedTab : classes.tab}
            classes={{
              label: classes.text,
              endIcon: classes.amountIcon,
              startIcon: classes.startIcon,
            }}
            key={tab.label}
            disableRipple
            startIcon={getListingTypeIcon(tab.filter)}
            endIcon={
              (
                <Badge
                  badgeContent={tab.amount}
                  classes={{
                    badge: classes.amount,
                    colorPrimary: currentTab === index
                      ? classes.selectedAmountCircle
                      : classes.amountCircle,
                  }}
                  color="primary"
                  shape="circle"
                  showZero
                />
              )
            }
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
