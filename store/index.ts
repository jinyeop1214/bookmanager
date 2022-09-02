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
import reducer from "./reducers";
import storage from "./storage";

const persistConfig = {
	key: "root",
	version: 1,
	storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

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
	devTools: process.env.NODE_ENV !== "production",
});

const setupStore = (context: Context): EnhancedStore => store;

const makeStore: MakeStore<any> = (context: Context) => setupStore(context);

export const persistor = persistStore(store);

export const wrapper = createWrapper<Store>(makeStore);
