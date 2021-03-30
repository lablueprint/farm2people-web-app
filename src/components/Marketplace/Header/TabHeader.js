import React from 'react';
import {
  AppBar, Grid, Tab, Tabs, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  tabContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: '1.5%',
    paddingRight: '1%',
  },
  indicator: {
    display: 'flex',
    '& > span': {
      maxWidth: '4px',
      width: '4px',
      backgroundColor: '#53AA48',
    },
    backgroundColor: '#53AA48',
    height: '4px',
  },
  tabTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '24px',
    fontWeight: 'bolder',
    color: '#373737',
    marginBottom: '-1%',
  },
  tabText: {
    textTransform: 'none',
    fontFamily: 'Work Sans',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#373737',
  },
});

/* Contains title/search text + tab bar, w/ two tabs for all produce + farms */
export default function TabHeader({ tabValue, setTabValue }) {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AppBar
      position="static"
      className={classes.tabContainer}
      elevation={0}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography className={classes.tabTitleText}>
          {tabValue === 'all' ? 'ALL PRODUCE' : 'ALL FARMS'}
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          classes={{ indicator: classes.indicator }}
        >
          <Tab
            value="all"
            label="Shop All"
            className={classes.tabText}
          />
          <Tab
            value="farm"
            label="Shop by Farm"
            className={classes.tabText}
          />
        </Tabs>
      </Grid>
    </AppBar>
  );
}

TabHeader.propTypes = {
  tabValue: PropTypes.string.isRequired,
  setTabValue: PropTypes.func.isRequired,
};
