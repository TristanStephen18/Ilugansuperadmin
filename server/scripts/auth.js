import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, getDoc, collection, updateDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

const docref = doc(db, 'admin', 'admin1');

async function getadmindata(){
    const docSnap = await getDoc(docref);

    if (docSnap.exists()) {
        var data = docSnap.data();
        console.log("Document data:", docSnap.data());
        console.log(`admin is ${data['auth']}`);

        if(data['auth']== "offline"){
            window.location.assign('/');
        }
    } else {
        console.log("No such document!");
    }
}

getadmindata();