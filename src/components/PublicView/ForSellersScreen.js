import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import headerBanner from '../../assets/images/ForSellersHeader.svg';
import MissionStatement from '../../assets/images/MissionStatement.svg';
import horizontalFruit from '../../assets/images/LandingScreenFruit.svg';
import '../../styles/fonts.css';
import { history } from '../../lib/redux/store';

const useStyles = makeStyles({
  headerContainer: {
    overflow: 'hidden',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    margin: '0 auto',
    width: '100%',
    backgroundImage: `url(${headerBanner})`,
    paddingBottom: '10%',
  },
  greenContainer: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '6%',
    paddingBottom: '6%',
    backgroundColor: '#53AA48',
  },
  introContainer: {
    paddingLeft: '200px',
    position: 'relative',
    paddingTop: '10%',
  },
  horizontalContainer: {
    paddingTop: '2%',
    display: 'flex',
    alignItems: 'center',
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpPanel: {
    paddingTop: '2%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '6%',
    overflow: 'hidden',
  },
  forSellersText: {
    width: '1043px',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '50px',
    lineHeight: '55px',
    color: '#FFFFFF',
  },
  introText: {
    width: '1043px',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '50px',
    lineHeight: '55px',
    color: '#FFFFFF',
    paddingBottom: '5%',
  },
  startShoppingButton: {
    fontFamily: 'Work Sans',
    background: '#53AA48',
    borderRadius: '6px',
    width: '175px',
    minWidth: '40px',
    marginRight: 30,
    '&:hover': {
      background: '#606060',
    },
  },
  howItWorksText: {
    textAlign: 'center',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '50px',
    lineHeight: '59px',
    paddingTop: '2%',
  },
  walkthroughText: {
    textAlign: 'center',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '26px',
    color: '#000000',
    paddingBottom: '5%',
  },
  fruitImg: {
    width: '55%',
    paddingBottom: '2%',
  },
  quoteBoldText: {
    width: '1000px',
    minWidth: 0,
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '42px',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  sellerSignUpText: {
    fontFamily: 'Work Sans',
    fontSize: '35px',
    width: '600px',
    textAlign: 'center',
  },
  signUpButtonGreen: {
    alignSelf: 'center',
    background: '#53AA48',
    borderRadius: '6px',
    width: '200px',
    '&:hover': {
      background: '#606060',
    },
  },
  questionText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    color: '#000000',
  },
  contactText: {
    fontFamily: 'Work Sans',
    fontSize: '20px',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    cursor: 'pointer',
    color: '#2D5496',
  },
});

export default function ForSellersScreen() {
  const classes = useStyles();
  const handleContactClick = () => { history.push('/contact'); };
  const handleSignInClick = () => {
    history.push('/signin');
  };
  const handleSignUpClick = () => {
    history.push('/signup');
  };
  return (
    <div>
      <div className={classes.headerContainer}>
        <div className={classes.introContainer}>
          <Typography className={classes.forSellersText}>For Sellers</Typography>
          <Typography className={classes.introText}>
            Sell your produce directly to a network of local food providers
          </Typography>
          <Button onClick={handleSignInClick} className={classes.startShoppingButton} variant="contained" color="primary" type="button">Start Selling</Button>
        </div>
      </div>
      <div className={classes.centerContainer}>
        <h1 className={classes.howItWorksText}>
          How it Works
        </h1>
        <br />
        <img className={classes.fruitImg} src={horizontalFruit} alt="fruit" />
        <p className={classes.walkthroughText}>
          Add Listing to Marketplace &rarr;
          Receive Quote Request &rarr;
          Approve Order &rarr;
          Deliver Produce
        </p>
      </div>
      <div className={classes.greenContainer}>
        <img src={MissionStatement} alt="" />
        <h2 className={classes.quoteBoldText}>
          “We want to connect farmers to a diverse, resilient network
          of local food providers through an open-source, community driven platform.”
        </h2>
      </div>
      <div className={classes.signUpPanel}>
        <h3 className={classes.sellerSignUpText}>
          We are here to support you! Sell your produce today.
        </h3>
        <Button onClick={handleSignUpClick} className={classes.signUpButtonGreen} variant="contained" color="primary" type="button">Sign Up Now</Button>
        <div className={classes.horizontalContainer}>
          <Typography className={classes.questionText}>
            Have questions? Visit the&nbsp;
          </Typography>
          <Typography
            onClick={handleContactClick}
            className={classes.contactText}
          >
            Contact
          </Typography>
          <Typography className={classes.questionText}>
            &nbsp;Page
          </Typography>
        </div>
      </div>
    </div>
  );
}
