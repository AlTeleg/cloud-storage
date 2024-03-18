import { configureStore, combineReducers} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import persistConfig from './persistConfig.js';
import auth from './auth.js'; 


const rootReducer = combineReducers({
  auth: auth.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
