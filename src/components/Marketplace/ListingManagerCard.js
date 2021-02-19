import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import AddListing from './AddListing';
import placeholder from '../../assets/images/placeholder.png';

const useStyles = makeStyles({
  listingCard: {
    maxWidth: '70%',
  },
  listingCardPicture: {
    height: '100%',
  },
  listingCardContent: {
    backgroundColor: '#C4C4C4',
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
    backgroundColor: '#C4C4C4',
  },
  divider: {
    backgroundColor: 'Gray',
  },
});
export default function ListingManagerCard({
  id, getListing, onSelect, selected,
}) {
  const classes = useStyles();
  const [editActive, setEditActive] = useState(false);
  const listing = getListing(id);
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
            image={placeholder}
            title="banana-placeholder"
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
          <Dialog open={editActive} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle id="form-dialog-title">Edit Listing</DialogTitle>
            <DialogContent>
              <AddListing id={id} listing={listing} edit closeDialog={handleClose} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button form="listing-form" type="submit" color="primary">
                Submit Changes
              </Button>
            </DialogActions>
          </Dialog>
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
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  getListing: PropTypes.func.isRequired,
};