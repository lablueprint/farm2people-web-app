import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useIconStyles = makeStyles({
  root: {
    color: '#F1F2F2',
    display: 'flex',
    height: 32,
    alignItems: 'center',
  },
  active: {
    color: '#53AA48',
  },
  circle: {
    width: 21,
    height: 21,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    border: 'currentColor solid 6px',
    zIndex: 1,
  },
  completed: {
    color: '#F1F2F2',
    fontSize: 18,
    width: 21,
    height: 21,
    borderRadius: '50%',
    backgroundColor: '#53AA48',
    border: '#53AA48 solid 6px',
    zIndex: 1,
  },
});

export default function AddListingStepIcons(props) {
  const classes = useIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed && !active
        ? <Check className={classes.completed} />
        : <div className={classes.circle} />}
    </div>
  );
}

AddListingStepIcons.propTypes = {
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};
