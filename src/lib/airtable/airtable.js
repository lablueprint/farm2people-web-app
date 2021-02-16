// import Airlock from '@calblueprint/airlock';

// Airlock.configure({
//   endpointUrl: 'http://localhost:3000',
//   apiKey: 'airlock',
// });
// const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
// console.log(BASE_ID);
// const base = Airlock.base(BASE_ID);

import Airtable from '@calblueprint/airlock';

Airtable.configure({
  endpointUrl: 'http://localhost:3000',
  apiKey: 'airlock',
});
const base = Airtable.base('appBsavky1VJ0HK23');

function getUserName() {
  console.log(base);
  return JSON.stringify(base);
}

export { base, getUserName };
