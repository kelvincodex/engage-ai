import {configureStore, Middleware, ThunkMiddleware, CombinedState} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import localforage from "localforage";
import { rootReducer } from "@/store/module";
import logger from "redux-logger";
import {StoreUtils} from "@/util/helper/StoreUtils.ts";
import {SerializationService} from "@/util/helper/SerializationUtil.ts";
import {Reducer} from "react";

//todo Types
export type RootState = ReturnType<typeof rootReducer>;

//todo LocalForage Configuration
localforage.config({
    driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
    ],
    name: 'engage-ai-portal',
    version: 1.0,
    storeName: 'engage-ai-portal-store',
    description: 'Storage for engage-ai-portal application'
});

//todo Simple persist config - persist everything except explicitly blacklisted items

const persistConfig = SerializationService.createPersistConfig({
    key: "root",
    blacklist: ['table']
})

// const persistConfig = {
//     key: 'root',
//     storage: localforage,
//     version: 1.0,
//     transforms: [StoreUtils.functionSerializer],
//     blacklist: ['table'],
// };


const customMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    // console.log(action);
    return next(action);
};


// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer  as Reducer<{ [key: string]: any }, AnyAction>
);

// Configure Store with serialization handling
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(customMiddleware, thunk as ThunkMiddleware, logger as Middleware),
});

export const persistor = persistStore(store);

//todo Ensure application doesn't render until rehydration is complete
export const waitForRehydration = () => {
    return new Promise((resolve) => {
        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            if (state._persist?.rehydrated) {
                unsubscribe();
                resolve(true);
            }
        });
    });
};

export type AppDispatch = typeof store.dispatch;
export type AnyAction = {
    type: string;
    [extraProps: string]: any;
}