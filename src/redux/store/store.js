import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { rootReducer } from "../slices";

const persistConfig = {
    key: 'root', // Changed key to 'root' for better convention
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

// Create a persistor to be used with your app
export const persistor = persistStore(store);
