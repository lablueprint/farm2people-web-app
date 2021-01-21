import React, { useState } from 'react';
import './FarmCard.css';
import {
  Card, CardContent, CardHeader, Collapse, Grid, IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export default function FarmCard() {
  const [expandCard, setExpandCard] = useState(false);

  return (
    <Card className="cardContainer" variant="outlined">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className="cardHeader"
      >
        <CardHeader
          title="Farm Name"
          subheader="Los Angeles, California | 90111"
        />
        <IconButton onClick={() => setExpandCard(!expandCard)}>
          {!expandCard && <ExpandMoreIcon />}
          {expandCard && <ExpandLessIcon />}
        </IconButton>
      </Grid
      >
      <CardContent className="collapsedContent">
        <h1> stuff inside collapsed card content </h1>
      </CardContent>
      <Collapse in={expandCard} timout="auto" unmountOnExit>
        <CardContent className="expandedContent">
          <h1> thing 1 inside expanded content </h1>
          <h1> thing 2 inside expanded content </h1>
        </CardContent>
      </Collapse>
    </Card>
  );
}
