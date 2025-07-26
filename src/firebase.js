import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCWaUU_45_fiuxo2-ErO2VYhku9sQexzws",
  authDomain: "encrypt-lab.firebaseapp.com",
  projectId: "encrypt-lab",
  storageBucket: "encrypt-lab.firebasestorage.app",
  messagingSenderId: "99086154054",
  appId: "1:99086154054:web:8384e48d214a1e29058d47"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };