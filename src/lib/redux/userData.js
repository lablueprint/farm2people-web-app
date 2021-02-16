import { store } from './store';
import {
  saveUserData,
  deauthenticateAndClearUserData,
} from './userDataSlice';

const refreshUserData = async (userObj) => {
  store.dispatch(saveUserData(userObj));
};

const clearUserData = () => {
  store.dispatch(deauthenticateAndClearUserData());
};

export { refreshUserData, clearUserData };
