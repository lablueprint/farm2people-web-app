import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import FilterMenu from './FilterMenu';
import PriceMenu from './PriceMenu';
import SortMenu from './SortMenu';
import '../../../styles/fonts.css';

const useStyles = makeStyles({
  sidebarContainer: {
    marginLeft: '-15px',
  },
  titleContainer: {
    marginTop: '18%',
    marginBottom: '22%',
  },
  marketplaceText: {
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    color: '#373737',
    marginTop: '5%',
    marginLeft: '10px',
  },
  filterText: {
    marginLeft: '9px',
    fontFamily: 'Work Sans',
    fontSize: '18px',
    color: '#373737',
    marginBottom: '41px',
  },
  pageText: {
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '2%',
  },
});

/* Sidebar with filter selections for types + sorting */
export default function MarketplaceSidebar({
  prodTypeFilters, itemsPerProdType, onProduceFilterChange, priceOptions, itemsPerPrice,
  onPriceFilterChange, farmSeasonFilters, itemsPerFarmSeason, onSeasonFilterChange,
}) {
  const classes = useStyles();

  return (
    <Container className={classes.sidebarContainer}>
      <Grid container direction="row" className={classes.titleContainer}>
        <Typography className={classes.marketplaceText}>
          Marketplace /
        </Typography>
        {/* TODO: get real page name */}
        <Typography className={classes.pageText}>
          PageName
        </Typography>
      </Grid>
      <Typography className={classes.filterText}>
        FILTERS
      </Typography>
      <SortMenu sortOptions={['Sell by date: earliest first', 'First available date: earliest first', 'Available until: earliest first', 'Recently added first', 'Alphabetical order']} />
      {/* TODO: Item type menu only shows for agency buyer view */}
      <FilterMenu menuTitle="Item Type" filterOptions={['Agency Price', 'Standard Items']} isLast={false} />
      <FilterMenu
        menuTitle="Produce Type"
        filterOptions={prodTypeFilters}
        itemsPerOption={itemsPerProdType}
        isLast={false}
        onFilterChange={onProduceFilterChange}
      />
      <PriceMenu
        priceOptions={priceOptions}
        itemsPerPrice={itemsPerPrice}
        onFilterChange={onPriceFilterChange}
      />
      <FilterMenu
        menuTitle="Farming Season"
        filterOptions={farmSeasonFilters}
        itemsPerOption={itemsPerFarmSeason}
        isLast
        onFilterChange={onSeasonFilterChange}
      />
    </Container>
  );
}

MarketplaceSidebar.propTypes = {
  prodTypeFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemsPerProdType: PropTypes.arrayOf(PropTypes.number).isRequired,
  onProduceFilterChange: PropTypes.func.isRequired,
  priceOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemsPerPrice: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPriceFilterChange: PropTypes.func.isRequired,
  farmSeasonFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemsPerFarmSeason: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSeasonFilterChange: PropTypes.func.isRequired,
};
