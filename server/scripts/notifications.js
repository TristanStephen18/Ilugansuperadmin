import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  onSnapshot
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

export function requestNotificationPermission() {
  console.log("sample");
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        checkfornewsubscription();
      } else {
        console.log("Notification permission denied.");
      }
    });
  } else {
    console.log("Browser does not support notifications.");
  }
}

// Function to show a notification
function showNotification(title, options) {
  if (Notification.permission === "granted") {
    new Notification(title, options);
  }
}

const docref = doc(db, "admin", "admin1");

async function getadmindata() {
  const docSnap = await getDoc(docref);

  if (docSnap.exists()) {
    var data = docSnap.data();
    console.log("Document data:", docSnap.data());
    console.log(`admin is ${data["auth"]}`);


    if (data["auth"] == "offline") {
      window.location.assign("/");
    }
  } else {
    console.log("No such document!");
  }
}

getadmindata();

// function monitorNewSubscriptions() {
//   const susbcriptionAlertsRef = collection(db, "admin", "admin1", "notifications");

//   onSnapshot(susbcriptionAlertsRef, (snapshot) => {
//     if (snapshot.size > notificationsCount) {
//       showNotification("System Subscription Alert", {
//         body: "A company has subscribed to your system",
//         icon: "/logo",
//       });

//       // Update the notifications count in the admin document
//       updateDoc(adminDocRef, {
//         notifications: snapshot.size,
//       });
//     }
//   });
// }

async function checkfornewsubscription() {
  const adminDocRef = doc(db, "admin", "admin1");

  // Fetch the current notification count from the admin document
  const adminDocSnap = await getDoc(adminDocRef);
  if (!adminDocSnap.exists()) {
    console.log("No such admin document for this user.");
    return;
  }

  const adminData = adminDocSnap.data();
  let notificationsCount = adminData.notifications || 0;

  // Set up a real-time listener on the `notifications` subcollection
  const subscriptionAlertsRef = collection(db, "admin", "admin1", "notifications");

  onSnapshot(subscriptionAlertsRef, async (snapshot) => {
    const subscriptionAlertsCount = snapshot.size;

    if (subscriptionAlertsCount > notificationsCount) {
      // Show notification for new subscription alerts
      showNotification("System Subscription Alert", {
        body: "A company has subscribed to your system",
        icon: "/logo"
      });

      // Update the notifications count in the admin document
      await updateDoc(adminDocRef, {
        notifications: subscriptionAlertsCount
      });

      // Update the local notifications count to avoid repeated notifications
      notificationsCount = subscriptionAlertsCount;
    }
  }, (error) => {
    console.error("Error listening to subscription alerts:", error);
  });
}

requestNotificationPermission();
