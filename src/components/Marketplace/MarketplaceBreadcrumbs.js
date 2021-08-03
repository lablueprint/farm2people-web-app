import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  container: {
    marginTop: '1%',
    marginLeft: '20px',
  },
  crumbText: {
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    color: '#373737',
    textDecorationLine: 'none',
  },
  // adjusts for link component weirdness
  crumbLinkText: {
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    color: '#373737',
    textDecorationLine: 'none',
  },
  lastCrumbText: {
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    color: '#373737',
    fontWeight: 'bold',
  },
});

const breadcrumbMapInit = {
  '/marketplace': { name: 'Marketplace', linkable: true },
  '/marketplace/shopByFarm': { name: 'Shop By Farm', linkable: false },
};

export default function MarketplaceRouter({
  tabValue, searchTerms, shopByFarmID, shopByFarmName,
}) {
  const history = useHistory();
  let pathnames = history.location.pathname.split('/').filter((x) => x);
  pathnames = pathnames.length === 0 ? ['marketplace'] : pathnames;
  const classes = useStyles();
  const tabText = tabValue === 'all' ? 'All Produce' : 'All Farms';
  const searchText = `Search Results for "${searchTerms}"`;
  const [breadcrumbMap, setBreadcrumbMap] = useState({});
  const loading = useRef(true);
  const isFirstRender = useRef(true);

  // update breadcrumb map to include dynamic links
  async function makeMap() {
    const tempBread = breadcrumbMapInit;
    if (shopByFarmID) {
      const farmLink = `/marketplace/shopByFarm/${shopByFarmID}`;
      tempBread[farmLink] = { name: shopByFarmName, linkable: true };
      if (searchTerms) {
        const searchFarmLink = `/marketplace/shopByFarm/${shopByFarmID}/${searchTerms}`;
        tempBread[searchFarmLink] = { name: searchText, linkable: true };
      }
    } else if (searchTerms) {
      const searchLink = `/marketplace/${searchTerms}`;
      tempBread[searchLink] = { name: searchText, linkable: true };
    }
    return new Promise((resolve) => resolve(tempBread));
  }

  // map setup helper
  async function setup() {
    let map = {};
    await makeMap().then((value) => { map = value; });
    if (map !== breadcrumbMap) {
      setBreadcrumbMap(map);
    } else {
      loading.current = false;
    }
  }

  // setup map and whenever DOM mounts/updates or the farm name loads
  useEffect(() => {
    loading.current = true;
    setup();
  }, [shopByFarmName, searchTerms]);

  // reset loading when the breadcrumb map is updated
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      loading.current = false;
    }
  }, [breadcrumbMap]);

  return (
    <>
      {isFirstRender.current === false && loading.current === false
      && (
      <Breadcrumbs className={classes.container}>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          // eslint-disable-next-line no-nested-ternary
          return last && pathnames.length > 1 ? (
            <Typography to={to} key={to} className={classes.lastCrumbText}>
              {breadcrumbMap[to] ? breadcrumbMap[to].name : 'loading'}
            </Typography>
          ) : (
            breadcrumbMap[to] !== undefined && breadcrumbMap[to].linkable
              ? (
                <Link to={to} key={to} className={classes.crumbLinkText}>
                  {breadcrumbMap[to] ? breadcrumbMap[to].name : 'loading'}
                </Link>
              )
              : (
                <Typography to={to} key={to} className={classes.crumbText}>
                  {breadcrumbMap[to] ? breadcrumbMap[to].name : 'loading'}
                </Typography>
              )
          );
        })}
        {pathnames.length < 2
        && (
        <Typography key={tabText} className={classes.lastCrumbText}>
          {tabText}
        </Typography>
        )}
      </Breadcrumbs>
      )}
    </>
  );
}

MarketplaceRouter.propTypes = {
  tabValue: PropTypes.string.isRequired,
  searchTerms: PropTypes.string.isRequired,
  shopByFarmID: PropTypes.string.isRequired,
  shopByFarmName: PropTypes.string.isRequired,
};
