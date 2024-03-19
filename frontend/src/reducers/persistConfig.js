import session from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: session,
}

export default persistConfig;
