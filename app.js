import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {getFirestore, collection, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyChTEbdZgEqhKsti1ewbJJ2D6O42kAF8J0",
    authDomain: "project-41e84.firebaseapp.com",
    projectId: "project-41e84",
    storageBucket: "project-41e84.appspot.com",
    messagingSenderId: "322346322195",
    appId: "1:322346322195:web:405ef31fbe602b610332e6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);



