import React, { useState } from 'react';
import {
  Card, CardContent, Chip, Collapse, Grid, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PropTypes from 'prop-types';
import './Font.css';

/* Custom styling for material-ui components */
const useStyles = makeStyles({
  cardContainer: { // Overall card container
    background: 'lightblue', // change to lightblue for testing
    borderWidth: '0px',
    borderColor: '#53AA48',
    margin: '5%',
    borderRadius: '20px',
    fontFamily: 'Work Sans',
  },
  collapsedBorder: {
    borderLeftWidth: '15px',
  },
  collapsedContent: {
    width: '95%',
    marginRight: '2%',
    marginLeft: '2%',
  },
  expandedBorder: { // Border if card is expanded
    borderTopWidth: '20px',
  },
  expandedContent: {
    width: '93%',
    marginRight: '2%',
    marginLeft: '2%',
    fontSize: '16px',
  },
  headerContainer: { // Header contains title, subtitle, + icon
    color: '#373737',
    fontFamily: 'Work Sans',
    marginTop: '3%',
    marginLeft: '4%',
    paddingRight: '8%',
  },
  titleContainer: {
    width: '55%',
  },
  titleText: {
    fontSize: '22px',
  },
  subTitleText: {
    fontSize: '18px',
    marginTop: '3px',
  },
  operationTags: {
    background: '#DBE2ED', // grey
    color: '#373737', // black
    borderRadius: '6px',
    marginTop: '-3%',
    marginRight: '2%',
    paddingLeft: '0.8%',
    paddingRight: '0.8%',
    fontFamily: 'Work Sans',
    fontSize: '18px',
  },
  marketTags: {
    background: '#DBE2ED',
    color: '#373737',
    borderRadius: '6px',
    marginLeft: '1%',
    marginRight: '0.5%',
    paddingLeft: '0.7%',
    paddingRight: '0.7%',
    fontFamily: 'Work Sans',
    fontSize: '16px',
  },
  capabilityTags: {
    background: '#FFFFFF',
    color: '#373737',
    marginTop: '1%',
    marginRight: '1.3%',
    borderRadius: '6px',
    fontFamily: 'Work Sans',
    fontSize: '16px',
  },
  descriptionContainer: {
    marginTop: '-1.5%',
    marginBottom: '2%',
  },
  marketContainer: {
    marginTop: '3%',
  },
  iconColour: {
    color: '#53AA48', // green
  },
});

export default function FarmCard(props) {
  const styles = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    farmName, address, zipCode, description, operationTypeTags, marketTags, isPACA, isColdChain,
    isDelivery,
  } = props;

  // Set capabilityTags (PACA, cold chain, delivery)
  const capabilityTags = [];
  if (isPACA === true) {
    capabilityTags.push('PACA Certified');
  }
  if (isColdChain === true) {
    capabilityTags.push('Cold Chain Capabilities');
  }
  if (isDelivery === true) {
    capabilityTags.push('Delivery');
  }

  return (
    <Card
      className={[
        styles.cardContainer,
        isExpanded ? styles.expandedBorder : styles.collapsedBorder,
      ]}
      variant="outlined"
    >
      {/* Header/non-collapsed card contains farm name, expand/collapse icon, tags for op type */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={styles.headerContainer}
      >
        {/* Contains title (farm name) and subtitle (location) */}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="start"
          className={styles.titleContainer}
        >
          <div className={styles.titleText}>
            {farmName}
          </div>
          <div className={styles.subTitleText}>
            {address}
          </div>
          <div className={styles.subTitleText}>
            {zipCode}
          </div>
        </Grid>
        <IconButton
          className={styles.iconColour}
          // On icon click, collapse or expand the card
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded && <ExpandMoreIcon />}
          {isExpanded && <ExpandLessIcon />}
        </IconButton>
      </Grid>
      <CardContent className={styles.collapsedContent}>
        {operationTypeTags.map((tag) => (
          <Chip
            label={tag}
            className={styles.operationTags}
            size="medium"
            variant="default"
            classes="tags"
          />
        ))}
      </CardContent>
      {/* If uncollapsed, shows description and additional tags */}
      <Collapse in={isExpanded} timout="auto" unmountOnExit>
        <CardContent className={styles.expandedContent}>
          <div>
            <div className={styles.descriptionContainer}>
              {description}
            </div>
            {capabilityTags.map((tag) => (
              <Chip
                label={tag}
                className={styles.capabilityTags}
                size="small"
                variant="default"
                icon={<CheckCircleOutlineIcon className={styles.iconColour} />}
              />
            ))}
          </div>
          <Grid /* Used to keep Market + market tags in 1 row */
            container
            direction="row"
            alignItems="center"
            className={styles.marketContainer}
          >
            <div>
              Market:
            </div>
            {marketTags.map((tag) => (
              <Chip
                label={tag}
                className={styles.marketTags}
                size="small"
                variant="default"
              />
            ))}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

FarmCard.propTypes = {
  farmName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  zipCode: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  operationTypeTags: PropTypes.arrayOf({
    label: PropTypes.string.isRequired,
  }).isRequired,
  marketTags: PropTypes.arrayOf({
    label: PropTypes.string.isRequired,
  }).isRequired,
  isPACA: PropTypes.bool.isRequired,
  isColdChain: PropTypes.bool.isRequired,
  isDelivery: PropTypes.bool.isRequired,
};
