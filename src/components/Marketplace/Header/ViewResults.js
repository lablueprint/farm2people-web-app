import React from 'react';
import {
  Grid, MenuItem, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  viewContainer: {
    marginTop: '1%',
    width: '25%',
  },
  viewText: {
    fontFamily: 'Work Sans',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#373737',
    marginRight: '3%',
  },
  resultText: {
    fontFamily: 'Work Sans',
    fontSize: '14px',
    color: '#373737',
    marginLeft: '3%',
  },
  resultOptionMenu: {
    marginTop: '-3.5%',
  },
  resultOptionText: {
    fontFamily: 'Work Sans',
    fontSize: '15px',
    color: '#373737',
  },
});

/* Contains view results text + selection menu for # of results */
export default function ViewResults({ numResults, setNumResults, totalResults }) {
  const classes = useStyles();
  const resultOptions = [5, 10, 25, 50, 100];
  // TODO: update to limit # of results shown based on numResults
  const handleChange = (event) => {
    setNumResults(event.target.value);
  };

  return (
    <Grid
      container
      direction="row"
      className={classes.viewContainer}
    >
      <Typography className={classes.viewText}>
        View
      </Typography>
      <TextField
        select
        variant="outlined"
        size="small"
        value={numResults}
        onChange={handleChange}
        className={classes.resultOptionMenu}
      >
        {resultOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
          >
            <Typography className={classes.resultOptionText}>
              {option}
            </Typography>
          </MenuItem>
        ))}
      </TextField>
      <Typography className={classes.resultText}>
        {totalResults === 0 && '0 results'}
        {totalResults > 0 && `1-${numResults} of ${totalResults} results`}
      </Typography>
    </Grid>
  );
}

ViewResults.propTypes = {
  numResults: PropTypes.number.isRequired,
  setNumResults: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
};
