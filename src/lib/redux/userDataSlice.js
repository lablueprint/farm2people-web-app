/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// This is a slice created using the Redux Toolkits.
// It sets up both the reducers and actions for a particular slice of the redux store
//
// The user data slice stores all authentication and user information

const initialState = {
  authenticated: false,
  isLoading: false,
  authKey: null,
  owner: null,
  userData: null,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setLoadingForUserData(state, action) {
      state.isLoading = true;
    },
    saveUserData(state, action) {
      const userObj = action.payload;
      state.userData = userObj;
      state.authenticated = true;
    },

    deauthenticateAndClearUserData() {
      return { ...initialState };
    },
  },
});

export const {
  setLoadingForUserData,
  saveUserData,
  deauthenticateAndClearUserData,
} = userDataSlice.actions;
export default userDataSlice.reducer;
