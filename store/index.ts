import { configureStore, EnhancedStore, Store } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { rootReducer } from "./reducers";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

const setupStore = (context: Context): EnhancedStore => store;

const makeStore: MakeStore<any> = (context: Context) => {
	const isServer = typeof window == "undefined";

	if (isServer) {
		return configureStore({ reducer: rootReducer });
	} else {
		return setupStore(context);
	}
};

export const persistor = persistStore(store);

export const wrapper = createWrapper<Store>(makeStore);
