/**
 * Cost Help Component
 * Displays a tooltip with information about a cost or fee
 */

import React from 'react';
import { makeStyles, withStyles, Tooltip } from '@material-ui/core';
import Help from '@material-ui/icons/HelpOutline';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  helpIcon: {
    color: 'rgba(55, 55, 55, 0.8)',
  },
});

const HelpTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#F1F2F2',
    fontFamily: 'Work Sans',
    fontSize: 11,
    color: '#373737',
  },
}))(Tooltip);

function CostHelp({ description }) {
  const classes = useStyles();
  return (
    <HelpTooltip
      title={description}
      placement="left"
    >
      <Help className={classes.helpIcon} fontSize="small" />
    </HelpTooltip>
  );
}

CostHelp.propTypes = {
  description: PropTypes.string,
};

CostHelp.defaultProps = {
  description: 'unfinished',
};

export default CostHelp;
