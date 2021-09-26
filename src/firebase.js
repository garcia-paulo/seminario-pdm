import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyDFz4R4NVrnVxqJp8Fh67gaFqux_do-NO4",
  authDomain: "seminario-pdm-d65d7.firebaseapp.com",
  projectId: "seminario-pdm-d65d7",
  storageBucket: "seminario-pdm-d65d7.appspot.com",
  messagingSenderId: "526445817774",
  appId: "1:526445817774:web:63607724efb93572e7623f",
});

export const auth = getAuth();
export const db = getFirestore();
export default app;
