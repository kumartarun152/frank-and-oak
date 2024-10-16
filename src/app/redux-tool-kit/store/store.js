"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import slice from "../features/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  wishList: slice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = () => {
  let store = configureStore({
    reducer: persistedReducer,
  });
  store.persistor = persistStore(store);
  return store;
};
