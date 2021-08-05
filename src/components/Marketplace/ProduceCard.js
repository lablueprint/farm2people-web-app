import React, { useEffect, useState, Fragment } from 'react';
import {
  Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import cabbageDog from '../../assets/images/cabbagedog.png';
import '../../styles/fonts.css';
import { base } from '../../lib/airtable/airtable';

const useStyles = makeStyles({
  loading: {
    height: '100%',
  },
  cardContainer: {
    width: '22%',
    background: 'white',
    borderWidth: '0px',
    margin: '5px 10px 20px 12px',
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
    fontSize: '17px',
    marginBottom: '2.5%',
    marginTop: '-4%',
    fontWeight: 'bold',
    /* Make text hidden if it's too long, mark with ellipsis */
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  farmText: {
    fontFamily: 'Work Sans',
    fontSize: '12.8px',
    marginBottom: '1.5%',
    /* Make text hidden if it's too long, mark with ellipsis */
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
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
    fontSize: '11.5px',
    fontWeight: 'bolder',
    marginTop: '10px',
    marginBottom: '1px',
  },
  redText: {
    color: '#E81717',
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
  loadingGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  agencyPriceTag: {
    backgroundColor: '#E81717',
    fontFamily: 'Work Sans',
    fontWeight: 500,
    fontSize: '12.5px',
    color: '#FFFFFF',
    borderRadius: '8px',
    textAlign: 'center',
    width: '40%',
  },
  hidden: {
    visibility: 'hidden',
  },
});

export default function ProduceCard(props) {
  const {
    produceID, farmID, palletPrice, handleOpenCartPopup, setPopupProduce,
    palletsAvailable, listingID, hasAgencyPrice,
  } = props;
  const [farmName, setFarmName] = useState('');
  const [produceName, setProduceName] = useState('');
  const [produceImg, setProduceImg] = useState('');

  // Get farm name from Airtable if produce has farm id linked to it
  useEffect(() => {
    if (farmID === null || farmID[0].length < 5) {
      setFarmName('Unnamed farm');
    } else {
      const farmArr = farmID.toString().split(',');
      base('Farms').find(farmArr[0]).then((farmObj) => {
        setFarmName(farmObj.fields['farm name'] || 'Farm not found');
      });
    }
  }, []);

  // Get produce name, img, + produce type using produceID
  useEffect(() => {
    if (produceID === null || produceID.length < 5) {
      setProduceName('Unnamed produce');
    } else {
      base('Farms').find(produceID).then((produceObj) => {
        setProduceName(produceObj.fields['produce type'] || 'Produce not found');
      });
      base('Produce Type').find(produceID).then((produceType) => {
        if (produceType.fields['produce picture']) {
          setProduceImg(produceType.fields['produce picture'][0].url);
        } else { setProduceImg(cabbageDog); }
      });
    }
  }, []);

  const handleNewPopup = () => {
    handleOpenCartPopup();
    setPopupProduce({
      crop: produceName,
      price: palletPrice,
      farmName,
      palletsAvailable,
      produceImg,
      listingID,
      farmID: farmID === null ? -1 : farmID[0],
    });
  };

  const classes = useStyles();
  return (
    <Card className={classes.cardContainer} variant="outlined">
      {farmName === '' || produceName === '' || produceImg === ''
        ? (
          <Grid className={classes.loadingGrid}>
            <CircularProgress align="center" className={classes.loading} />
          </Grid>
        )
        : (
          <>
            <Typography className={hasAgencyPrice === true ? classes.agencyPriceTag : `${classes.agencyPriceTag} ${classes.hidden}`}>
              Agency Price
            </Typography>
            <CardMedia
              className={classes.img}
              image={produceImg}
              title="Produce Image"
            />
            <CardContent>
              <Typography className={classes.titleText}>
                {produceName}
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
                <Typography className={hasAgencyPrice === true ? `${classes.redText} ${classes.smallPriceText}` : classes.smallPriceText}>
                  {`$${palletPrice}/`}
                </Typography>
                <Typography className={hasAgencyPrice === true ? `${classes.redText} ${classes.smallPriceText}` : classes.smallPriceText}>
                  pallet
                </Typography>
              </Grid>
            </CardContent>
            <CardActions>
              <IconButton onClick={handleNewPopup} className={classes.cartButton}>
                <AddIcon />
                ADD TO CART
              </IconButton>
            </CardActions>
          </>
        )}
    </Card>
  );
}

ProduceCard.propTypes = {
  handleOpenCartPopup: PropTypes.func.isRequired,
  setPopupProduce: PropTypes.func.isRequired,
  produceID: PropTypes.string.isRequired,
  farmID: PropTypes.arrayOf(PropTypes.string).isRequired,
  palletPrice: PropTypes.number.isRequired,
  hasAgencyPrice: PropTypes.bool.isRequired,
  palletsAvailable: PropTypes.number.isRequired,
  listingID: PropTypes.string.isRequired,
};
