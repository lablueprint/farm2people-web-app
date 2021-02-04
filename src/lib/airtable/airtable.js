import Airtable from '@calblueprint/airlock';

Airtable.configure({
  endpointUrl: 'http://localhost:3000',
  apiKey: 'airlock',
});
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const base = Airtable.base(BASE_ID);

export default base;
