// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkdcqRnWcMd1tYLPi9_Ok-TjVxq0TZWdM",
  authDomain: "task-management00.firebaseapp.com",
  projectId: "task-management00",
  storageBucket: "task-management00.firebasestorage.app",
  messagingSenderId: "265037257768",
  appId: "1:265037257768:web:52098680ad371b3112e91d",
  measurementId: "G-8ZJ3VDL032",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
