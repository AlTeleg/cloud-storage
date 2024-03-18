import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import persistConfig from './persistConfig.js'; 

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

const persistedReducer = persistReducer(persistConfig, authReducer); 
const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store); 
export default store;