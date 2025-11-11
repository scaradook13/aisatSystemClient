import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcCiUm0FexkdXqGz7U-KsVi7mYVKeDQeI",
  authDomain: "aisat-auth.firebaseapp.com",
  projectId: "aisat-auth",
  storageBucket: "aisat-auth.firebasestorage.app",
  messagingSenderId: "129546320610",
  appId: "1:129546320610:web:05a11ac2357be73a343cbb",
  measurementId: "G-893FGMZB3F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
