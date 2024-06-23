// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-bdf27.firebaseapp.com",
  projectId: "mern-bdf27",
  storageBucket: "mern-bdf27.appspot.com",
  messagingSenderId: "305792638268",
  appId: "1:305792638268:web:fb4427cf152303ae625239"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);