/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  isLoading: false,
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
