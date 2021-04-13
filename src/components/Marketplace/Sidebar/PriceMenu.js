import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Checkbox, Divider, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction,
  ListItemText, TextField, Typography,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import '../../../assets/styles/fonts.css';

const useStyles = makeStyles({
  titleContainer: {
    marginTop: '18px',
    marginLeft: '10px',
    marginBottom: '4%',
  },
  menuTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '15px',
    color: '#373737',
    fontWeight: 'bold',
  },
  iconColour: {
    color: '#2D5496',
  },
  // Styling for min - max input
  minMaxContainer: {
    width: '105%',
  },
  dollarIcon: {
    fontFamily: 'Work Sans',
    fontSize: '9.5px',
    fontWeight: 'bold',
    marginLeft: '-7px',
    marginRight: '6%',
  },
  inputText: {
    fontFamily: 'Work Sans',
    fontSize: '10.5px',
    paddingRight: '-5%',
  },
  inputContainer: {
    width: '55px',
  },
  middleText: {
    marginLeft: '3%',
    marginRight: '3%',
    fontFamily: 'Work Sans',
    fontSize: '11.5px',
  },
  applyButton: {
    backgroundColor: '#E7EEFA',
    color: '#373737',
    borderRadius: '6px',
    fontFamily: 'Work Sans',
    fontWeight: 'lighter',
    fontSize: '11px',
    marginLeft: '4%',
    width: '10%',
  },
  // Styling for menu items
  optionContainer: {
    marginTop: '-5%',
  },
  filterOptionText: {
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    color: '#373737',
    marginLeft: '-20%',
  },
  filterNumText: {
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    color: '#2D5496',
  },
  divider: {
    minWidth: '180px',
  },
});

/* Menu in the sidebar for selecting filters, takes in array of filter options */
export default function PriceMenu({ priceOptions }) {
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState([0]);
  // Sort priceOptions in asc order + get highest price for default max
  priceOptions.sort();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(priceOptions[priceOptions.length - 1]);

  /* Sets checkboxes to checked/unchecked when toggled */
  const handleToggle = (value) => () => {
    const currentIndex = isChecked.indexOf(value);
    const newChecked = [...isChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setIsChecked(newChecked);
  };

  /* Sets min + max when input entered */
  const handleMinChange = (event) => {
    setMin(event.target.value);
  };
  const handleMaxChange = (event) => {
    setMax(event.target.value);
  };

  /* When apply clicked, checks if min/max are valid + limits results */
  const handleApply = () => {
    // If valid (non-neg #, max >= min), set actual min/max + limit results
    if (min.toString().length > 0 && max.toString().length > 0
      && !Number.isNaN(min) && !Number.isNaN(max)
      && Number(min) >= 0 && Number(max) >= min) {
      // TODO: actually limit results based on min/max price
    }
  };

  const priceText = [];
  for (let i = 0; i < priceOptions.length - 1; i += 1) {
    priceText[i] = `$${priceOptions[i]} - $${priceOptions[i + 1]}`;
  }
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
        className={classes.titleContainer}
      >
        <Typography className={classes.menuTitleText}>
          Sort by Price Per Unit
        </Typography>
      </Grid>
      {/* Min-max manual input + apply button */}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.minMaxContainer}
      >
        <TextField
          placeholder="Min"
          variant="outlined"
          size="small"
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
        <Typography className={classes.middleText}> to </Typography>
        <TextField
          placeholder="Max"
          variant="outlined"
          size="small"
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
        <Button
          className={classes.applyButton}
          variant="container"
          disableElevation
          style={{ textTransform: 'none' }} // Removes auto-caps
          size="small"
          onClick={handleApply}
        >
          Apply
        </Button>
      </Grid>
      {/* Price options list */}
      <List dense>
        {priceText.map((option) => (
          <ListItem
            dense
            key={option}
            onClick={handleToggle(option)}
            className={classes.optionContainer}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                checked={isChecked.indexOf(option) !== -1}
                size="small"
                checkedIcon={<CheckBoxIcon className={classes.iconColour} />}
              />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={option}
              className={classes.filterOptionText}
            />
            {/* TODO: Get real #, may need to make this a component for airtable calls */}
            <ListItemSecondaryAction className={classes.filterNumText}>
              100
            </ListItemSecondaryAction>
          </ListItem>

        ))}
      </List>
      <Divider variant="middle" className={classes.divider} />
    </div>
  );
}

PriceMenu.propTypes = {
  priceOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
};
