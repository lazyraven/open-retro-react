import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyCpBxBTcyVw9p8iSeZ2lpWamYJ2l24OECY",
//   authDomain: "open-retro-react.firebaseapp.com",
//   projectId: "open-retro-react",
//   storageBucket: "open-retro-react.appspot.com",
//   messagingSenderId: "56358085480",
//   appId: "1:56358085480:web:ae9dad8682b737aa9becdd",
//   measurementId: "G-6CF6DRXKQ2",
//   databaseURL: "https://open-retro-react-default-rtdb.firebaseio.com/",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDvZaTTMXEk__YWK1ATkOhG2CIj6dEpZ5E",
  authDomain: "openretro-prod-58918.firebaseapp.com",
  projectId: "openretro-prod",
  storageBucket: "openretro-prod.appspot.com",
  messagingSenderId: "63228248426",
  appId: "1:63228248426:web:2607693030a31f877b2513",
  measurementId: "G-ES9G3MB3NN",
  databaseURL:
    "https://openretro-prod-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const rtdb = getDatabase(app);
export const db = getFirestore(app);
