import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import IconButton from '@material-ui/core/IconButton';
import EditListingPopup from './EditListingPopup';
import OrangeCat from '../../assets/images/OrangeCat.jpeg';

const useStyles = makeStyles({
  loading: {
    height: '100%',
  },
  listingCard: {
    height: '100%',
    padding: '5px',
    border: '1px solid #F1F2F2',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '425px',
  },
  listingCardPicture: {
    height: '200px',
    objectFit: 'cover',
    width: '100%',
  },
  listingCardContent: {
    backgroundColor: '#ffffff',
    textAlign: 'left',
    borderTop: '2px solid #F1F2F2',
    padding: '1rem .5rem',
  },
  listingCardActionArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '0px',
    backgroundColor: '#ffffff',
  },
  editButton: {
    backgroundColor: '#53AA48',
    color: '#FFFFFF',
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
    borderRadius: '8',
  },
  cardTextInfo: {
    fontFamily: 'Work Sans',
    whiteSpace: 'nowrap',
    color: '#373737',
    fontSize: '.9rem',
  },
  listingCardActionButton: {
    color: '#53AA48',
  },
  checkboxFilled: {
    color: '#53AA48',
  },
  cardTextHeader: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    fontSize: '1.25rem',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: '#373737',
  },
  divider: {
    '&:after': {
      content: '"|"',
      color: '#373737',
      padding: '0 .25rem',
    },
  },
  palletsOutOfStock: {
    color: '#E95F28',
    fontWeight: '500',
  },
  palletsInStock: {
    color: '#3A8531',
    fontWeight: '500',
  },
});

const GreenCheckbox = withStyles({
  root: {
    color: '#53AA48',
    '&$checked': {
      color: '#53AA48',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

// TODO : validation for unit type selection
export default function ListingManagerCard({
  id, listing, onSelect, selected, editRecord, produceRecord, produceTypes,
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
      {produceRecord
        ? (
          <Card className={classes.listingCard}>
            <CardMedia
              className={classes.listingCardPicture}
              src={produceRecord.fields['produce picture'] ? produceRecord.fields['produce picture'][0].url : OrangeCat}
              title="listing-image"
              component="img"
            />
            <CardContent className={classes.listingCardContent}>
              <Typography className={classes.cardTextHeader} variant="h6" component="h4">
                { produceRecord.fields['produce type'] }
              </Typography>
              <Box className={classes.cardText}>
                <Typography
                  className={`${classes.cardTextInfo} ${classes.divider} ${listing['pallets available'] ? classes.palletsInStock : classes.palletsOutOfStock}`}
                  display="inline"
                >
                  { `${listing['pallets available'] || 0} pallets in stock` }
                </Typography>
                <Typography className={classes.cardTextInfo} display="inline">
                  { `$${(listing['standard price per grouped produce type'] * listing['grouped produce type per pallet']).toFixed(2) || '0.00'}/pallet` }
                </Typography>
              </Box>
              <Typography className={classes.cardTextInfo} color="primary">
                {`${listing['pallets pending'] || 0} pallets pending`}
              </Typography>
            </CardContent>
            <CardActions className={classes.listingCardActionArea}>
              <Button size="medium" onClick={handleClickOpen} variant="contained" className={classes.editButton}>
                Edit
              </Button>
              <IconButton>
                { listing.privatized ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon /> }
              </IconButton>
              <GreenCheckbox
                checked={selected || false}
                onChange={() => {
                  onSelect(id, !selected);
                }}
                name="selected"
                className={classes.listingCardActionButton}
              />
              <EditListingPopup
                listing={listing}
                edit
                closeDialog={handleClose}
                isOpen={editActive}
                modifyListings={editRecord}
                produceRecord={produceRecord}
                produceTypes={produceTypes}
              />
            </CardActions>
          </Card>
        )
        : <CircularProgress className={classes.loading} />}
    </>
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
