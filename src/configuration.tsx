import {initializeApp} from "firebase/app";
import {getMessaging, } from "firebase/messaging";
import {getAnalytics} from "@firebase/analytics";

//todo Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

//todo Initialize Firebase
const app = initializeApp(firebaseConfig);

//todo Get messaging instance
export const messaging = getMessaging(app);
export const analytics = getAnalytics(app);