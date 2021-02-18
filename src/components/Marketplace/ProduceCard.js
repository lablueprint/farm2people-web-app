import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import cabbageDog from './cabbagedog.png';
import './Font.css';

const useStyles = makeStyles({
  cardContainer: {
    width: '30%',
    background: 'lightblue', // change to lightblue/white for testing
    borderWidth: '0px',
    margin: '2%',
    borderRadius: '8px',
    fontFamily: 'Work Sans',
  },
  img: { // Height must be specified for image to appear
    // height: 180,
    width: '92%',
    aspectRatio: 10 / 10,
    marginTop: '4%',
    marginLeft: '4%',
    marginRight: '4%',
  },
  titleText: {
    fontFamily: 'Work Sans',
    fontSize: '70%',
    marginBottom: '1.5%',
  },
  farmText: {
    fontFamily: 'Work Sans',
    fontSize: '42%',
    marginBottom: '1.5%',
  },
  priceText: {
    fontFamily: 'Work Sans',
    fontSize: '55%',
    fontWeight: 'bold',
  },
  cartButton: {
    width: '100%',
    borderRadius: '8px',
    backgroundColor: '#53AA48',
    color: 'white', // text colour
    fontFamily: 'Work Sans',
    fontSize: '45%',
    fontWeight: 'bold',
    marginTop: '-3.5%',
    marginBottom: '0.2%',
  },
  cartIcon: {
    color: 'white',
  },
});

export default function ProduceCard(props) {
  const {
    cropName, farmName, unitPrice, unitType,
  } = props;

  const styles = useStyles();
  return (
    <Card className={styles.cardContainer} variant="outlined">
      <CardMedia
        className={styles.img}
        image={cabbageDog} // Temporary dummy image
        title="Produce Image"
      />
      <CardContent>
        <Typography className={styles.titleText}>
          {cropName}
        </Typography>
        <Typography className={styles.farmText}>
          {farmName}
        </Typography>
        <Typography className={styles.priceText}>
          {`$${unitPrice}/${unitType}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={styles.cartButton}>
          <IconButton size="small" className={styles.cartIcon}>
            <AddIcon />
          </IconButton>
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
}

ProduceCard.propTypes = {
  cropName: PropTypes.string.isRequired,
  farmName: PropTypes.string.isRequired,
  unitPrice: PropTypes.number.isRequired,
  unitType: PropTypes.string.isRequired,
};
