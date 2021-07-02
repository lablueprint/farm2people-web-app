import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  listingCard: {
    maxWidth: '90%',
    height: '235px',
  },
  selectedCard: {
    maxWidth: '90%',
    height: '235px',
    border: '2px solid gray',
  },
  listingCardPicture: {
    height: '180px',
    objectFit: 'cover',
    width: '100%',
    display: 'flex',
  },
  listingCardContent: {
    textAlign: 'center',
    alignItems: 'flex-end',
  },
  text: {
    fontFamily: 'Work Sans',
  },
});

export default function UnitTypeCard({
  onSelect, label, selected, url,
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
          src={url}
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
  url: PropTypes.string.isRequired,
};
