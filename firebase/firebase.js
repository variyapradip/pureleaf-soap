import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import {
  getAuth
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDyv6Ypez2_0nnkvTn237qE8Pq1B4x1Uns",
    authDomain: "pureleaf-soap-7de30.firebaseapp.com",
    databaseURL: "https://pureleaf-soap-7de30-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pureleaf-soap-7de30",
    storageBucket: "pureleaf-soap-7de30.firebasestorage.app",
    messagingSenderId: "480155350260",
    appId: "1:480155350260:web:4d8414c8301ba250131aa1",
    measurementId: "G-13B54J2LRH"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
