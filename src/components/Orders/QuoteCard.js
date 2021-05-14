import React, { useState } from 'react';
import {
  Card, Collapse, Grid, IconButton, Typography, Box, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import '../../styles/fonts.css';
import cabbageDog from '../../assets/images/cabbagedog.png';
import CostHelp from './CostHelp';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  centeredHorizontalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '40px',
    paddingTop: '2%',
    paddingBottom: '5%',
  },
  horizontalContainer: {
    display: 'flex',
  },
  verticalCenter: {
    alignItems: 'center',
  },
  horizontalReverseContainer: {
    alignItems: 'center',
    paddingTop: '2%',
    paddingBottom: '2%',
    display: 'flex',
    flexDirection: 'row-reverse',
    marginRight: '4.7%',
  },
  horizontalContainerAlignBottom: {
    alignItems: 'flex-end',
  },
  horizontalAlignRight: {
    float: 'right',
    paddingRight: '4.7%',
  },

  cardContainer: { // Overall card container
    marginBottom: '2%',
    marginLeft: '10%',
    marginRight: '10%',
    background: '#FFFFFF',
    borderWidth: '0px',
    borderColor: '#2D5496',
    borderRadius: '20px',
    fontFamily: 'Work Sans',
  },
  listingInfoContainer: {
    paddingLeft: '4%',
  },
  collapsedBorder: {
    border: '1px solid #C4C4C4',
    borderLeftWidth: '18px',
    borderLeftColor: '#2D5496',
  },
  expandedBorder: { // Border if card is expanded
    filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.12))',
    borderTopWidth: '20px',
  },
  expandedHeaderContainer: {
    color: '#373737',
    fontFamily: 'Work Sans',
    marginTop: '3%',
    paddingLeft: '66px',
    paddingRight: '20px',
  },
  pricingBreakdownContainer: {
    paddingTop: '2%',
    paddingBottom: '2%',
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '2px solid #F1F2F2',
    marginRight: '4.7%',
  },

  headerContainer: {
    color: '#373737',
    fontFamily: 'Work Sans',
    marginTop: '3%',
    paddingBottom: '3%',
    paddingLeft: '50px',
    paddingRight: '20px',
  },
  boldText: {
    fontWeight: 'bold',
  },
  basicText: {
    fontFamily: 'Work Sans',
    fontSize: '16px',
    color: '#414042',
  },
  dateText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontSize: '20px',
    fontWeight: 600,
    color: '#414042',
  },
  orderText: {
    fontFamily: 'Work Sans',
    fontWeight: '500',
    fontSize: '16px',
    color: '#414042',
  },
  costText: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  boldedTableTitleText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#373737',
  },
  produceText: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '23px',
    color: '#373737',
  },
  unitsPerPalletText: {
    fontFamily: 'Work Sans',
    fontWeight: 600,
    fontSize: '18px',
    color: '#373737',
  },
  unitTypeText: {
    fontFamily: 'Work Sans',
    fontSize: '18px',
    color: '#373737',
  },
  pricingText: {
    fontFamily: 'Work Sans',
    fontSize: '18px',
    color: '#373737',
  },
  greyPricingText: {
    fontWeight: 'bold',
    fontFamily: 'Work Sans',
    fontSize: '20px',
    color: 'rgba(55, 55, 55, 0.8)',
  },
  palletsText: {
    fontFamily: 'Work Sans',
    fontSize: '12px',
    color: '#373737',
    fontWeight: 'bold',
  },
  feeInformationText: {
    fontFamily: 'Work Sans',
    fontSize: '16px;',
    color: '#414042',
  },
  discountReasonText: {
    paddingLeft: '3%',
    maxWidth: 650,
  },
  cancelText: {
    fontFamily: 'Work Sans',
    fontSize: '18px',
    color: '#373737',
    fontWeight: 'bold',
  },
  finalTotalText: {
    fontFamily: 'Work Sans',
    fontSize: '23px',
    color: '#373737',
  },
  finalPricingText: {
    fontWeight: 'bold',
    fontFamily: 'Work Sans',
    fontSize: '28px',
    color: '#373737',
  },
  greenUnderline: {
    textDecoration: 'underline',
    textDecorationLine: 'underline',
    textUnderlineOffset: '3px',
    textDecorationThickness: '3px',
    textDecorationColor: '#53AA48',
  },
  orangeUnderline: {
    textDecoration: 'underline',
    textDecorationLine: 'underline',
    textUnderlineOffset: '3px',
    textDecorationThickness: '3px',
    textDecorationColor: '#FF765D',
  },
  pinkUnderline: {
    textDecoration: 'underline',
    textDecorationLine: 'underline',
    textUnderlineOffset: '3px',
    textDecorationThickness: '3px',
    textDecorationColor: '#FFB1D8',
  },
  blueUnderline: {
    textDecoration: 'underline',
    textDecorationLine: 'underline',
    textUnderlineOffset: '3px',
    textDecorationThickness: '3px',
    textDecorationColor: '#2D5496',
  },
  clockIcon: {
    color: '#2D5496',
  },
  checkIcon: {
    color: '#53AA48',
  },
  xIcon: {
    color: '#FF765D',
  },
  listingImg: {
    height: '77px',
    width: '77px',
    objectFit: 'cover',
  },
  approveButtonGreen: {
    background: '#53AA48',
    borderRadius: '6px',
    width: '100px',
    '&:hover': {
      background: '#606060',
    },
  },
});

