import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox, Divider, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction,
  ListItemText, TextField, Typography,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import '../../../assets/styles/fonts.css';

const useStyles = makeStyles({
  titleContainer: {
    marginTop: '8%',
    marginLeft: '5%',
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
  dollarIcon: {
    fontFamily: 'Work Sans',
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '-8%',
    marginRight: '8%',
  },
  inputText: {
    fontFamily: 'Work Sans',
    fontSize: '12px',
  },
  inputContainer: {
    width: '33%',
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
      <Grid container direction="row">
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
          className={classes.inputContainer}
        />
        <Typography className={classes.inputText}> to </Typography>
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
          className={classes.inputContainer}
        />
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
