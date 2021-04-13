import React, { useState } from 'react';
import {
  Divider, MenuItem, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    fontSize: '11px',
  },
  optionMenu: {
    marginTop: '10px',
    marginBottom: '18px',
    marginLeft: '-9px',
  },
});

/* Contains view results text + selection menu for # of results */
export default function DateMenu() {
  const classes = useStyles();
  const sortOptions = ['Expiration date: earliest first', 'Expiration date: latest first'];
  const [selectedOption, setOption] = useState(sortOptions[1]);

  // TODO: update to sort results based on chosen option
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.menuTitleText}>
        Sort by Date
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
