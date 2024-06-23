import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer as createPersistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({ user: userReducer })

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}
const persistedReducer = createPersistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store)