// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBFdYCztlCauluwdH03gG0j4utppM9eBxk",
    authDomain: "basededatosfam.firebaseapp.com",
    projectId: "basededatosfam",
    storageBucket: "basededatosfam.appspot.com",
    messagingSenderId: "327465293581",
    appId: "1:327465293581:web:d1a3a7efde036e73d08244",
    measurementId: "G-529QFJMBR4"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getDatabase(firebaseApp);
  
  export { db };