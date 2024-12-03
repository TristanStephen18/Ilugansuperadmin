import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAL0I2_e4RNhtnwavuNrncD21sZAsmslmY",
  authDomain: "ilugan-database.firebaseapp.com",
  projectId: "ilugan-database",
  storageBucket: "ilugan-database.appspot.com",
  messagingSenderId: "814689984399",
  appId: "1:814689984399:web:ec6e6715f77d754a6875fa",
  measurementId: "G-XD470CX22M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch and display passenger data
function getPassengers() {
  const passengerscollection = collection(db, "passengers");
  onSnapshot(passengerscollection, (snapshot) => {
    const tableBody = document.getElementById("companiesTableBody");
    tableBody.innerHTML = ""; // Clear the table before appending new data

    snapshot.docs.forEach((doc) => {
      const data = doc.data();

      // Create a new row and populate it with user data
      const row = document.createElement("tr");

      let color = "";
      if(data.status == "offline"){
        color = 'red';
      }else{
        color = 'green';
      }

      row.innerHTML = `
        <td>${doc.id || "N/A"}</td>
        <td>${data.username || "N/A"}</td>
        <td>${data.email || "N/A"}</td>
        <td>${data.type || "N/A"}</td>
        <td><p id = "status" style="background-color: ${color}">${data.status || "N/A"}</p></td>
        <td><a href="#" class="btn btn-primary text-white">View</a></td>
      `;

      tableBody.appendChild(row);
    //   const status = document.getElementById('status');
    //     if(status.innerText == "offline"){
    //       status.style.backgroundColor = "red";
    //     }
    //   console.log(status.innerText);
    });
  });
}

// Call the function to populate the table
getPassengers();
