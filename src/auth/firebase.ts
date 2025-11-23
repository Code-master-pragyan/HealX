// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN0th63f-WXF6hHnPk41X54eyhyBc9Cnk",
  authDomain: "healx-8a1eb.firebaseapp.com",
  projectId: "healx-8a1eb",
  storageBucket: "healx-8a1eb.firebasestorage.app",
  messagingSenderId: "5422800420",
  appId: "1:5422800420:web:34bb75ddc7726bae09c2b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();