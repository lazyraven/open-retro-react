import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const {
  VITE_FIRBASE_API_KEY,
  VITE_FIRBASE_AUTH_DOMAIN,
  VITE_FIRBASE_PROJECT_ID,
  VITE_FIRBASE_STORAGE_BUCKET,
  VITE_FIRBASE_MESSAGING_SENDER_ID,
  VITE_FIRBASE_APP_ID,
  VITE_FIRBASE_MEASUREMENT_ID,
  VITE_FIRBASE_DATABASE_URL,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIRBASE_API_KEY,
  authDomain: VITE_FIRBASE_AUTH_DOMAIN,
  projectId: VITE_FIRBASE_PROJECT_ID,
  storageBucket: VITE_FIRBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIRBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIRBASE_APP_ID,
  measurementId: VITE_FIRBASE_MEASUREMENT_ID,
  databaseURL: VITE_FIRBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

export const rtdb = getDatabase(app);
export const db = getFirestore(app);
