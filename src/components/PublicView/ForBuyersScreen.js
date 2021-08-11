import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import headerBanner from '../../assets/images/ForBuyersHeader.svg';
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
  blueContainer: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '4%',
    paddingBottom: '4%',
    backgroundColor: '#2D5496',
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
  forBuyersText: {
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
  startButton: {
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
  quoteText: {
    fontFamily: 'Work Sans',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: '25px',
    lineHeight: '36px',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  buyerSignUpText: {
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

export default function ForBuyersScreen() {
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
          <Typography className={classes.forBuyersText}>For Buyers</Typography>
          <Typography className={classes.introText}>
            Shop organically grown,
            local produce and support farmers who feed us
          </Typography>
          <Button onClick={handleSignInClick} className={classes.startButton} variant="contained" color="primary" type="button">Start Shopping</Button>
        </div>
      </div>
      <div className={classes.centerContainer}>
        <h1 className={classes.howItWorksText}>
          How it Works
        </h1>
        <br />
        <img className={classes.fruitImg} src={horizontalFruit} alt="fruit" />
        <p className={classes.walkthroughText}>
          Shop Marketplace &rarr;
          Request Quote &rarr;
          Approve Quote &rarr;
          Accept Quote
        </p>
      </div>
      <div className={classes.blueContainer}>
        <h2 className={classes.quoteBoldText}>
          “Food sovereignty is the right of peoples to healthy and culturally appropriate food
          produced through ecologically sound and sustainable methods, and their right to define
          their own food and agricultural systems.”
        </h2>
        <h3 className={classes.quoteText}>
          — Nyéléni Forum of Food Sovereignty
        </h3>
      </div>
      <div className={classes.signUpPanel}>
        <h3 className={classes.buyerSignUpText}>
          If you’re a food bank,
          food relief agency, or buyer
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
