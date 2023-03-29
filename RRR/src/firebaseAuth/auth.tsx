// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjjzKaC3Oo40dfq0uXMxsBrVLh5rQoJ60",
  authDomain: "reduce-reuse-refurbish.firebaseapp.com",
  projectId: "reduce-reuse-refurbish",
  storageBucket: "reduce-reuse-refurbish.appspot.com",
  messagingSenderId: "178227025070",
  appId: "1:178227025070:web:e703ccacb3e60bde70893f",
  measurementId: "G-6JNSRGZ96Z"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);


