/**
 * CheckoutTextField
 * TextField with error validation + display through icon + tooltip description
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  FormControl, OutlinedInput, InputAdornment, Tooltip, makeStyles, withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles({
  errorIcon: {
    color: '#FF765D',
  },
});

const ErrorTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Work Sans',
    fontSize: 11,
    color: '#373737',
    boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.15)',
    borderRadius: '4px',
    maxWidth: 120,
  },
  arrow: {
    color: '#FFFFFF',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: '2px',
  },
}))(Tooltip);

// TODO: add styling to text field to fix coloring + font?
function CheckoutTextField({
  placeholder, name, value, onChange, disabled, valid, setValid, validate, type, updateErrorDisplay,
}) {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [edited, setEdited] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // set the error each time the value changes
    setError(validate(name));
    // if the value has changed (it's not the first render) set edited to true
    if (isFirstRender.current) { isFirstRender.current = false; } else { setEdited(true); }
  }, [value]);

  useEffect(() => {
    // when the error changes, update the valid state
    setValid(name, error === '');
  }, [error]);

  useEffect(() => {
    if (updateErrorDisplay === 'reset') { setEdited(false); }
    if (updateErrorDisplay === 'show') { setEdited(true); }
    console.log(updateErrorDisplay);
  }, [updateErrorDisplay]);

  return (
    <FormControl
      error={!valid && edited && !disabled}
      fullWidth
      disabled={disabled}
    >
      <OutlinedInput
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        margin="dense"
        endAdornment={(!valid && edited && !disabled) && (
        <InputAdornment position="end">
          <ErrorTooltip title={error} arrow>
            <ErrorIcon className={classes.errorIcon} fontSize="small" />
          </ErrorTooltip>
        </InputAdornment>
        )}
      />
    </FormControl>
  );
}

CheckoutTextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  validate: PropTypes.func,
  setValid: PropTypes.func,
  updateErrorDisplay: PropTypes.string,
};

CheckoutTextField.defaultProps = {
  placeholder: '',
  name: '',
  type: 'text',
  disabled: false,
  valid: true,
  validate: () => '',
  setValid: () => '',
  updateErrorDisplay: '',
};

export default CheckoutTextField;
