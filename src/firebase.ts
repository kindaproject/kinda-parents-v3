// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getInstallations } from "firebase/installations";

const firebaseConfig = {
  apiKey: "AIzaSyCW1z1xLAcf5iHImjLEAbRZwC7buofknmI",
  authDomain: "kindagolden-f4ef2.firebaseapp.com",
  projectId: "kindagolden-f4ef2",
  storageBucket: "kindagolden-f4ef2.firebasestorage.app",
  messagingSenderId: "623901792163",
  appId: "1:623901792163:web:bd950db2612e23cce46c16",
  measurementId: "G-F082F0HHEY"
};

const app = initializeApp(firebaseConfig);
export const installations = getInstallations(app);
