import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

// Track current request during modal interaction
let currentDocId = null;

// Function to handle the reject action
async function handleAction(docId, isAccepted, reason = "") {
  try {
    const docRef = doc(db, "admin_requests", docId);
    await updateDoc(docRef, {
      accepted: isAccepted,
      status: isAccepted ? "approved" : "rejected",
      reason: isAccepted ? "" : reason, // Add reason if rejected
    });
    alert(`Request has been ${isAccepted ? "accepted" : "rejected"}.`);
  } catch (error) {
    console.error("Error updating request:", error);
  }
}

// Function to display the reject modal
function showRejectPopup(docId) {
  currentDocId = docId;
  const modal = new bootstrap.Modal(document.getElementById("rejectModal"));
  modal.show();
}

// Handle rejection confirmation
document.getElementById("rejectConfirmButton").addEventListener("click", async () => {
  const reasonInput = document.getElementById("rejectReasonInput");
  const reason = reasonInput.value.trim();

  if (reason === "") {
    alert("Reason cannot be empty!");
    return;
  }

  await handleAction(currentDocId, false, reason);

  reasonInput.value = ""; // Reset modal input
  bootstrap.Modal.getInstance(document.getElementById("rejectModal")).hide();
});

// Function to fetch and display admin requests
function displayAdminRequests() {
  const listContainer = document.getElementById("admin-requests-list");

  onSnapshot(collection(db, "admin_requests"), (querySnapshot) => {
    listContainer.innerHTML = "";

    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      const listTile = document.createElement("div");
      listTile.className = "list-tile";
      listTile.addEventListener("click", () => {
        if (data.imagelocation) {
            window.open(data.imagelocation, "_blank");
        }
    });


      const details = document.createElement("div");
      details.className = "details";

      const title = document.createElement("h3");
      title.textContent = `Email: ${data.email}`;
      const type = document.createElement("p");
      type.textContent = `Type: ${data.type}`;
      const status = document.createElement("p");
      status.textContent = `Status: ${data.status}`;
      const accepted = document.createElement("p");
      accepted.textContent = `Accepted: ${data.accepted ? "Yes" : "No"}`;

      details.appendChild(title);
      details.appendChild(type);
      details.appendChild(status);
      details.appendChild(accepted);

      const actions = document.createElement("div");
      actions.className = "actions";

      if (!data.accepted) {
        const acceptButton = document.createElement("button");
        acceptButton.className = "btn accept";
        acceptButton.textContent = "Accept";
        acceptButton.addEventListener("click", () => {
          handleAction(docSnapshot.id, true);
        });

        const rejectButton = document.createElement("button");
        rejectButton.className = "btn reject";
        rejectButton.textContent = "Reject";
        rejectButton.addEventListener("click", () => {
          showRejectPopup(docSnapshot.id);
        });

        actions.appendChild(acceptButton);
        actions.appendChild(rejectButton);
      }

      listTile.appendChild(details);
      if (actions.children.length > 0) {
        listTile.appendChild(actions);
      }

      listContainer.appendChild(listTile);
    });
  });
}

// Initialize
displayAdminRequests();
