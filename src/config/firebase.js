import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAroeRlXYG6jziUY_-z2-HBwQGhLzamn2g",
  authDomain: "practice-574d9.firebaseapp.com",
  projectId: "practice-574d9",
  storageBucket: "practice-574d9.appspot.com",
  messagingSenderId: "265704045674",
  appId: "1:265704045674:web:77133ea1303f0da6aa1e13",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
