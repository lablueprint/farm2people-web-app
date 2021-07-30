import React, { useState } from 'react';
import {
  Button, Card, CardContent, Chip, Collapse, Grid, IconButton, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PropTypes from 'prop-types';
import '../../styles/fonts.css';

const useStyles = makeStyles({
  cardContainer: { // Overall card container
    background: '#FFFFFF',
    borderWidth: '0px',
    borderColor: '#53AA48',
    margin: '3%',
    borderRadius: '20px',
    fontFamily: 'Work Sans',
  },
  collapsedBorder: {
    border: '1px solid #C4C4C4',
    borderLeftWidth: '15px',
    borderLeftColor: '#53AA48',
  },
  collapsedContent: {
    width: '95%',
    marginRight: '2%',
    marginLeft: '2%',
  },
  expandedBorder: { // Border if card is expanded
    filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.12))',
    borderTopWidth: '20px',
  },
  expandedContent: {
    width: '93%',
    marginRight: '2%',
    marginLeft: '2%',
    fontSize: '45%',
  },
  headerContainer: {
    color: '#373737',
    fontFamily: 'Work Sans',
    marginTop: '3%',
    marginLeft: '4%',
    paddingRight: '8%',
  },
  titleContainer: {
    width: '93%',
  },
  titleText: {
    fontSize: '21px',
    textDecoration: 'underline',
    textDecorationColor: '#373737',
  },
  addressContainer: {
    width: '40%',
  },
  subTitleText: {
    fontFamily: 'Work Sans',
    fontSize: '17px',
    marginTop: '2px',
    marginLeft: '6%',
  },
  operationTagsContainer: {
    width: '100%',
    fontSize: '15px',
  },
  operationTags: {
    background: '#DBE2ED',
    color: '#373737',
    borderRadius: '6px',
    marginTop: '6px',
    marginRight: '9px',
    fontFamily: 'Work Sans',
    fontSize: '90%',
    fontWeight: 'lighter',
  },
  farmingTagsContainer: {
    marginTop: '3px',
    fontFamily: 'Work Sans',
    fontSize: '15px',
    width: '100%',
  },
  farmingText: {
    fontFamily: 'Work Sans',
  },
  farmingTags: {
    fontSize: '90%',
    fontFamily: 'Work Sans',
    background: '#EBD7D0',
    borderRadius: '8px',
    marginLeft: '6px',
    marginTop: '0.8%',
    marginBottom: '0.8%',
    fontWeight: 'lighter',
  },
  produceTypesContainer: {
    marginTop: '1%',
    width: '70%',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  produceTypesTags: {
    marginTop: '10px',
    maxWidth: '550px',
  },
  produceTypography: {
    fontFamily: 'Work Sans',
  },
  descriptionContainer: {
    fontFamily: 'Work Sans',
    marginTop: '-1.5%',
    marginBottom: '2%',
  },
  iconColour: {
    color: '#53AA48',
  },
  produceIconCross: {
    color: '#8A7761',
    marginRight: '-20px',
  },
  produceIconCheck: {
    color: '#53AA48',
    marginRight: '-20px',
  },
  shopButton: {
    backgroundColor: '#53AA48',
    color: '#FFFFFF',
    marginTop: '2%',
    marginRight: '1.5%',
    borderRadius: '6px',
    fontFamily: 'Work Sans',
    fontWeight: 'lighter',
  },
});

export default function FarmCard(props) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    farmName, address, zipCode, description, operationTypeTags, farmingPracticeTags,
  } = props;

  // TODO: get farm card photo and implement farm photo styling
  return (
    <Card
      className={[
        classes.cardContainer,
        isExpanded ? classes.expandedBorder : classes.collapsedBorder,
      ]}
      variant="outlined"
    >
      {/* Header/non-collapsed card contains farm name, expand/collapse icon, tags for op type  */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.headerContainer}
      >
        {/* Contains title (farm name) and subtitle (location) */}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          className={classes.titleContainer}
        >
          <div className={classes.titleText}>
            {farmName}
          </div>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
            className={classes.addressContainer}
          >
            <Typography className={classes.subTitleText}>
              {address}
            </Typography>
            { // Only show zipcode if it exists
              (zipCode !== -1)
              && (
                <Typography className={classes.subTitleText}>
                  {zipCode}
                </Typography>
              )
            }
          </Grid>
        </Grid>
        <IconButton
          className={classes.iconColour}
          // On icon click, collapse or expand the card
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded && <ExpandMoreIcon />}
          {isExpanded && <ExpandLessIcon />}
        </IconButton>
      </Grid>
      <CardContent className={classes.collapsedContent}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <div className={classes.operationTagsContainer}>
            {operationTypeTags.map((tag) => (
              <Chip
                label={tag}
                className={classes.operationTags}
                size="medium"
                variant="default"
                classes="tags"
              />
            ))}
          </div>
          { isExpanded
         && (
         <Grid
           container
           direction="row"
           justifyContent="flex-start"
           alignItems="center"
           className={classes.farmingTagsContainer}
         >
           <Typography
             className={classes.farmingText}
           >
             Farming Practice:
           </Typography>
           {farmingPracticeTags.map((tag) => (
             <Chip
               label={tag}
               className={classes.farmingTags}
               size="small"
               variant="default"
             />
           ))}
         </Grid>
         )}
        </Grid>
      </CardContent>
      {/* If uncollapsed, shows description and additional tags */}
      <Collapse in={isExpanded} timout="auto" unmountOnExit>
        <CardContent className={classes.expandedContent}>
          <div>
            <Typography className={classes.descriptionContainer}>
              {description}
            </Typography>
          </div>
          <Grid /* Used to keep produce types + shop button in 1 row */
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            {/* TODO: replace w/ actual produce types and corresponding icons from airtable */}
            <div className={classes.produceTypesContainer}>
              <div>
                Produce Types Sold:
              </div>
              <div className={classes.produceTypesTags}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <DoneRoundedIcon className={classes.produceIconCheck} />
                  <Typography className={classes.produceTypography}>
                    Vegetables
                  </Typography>
                  <DoneRoundedIcon className={classes.produceIconCheck} />
                  <Typography className={classes.produceTypography}>
                    Fruits
                  </Typography>
                  <CloseRoundedIcon className={classes.produceIconCross} />
                  <Typography className={classes.produceTypography}>
                    Legumes
                  </Typography>
                  <DoneRoundedIcon className={classes.produceIconCheck} />
                  <Typography className={classes.produceTypography}>
                    Grains
                  </Typography>
                  <CloseRoundedIcon className={classes.produceIconCross} />
                  <Typography className={classes.produceTypography}>
                    Oats
                  </Typography>

                </Grid>
              </div>

            </div>
            <Button
              className={classes.shopButton}
              variant="container"
              disableElevation
            >
              SHOP THIS FARM
            </Button>
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
  farmingPracticeTags: PropTypes.arrayOf({
    label: PropTypes.string.isRequired,
  }).isRequired,
};
