/* eslint-disable */ 
/* eslint no-restricted-imports: 0 */
/* eslint no-restricted-imports: 0 */
/* eslint-disable no-unused-vars */

/*
  THIS IS A GENERATED FILE
  Changes might be overwritten in the future, edit with caution!

  Wrapper functions around functions in airtable.js that interact with Airtable, designed
  to provide basic functionality

  If you're adding a new function: make sure you add a corresponding test (at least 1) for it in request.spec.js

*/

import { Tables, Columns } from './schema';
import {
  createRecord,
  createRecords,
  updateRecord,
  updateRecords,
  getAllRecords,
  getRecordsByAttribute,
  getRecordById,
  deleteRecord,
} from './airtable';

/*
 ******* CREATE RECORDS *******
 */

export const createUser = async (record) => {
  return createRecord(Tables.Users, record);
};

export const createManyUsers = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Users, subset));
  }
  return Promise.all(createPromises);
};

export const createFarm = async (record) => {
  return createRecord(Tables.Farms, record);
};

export const createManyFarms = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Farms, subset));
  }
  return Promise.all(createPromises);
};

export const createAgencie = async (record) => {
  return createRecord(Tables.Agencies, record);
};

export const createManyAgencies = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Agencies, subset));
  }
  return Promise.all(createPromises);
};

export const createQuote = async (record) => {
  return createRecord(Tables.Quotes, record);
};

export const createManyQuotes = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Quotes, subset));
  }
  return Promise.all(createPromises);
};

export const createCheckoutProfile = async (record) => {
  return createRecord(Tables.CheckoutProfiles, record);
};

export const createManyCheckoutProfiles = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.CheckoutProfiles, subset));
  }
  return Promise.all(createPromises);
};

export const createNotification = async (record) => {
  return createRecord(Tables.Notifications, record);
};

export const createManyNotifications = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Notifications, subset));
  }
  return Promise.all(createPromises);
};

export const createEmail = async (record) => {
  return createRecord(Tables.Email, record);
};

export const createManyEmails = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Email, subset));
  }
  return Promise.all(createPromises);
};

export const createReservedListing = async (record) => {
  return createRecord(Tables.ReservedListings, record);
};

export const createManyReservedListings = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.ReservedListings, subset));
  }
  return Promise.all(createPromises);
};

export const createListing = async (record) => {
  return createRecord(Tables.Listings, record);
};

export const createManyListings = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Listings, subset));
  }
  return Promise.all(createPromises);
};

export const createListingUPDATED = async (record) => {
  return createRecord(Tables.ListingUPDATED, record);
};

export const createManyListingUPDATEDs = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.ListingUPDATED, subset));
  }
  return Promise.all(createPromises);
};

export const createProduceType = async (record) => {
  return createRecord(Tables.ProduceType, record);
};

export const createManyProduceTypes = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.ProduceType, subset));
  }
  return Promise.all(createPromises);
};

/*
 ******* READ RECORDS *******
 */

export const getUserById = async (id) => {
  return getRecordById(Tables.Users, id);
};

export const getUsersByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Users, formula, sort);
};

export const getAllUsers = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Users, filterByFormula, sort);
};

export const getFarmById = async (id) => {
  return getRecordById(Tables.Farms, id);
};

export const getFarmsByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Farms, formula, sort);
};

export const getAllFarms = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Farms, filterByFormula, sort);
};

export const getAgencieById = async (id) => {
  return getRecordById(Tables.Agencies, id);
};

export const getAgenciesByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Agencies, formula, sort);
};

export const getAllAgencies = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Agencies, filterByFormula, sort);
};

export const getQuoteById = async (id) => {
  return getRecordById(Tables.Quotes, id);
};

export const getQuotesByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Quotes, formula, sort);
};

export const getAllQuotes = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Quotes, filterByFormula, sort);
};

export const getCheckoutProfileById = async (id) => {
  return getRecordById(Tables.CheckoutProfiles, id);
};

export const getCheckoutProfilesByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.CheckoutProfiles, formula, sort);
};

export const getAllCheckoutProfiles = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.CheckoutProfiles, filterByFormula, sort);
};

export const getNotificationById = async (id) => {
  return getRecordById(Tables.Notifications, id);
};

export const getNotificationsByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Notifications, formula, sort);
};

export const getAllNotifications = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Notifications, filterByFormula, sort);
};

export const getEmailById = async (id) => {
  return getRecordById(Tables.Email, id);
};

export const getEmailsByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Email, formula, sort);
};

export const getAllEmails = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Email, filterByFormula, sort);
};

export const getReservedListingById = async (id) => {
  return getRecordById(Tables.ReservedListings, id);
};

export const getReservedListingsByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.ReservedListings, formula, sort);
};

