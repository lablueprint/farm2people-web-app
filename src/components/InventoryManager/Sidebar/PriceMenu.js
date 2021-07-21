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
    fontSize: '1.1rem',
    color: '#373737',
    fontWeight: 'bold',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
  },
  dollarIcon: {
    fontFamily: 'Work Sans',
    fontSize: '.7rem',
    marginLeft: '-.4rem',
  },
  inputText: {
    fontFamily: 'Work Sans',
    fontSize: '.75rem',
  },
  inputContainer: {
    maxWidth: '4rem',
  },
  middleText: {
    fontFamily: 'Work Sans',
    fontSize: '.9rem',
  },
  applyButton: {
    color: '#373737',
    borderRadius: '.3rem',
    fontFamily: 'Work Sans',
    fontWeight: 'lighter',
    fontSize: '0.75rem',
    backgroundColor: '#E7F3E5',
    '&:hover': {
      backgroundColor: green[300],
    },
    maxWidth: '3rem',
    maxHeight: '3rem',
  },
  padding: {
    paddingLeft: '.5rem',
  },
  resetText: {
    fontFamily: 'Work Sans',
    fontSize: '.9rem',
    color: '#373737',
    textTransform: 'none',
  },
});

/* Menu in the sidebar for selecting filters, takes in function to update price min/max */
export default function PriceMenu({ updatePriceFilter }) {
  const classes = useStyles();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
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
  // TODO : add functionality for only specifying one of min or max
  const handleApply = () => {
    if (min.toString().length > 0 && max.toString().length > 0
      && !Number.isNaN(min) && !Number.isNaN(max)) {
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
      <Grid
        container
        justify="center"
        spacing={1}
        className={classes.minMaxContainer}
      >
        <Grid item>
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
        <Grid item>
          <Typography className={classes.middleText}>to</Typography>
        </Grid>
        <Grid item>
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
        <Grid item>
          <Button
            className={classes.applyButton}
            variant="contained"
            color="primary"
            style={{ textTransform: 'none' }}
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
