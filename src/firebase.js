// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCClArIz0qVpSoSJ2bYGagOTDg9-4CHGn8",
  authDomain: "note-app-c5c5d.firebaseapp.com",
  projectId: "note-app-c5c5d",
  storageBucket: "note-app-c5c5d.firebasestorage.app",
  messagingSenderId: "472329485194",
  appId: "1:472329485194:web:6ccedd40a3ba24cd29e673"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app