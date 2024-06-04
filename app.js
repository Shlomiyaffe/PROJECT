import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyChTEbdZgEqhKsti1ewbJJ2D6O42kAF8J0",
  authDomain: "project-41e84.firebaseapp.com",
  projectId: "project-41e84",
  storageBucket: "project-41e84.appspot.com",
  messagingSenderId: "322346322195",
  appId: "1:322346322195:web:405ef31fbe602b610332e6",
};

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
    const userCredential = await signInWithEmailAndPassword(
      auth,
      signInEmail,
      signInPassword
    );
    console.log("Signed in:", userCredential.user);
    window.location.href = "products.html";
  } catch (error) {
    console.error("Sign-in error:", error);
  }
};

// sign-up
window.signUp = async () => {
  const signUpEmail = email.value;
  const signUpPassword = password.value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      signUpEmail,
      signUpPassword
    );
    console.log("userCredential", userCredential);
    console.log("Signed up:", userCredential.user);
    await addUserData(
      userCredential.user.uid,
      firstName,
      lastName,
      signUpEmail
    );
    window.location.href = "products.html";
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Sign-up error:", errorCode, errorMessage);
    alert(errorMessage);
  }
};


async function addUserData(id, firstName, lastName, email) {
  try {
    const userRef = await addDoc(collection(db, "users"), {
      id,
      firstName,
      lastName,
      email,
    });
    console.log("Document written with ID: ", userRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

async function deleteUser(id) {
  try {
    await deleteDoc(doc(db, "users", id));
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
  }
}

async function displayUserTable() {
  const tableBody = document.getElementById("table-body-users");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (!data.email) return;

      // Create a new table row
      const row = document.createElement("tr");

      // Create and append table cells
      const firstNameCell = document.createElement("td");
      firstNameCell.textContent = data.firstName;
      row.appendChild(firstNameCell);

      const lastNameCell = document.createElement("td");
      lastNameCell.textContent = data.lastName;
      row.appendChild(lastNameCell);

      const emailCell = document.createElement("td");
      emailCell.textContent = data.email;
      row.appendChild(emailCell);

      const actionsCell = document.createElement("td");
      actionsCell.innerHTML = `
    
        <button id="${doc.id}Delete">Delete</button>
        <button id="${doc.id}Edit">Edit</button>
        `;
      row.appendChild(actionsCell);

      tableBody.appendChild(row);

      document.getElementById(doc.id+"Delete").addEventListener("click", () => {
        console.log("Delete");
                deleteUser(doc.id).then(()=>displayUserTable());
      });
      document.getElementById(doc.id+"Edit").addEventListener("click", () => {
        console.log("Edit");
        editUser(doc.id);
      });
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

displayUserTable();

//Link to signOut
document.getElementById("sign-out")?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log("Signed out");
    window.location.href = "Sign-in.html";
  } catch (error) {
    console.error("Sign-out error:", error);
  }
});

//Link to Admin Product
document.querySelector('.adminProduct-button')?.addEventListener("click", async () => {
  try {
    console.log("admin");
    window.location.href = "adminProduct.html";
  } catch (error) {
    console.error("Admin error:", error);
  }
});

//Link to Products
document.querySelector('.products-button')?.addEventListener("click", async () => {
  try {
    console.log("products");
    window.location.href = "products.html";
  } catch (error) {
    console.error("Admin error:", error);
  }
});

//Link to New Products
document.querySelector('.addNewProduct-button')?.addEventListener("click", async () => {
  try {
    console.log("new product");
    window.location.href = "admin.html";
  } catch (error) {
    console.error("Admin error:", error);
  }
});






async function addProduct(ProductName, descriptionProduct, Price, imageUrl) {
  try {
    const userRef = await addDoc(collection(db, "products"), {
      ProductName,
       descriptionProduct,
        Price,
         imageUrl,
    });
    console.log("Document written with ID: ", userRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

window.onProductFormSaveBtnClick = async () => {
  const ProductName = document.getElementById("ProductName").value;
  const descriptionProduct = document.getElementById("descriptionProduct").value;
  const Price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageUrl").value;
  
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('productId');
  if(productId){
    try {
      await updateProduct(
        productId,
        ProductName,
        descriptionProduct,
        Price,
        imageUrl,
      );
      alert("product updated successfully");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Update product error:", errorCode, errorMessage);
      alert(errorMessage);
    }
  }else{
    try {
      await addProduct(
        ProductName,
        descriptionProduct,
        Price,
        imageUrl,
      );
      alert("product added successfully");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Add product error:", errorCode, errorMessage);
      alert(errorMessage);
    }
  }
  };

//Update Product
function updateProduct(productId, newProductName, newDescription, newPrice, newImageUrl) {
  updateDoc(doc(db, 'products', productId), {
    ProductName: newProductName,
    descriptionProduct: newDescription,
    Price: newPrice,
    imageUrl: newImageUrl,
  })
  .then(() => {
    alert('Product updated successfully!');
  })
  .catch(error => {
    alert(error.message);
  });
}

//Delete Product
async function deleteProduct(productId) {
  try {
    await deleteDoc(doc(db, "products", productId));
    console.log("Product deleted successfully!");
    alert("Product deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Error deleting product. Please try again.");
  }
}

//Edit Product
async function editProduct(productId) {
  window.location.href = "admin.html?productId=" +productId;
}

//Edit Product form
async function editProductForm() {
  const editProductForm = document.getElementById("product-edit-form");
  if(!editProductForm) return;
  const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
console.log(productId);
if(!productId) return;
const productDoc = await getDoc(doc(db, "products",productId));
const data = productDoc.data();
console.log(data);
const nameElement = document.getElementById("ProductName");
nameElement.value = data.ProductName;
const imageElement = document.getElementById("imageUrl");
imageElement.value = data.imageUrl;
const descriptionProductElement = document.getElementById("descriptionProduct");
descriptionProductElement.value = data.descriptionProduct;
const priceElement = document.getElementById("price");
priceElement.value = data.Price;
}
editProductForm();


  

async function displayProductsGrid() {
  const gridElement = document.getElementById("products-container");
  if (!gridElement) return;
  gridElement.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();


      // Create a new table row
      const gridItemElement = document.createElement("div");
      gridItemElement.classList.add("grid-item")


      // Create and append table cells
      const cardElement = document.createElement("div");
      cardElement.classList.add("card")
      gridItemElement.appendChild(cardElement);

      const imageElement = document.createElement("img");
      imageElement.src = data.imageUrl;
      imageElement.classList.add("cardImage");
      cardElement.appendChild(imageElement);

      const productInfoContainer = document.createElement("div");
      productInfoContainer.classList.add("productInfoContainer");
      cardElement.appendChild(productInfoContainer);

      const productNameElement = document.createElement("h4");
      productNameElement.textContent = data.ProductName;
      productInfoContainer.appendChild(productNameElement);

      const DescriptionElement = document.createElement("p");
      DescriptionElement.textContent = data.descriptionProduct;
      productInfoContainer.appendChild(DescriptionElement);

      const PriceElement = document.createElement("h6");
      PriceElement.textContent = "from " + data.Price + "$";
      productInfoContainer.appendChild(PriceElement);



      gridElement.appendChild(gridItemElement);


    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

displayProductsGrid();


async function displayProductTable() {
  const tableBody = document.getElementById("table-body-products");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();

      // Create a new table row
      const row = document.createElement("tr");

      // Create and append table cells
      const nameCell = document.createElement("td");
      nameCell.textContent = data.ProductName;
      row.appendChild(nameCell);

      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = data.descriptionProduct;
      row.appendChild(descriptionCell);

      const priceCell = document.createElement("td");
      priceCell.textContent = data.Price;
      priceCell.textContent = data.Price + "$";
      row.appendChild(priceCell);

      const imageUrlCell = document.createElement("td");
      const imageElement = document.createElement("img");
      imageElement.classList.add("cardImage");
      imageElement.src = data.imageUrl;
      imageUrlCell.appendChild(imageElement);
      row.appendChild(imageUrlCell);

      const actionsCell = document.createElement("td");
      actionsCell.innerHTML = `
    
        <button id="${doc.id}Delete">Delete</button>
        <button id="${doc.id}Edit">Edit</button>
        `;
      row.appendChild(actionsCell);

      tableBody.appendChild(row);

      document.getElementById(doc.id+"Delete").addEventListener("click", () => {
        console.log("Delete");
                deleteProduct(doc.id).then(()=>displayProductTable());
      });
      document.getElementById(doc.id+"Edit").addEventListener("click", () => {
        console.log("Edit");
        editProduct(doc.id);
      });
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

displayProductTable();










