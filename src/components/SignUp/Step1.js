import React from 'react';
import {
  Typography,
  Grid,
  CardMedia,
  CardContent,
  CardActionArea,
  Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fruit0 from '../../assets/images/OnboardingFruit0.svg';
import Fruit1 from '../../assets/images/OnboardingFruit1.svg';
import Fruit2 from '../../assets/images/OnboardingFruit2.svg';

const BUTTONS = [
  {
    id: 0,
    title: 'Buyer',
    image: Fruit0,
    fruit: {
      marginTop: '10%',

      height: '134px',
      width: '98px',
      left: '89px',
      top: '46px',
    },
  },
  {
    id: 1,
    title: 'Non-profit or Agency',
    image: Fruit1,

    fruit: {
      marginTop: '10%',
      height: '130px',
      width: '105px',
      left: '96px',
      top: '50px',
    },
  },
  {
    id: 2,
    title: 'Seller',
    image: Fruit2,

    fruit: {
      marginTop: '10%',
      height: '141px',
      width: '91px',
      left: '72px',
      top: '39px',
    },
  },
];

const useStyles = makeStyles({
  subtitleText: {
    textAlign: 'left',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7%',
  },
  labelText: {
    fontWeight: 'bold',
  },
  card: {
    margin: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'FFFFFF',
    borderRadius: '15px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
  },
});

export default function Step1(props) {
  const {
    currentStep, roleChange,
  } = props;

  const classes = useStyles();

  if (currentStep !== 1) {
    return null;
  }
  return [
    <div className={classes.subtitleText}>
      Are you a...
    </div>,
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="stretch"
    >
      {BUTTONS.map((bt) => (
        <Grid
          item
          className={classes.card}
          component={Card}
          xs={12}
          sm={6}
          md={3}
          key={BUTTONS.indexOf(bt)}
        >
          <CardActionArea onClick={roleChange} value={bt.id}>
            <CardMedia
              image={bt.image}
              style={bt.fruit}
            />
            <CardContent>
              <Typography className={classes.labelText}>
                {bt.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>,
  ];
}
