import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Work Sans',
  },
  heading: {
    fontFamily: 'Work Sans',
    fontWeight: 'bold',
    fontSize: '1.4rem',
    textDecoration: '#53AA48 solid underline 2px',
    textUnderlinePosition: 'under',
    textUnderlineOffset: '0.1rem',
  },
  subheading: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: '1rem',
  },
  text: {
    fontFamily: 'Work Sans',
    fontSize: '1.2rem',
  },
  numberInputField: {
    maxWidth: '3.6em',
    fontFamily: 'Work Sans',
    padding: '0',
    fontSize: '1.2rem',
  },
  labels: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: '1.05rem',
  },
  plainText: {
    fontFamily: 'Work Sans',
    fontSize: '1rem',
    fontWeight: '400',
  },
  infoLabel: {
    fontWeight: 700,
    fontFamily: 'Work Sans',
    fontSize: '1.1rem',
    textDecoration: '#53AA48 solid underline 2px',
    textUnderlinePosition: 'under',
    textUnderlineOffset: '0.1rem',
  },
  numberButton: {
    color: '#53AA48',
  },
  calendarButton: {
    color: '#000000',
  },
  paddingLeft: {
    paddingLeft: '.5rem',
  },
});

function AutoCompleteInputField({
  name, label, val, onChange, options, getLabel,
  placeholder,
}) {
  const classes = useStyles();
  return (
    <Grid container item xs={12} spacing={1}>
      <Grid item xs={12}>
        <Typography className={classes.infoLabel} variant="h2" component="h2">{label}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          autoComplete
          options={options}
          getOptionLabel={getLabel}
          onChange={onChange}
          defaultValue={val}
          renderInput={(params) => (
            <TextField
              name={name}
              {...params}
              placeholder={placeholder}
              variant="outlined"
              required
            />
          )}
          classes={{ input: classes.text }}
        />
      </Grid>
    </Grid>
  );
}

function CurrencyInputField({
  val, onChange, placeholder, label,
}) {
  const classes = useStyles();
  const boldString = (input) => {
    const splitInput = input.split(/(\*\*.*?\*\*)/).filter((word) => (
      word.length > 0
    ));

    return (
      <Box className={classes.paddingLeft}>
        {splitInput.map((word) => (
          <Typography
            display="inline"
            className={word.startsWith('**') && word.endsWith('**')
              ? classes.labels
              : classes.plainText}
            key={word}
          >
            {word.startsWith('**') && word.endsWith('**')
              ? word.slice(2, -2).toUpperCase()
              : word.toUpperCase()}
          </Typography>
        ))}
      </Box>
    );
  };
  return (
    <Grid item container xs={12} spacing={1} alignItems="center">
      <Grid item xs={12}>
        <Typography className={classes.subheading}>{placeholder}</Typography>
      </Grid>
      <CurrencyTextField
        variant="outlined"
        placeholder="0.00"
        currencySymbol="$"
        value={val}
        decimalCharacter="."
        onChange={onChange}
        textAlign="left"
        size="small"
      />
      {boldString(label)}
    </Grid>
  );
}

function MultilineInputField({
  id, name, label, val, onChange, placeholder,
}) {
  const classes = useStyles();
  return (
    <Grid container item xs={12} spacing={1}>
      <Grid item xs={12}>
        <Typography className={classes.infoLabel} variant="h2" component="h2">{label}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          multiline
          rows={3}
          id={id}
          name={name}
          value={val}
          InputProps={{ classes: { input: classes.text } }}
          onChange={onChange}
          className={classes.inputField}
          variant="outlined"
          placeholder={placeholder}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

function NumberInputField({
  id, name, label, val, onChange, onButtonClick, placeholder,
}) {
  const classes = useStyles();
  const boldString = (input) => {
    const splitInput = input.split(/(\*\*.*?\*\*)/).filter((word) => (
      word.length > 0
    ));
    return (
      <Box className={classes.paddingLeft}>
        {
          splitInput.map((word) => (
            <Typography
              display="inline"
              className={word.startsWith('**') && word.endsWith('**')
                ? classes.labels
                : classes.plainText}
              key={`${word}-number`}
            >
              {word.startsWith('**') && word.endsWith('**')
                ? word.slice(2, -2).toUpperCase()
                : word.toUpperCase()}
            </Typography>
          ))
        }
      </Box>
    );
  };
  return (
    <Grid item container xs={12} spacing={1} alignItems="center">
      <Grid item xs={12}>
        <Typography className={classes.subheading}>{placeholder}</Typography>
      </Grid>
      <IconButton className={classes.numberButton} onClick={() => onButtonClick(name, -1)}>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <TextField
        id={id}
        name={name}
        value={val}
        InputProps={{
          classes: { input: classes.text },
          inputProps: {
            style: { textAlign: 'center' },
          },
        }}
        onChange={onChange}
        className={classes.numberInputField}
        variant="outlined"
        size="small"
      />
      <IconButton className={classes.numberButton} onClick={() => onButtonClick(name, 1)}>
        <AddIcon fontSize="small" />
      </IconButton>
      {boldString(label)}
    </Grid>
  );
}

function DateInputField({
  id, name, label, val, onChange, placeholder,
}) {
  const textFieldRef = useRef();
  const classes = useStyles();
  const focusTextField = () => {
    textFieldRef.current.click();
  };
  return (
    <Grid container item xs={12} spacing={1}>
      <Grid item xs={12}>
        <Typography className={classes.subheading} variant="h2" component="h2">{label}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id={id}
          name={name}
          type="date"
          value={val}
          InputProps={{
            classes: { input: classes.text },
          }}
          onChange={onChange}
          className={classes.inputField}
          variant="outlined"
          placeholder={placeholder}
          size="small"
          inputRef={textFieldRef}
        />
        <IconButton className={classes.calendarButton} onClick={focusTextField}>
          <CalendarTodayIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

function DisabledInputField() {
  return <TextField type="hidden" />;
}

export default function ListingInputField({
  id, name, label, type, val, onChange, options, getLabel,
  placeholder, onButtonClick,
}) {
  switch (type) {
    case 'currency':
      return (
        <CurrencyInputField
          val={val}
          onChange={onChange}
          label={label}
          placeholder={placeholder}
        />
      );
    case 'autoComplete':
      return (
        <AutoCompleteInputField
          name={name}
          label={label}
          val={val}
          onChange={onChange}
          options={options}
          getLabel={getLabel}
          placeholder={placeholder}
        />
      );
    case 'multiline':
      return (
        <MultilineInputField
          id={id}
          name={name}
          label={label}
          val={val}
          onChange={onChange}
          placeholder={placeholder}
        />
      );
    case 'number':
      return (
        <NumberInputField
          id={id}
          name={name}
          label={label}
          val={val}
          onChange={onChange}
          onButtonClick={onButtonClick}
          placeholder={placeholder}
        />
      );
    case 'date':
      return (
        <DateInputField
          id={id}
          name={name}
          label={label}
          val={val}
          onChange={onChange}
          placeholder={placeholder}
        />
      );
    default:
      return <DisabledInputField />;
  }
}

CurrencyInputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  val: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

AutoCompleteInputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ])).isRequired,
  getLabel: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

MultilineInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

NumberInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

DateInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

ListingInputField.defaultProps = {
  id: 'outlined-basic',
  type: '',
  options: [],
  placeholder: '',
  label: '',
  onButtonClick: () => { },
  getLabel: (option) => option,
};

ListingInputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({}),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ])),
  getLabel: PropTypes.func,
  placeholder: PropTypes.string,
  onButtonClick: PropTypes.func,
};
