import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction,
  ListItemText, Typography,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import '../../../assets/styles/fonts.css';

const useStyles = makeStyles({
  titleContainer: {
    marginTop: '8%',
    marginLeft: '5%',
  },
  menuTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '15px',
    color: '#373737',
    fontWeight: 'bold',
  },
  resetText: {
    marginTop: '-10.1%',
    fontFamily: 'Work Sans',
    fontSize: '12.5px',
    color: '#373737',
  },
  expandIcon: {
    marginTop: '-18%',
    color: '#2D5496',
  },
  iconColour: {
    color: '#2D5496',
  },
  // Styling for filter menu items
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
});

/* Menu in the sidebar for selecting filters, takes in array of filter options */
export default function FilterMenu({ menuTitle, filterOptions, isLast }) {
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState([0]);
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
        className={classes.titleContainer}
      >
        <Typography className={classes.menuTitleText}>{menuTitle}</Typography>
        <Grid container direction="row" justify="flex-end">
          <Typography className={classes.resetText}> Reset </Typography>
          <IconButton
            className={classes.expandIcon}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {!isExpanded && <ExpandMoreIcon />}
            {isExpanded && <ExpandLessIcon />}
          </IconButton>
        </Grid>
      </Grid>
      {/* List of filter options only shows if expanded */}
      <List dense>
        {isExpanded && (filterOptions.map((option) => (
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

        )))}
      </List>
      {!isLast && <Divider variant="middle" />}
    </div>
  );
}

FilterMenu.propTypes = {
  menuTitle: PropTypes.string.isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLast: PropTypes.bool.isRequired,
};
