import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddListing from './AddListing';
import OrangeCat from '../../assets/images/OrangeCat.jpeg';

const useStyles = makeStyles({
  listingCard: {
    maxWidth: '75%',
  },
  listingCardPicture: {
    height: '100%',
  },
  listingCardContent: {
    backgroundColor: '#ffffff',
    textAlign: 'left',
    borderTop: '2px solid Gray',
    borderBottom: '1px solid Gray',
    paddingTop: '8px',
  },
  listingCardActionArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
    width: '100%',
    padding: '0px',
    backgroundColor: '#ffffff',
  },
  divider: {
    backgroundColor: 'Gray',
  },
});
export default function ListingManagerCard({
  id, listing, onSelect, selected, editRecord,
}) {
  const classes = useStyles();
  const [editActive, setEditActive] = useState(false);
  const handleClickOpen = () => {
    setEditActive(true);
  };

  const handleClose = () => {
    setEditActive(false);
  };
  return (
    <>
      <Card className={classes.listingCard}>
        <CardActionArea>
          <CardMedia
            className={classes.listingCardPicture}
            image={OrangeCat}
            title="orange-cat"
            component="img"
          />
          <CardContent className={classes.listingCardContent}>
            <Typography variant="h6" component="h4">
              { listing.crop }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { listing['pallets available'] || 0 }
              {' '}
              pallet(s) in stock    |    $
              { listing['standard price per pallet'] || 0 }
              /pallet
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { listing['pallets pending'] || 0}
              {' '}
              pallets pending
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.listingCardActionArea}>
          <Button size="small" color="primary" onClick={handleClickOpen}>
            Edit
          </Button>
          <Divider className={classes.divider} orientation="vertical" flexItem />
          <AddListing
            id={id}
            listing={listing}
            edit
            closeDialog={handleClose}
            isOpen={editActive}
            modifyListings={editRecord}
          />
          <Checkbox
            checked={selected || false}
            onChange={() => {
              onSelect(id, !selected);
            }}
            name="selected"
            color="primary"
            className={classes.listingCardActionButton}
          />
        </CardActions>
      </Card>
    </>
  );
}

ListingManagerCard.defaultProps = {
  selected: false,
};

ListingManagerCard.propTypes = {
  id: PropTypes.string.isRequired,
  listing: PropTypes.shape({
    crop: PropTypes.string,
    description: PropTypes.string,
    'unit type': PropTypes.string,
    'units per pallet': PropTypes.number,
    'lbs per unit': PropTypes.number,
    'standard price per pallet': PropTypes.number,
    'expiration date': PropTypes.string,
    'first available date': PropTypes.string,
    'date entered': PropTypes.string,
    'available until': PropTypes.string,
    'growing season': PropTypes.string,
    'pallets available': PropTypes.number,
    'pallets pending': PropTypes.number,
    'pallets sold': PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  editRecord: PropTypes.func.isRequired,
};
