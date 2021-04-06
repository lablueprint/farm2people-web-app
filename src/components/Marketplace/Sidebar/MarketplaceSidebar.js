import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import FilterMenu from './FilterMenu';
import PriceMenu from './PriceMenu';
import '../../../assets/styles/fonts.css';

const useStyles = makeStyles({
  sidebarContainer: {
    marginLeft: '-15px',
  },
  titleContainer: {
    marginTop: '18%',
    marginBottom: '30%',
  },
  marketplaceText: {
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    color: '#373737',
    marginTop: '5%',
    marginLeft: '5%',
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
export default function MarketplaceSidebar() {
  const classes = useStyles();

  return (
    <Container className={classes.sidebarContainer}>
      <Grid container direction="row" className={classes.titleContainer}>
        <Typography className={classes.marketplaceText}>
          Marketplace /
        </Typography>
        <Typography className={classes.pageText}>
          PageName
        </Typography>
      </Grid>
      <FilterMenu menuTitle="Item Type" filterOptions={['Agency Price', 'Standard Items']} isLast={false} />
      <FilterMenu
        menuTitle="Produce Type"
        filterOptions={['Vegetables', 'Fruits', 'Legumes', 'Grains', 'Oats']}
        isLast={false}
      />
      <PriceMenu priceOptions={[0, 15, 30, 45, 60, 75]} />
      <FilterMenu
        menuTitle="Farming"
        filterOptions={['Fall', 'Winter', 'Summer', 'Spring']}
        isLast
      />
    </Container>
  );
}
