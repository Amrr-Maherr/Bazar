// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBclYwSISWtY7WgL26heidFiuc2hl7FRwg",
  authDomain: "bazar-1c041.firebaseapp.com",
  projectId: "bazar-1c041",
  storageBucket: "bazar-1c041.firebasestorage.app",
  messagingSenderId: "147767307168",
  appId: "1:147767307168:web:2e343d0d4187d92dc752c5",
  measurementId: "G-Y6CWSJSZ3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export the auth and data base functions
export const auth = getAuth(app);
export const db = getFirestore(app);
