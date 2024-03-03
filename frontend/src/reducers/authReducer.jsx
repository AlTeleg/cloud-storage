import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: authReducer
});

export default store;