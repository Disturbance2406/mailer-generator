// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Note: These are placeholder values - replace with actual Firebase config
const firebaseConfig = {
  apiKey: "placeholder-api-key",
  authDomain: "mailer-generator.firebaseapp.com",
  projectId: "mailer-generator",
  storageBucket: "mailer-generator.appspot.com",
  messagingSenderId: "123456789",
  appId: "placeholder-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;

