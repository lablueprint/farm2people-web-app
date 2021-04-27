import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import OrangeCat from '../../../assets/images/OrangeCat.jpeg';

const useStyles = makeStyles({
  listingCard: {
    maxWidth: '90%',
  },
  selectedCard: {
    maxWidth: '90%',
    border: '2px solid gray',
  },
  listingCardPicture: {
    height: '100%',
  },
  listingCardContent: {
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Work Sans',
  },
});

export default function UnitTypeCard({
  onSelect, label, selected,
}) {
  const classes = useStyles();
  const setCardSelected = () => {
    onSelect();
  };
  return (
    <Card classes={{ root: selected ? classes.selectedCard : classes.listingCard }} elevation={4} variant={selected ? 'outlined' : 'elevation'} onClick={setCardSelected}>
      <CardActionArea>
        <CardMedia
          className={classes.listingCardPicture}
          image={OrangeCat}
          title="orange-cat"
          component="img"
        />
        <CardContent className={classes.listingCardContent}>
          <Typography variant="h6" component="h4" className={classes.text}>
            { label }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

UnitTypeCard.propTypes = {
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};
