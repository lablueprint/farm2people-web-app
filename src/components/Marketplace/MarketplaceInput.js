import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey }).base('appBsavky1VJ0HK23');

export default function MarketplaceInput() {
  const initialState = {
    crop: '',
    volume: 0,
    description: '',
    'expiration date': '',
    price: 0,
    'non-profit price': 0,
    'discounted price': 0,
    'record number': 0,
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
  return (
    <Container>
      <Grid container spacing={1} justify="center" align="center">
        <h1>
          Marketplace Screen
        </h1>
        <form onSubmit={createRecord}>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={3}>
              <TextField
                required
                id="standard-basic"
                label="crop"
                name="crop"
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="standard-number"
                label="volume"
                name="volume"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="standard-basic"
                label="description"
                name="description"
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="date"
                label="expiration date"
                name="expiration date"
                type="date"
                onChange={onChangeField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="standard-number"
                label="price"
                name="price"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="standard-number"
                label="non-profit price"
                name="non-profit price"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="standard-number"
                label="discounted price"
                name="discounted price"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                onChange={onChangeField}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="standard-number"
                label="record number"
                name="record number"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                onChange={onChangeField}
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
