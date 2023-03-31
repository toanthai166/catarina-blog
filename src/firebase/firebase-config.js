// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD0qE31ZOYCzBcVO_LeJrAJ27V0wRu-d28",
  authDomain: "catarina-blog.firebaseapp.com",
  projectId: "catarina-blog",
  storageBucket: "catarina-blog.appspot.com",
  messagingSenderId: "977501342890",
  appId: "1:977501342890:web:04c67028a5fedc9d7dd4d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
