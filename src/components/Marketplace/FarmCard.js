import React, { useState } from 'react';
import './FarmCard.css';
import {
  Card, CardContent, CardHeader, Chip, Collapse, Grid, IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PropTypes from 'prop-types';

export default function FarmCard(props) {
  const [expandCard, setExpandCard] = useState(false);
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
    <Card className="cardContainer" variant="outlined">
      {/* Header/non-collapsed card contains farm name, expand/collapse icon, tags for op type */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className="cardHeader"
      >
        <CardHeader
          title={farmName}
          subheader={`${address} | ${zipCode}`}
        />
        <IconButton onClick={() => setExpandCard(!expandCard)}>
          {!expandCard && <ExpandMoreIcon />}
          {expandCard && <ExpandLessIcon />}
        </IconButton>
      </Grid>
      <CardContent className="collapsedContent">
        {operationTypeTags.map((tag) => (
          <Chip
            label={tag}
            className="operationTags"
            size="medium"
            variant="default"
            classes="tags"
          />
        ))}
      </CardContent>
      {/* If uncollapsed, shows description and additional tags */}
      <Collapse in={expandCard} timout="auto" unmountOnExit>
        <CardContent className="expandedContent">
          <p>
            {description}
          </p>
          {capabilityTags.map((tag) => (
            <Chip
              label={tag}
              className="capabilityTags"
              root="capabilityTags"
              size="small"
              variant="default"
              icon={<CheckCircleOutlineIcon />}
            />
          ))}
          <Grid /* Used to keep Market + market tags in 1 row */
            container
            direction="row"
            alignItems="center"
          >
            <h1> Market: </h1>
            {marketTags.map((tag) => (
              <Chip
                label={tag}
                className="marketTags"
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
    // key: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  marketTags: PropTypes.arrayOf({
    // key: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  isPACA: PropTypes.bool.isRequired,
  isColdChain: PropTypes.bool.isRequired,
  isDelivery: PropTypes.bool.isRequired,
};
