import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAUmoyrM3Tvw1wh_yRF0rdLrp5C1M_K0vE",
  authDomain: "walletflow-e82a9.firebaseapp.com",
  projectId: "walletflow-e82a9",
  storageBucket: "walletflow-e82a9.firebasestorage.app",
  messagingSenderId: "183435326553",
  appId: "1:183435326553:web:3de36ef07a93bb4aa72d48",
  measurementId: "G-3GPSHJP535"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
