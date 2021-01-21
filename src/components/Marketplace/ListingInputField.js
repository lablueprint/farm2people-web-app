import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import './AddListing.css';

export default function ListingInputField({
  id, label, type, val, onChange,
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
        value={val}
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
        onChange={onChange}
        className="input-field"
      />
    </>
  );
}

ListingInputField.defaultProps = {
  id: 'standard-basic',
  type: '',
};

ListingInputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  val: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
