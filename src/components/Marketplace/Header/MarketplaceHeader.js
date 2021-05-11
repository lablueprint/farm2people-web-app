import React from 'react';
import {
  Grid, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchIcon from '@material-ui/icons/Search';
import TabHeader from './TabHeader';
import ViewResults from './ViewResults';
import '../../../styles/fonts.css';
import Fruit1 from '../../../assets/images/Fruit1.svg';
import Fruit2 from '../../../assets/images/Fruit2.svg';

const useStyles = makeStyles({
  headerContainer: {
    paddingLeft: '3%',
    paddingRight: '4%',
  },
  marketplaceTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '35px',
    fontWeight: 'bold',
    color: '#373737',
    marginTop: '2.8%',
    marginBottom: '2.5%',
  },
  // Search text styling
  searchContainer: {
    width: '50%',
  },
  searchText: {
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    color: '#373737',
  },
  locationText: {
    fontFamily: 'Work Sans',
    fontSize: '15.5px',
    color: '#373737',
    fontWeight: 'bold',
  },
  locationIcon: {
    color: '#FF765D',
    marginTop: '2.5%',
    marginRight: '1%',
  },
  // Search bar styling
  searchBarContainer: {
    marginTop: '0.5%',
    // width: '68%',
    marginLeft: '3.5%',
  },
  inputText: {
    fontFamily: 'Work Sans',
    fontSize: '15.5px',
    color: '#373737',
    backgroundColor: '#F1F2F2',
    '&::placeholder': { // Styling for placeholder text only
      fontFamily: 'Work Sans',
      fontSize: '15.5px',
      color: '#747474',
      fontStyle: 'italic',
    },
  },
  searchIcon: {
    color: '#717171',
    backgroundColor: '#F1F2F2',
  },
  // Fruit images
  fruit1: {
    position: 'absolute',
    width: '112px',
    height: 'auto',
    right: '63px',
    top: '8px',
    zIndex: '-2',
  },
  fruit2: {
    position: 'absolute',
    width: '90px',
    height: 'auto',
    right: '2px',
    top: '33px',
    zIndex: '-1',
  },
});

/* Marketplace header: title, view results, search bar, and tab selector */
export default function MarketplaceHeader({
  tabValue, setTabValue, totalResults, numResults, setNumResults,
}) {
  const classes = useStyles();

  return (
    <div className={classes.headerContainer}>
      <Typography align="center" className={classes.marketplaceTitleText}>
        Marketplace
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
      >
        {/* View results text + limit selection menu */}
        <ViewResults
          numResults={numResults}
          setNumResults={setNumResults}
          totalResults={totalResults}
        />
        {/* Searching near text + icon, search bar */}
        <Grid
          container
          direction="row"
          className={classes.searchContainer}
        >
          <LocationOnOutlinedIcon className={classes.locationIcon} />
          <Grid item>
            <Typography className={classes.searchText}>
              Searching near
            </Typography>
            <Typography className={classes.locationText}>
              {/* TODO: Get location of user */ }
              Real location, CA
            </Typography>
          </Grid>
          <Grid item xs>
            <TextField
              placeholder="Search for produce, farms, etc."
              fullWidth
              variant="outlined"
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.inputText,
                  adornedEnd: classes.searchIcon,
                },
                endAdornment: <SearchIcon />,
              }}
              className={classes.searchBarContainer}
              size="small"
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Tab title text + 2 tab selectors */}
      <TabHeader tabValue={tabValue} setTabValue={setTabValue} />
      <img
        src={Fruit1}
        alt="fruit1"
        className={classes.fruit1}
      />
      <img
        src={Fruit2}
        alt="fruit2"
        className={classes.fruit2}
      />
    </div>
  );
}

MarketplaceHeader.propTypes = {
  tabValue: PropTypes.string.isRequired,
  setTabValue: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
  numResults: PropTypes.number.isRequired,
  setNumResults: PropTypes.func.isRequired,
};
