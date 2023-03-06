// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABruE4wGozxvGxZzmqpCB-HemYKvqgqA8",
  authDomain: "react-cursos-21bad.firebaseapp.com",
  projectId: "react-cursos-21bad",
  storageBucket: "react-cursos-21bad.appspot.com",
  messagingSenderId: "384924376344",
  appId: "1:384924376344:web:c5a6666962a99c5d12526d"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );

