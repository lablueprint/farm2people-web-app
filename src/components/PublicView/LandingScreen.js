import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import headerBanner from '../../assets/images/HeaderBanner.jpg';
import treesBanner from '../../assets/images/TreesBanner.svg';
import fruit from '../../assets/images/LandingScreenFruit.svg';
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
  },
  treesContainer: {
    paddingTop: '3%',
    paddingBottom: '3%',
    filter: 'brightness(90%)',
    overflow: 'hidden',
    backgroundRepeat: 'no-repeat',
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundPosition: 'center',
    margin: '0 auto',
    width: '100%',
    backgroundImage: `url(${treesBanner})`,
  },
  introContainer: {
    paddingLeft: '200px',
    position: 'relative',
    paddingTop: '10%',
  },
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpPanel: {
    paddingTop: '6%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
    overflow: 'hidden',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '12%',
  },
  farm2peopleText: {
    width: '482.39px',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '62px',
    color: '#FFFFFF',
    margin: 0,
    lineHeight: 0.75,
  },
  marketplaceText: {
    width: '482.39px',
    left: '200px',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '62px',
    color: '#FFFFFF',
    margin: 0,
    padding: 0,
  },
  introText: {
    width: '380px',
    left: '200px',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '25px',
    lineHeight: '33px',
    color: '#FFFFFF',
    paddingBottom: '2%',
  },
  accountQuestionText: {
    lineHeight: 0.4,
    width: '252px',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    color: '#FFFFFF',
  },
  signinButton: {
    paddingLeft: 0,
    lineHeight: 0,
    paddingTop: 0,
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#FFFFFF',
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  signupButton: {
    fontFamily: 'Work Sans',
    background: '#53AA48',
    borderRadius: '6px',
    width: '10%',
    minWidth: 100,
    marginRight: 30,
    '&:hover': {
      background: '#606060',
    },
  },
  goalText: {
    textAlign: 'center',
    width: '65%',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    paddingTop: '2%',
  },
  fruitImg: {
    width: '55%',
    paddingBottom: '5%',
  },
  quoteBoldText: {
    width: '1000px',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '42px',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  quoteText: {
    width: '1000px',
    fontFamily: 'Work Sans',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: '25px',
    lineHeight: '36px',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  roleContainer: {
    overflow: 'hidden',
    paddingLeft: 15,
    paddingRight: 15,
  },
  roleSignUpText: {
    fontSize: '25px',
    width: '300px',
    textAlign: 'center',
  },
  roleSignUnButtonRed: {
    alignSelf: 'center',
    background: '#FF765D',
    borderRadius: '6px',
    '&:hover': {
      background: '#606060',
    },
  },
  roleSignUnButtonBlue: {
    alignSelf: 'center',
    background: '#2D5496',
    borderRadius: '6px',
    '&:hover': {
      background: '#606060',
    },
  },
  roleSignUnButtonGreen: {
    alignSelf: 'center',
    background: '#53AA48',
    borderRadius: '6px',
    '&:hover': {
      background: '#606060',
    },
  },
});

export default function LandingScreen() {
  const classes = useStyles();
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
          <Typography className={classes.farm2peopleText}>Farm2People</Typography>
          <Typography className={classes.marketplaceText}>Marketplace</Typography>
          <p className={classes.introText}>
            Sign up now to start buying the produce you love.
            Or sell the produce you grow
          </p>
          <div className={classes.innerContainer}>
            <Button onClick={handleSignUpClick} className={classes.signupButton} variant="contained" color="primary" type="button">Sign Up</Button>
            <div>
              <p className={classes.accountQuestionText}>Already have an account?</p>
              <Button onClick={handleSignInClick} look="clear" className={classes.signinButton}>Sign In</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.centerContainer}>
        <p className={classes.goalText}>
          Our goal is to address the problem we are all witnessing with the food
          supply chain and to form a more resilient food system for the future.
        </p>
        <br />
      </div>
      <div className={classes.centerContainer}>
        <img className={classes.fruitImg} src={fruit} alt="fruit" />
      </div>
      <div className={classes.treesContainer}>
        <div className={classes.centerContainer}>
          <h2 className={classes.quoteBoldText}>
            “Delivering a vision for sustainable, inclusive, efficient,
            nutritious and healthy food systems will require stepping outside
            of siloed thinking and reinventing cooperation across the food system.”
          </h2>
        </div>
        <div className={classes.centerContainer}>
          <h3 className={classes.quoteText}>
            — “Innovative Food Partnerships Offer A Way Forward to the Future of Food”
            by Sean de Cleene, Maria Elena Varas, & Ishmael Sunga
          </h3>
        </div>
      </div>
      <div className={classes.signUpPanel}>
        <div className={classes.roleContainer}>
          <h3 className={classes.roleSignUpText}>If you are a company or buyer</h3>
          <div className={classes.centerContainer}>
            <Button onClick={handleSignUpClick} className={classes.roleSignUnButtonRed} variant="contained" color="primary" type="button">Sign Up as a buyer</Button>
          </div>
        </div>
        <div className={classes.roleContainer}>
          <h3 className={classes.roleSignUpText}>If you are a food relief agency or non-profit</h3>
          <div className={classes.centerContainer}>
            <Button onClick={handleSignUpClick} className={classes.roleSignUnButtonBlue} variant="contained" color="primary" type="button">Sign Up as an agency</Button>
          </div>
        </div>
        <div className={classes.roleContainer}>
          <h3 className={classes.roleSignUpText}>If you are a farmer or seller</h3>
          <div className={classes.centerContainer}>
            <Button onClick={handleSignUpClick} className={classes.roleSignUnButtonGreen} variant="contained" color="primary" type="button">Sign Up as a seller</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
