import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  inputField: {
    width: '100%',
    height: '100%',
  },
});

export default function ListingInputField({
  id, name, label, type, val, onChange, multiline,
}) {
  const classes = useStyles();
  function getInputProps() {
    let InputProps = {};
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
    }
    return InputProps;
  }
  const inputProps = getInputProps({});
  if (multiline) {
    return (
      <>
        <Typography variant="h6" component="h6">{label}</Typography>
        <TextField
          required
          multiline
          rows={3}
          id={id}
          name={name}
          type={type}
          value={val}
          InputProps={inputProps}
          onChange={onChange}
          className={classes.inputField}
          variant="outlined"
        />
      </>
    );
  }
  return (
    <>
      <Typography variant="h6" component="h6">{label}</Typography>
      <TextField
        required
        id={id}
        name={name}
        type={type}
        value={val}
        InputProps={inputProps}
        onChange={onChange}
        className={classes.inputField}
        variant="outlined"
      />
    </>
  );
}

ListingInputField.defaultProps = {
  id: 'outlined-basic',
  type: '',
  multiline: false,
};

ListingInputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
};
