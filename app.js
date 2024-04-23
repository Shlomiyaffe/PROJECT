import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {getFirestore,
     collection,
      addDoc,
       getDoc,
     } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
     import {
        getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        signInWithPopup,
        GoogleAuthProvider,
    } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
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
  const auth = getAuth(app);



  //cach the dom
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  //sign-in
  window.signInWithEmail = async () => {
    const signInEmail = email.value;
    const signInPassword = password.value;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      console.log('Signed in:', userCredential.user);
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };


  // sign-up
window.signUp = async () => {
    const signUpEmail = email.value;
    const signUpPassword = password.value;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
        console.log('Signed up:', userCredential.user);
        loadItem();
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-up error:', errorCode, errorMessage);
        alert(errorMessage);
    }
};


// let btn = document.querySelector('button');
// let nameInput = document.querySelectorAll('input')[0];
// let lastNameInput = document.querySelectorAll('input')[1];
// let emailInput = document.querySelectorAll('input')[2];



// async function addValue(){
//     const docRef = await addDoc(collection(db,"example"),{
//         name: nameInput.value,
//         lastName: lastNameInput.value,
//         email: emailInput.value,
//     });
//     console.log("Document written with ID: ", docRef.id);
// }


// async function displayDataTable(){
//     let tableBody = document.querySelector('.table-data');
//     tableBody.innerHTML = '';


//     let query = await getDoc(collection(db,"example"));
//     query.forEach(function(doc){
//         let data = doc.data();

//     let row = document.createElement('tr');
    
//     /// Name
//     let nameCell = document.createElement('td');
//     nameCell.innerHTML = data.name;
//     row.appendChild(nameCell);

//     /// Last name
//     let lastNameCell = document.createElement('td');
//     lastNameCell.innerHTML = data.lastName;
//     row.appendChild(lastNameCell);

//     /// Email
//     let emailCell = document.createElement('td');
//     emailCell.innerHTML = data.email;
//     row.appendChild(emailCell);

//     tableBody.appendChild(row);
// });
// }

// btn.addEventListener("click", function() {
//     addValue();
// });

// displayDataTable();











async function addUserData(name, lastName ,email ) {
    try {
      const userRef = await addDoc(collection(db, "users"), {
        name: name,
        lastName: lastName,
        email: email,
      });
      console.log("Document written with ID: ", userRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async function displayUserTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
  
    try {
      const querySnapshot = await getDoc(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
  
        // Create a new table row
        const row = document.createElement("tr");
  
        // Create and append table cells
        const nameCell = document.createElement("td");
        nameCell.textContent = data.name;
        row.appendChild(nameCell);

        const lastNameCell = document.createElement("td");
        lastNameCell.textContent = data.lastName;
        row.appendChild(lastNameCell);
  
        const emailCell = document.createElement("td");
        emailCell.textContent = data.email;
        row.appendChild(emailCell);
  
  
        // Append the row to the table body
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }

addUserData(
    "",
    "",
    "",
  );
  displayUserTable();  






