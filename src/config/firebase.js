// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoBhU7c188O2SAAQbufm5sXYtroIJ1sME",
  authDomain: "clone-c4a3c.firebaseapp.com",
  projectId: "clone-c4a3c",
  storageBucket: "clone-c4a3c.appspot.com",
  messagingSenderId: "896114851610",
  appId: "1:896114851610:web:25f3d1207cc7fb60cbb6a3",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