export const getAllReservedListings = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.ReservedListings, filterByFormula, sort);
};

export const getListingById = async (id) => {
  return getRecordById(Tables.Listings, id);
};

export const getListingsByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Listings, formula, sort);
};

export const getAllListings = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Listings, filterByFormula, sort);
};

export const getListingUPDATEDById = async (id) => {
  return getRecordById(Tables.ListingUPDATED, id);
};

export const getListingUPDATEDsByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.ListingUPDATED, formula, sort);
};

export const getAllListingUPDATEDs = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.ListingUPDATED, filterByFormula, sort);
};

export const getProduceTypeById = async (id) => {
  return getRecordById(Tables.ProduceType, id);
};

export const getProduceTypesByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} RECORD_ID()='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.ProduceType, formula, sort);
};

export const getAllProduceTypes = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.ProduceType, filterByFormula, sort);
};

/*
 ******* UPDATE RECORDS *******
 */

export const updateUser = async (id, recordUpdates) => {
  return updateRecord(Tables.Users, id, recordUpdates);
};

export const updateManyUsers = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Users, subset));
  }
  return Promise.all(updatePromises);
};

export const updateFarm = async (id, recordUpdates) => {
  return updateRecord(Tables.Farms, id, recordUpdates);
};

export const updateManyFarms = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Farms, subset));
  }
  return Promise.all(updatePromises);
};

export const updateAgencie = async (id, recordUpdates) => {
  return updateRecord(Tables.Agencies, id, recordUpdates);
};

export const updateManyAgencies = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Agencies, subset));
  }
  return Promise.all(updatePromises);
};

export const updateQuote = async (id, recordUpdates) => {
  return updateRecord(Tables.Quotes, id, recordUpdates);
};

export const updateManyQuotes = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Quotes, subset));
  }
  return Promise.all(updatePromises);
};

export const updateCheckoutProfile = async (id, recordUpdates) => {
  return updateRecord(Tables.CheckoutProfiles, id, recordUpdates);
};

export const updateManyCheckoutProfiles = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.CheckoutProfiles, subset));
  }
  return Promise.all(updatePromises);
};

export const updateNotification = async (id, recordUpdates) => {
  return updateRecord(Tables.Notifications, id, recordUpdates);
};

export const updateManyNotifications = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Notifications, subset));
  }
  return Promise.all(updatePromises);
};

export const updateEmail = async (id, recordUpdates) => {
  return updateRecord(Tables.Email, id, recordUpdates);
};

export const updateManyEmails = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Email, subset));
  }
  return Promise.all(updatePromises);
};

export const updateReservedListing = async (id, recordUpdates) => {
  return updateRecord(Tables.ReservedListings, id, recordUpdates);
};

export const updateManyReservedListings = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.ReservedListings, subset));
  }
  return Promise.all(updatePromises);
};

export const updateListing = async (id, recordUpdates) => {
  return updateRecord(Tables.Listings, id, recordUpdates);
};

export const updateManyListings = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Listings, subset));
  }
  return Promise.all(updatePromises);
};

export const updateListingUPDATED = async (id, recordUpdates) => {
  return updateRecord(Tables.ListingUPDATED, id, recordUpdates);
};

export const updateManyListingUPDATEDs = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.ListingUPDATED, subset));
  }
  return Promise.all(updatePromises);
};

export const updateProduceType = async (id, recordUpdates) => {
  return updateRecord(Tables.ProduceType, id, recordUpdates);
};

export const updateManyProduceTypes = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.ProduceType, subset));
  }
  return Promise.all(updatePromises);
};

/*
 ******* DELETE RECORDS *******
 */

export const deleteUser = async (id) => {
  return deleteRecord(Tables.Users, id);
};
export const deleteFarm = async (id) => {
  return deleteRecord(Tables.Farms, id);
};
export const deleteAgencie = async (id) => {
  return deleteRecord(Tables.Agencies, id);
};
export const deleteQuote = async (id) => {
  return deleteRecord(Tables.Quotes, id);
};
export const deleteCheckoutProfile = async (id) => {
  return deleteRecord(Tables.CheckoutProfiles, id);
};
export const deleteNotification = async (id) => {
  return deleteRecord(Tables.Notifications, id);
};
export const deleteEmail = async (id) => {
  return deleteRecord(Tables.Email, id);
};
export const deleteReservedListing = async (id) => {
  return deleteRecord(Tables.ReservedListings, id);
};
export const deleteListing = async (id) => {
  return deleteRecord(Tables.Listings, id);
};
export const deleteListingUPDATED = async (id) => {
  return deleteRecord(Tables.ListingUPDATED, id);
};
export const deleteProduceType = async (id) => {
  return deleteRecord(Tables.ProduceType, id);
};
