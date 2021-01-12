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
import MarketplaceInputField from './MarketplaceInputField';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey }).base('appBsavky1VJ0HK23');
const today = new Date().toDateString();
export default function MarketplaceInput() {
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
  const [marketplaceRecord, setMarketplaceRecord] = useState(initialState);
  function resetState() {
    setMarketplaceRecord({ ...initialState });
  }

  function createRecord(e) {
    e.preventDefault();
    const record = {
      fields: marketplaceRecord,
    };
    base('MarketPlace').create([record]).then(resetState);
  }
  function onChangeField(e) {
    const { name, type } = e.target;
    let { value } = e.target;
    if (type === 'number') {
      value = +value;
    }
    setMarketplaceRecord({ ...marketplaceRecord, [name]: value });
  }
  function onChangeCheckbox(e) {
    setMarketplaceRecord({ ...marketplaceRecord, [e.target.name]: e.target.checked });
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
          Marketplace Screen
        </h1>
        <form onSubmit={createRecord}>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={3}>
              <MarketplaceInputField
                label="crop"
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <MarketplaceInputField
                label="description"
                onChange={onChangeField}
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
              <MarketplaceInputField
                id="standard-number"
                label="units per pallet"
                type="number"
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <MarketplaceInputField
                id="standard-number"
                label="lbs per unit"
                type="number"
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <MarketplaceInputField
                id="standard-number"
                label="standard price per unit"
                type="number"
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <MarketplaceInputField
                id="date"
                label="expiration date"
                type="date"
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <MarketplaceInputField
                id="date"
                label="first available date"
                type="date"
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <MarketplaceInputField
                id="date"
                label="available until"
                type="date"
                onChange={onChangeField}
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
              <MarketplaceInputField
                id="standard-number"
                label="units available"
                type="number"
                onChange={onChangeField}
              />
            </Grid>

            <Grid item xs={3}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={marketplaceRecord.distressed}
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
