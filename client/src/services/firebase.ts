import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_NXL8SaKJD8Jbczv1CzKsypVXLs6-s9A",
  authDomain: "troll-or-not.firebaseapp.com",
  projectId: "troll-or-not",
  storageBucket: "troll-or-not.appspot.com",
  messagingSenderId: "840639766780",
  appId: "1:840639766780:web:1ddd915945adac18e77779",
  measurementId: "G-ERWETEBDLL",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);


