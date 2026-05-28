import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: "bazar-3e7a8.firebaseapp.com",
    projectId: "bazar-3e7a8",
    storageBucket: "bazar-3e7a8.appspot.com",
    messagingSenderId: "446014327657",
    appId: "1:446014327657:web:55f947396ed4f4fe018bf8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);