export default function QuoteCard(props) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    dateRequested, orderID, daysRemaining, totalCost, isReceived, isApproved, estimatedArrival,
    transferLocation, costMapping,
  } = props;
  const feesDictionary = {
    transportation:
    {
      title: 'Transportation Fee',
      helpDescription: 'Transportation costs are generated based on producer and delivery locations, as well as purchasing quantity.  Purchaser pick-up is no cost, however some locations may not have pick-up option availability.',
      receivedQuoteComponents:
  <div>
    <Typography className={`${classes.feeInformationText} ${classes.boldText}`}>
      Delivery
    </Typography>
    <Typography className={classes.feeInformationText}>
      Estimated Arrival:&nbsp;
      <Box fontWeight="fontWeightBold" display="inline">
        {estimatedArrival}
      </Box>
    </Typography>
    <Typography className={classes.feeInformationText}>
      Pickup/Delivery Location:
      {' '}
      {transferLocation}
    </Typography>
  </div>,
    },
    processing:
    {
      title: 'Processing Fees',
      helpDescription: 'This contribution allows us to operate and maintain the Farm2People platform. Thank you!',
      receivedQuoteComponents:
  <Typography className={classes.feeInformationText}>
    Farm2People Service Fee
  </Typography>,
    },
    taxes:
    {
      title: 'Additional Taxes',
      helpDescription: 'Taxes may be applied dependent on state and county regulations.',
      receivedQuoteComponents:
  <Typography className={classes.feeInformationText}>
    Location Specific Tax
  </Typography>,
    },
    discount: {
      title: 'Farm2People Discount',
      helpDescription: 'Farm2People can apply discretionary discounts to support the farms and agencies on the Farm2People platform. To request financial assistance from Farm2People, please contact us.',
      receivedQuoteComponents:
  <div>
    <Typography className={classes.feeInformationText}>
      Reason for discount
    </Typography>
    <Typography className={`${classes.feeInformationText} ${classes.discountReasonText}`}>
      Farm2People standard discount, carrots will be taken off the marketplace soon
      Additional agency price reduction
      - L.J.
    </Typography>
  </div>,
    },
  };
  return (
    <Card
      className={[
        classes.cardContainer,
        isExpanded ? classes.expandedBorder : classes.collapsedBorder,
      ]}
      variant="outlined"
    >
      {/* Header/non-collapsed card contains farm name, expand/collapse icon, tags for op type */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={isExpanded ? classes.expandedHeaderContainer : classes.headerContainer}
      >
        {/* Contains title (farm name) and subtitle (location) */}
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography className={classes.dateText}>{dateRequested}</Typography>
              <div className={classes.horizontalContainer}>
                <Typography className={classes.orderText}>
                  ORDER ID:
                  {' '}
                  {orderID}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.horizontalContainer}>
                <QueryBuilderIcon className={classes.clockIcon} />
                <Typography className={classes.basicText}>
                  &nbsp;
                  {daysRemaining}
                  {' '}
                  days to respond
                </Typography>
              </div>
            </Grid>
            {(isReceived === false) && (
              <Grid item xs={3}>
                <div className={classes.horizontalContainer}>
                  <ClearIcon className={classes.xIcon} />
                  <Typography className={classes.basicText}>&nbsp;Quote Pending</Typography>
                </div>
                <div className={classes.horizontalContainer}>
                  <ClearIcon className={classes.xIcon} />
                  <Typography className={classes.basicText}>
                    &nbsp;Pending Approval
                  </Typography>
                </div>
              </Grid>
            )}
            {(isReceived === true && isApproved === false) && (
              <Grid item xs={3}>
                <div className={classes.horizontalContainer}>
                  <DoneIcon className={classes.checkIcon} />
                  <Typography className={classes.basicText}>&nbsp;Received Quote</Typography>
                </div>
                <div className={classes.horizontalContainer}>
                  <ClearIcon className={classes.xIcon} />
                  <Typography className={classes.basicText}>
                    &nbsp;Awaiting your approval
                  </Typography>
                </div>
              </Grid>
            )}
            <Grid item xs={3}>
              <Typography className={classes.basicText}>Total</Typography>
              <Typography className={classes.costText}>
                {isReceived
                  ? `$${parseFloat(totalCost).toFixed(2)}`
                  : 'Pending'}
              </Typography>
            </Grid>
          </Grid>

        </div>
        <IconButton
          className={classes.iconColour}
          // On icon click, collapse or expand the card
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded && <ExpandMoreIcon />}
          {isExpanded && <ExpandLessIcon />}
        </IconButton>
      </Grid>

      {/* If uncollapsed, shows description and additional tags */}
      <Collapse in={isExpanded} timout="auto" unmountOnExit>
        {/* Contains expanded view */}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={isExpanded ? classes.expandedHeaderContainer : classes.headerContainer}
        >
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography
                  className={`${classes.boldedTableTitleText} ${classes.greenUnderline}`}
                >
                  Item
                </Typography>
              </Grid>
              <Grid align="center" item xs={2}>
                <Typography
                  className={`${classes.boldedTableTitleText} ${classes.orangeUnderline}`}
                >
                  Price
                </Typography>
              </Grid>
              <Grid align="center" item xs={2}>
                <Typography
                  className={`${classes.boldedTableTitleText} ${classes.pinkUnderline}`}
                >
                  Quantity
                </Typography>
              </Grid>
              <Grid align="center" item xs={2}>
                <Typography
                  className={`${classes.boldedTableTitleText} ${classes.blueUnderline}`}
                >
                  Total
                </Typography>
              </Grid>
            </Grid>

            {/* Include a mapping that tranposes each element
            from an array to become a listing row */}
            {Object.entries(feesDictionary).map(() => (
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div className={classes.horizontalContainer}>
                    <img className={classes.listingImg} src={cabbageDog} alt="" />
                    <div className={classes.listingInfoContainer}>
                      <Typography className={classes.produceText}>
                        Carrots
                      </Typography>
                      <div className={`${classes.horizontalContainer} ${classes.horizontalContainerAlignBottom}`}>
                        <Typography className={classes.unitsPerPalletText}>
                          5 bags/pallet&nbsp;&nbsp;
                        </Typography>
                        <Typography className={classes.basicText}>Unit type: bags</Typography>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid align="center" item xs={2}>
                  <Typography className={classes.pricingText}>$20</Typography>
                </Grid>
                <Grid align="center" item xs={2}>
                  <Typography className={`${classes.pricingText} ${classes.boldText}`}>30</Typography>
                  <Typography className={classes.palletsText}>pallets</Typography>
                </Grid>
                <Grid align="center" item xs={2}>
                  <Typography className={classes.pricingText}>$1030</Typography>
                </Grid>
              </Grid>
            ))}

            <div className={classes.horizontalReverseContainer}>
              <Typography className={`${classes.greyPricingText} ${classes.pinkUnderline}`}>
                $
                {parseFloat(300).toFixed(2)}
              </Typography>
              <Typography className={classes.pricingText}>SUBTOTAL:&nbsp;&nbsp;&nbsp;</Typography>
            </div>
            {Object.entries(feesDictionary).map(([key, value]) => (
              <div className={classes.pricingBreakdownContainer}>
                <div>
                  <div className={`${classes.horizontalContainer} ${classes.verticalCenter}`}>
                    <Typography className={classes.boldedTableTitleText}>
                      {value.title}
                    &nbsp;
                    </Typography>
                    <CostHelp description={value.helpDescription} />
                  </div>
                  {isReceived && value.receivedQuoteComponents}
                </div>
                <div className={classes.horizontalContainer}>
                  <Typography className={classes.pricingText}>
                    {key.toUpperCase()}
                    :&nbsp;&nbsp;&nbsp;
                  </Typography>
                  <Typography className={isReceived ? `${classes.pricingText} ${classes.boldText} ${classes.pinkUnderline}` : `${classes.pricingText} ${classes.boldText}`}>
                    {isReceived ? `$${parseFloat(costMapping[key]).toFixed(2)}` : 'TBD'}
                  </Typography>
                </div>
              </div>
            ))}
            {isReceived && (
            <div className={classes.horizontalReverseContainer}>
              <Typography className={`${classes.finalPricingText} ${classes.greenUnderline}`}>
                $
                {parseFloat(totalCost).toFixed(2)}
              </Typography>
              <Typography className={classes.finalTotalText}>
                ORDER TOTAL:&nbsp;&nbsp;&nbsp;
              </Typography>
            </div>
            )}
          </div>
        </Grid>
        {isReceived && (
        <div className={classes.centeredHorizontalContainer}>
          <Typography
            align="center"
            className={classes.cancelText}
          >
            Cancel Order
          </Typography>
          <Button
            className={classes.approveButtonGreen}
            variant="contained"
            color="primary"
            type="button"
          >
            Approve
          </Button>
        </div>
        )}
      </Collapse>
    </Card>
  );
}

QuoteCard.propTypes = {
  dateRequested: PropTypes.string.isRequired,
  transferLocation: PropTypes.number.isRequired,
  daysRemaining: PropTypes.number.isRequired,
  costMapping: PropTypes.shape({
    key: PropTypes.number,
    transportation: PropTypes.number,
    processing: PropTypes.number,
    taxes: PropTypes.number,
    discount: PropTypes.number,
  }).isRequired,
  totalCost: PropTypes.number.isRequired,
  orderID: PropTypes.number.isRequired,
  estimatedArrival: PropTypes.string.isRequired,
  isReceived: PropTypes.bool.isRequired,
  isApproved: PropTypes.bool.isRequired,
};
