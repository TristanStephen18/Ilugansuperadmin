const but = document.querySelector('#b');
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, getDocs, collection, updateDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const db = getFirestore (app);

// Function to fetch and display admin requests
function displayAdminRequests() {
    const listContainer = document.getElementById("admin-requests-list");

    // Listen for real-time updates on the 'admin_requests' collection
    onSnapshot(collection(db, "admin_requests"), (querySnapshot) => {
        listContainer.innerHTML = ""; // Clear the list container

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
                acceptButton.addEventListener("click", (e) => {
                    e.stopPropagation();
                    handleAction(docSnapshot.id, true);
                    alert('Accepted');
                });

                const rejectButton = document.createElement("button");
                rejectButton.className = "btn reject";
                rejectButton.textContent = "Reject";
                rejectButton.addEventListener("click", (e) => {
                    e.stopPropagation();
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

// Function to show the reject reason pop-up
function showRejectPopup(docId) {
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";

    const popup = document.createElement("div");
    popup.className = "popup";

    const message = document.createElement("p");
    message.textContent = "Type the reason for rejecting the ID:";

    const reasonInput = document.createElement("input");
    reasonInput.type = "text";
    reasonInput.placeholder = "Enter reason here";

    const buttons = document.createElement("div");
    buttons.className = "popup-buttons";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className = "btn cancel";
    cancelButton.addEventListener("click", () => {
        document.body.removeChild(popupContainer); // Remove the pop-up
    });

    const rejectButton = document.createElement("button");
    rejectButton.textContent = "Reject";
    rejectButton.className = "btn reject";
    rejectButton.addEventListener("click", async () => {
        const reason = reasonInput.value.trim();
        if (reason === "") {
            alert("Reason cannot be empty!");
            return;
        }
        await handleAction(docId, false, reason);
        document.body.removeChild(popupContainer); // Remove the pop-up after updating
    });

    buttons.appendChild(cancelButton);
    buttons.appendChild(rejectButton);
    popup.appendChild(message);
    popup.appendChild(reasonInput);
    popup.appendChild(buttons);
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);
}

// Updated function to handle accept/reject action
async function handleAction(docId, isAccepted, reason = "") {
    try {
        const docRef = doc(db, "admin_requests", docId);
        await updateDoc(docRef, {
            accepted: isAccepted,
            status: isAccepted ? "approved" : "rejected",
            reason: isAccepted ? "" : reason // Add the reason if rejected
        });
        alert(`Request has been ${isAccepted ? "accepted" : "rejected"}.`);
    } catch (error) {
        console.error("Error updating request:", error);
    }
}

// Call the function to start listening for real-time updates
displayAdminRequests();
