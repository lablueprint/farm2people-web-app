import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListingInputField from './ListingInputField';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);
const today = new Date().toDateString();
export default function AddListing() {
  const initialState = {
    crop: '',
    description: '',
    'unit type': '',
    'units per pallet': 0,
    'lbs per unit': 0.0,
    'standard price per unit': 0.0,
    'expiration date': '',
    'first available date': '',
    'date entered': today,
    'available until': '',
    'growing season': '',
    'units available': 0,
    'units pending': 0,
    'units sold': 0,
    distressed: false,
  };
  const [ListingRecord, setListingRecord] = useState(initialState);
  function resetState() {
    setListingRecord({ ...initialState });
  }

  function createRecord(e) {
    e.preventDefault();
    const record = {
      fields: ListingRecord,
    };
    base('Listings').create([record]).then(resetState);
  }
  function onChangeField(e) {
    const { name, type } = e.target;
    let { value } = e.target;
    if (type === 'number') {
      value = +value;
    }
    setListingRecord({ ...ListingRecord, [name]: value });
  }
  function onChangeCheckbox(e) {
    setListingRecord({ ...ListingRecord, [e.target.name]: e.target.checked });
  }

  const UnitTypes = [
    {
      value: 'box',
      label: 'Box',
    },
    {
      value: 'case',
      label: 'Case',
    },
    {
      value: 'bag',
      label: 'Bag',
    },
    {
      value: 'pallet',
      label: 'Pallet',
    },
  ];

  const Seasons = [
    {
      value: 'Summer',
      label: 'Summer',
    },
    {
      value: 'Winter',
      label: 'Winter',
    },
    {
      value: 'Fall',
      label: 'Fall',
    },
    {
      value: 'Spring',
      label: 'Spring',
    },
  ];

  return (
    <Container>
      <Grid container spacing={1} justify="center" align="center">
        <h1>
          Listings Screen
        </h1>
        <form onSubmit={createRecord}>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={3}>
              <ListingInputField
                label="crop"
                onChange={onChangeField}
                val={ListingRecord.crop}
              />
            </Grid>
            <Grid item xs={3}>
              <ListingInputField
                label="description"
                onChange={onChangeField}
                val={ListingRecord.description}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl required className="input-field">
                <InputLabel id="unit-type-label">Unit Type</InputLabel>
                <Select
                  label="unit type"
                  name="unit type"
                  onChange={onChangeField}
                  defaultValue=""
                  value={ListingRecord['unit type']}
                >
                  {UnitTypes.map((name) => (
                    <MenuItem value={name.value}>
                      {name.label}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <ListingInputField
                id="standard-number"
                label="units per pallet"
                type="number"
                onChange={onChangeField}
                val={ListingRecord['units per pallet']}
              />
            </Grid>
            <Grid item xs={3}>
              <ListingInputField
                id="standard-number"
                label="lbs per unit"
                type="number"
                onChange={onChangeField}
                val={ListingRecord['lbs per unit']}
              />
            </Grid>
            <Grid item xs={3}>
              <ListingInputField
                id="standard-number"
                label="standard price per unit"
                type="number"
                onChange={onChangeField}
                val={ListingRecord['standard price per unit']}
              />
            </Grid>
            <Grid item xs={3}>
              <ListingInputField
                id="date"
                label="expiration date"
                type="date"
                onChange={onChangeField}
                val={ListingRecord['expiration date']}
              />
            </Grid>
            <Grid item xs={3}>
              <ListingInputField
                id="date"
                label="first available date"
                type="date"
                onChange={onChangeField}
                val={ListingRecord['first available date']}
              />
            </Grid>
            <Grid item xs={3}>
              <ListingInputField
                id="date"
                label="available until"
                type="date"
                onChange={onChangeField}
                val={ListingRecord['available until']}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl required className="input-field">
                <InputLabel id="unit-type-label">Growing Season</InputLabel>
                <Select
                  label="unit type"
                  name="growing season"
                  onChange={onChangeField}
                  defaultValue=""
                  value={ListingRecord['growing season']}
                >
                  {Seasons.map((name) => (
                    <MenuItem value={name.value}>
                      {name.label}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <ListingInputField
                id="standard-number"
                label="units available"
                type="number"
                onChange={onChangeField}
                val={ListingRecord['units available']}
              />
            </Grid>

            <Grid item xs={3}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={ListingRecord.distressed}
                    onChange={onChangeCheckbox}
                    name="distressed"
                    color="primary"
                  />
                  )}
                label="Distressed"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
              >
                List my item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}
