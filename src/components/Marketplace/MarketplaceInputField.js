import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import './MarketplaceScreen.css';

export default function MarketplaceInputField({
  id, label, type, onChange,
}) {
  function getInputProps() {
    let InputProps = {};
    let InputLabelProps = {};
    if (type === 'number' && label === 'units per pallet') {
      InputProps = {
        inputProps: {
          min: 1,
          max: 24,
        },
      };
    } else if (type === 'number') {
      InputProps = {
        inputProps: {
          min: 0,
        },
      };
    } else if (type === 'date') {
      InputLabelProps = {
        shrink: true,
      };
    }
    return [InputProps, InputLabelProps];
  }
  const [inputProps, inputLabelProps] = getInputProps({});

  return (
    <>
      <TextField
        required
        id={id}
        label={label}
        name={label}
        type={type}
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
        onChange={onChange}
        className="input-field"
      />
    </>
  );
}

MarketplaceInputField.defaultProps = {
  id: 'standard-basic',
  type: '',
};

MarketplaceInputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
