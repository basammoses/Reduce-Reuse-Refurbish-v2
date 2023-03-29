// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword

} from 'firebase/auth';
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
  appId: "1:178227025070:web:5363c1549cfe607d70893f",
  measurementId: "G-X1ZVYCHC58"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);





export const signInUser = async (
  email: string, 
  password: string
) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const userStateListener = (callback:NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback)
}

export const SignOutUser = async () => await signOut(auth);


export const signUp = async(
  email: string,
  password: string
) => {
  if (!email && !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}



