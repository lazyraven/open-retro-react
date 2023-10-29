import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpBxBTcyVw9p8iSeZ2lpWamYJ2l24OECY",
  authDomain: "open-retro-react.firebaseapp.com",
  projectId: "open-retro-react",
  storageBucket: "open-retro-react.appspot.com",
  messagingSenderId: "56358085480",
  appId: "1:56358085480:web:ae9dad8682b737aa9becdd",
  measurementId: "G-6CF6DRXKQ2",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
