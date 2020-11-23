import React, { useEffect } from 'react';
import Airtable from 'airtable';

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

function App() {
  useEffect(() => {
    base('Farms')
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        fetchNextPage();
      });
  }, []);
  return (
    <div>
      <p>
        Farm2People
      </p>
    </div>
  );
}

export default App;
