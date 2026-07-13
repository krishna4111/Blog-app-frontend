// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-1e7db.firebaseapp.com",
  projectId: "blog-app-1e7db",
  storageBucket: "blog-app-1e7db.firebasestorage.app",
  messagingSenderId: "1099442574236",
  appId: "1:1099442574236:web:b6390e8efa883c7d9cee59",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
