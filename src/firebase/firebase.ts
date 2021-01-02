import firebase from "firebase/app";
// Firebase authentication module
import "firebase/auth";
// Firestore module
import "firebase/firestore";

// Firebase App Configuration
const firebaseConfig = {
  // CONFIG DATA
};

// Create a firebase app instance
const app = firebase.initializeApp(firebaseConfig);

// Create and export the auth service instance
export const auth = app.auth();

// Create and export the firestore service instance
export const firestore = app.firestore();
