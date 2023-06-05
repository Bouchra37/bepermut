// store.js
import { configureStore } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  loggedUserId: null,
};

// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED_USER_ID':
      return {
        ...state,
        loggedUserId: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = configureStore({
  reducer,
});

export default store;
