import { store } from './store';
import {
  saveUserData,
  deauthenticateAndClearUserData,
} from './userDataSlice';

// Function takes in an ownerId and fetches the latest owner object and all associated user data
const refreshUserData = async (userObj) => {
  store.dispatch(saveUserData(userObj));
};

const clearUserData = () => {
  store.dispatch(deauthenticateAndClearUserData());
  // store.dispatch(clearAnnouncements());
};

export { refreshUserData, clearUserData };
