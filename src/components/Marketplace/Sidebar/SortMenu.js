import React, { useState } from 'react';
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
  },
  optionMenu: {
    marginTop: '10px',
    marginBottom: '18px',
    marginLeft: '-9px',
    width: '100%',
  },
});

/* Contains view results text + selection menu for # of results */
export default function SortMenu({ sortOptions }) {
  const classes = useStyles();
  const [selectedOption, setOption] = useState(sortOptions[0]);

  // TODO: update to sort results based on chosen option
  const handleChange = (event) => {
    setOption(event.target.value);
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
        value={selectedOption}
        onChange={handleChange}
        className={classes.optionMenu}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
          >
            <Typography className={classes.optionText}>
              {option}
            </Typography>
          </MenuItem>
        ))}
      </TextField>
      <Divider variant="middle" />
    </div>
  );
}

SortMenu.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
