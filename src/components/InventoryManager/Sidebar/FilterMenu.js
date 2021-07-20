import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, IconButton, Typography, Collapse, Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import GreenCheckbox from '../GreenCheckbox';

const useStyles = makeStyles({
  menuTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '1.1rem',
    color: '#373737',
    fontWeight: 'bold',
  },
  resetText: {
    fontFamily: 'Work Sans',
    fontSize: '.9rem',
    color: '#373737',
    textTransform: 'none',
  },
  expandIcon: {
    color: '#53AA48',
  },
  iconColour: {
    color: '#53AA48',
  },
  // Styling for filter menu items
  filterOptionText: {
    fontFamily: 'Work Sans',
    fontSize: '.9rem',
    color: '#373737',
    width: '15rem',
  },
  filterNumText: {
    fontFamily: 'Work Sans',
    fontSize: '.9rem',
    color: '#53AA48',
  },
  padding: {
    paddingLeft: '.5rem',
  },
});

/* Menu in the sidebar for selecting filters, takes in array of filter options */
export default function FilterMenu({
  menuTitle, filterOptions, updateFilter,
}) {
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsChecked(Object.fromEntries(filterOptions.map((option) => [option.label, false])));
  }, []);
  const handleReset = () => {
    const newChecked = [];
    setIsChecked({});
    updateFilter(newChecked);
  };

  const handleToggle = (value) => {
    const current = isChecked[value];
    setIsChecked({ ...isChecked, [value]: !current });
    updateFilter(value.toLowerCase());
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        className={classes.padding}
      >
        <Grid item container xs={6} alignContent="center">
          <Typography className={classes.menuTitleText}>{menuTitle}</Typography>
        </Grid>
        <Grid container item xs={4} justify="flex-end" alignContent="center">
          <Button onClick={handleReset}>
            <Typography className={classes.resetText}>
              Reset
            </Typography>
          </Button>
        </Grid>
        <Grid item container xs={2} alignContent="center">
          <IconButton
            className={classes.expandIcon}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {!isExpanded && <ExpandMoreIcon />}
            {isExpanded && <ExpandLessIcon />}
          </IconButton>
        </Grid>
        {/* List of filter options only shows if expanded */}
        <Collapse in={isExpanded} unmountOnExit>
          <Grid item container xs={12}>
            {(filterOptions.map((option) => (
              <Grid item container xs={12} key={option.label}>
                <Grid item container xs={9} alignItems="flex-start">
                  <Typography className={classes.filterOptionText}>
                    <GreenCheckbox
                      /* Check the box if this option is found in isChecked */
                      checked={isChecked[option.label]}
                      size="small"
                      onClick={() => handleToggle(option.label)}
                    />
                    {option.label}
                  </Typography>
                </Grid>
                <Grid item container xs={3} alignContent="center">
                  <Typography className={classes.filterNumText}>
                    {option.amount}
                  </Typography>
                </Grid>
              </Grid>
            )))}
          </Grid>
        </Collapse>
      </Grid>
    </>
  );
}

FilterMenu.propTypes = {
  menuTitle: PropTypes.string.isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    amount: PropTypes.number,
  })).isRequired,
  updateFilter: PropTypes.func.isRequired,
};
