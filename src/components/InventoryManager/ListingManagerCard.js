import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import EditListingPopup from './EditListingPopup';
import OrangeCat from '../../assets/images/OrangeCat.jpeg';

const useStyles = makeStyles({
  listingCard: {
    height: '100%',
  },
  listingCardPicture: {
    width: '100%',
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
  id, listing, onSelect, selected, editRecord, produceTypes,
}) {
  const classes = useStyles();
  const [editActive, setEditActive] = useState(false);
  const handleClickOpen = () => {
    setEditActive(true);
  };
  const handleClose = () => {
    setEditActive(false);
  };

  const produceRecord = produceTypes.find((record) => record.id === listing.produce[0]);

  const url = produceRecord.fields['produce picture'] ? produceRecord.fields['produce picture'][0].url : OrangeCat;
  return (
    <Card className={classes.listingCard}>
      <CardMedia
        className={classes.listingCardPicture}
        image={url}
        title="listing-image"
        component="img"
      />
      <CardContent className={classes.listingCardContent}>
        <Typography variant="h6" component="h4">
          { produceRecord['produce type'] }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          { `${listing['pallets available'] || 0} pallet(s) in stock` }
        </Typography>
        <Typography display="inline">
          { ` | ${listing['standard price per grouped produce type'] || 0}/pallet` }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${listing['pallets pending'] || 0} pallets pending`}
        </Typography>
      </CardContent>
      <CardActions className={classes.listingCardActionArea}>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          Edit
        </Button>
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <EditListingPopup
          listing={listing}
          edit
          closeDialog={handleClose}
          isOpen={editActive}
          modifyListings={editRecord}
          produceRecord={produceRecord}
          produceTypes={produceTypes}
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
  );
}

ListingManagerCard.defaultProps = {
  selected: false,
};

ListingManagerCard.propTypes = {
  id: PropTypes.string.isRequired,
  listing: PropTypes.shape({
    produce: PropTypes.arrayOf(PropTypes.string),
    'growing season': PropTypes.string,
    details: PropTypes.string,
    'individual produce unit': PropTypes.string,
    'individual produce units per grouped produce type': PropTypes.number,
    'grouped produce type': PropTypes.string,
    'lbs per grouped produce type': PropTypes.number,
    'has master units': PropTypes.bool,
    'grouped produce type per master unit': PropTypes.number,
    'master units per pallet': PropTypes.number,
    'grouped produce type per pallet': PropTypes.number,
    'has master pallets': PropTypes.bool,
    'pallets per master pallet': PropTypes.number,
    'standard price per grouped produce type': PropTypes.number,
    'agency price per grouped produce type': PropTypes.number,
    'date entered': PropTypes.string,
    'first available date': PropTypes.string,
    'sell by date': PropTypes.string,
    'available until': PropTypes.string,
    'pallets available': PropTypes.number,
    'pallets pending': PropTypes.number,
    'pallets sold': PropTypes.number,
    privatized: PropTypes.bool,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  editRecord: PropTypes.func.isRequired,
  produceRecord: PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({
      'produce type': PropTypes.string,
      'produce picture': PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
      })),
    }),
  }).isRequired,
  produceTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({}),
  })).isRequired,
};
