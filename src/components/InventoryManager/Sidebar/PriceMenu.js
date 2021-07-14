import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Grid, TextField, Typography,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
  menuTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
    color: '#373737',
    fontWeight: 'bold',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
  },
  iconColour: {
    color: '#2D5496',
  },
  dollarIcon: {
    fontFamily: 'Work Sans',
    fontSize: '.9rem',
    fontWeight: 'bold',
  },
  inputText: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
  },
  inputContainer: {
    maxWidth: '5rem',
  },
  middleText: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
  },
  applyButton: {
    color: '#373737',
    borderRadius: '.5rem',
    fontFamily: 'Work Sans',
    fontWeight: 'lighter',
    fontSize: '0.9rem',
    backgroundColor: '#E7F3E5',
    '&:hover': {
      backgroundColor: green[300],
    },
  },
  // Styling for menu items
  filterOptionText: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
    color: '#373737',
  },
  filterNumText: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
    color: '#2D5496',
  },
  padding: {
    paddingLeft: '1rem',
  },
  resetText: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
    color: '#373737',
    textTransform: 'none',
  },
});

/* Menu in the sidebar for selecting filters, takes in array of filter options */
export default function PriceMenu({ updatePriceFilter }) {
  const classes = useStyles();
  // Sort priceOptions in asc order + get highest price for default max
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  /* Sets checkboxes to checked/unchecked when toggled */

  /* Sets min + max when input entered */
  const handleMinChange = (event) => {
    setMin(event.target.value);
  };
  const handleMaxChange = (event) => {
    setMax(event.target.value);
  };
  const handleReset = () => {
    setMin(0);
    setMax(0);
    updatePriceFilter([-1, -1]);
  };
  // When apply clicked, checks if min/max are valid + limits results
  // TODO : add functionality for only specifying one of min or max
  const handleApply = () => {
    // If valid (non-neg #, max >= min), set actual min/max + limit results
    if (min.toString().length > 0 && max.toString().length > 0
      && !Number.isNaN(min) && !Number.isNaN(max)
      && Number(min) >= 0 && Number(max) >= min) {
      updatePriceFilter([min, max]);
    }
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
          <Typography className={classes.menuTitleText}>Filter Prices</Typography>
        </Grid>
        <Grid container item xs={4} justify="flex-end" alignContent="center">
          <Button onClick={handleReset}>
            <Typography className={classes.resetText}>
              Reset
            </Typography>
          </Button>
        </Grid>
        <Grid container item xs={2} />
      </Grid>
      {/* Min-max manual input + apply button */}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        className={classes.minMaxContainer}
      >
        <Grid item xs={3} container justify="flex-end">
          <TextField
            placeholder="Min"
            variant="outlined"
            size="small"
            value={min || ''}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.inputText,
              },
              startAdornment: <Typography className={classes.dollarIcon}> $ </Typography>,
            }}
            onChange={handleMinChange}
            className={classes.inputContainer}
          />
        </Grid>
        <Grid item xs={1} container justify="center">
          <Typography className={classes.middleText}>to</Typography>
        </Grid>
        <Grid item xs={3} container justify="flex-start">
          <TextField
            placeholder="Max"
            variant="outlined"
            size="small"
            value={max || ''}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.inputText,
              },
              startAdornment: <Typography className={classes.dollarIcon}> $$ </Typography>,
            }}
            onChange={handleMaxChange}
            className={classes.inputContainer}
          />
        </Grid>
        <Grid item xs={4} container justify="center">
          <Button
            className={classes.applyButton}
            variant="contained"
            color="primary"
            style={{ textTransform: 'none' }} // Removes auto-caps
            size="medium"
            onClick={handleApply}
            disableElevation
          >
            Apply
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

PriceMenu.propTypes = {
  updatePriceFilter: PropTypes.func.isRequired,
};
