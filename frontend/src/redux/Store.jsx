import { persistReducer } from 'redux-persist';
import userReducer from './userSlice/UserSlice';
import propertyOwnerReducer from './userSlice/PropertySlice'
import storage from 'redux-persist/lib/storage';
import {persistStore} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
};

const PersisteUserReducer = persistReducer(persistConfig, userReducer);
const PersistePropertyOwnerReducer = persistReducer(persistConfig, propertyOwnerReducer);

const Store = configureStore({
  reducer: {
    user: PersisteUserReducer,
    owner: PersistePropertyOwnerReducer
  }
});

const persistor = persistStore(Store);

export { Store, persistor };
