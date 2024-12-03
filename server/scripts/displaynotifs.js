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

async function getnotifications() {
  const notifcollection = collection(db, "admin/admin1/notifications");
  const container = document.getElementById("notifications-container");

  onSnapshot(notifcollection, (snapshots) => {
    container.innerHTML = ""; // Clear previous notifications
    snapshots.docs.forEach((docu) => {
      const notifdata = docu.data();
      const notifid = docu.id;

      // Create notification card
      const notifCard = document.createElement("div");
      notifCard.className = "notification-card card mb-3";
      notifCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${notifdata.content || "Notification Title"}</h5>
          <p class="card-text">${notifdata.date || "No message content"}</p>
          <small class="text-muted">ID: ${notifid}</small>
        </div>
      `;
      container.appendChild(notifCard);
    });
  });
}

getnotifications();
