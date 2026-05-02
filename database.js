// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN947aMLtXP-bjAvvAwnkpQqJpdDmdnOs",
  authDomain: "bangroy.firebaseapp.com",
  projectId: "bangroy",
  storageBucket: "bangroy.firebasestorage.app",
  messagingSenderId: "31976139879",
  appId: "1:31976139879:web:1295cd563201c5f52238c2",
  measurementId: "G-XM5VMXN9ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);