import { configureStore } from '@reduxjs/toolkit';
import createReducer from './rootReducer';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const middlewares = [];

const { logger } = require(`redux-logger`);

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
}


middlewares.push(logger);

const persistedReducer = persistReducer(persistConfig, createReducer())


const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(middlewares),
});

const persistor = persistStore(store);

export { store, persistor };
