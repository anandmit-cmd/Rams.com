
import { initializeApp, getApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "ramscom-5js0q",
  appId: "1:135645483680:web:97a8126b5c3d210842efc5",
  storageBucket: "ramscom-5js0q.firebasestorage.app",
  apiKey: "AIzaSyCxfePMY6zW7I1elyczkKY_-HqscQFS5gE",
  authDomain: "ramscom-5js0q.firebaseapp.com",
  messagingSenderId: "135645483680"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
