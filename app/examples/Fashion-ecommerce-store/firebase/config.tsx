// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4ic7WRewDnSRE5BiFFpkYzyZJ4UOQaqo",
  authDomain: "fashion-695dd.firebaseapp.com",
  projectId: "fashion-695dd",
  storageBucket: "fashion-695dd.firebasestorage.app",
  messagingSenderId: "924013114636",
  appId: "1:924013114636:web:5101a6688949a47d56c529"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);