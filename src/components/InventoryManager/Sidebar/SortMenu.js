import React from 'react';
import {
  MenuItem, TextField, Typography, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  menuTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
    color: '#373737',
    fontWeight: 'bold',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
  },
  optionText: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
  },
  optionMenu: {
    width: '100%',
    paddingBottom: '1rem',
  },
  padding: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
});

/* Contains view results text + selection menu for # of results */
export default function SortMenu({
  sortOptions, updateSortOrder,
}) {
  const classes = useStyles();
  const handleChange = (event) => {
    updateSortOrder(event.target.value);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        className={classes.padding}
      >
        <Grid item container xs={12} alignContent="center">
          <Typography className={classes.menuTitleText}>
            Sort By
          </Typography>
        </Grid>
        <Grid item container xs={12} alignContent="center">
          <TextField
            select
            variant="outlined"
            size="small"
            onChange={handleChange}
            className={classes.optionMenu}
            defaultValue={sortOptions[0].target}
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={option.label}
                value={option.target}
              >
                <Typography className={classes.optionText}>
                  {option.label}
                </Typography>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
}

SortMenu.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    target: PropTypes.string,
  })).isRequired,
  updateSortOrder: PropTypes.func.isRequired,
};
