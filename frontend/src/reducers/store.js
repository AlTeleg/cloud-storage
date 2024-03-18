import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import persistConfig from './persistConfig.js';
import auth from './auth.js'; 


const persistedReducer = persistReducer(persistConfig, auth.reducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer
  }
})

export const persistor = persistStore(store);
export default store;
