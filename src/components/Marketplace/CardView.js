/* eslint-disable react/jsx-fragments */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardMedia, Typography, IconButton, Card, CardContent, Grid,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  headlineText: {
    marginLeft: '3%',
    marginTop: '3%',
    color: '#4a4848',
    textDecoration: 'none',
  },
  img: { // Height must be specified for image to appear
    width: '24.5%',
    aspectRatio: 10 / 8.5,
    marginTop: '-50.8%',
    marginLeft: '16%',
    marginRight: '5%',
  },
  cardContainer: {
    width: '18%',
    background: 'white',
    borderWidth: '0px',
    margin: '1.5%',
    borderRadius: '8px',
    fontFamily: 'Work Sans',
  },
  titleText: {
    fontFamily: 'Work Sans',
    color: '#373737',
    marginTop: '2.5%',
    marginLeft: '42%',
    marginBottom: '2.5%',
    fontWeight: 'bold',
  },
  farmText: {
    fontFamily: 'Work Sans',
    color: 'black',
    marginTop: '-1.5%',
    marginLeft: '42%',
    marginBottom: '2.5%',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontFamily: 'Work Sans',
    marginLeft: '42%',
    marginRight: '20%',
    color: '#808080',
    fontSize: '12px',
  },
  cartButton: {
    width: '10%',
    borderRadius: '8px',
    backgroundColor: '#53AA48',
    color: 'white',
    fontFamily: 'Work Sans',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '-1%',
    marginBottom: '0%',
    paddingLeft: '0%',
    marginLeft: '42%',
    paddingRight: '-30%',
  },
  aboutText: {
    fontFamily: 'Work Sans',
    color: '#373737',
    marginTop: '3.5%',
    marginLeft: '16%',
    marginBottom: '2.5%',
    fontWeight: 'bold',
  },
  bottomSpace: {
    marginTop: '800px',
  },
  aboutCard1: {
    marginLeft: '64%',
    marginRight: '-60%',
    height: '95%',
  },
  aboutCard2: {
    marginTop: '60%',
    marginLeft: '50%',
    marginRight: '60%',
  },
  cardFont: {
    fontFamily: 'Work Sans',
    color: '#373737',
  },
});

export default function CardView(props) {
  const {
    setIsSelected, cardRecord,
  } = props;
  const {
    produceName, image, description, palletPrice, expirationDate, dateEntered,
    firstAvailable, availableUntil, season, unitType, unitsPerPallet,
    lbsPerUnit, unitsAvailable, unitsPending, unitsSold, farmName, individualUnit, bunchesCrate,
  } = cardRecord;
  const classes = useStyles();
  return (
    <>
      <br />
      <NavLink to="/marketplace" className={classes.headlineText} onClick={() => { setIsSelected(false); }}>
        Marketplace /
        {' '}
        <b> Produce Information</b>
      </NavLink>
      <h1 className={classes.titleText}><b>{produceName}</b></h1>
      <div className={classes.farmText}><b>{farmName}</b></div>
      <Typography className={classes.descriptionText}><b>{description}</b></Typography>
      <h1 className={classes.titleText}>{`$${palletPrice}/${unitType}`}</h1>
      <IconButton className={classes.cartButton}>
        <AddIcon />
        ADD TO CART
      </IconButton>
      <h2 className={classes.aboutText}>About This Item</h2>
      <Grid container spacing={24}>
        <Grid item md={3}>
          <Card className={classes.aboutCard1} raised>
            <CardContent>
              <Typography className={classes.cardFont}>{`Sell By Date: ${expirationDate}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Date Entered: ${dateEntered}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`First Available: ${firstAvailable}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Available Until: ${availableUntil}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Growing Season Date: ${season}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Produce Details: ${description}`}</Typography>
              <br />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.aboutCard1} raised>
            <CardContent>
              <Typography className={classes.cardFont}>{`Individual Produce Unit: ${individualUnit}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Group Produce Type: ${unitType}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Bunches Per Crate: ${bunchesCrate}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Lbs Per Crate: ${lbsPerUnit}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Crates Per Pallet: ${unitsPerPallet}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Pallets Available: ${unitsAvailable}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Pallets Pending: ${unitsPending}`}</Typography>
              <br />
              <Typography className={classes.cardFont}>{`Pallets Sold: ${unitsSold}`}</Typography>
              <br />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <br />
      <div>
        <CardMedia
          className={classes.img}
          image={image} // Temporary dummy image
          title="Produce Image"
        />
      </div>
      <div className={classes.bottomSpace} />
    </>
  );
}

CardView.propTypes = {
  setIsSelected: PropTypes.func.isRequired,
  cardRecord: PropTypes.objectOf.isRequired,
};
