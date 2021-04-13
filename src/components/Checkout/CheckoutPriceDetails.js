import React from 'react';
import { makeStyles, Typography, Divider } from '@material-ui/core';
import CostHelp from './CostHelp';

const useStyles = makeStyles({
  // styles temp copied from Cart Screen just to make it easier to read
  cost: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#373737',
    paddingTop: 10,
    paddingBottom: 10,
  },
  costLabel: {
    fontWeight: '700',
  },
  subtext: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '140%',
    color: '#373737',
  },
  rowContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
  },
});

function CheckoutPriceDetails() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.rowContainer}>
        <Typography className={classes.cost}>
          <span className={classes.costLabel}>Transportation Cost: </span>
          TBD
        </Typography>
        <CostHelp
          description="Transportation costs will apply if you choose you want delivery. There is no cost for pick-up. Some locations do not offer pick-up."
        />
      </div>
      <Divider />
      <div className={classes.rowContainer}>

        <Typography className={classes.cost}>
          <span className={classes.costLabel}>Processing Fees: </span>
          TBD
        </Typography>
        <CostHelp
          description="Processing fees cover the costs of using Farm2People’s service."
        />
      </div>
      <Divider />
      <div className={classes.rowContainer}>
        <Typography className={classes.cost}>
          <span className={classes.costLabel}>Additional Taxes: </span>
          TBD
        </Typography>
        <CostHelp
          description="Additional taxes are applied to applicable items according to your county’s tax."
        />
      </div>
      <Divider />
      <div className={classes.rowContainer}>
        <Typography className={classes.cost}>
          <span className={classes.costLabel}>Administration Fees: </span>
          TBD
        </Typography>
        <CostHelp
          description="Administration fees ..."
        />
      </div>
      <Divider />
      <Typography className={classes.subtext} style={{ paddingTop: 10 }}>
        The agency cost will be TBD.
        F2P will investigate how much money they can save you.
      </Typography>
    </div>
  );
}

export default CheckoutPriceDetails;
