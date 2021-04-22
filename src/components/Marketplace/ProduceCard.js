import Airtable from 'airtable';
import React, { useEffect, useState } from 'react';
import {
  Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import cabbageDog from '../../assets/images/cabbagedog.png';
import '../../styles/fonts.css';

// Airtable set-up
const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

const useStyles = makeStyles({
  cardContainer: {
    width: '22%',
    background: 'white',
    borderWidth: '0px',
    marginTop: '15px',
    marginBottom: '15px',
    borderRadius: '6px',
    fontFamily: 'Work Sans',
  },
  img: { // Height must be specified for image to appear
    width: '90%',
    aspectRatio: 10 / 8.5,
    marginTop: '4%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: '6px',
  },
  titleText: {
    fontFamily: 'Work Sans',
    fontSize: '17.5px',
    marginBottom: '2.5%',
    marginTop: '-4%',
    fontWeight: 'bold',
  },
  farmText: {
    fontFamily: 'Work Sans',
    fontSize: '13px',
    marginBottom: '1.5%',
  },
  priceTextPadding: {
    marginBottom: '-4%',
  },
  priceText: {
    fontFamily: 'Work Sans',
    fontSize: '15.5px',
    fontWeight: 'bolder',
    marginTop: '1%',
  },
  smallPriceText: {
    fontFamily: 'Work Sans',
    fontSize: '12px',
    fontWeight: 'bolder',
    marginTop: '10px',
    marginBottom: '1px',
  },
  cartButton: {
    width: '100%',
    borderRadius: '6px',
    backgroundColor: '#53AA48',
    color: 'white',
    fontFamily: 'Work Sans',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '-2%',
    marginBottom: '0.2%',
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
  },
});

export default function ProduceCard(props) {
  const {
    cropName, farmID, unitPrice, unitType,
  } = props;
  const [farmName, setFarmName] = useState('');

  // Get farm name from Airtable if produce has farm id linked to it
  useEffect(() => {
    if (farmID === null) {
      setFarmName('Unnamed farm');
    } else {
      const farmArr = farmID.toString().split(',');
      base('Farms').find(farmArr[0]).then((farmObj) => {
        setFarmName(farmObj.fields['farm name'] || 'Farm not found');
      });
    }
  }, []);

  const classes = useStyles();
  return (
    <Card className={classes.cardContainer} variant="outlined">
      <CardMedia
        className={classes.img}
        image={cabbageDog} // Temporary dummy image
        title="Produce Image"
      />
      <CardContent>
        <Typography className={classes.titleText}>
          {cropName}
        </Typography>
        <Typography className={classes.farmText}>
          {farmName}
        </Typography>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-end"
          className={classes.priceTextPadding}
        >
          <Typography className={classes.priceText}>
            {`$${unitPrice}/`}
          </Typography>
          <Typography className={classes.smallPriceText}>
            {unitType}
          </Typography>
        </Grid>
      </CardContent>
      <CardActions>
        <IconButton className={classes.cartButton}>
          <AddIcon />
          ADD TO CART
        </IconButton>
      </CardActions>
    </Card>
  );
}

ProduceCard.propTypes = {
  cropName: PropTypes.string.isRequired,
  farmID: PropTypes.string.isRequired,
  unitPrice: PropTypes.number.isRequired,
  unitType: PropTypes.string.isRequired,
};
