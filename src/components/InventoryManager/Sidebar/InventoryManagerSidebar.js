import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import FilterMenu from './FilterMenu';
import PriceMenu from './PriceMenu';
import SortMenu from './SortMenu';

const useStyles = makeStyles({
  marketplaceText: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
    color: '#373737',
  },
  filterText: {
    fontFamily: 'Work Sans',
    fontSize: '1.5rem',
    color: '#373737',
    paddingLeft: '.5rem',
  },
  pageText: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  divider: {
    width: '100%',
  },
});

/* Sidebar with filter selections for types + sorting */
export default function InventoryManagerSidebar({
  updateProduceCategoryFilter, updateSellByFilter,
  updateAvailabilityFilter, updatePriceFilter,
  updateSortOrder, optionsInfo,
}) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid container item xs={12}>
        <Typography className={classes.filterText}>
          FILTERS
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <FilterMenu
          menuTitle="Sell By Date"
          filterOptions={optionsInfo.sellByOptions}
          updateFilter={updateSellByFilter}
        />
      </Grid>
      <Divider className={classes.divider} />
      <Grid container item xs={12}>
        <FilterMenu
          menuTitle="Availability"
          filterOptions={optionsInfo.availabilityOptions}
          updateFilter={updateAvailabilityFilter}
        />
      </Grid>
      <Divider className={classes.divider} />
      <Grid container item xs={12}>
        <FilterMenu
          menuTitle="Produce Type"
          filterOptions={optionsInfo.produceCategoryOptions}
          updateFilter={updateProduceCategoryFilter}
        />
      </Grid>
      <Divider className={classes.divider} />
      <Grid container item xs={12}>
        <SortMenu
          sortOptions={[
            { label: 'Sell by date: earliest first', target: 'sell by date' },
            { label: 'First available date: earliest first', target: 'first available date' },
            { label: 'Available until: earliest first', target: 'available until' },
            { label: 'Recently added first', target: 'date entered' },
            { label: 'Alphabetical order', target: 'produce name' },
          ]}
          updateSortOrder={updateSortOrder}
        />
      </Grid>
      <Divider className={classes.divider} />
      <Grid container item xs={12}>
        <PriceMenu updatePriceFilter={updatePriceFilter} />
      </Grid>
    </Grid>
  );
}

InventoryManagerSidebar.propTypes = {
  updateProduceCategoryFilter: PropTypes.func.isRequired,
  updateSellByFilter: PropTypes.func.isRequired,
  updateAvailabilityFilter: PropTypes.func.isRequired,
  updatePriceFilter: PropTypes.func.isRequired,
  updateSortOrder: PropTypes.func.isRequired,
  optionsInfo: PropTypes.shape({
    sellByOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      amount: PropTypes.number,
    })),
    availabilityOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      amount: PropTypes.number,
    })),
    produceCategoryOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      amount: PropTypes.number,
    })),
  }).isRequired,
};
