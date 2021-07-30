import React from 'react';
import {
  Divider, MenuItem, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  container: {
    marginTop: '18px',
    marginLeft: '10px',
  },
  menuTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '15px',
    color: '#373737',
    fontWeight: 'bold',
  },
  optionText: {
    fontFamily: 'Work Sans',
    fontSize: '12px',
    marginLeft: '-4px',
  },
  optionMenu: {
    marginTop: '10px',
    marginBottom: '18px',
    marginLeft: '-9px',
    width: '100%',
  },
});

/* Drop-down menu for sorting listings */
export default function SortMenu({ sortOptions, updateSortOrder }) {
  const classes = useStyles();

  // When new sort selected, update field displayed and (re)sort the listings
  const handleChange = (event) => {
    updateSortOrder(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.menuTitleText}>
        Sort by:
      </Typography>
      <TextField
        select
        variant="outlined"
        size="small"
        onChange={handleChange}
        className={classes.optionMenu}
        defaultValue={sortOptions[0].target}
      >
        {sortOptions.map((option) => ( // Options shown in the dropdown menu
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
      <Divider variant="middle" />
    </div>
  );
}

SortMenu.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    target: PropTypes.string,
  })).isRequired,
  updateSortOrder: PropTypes.func.isRequired,
};
