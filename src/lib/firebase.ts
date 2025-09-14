
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "ramscom-5js0q",
  appId: "1:135645483680:web:97a8126b5c3d210842efc5",
  storageBucket: "ramscom-5js0q.appspot.com",
  apiKey: "AIzaSyCxfePMY6zW7I1elyczkKY_-HqscQFS5gE",
  authDomain: "ramscom-5js0q.firebaseapp.com",
  messagingSenderId: "135645483680"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
