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

let username;
let password;
const docRef = doc(db, "admin", "admin1"); 

async function getadmindata(){
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        var data = docSnap.data();
        console.log("Document data:", docSnap.data());

        username = data['username'];
        password = data['password'];
        console.log(username, password);
    } else {
        console.log("No such document!");
    }


}

getadmindata();

async function  updateadminauth() {
  await updateDoc(docRef, {auth: 'online'});
}


const loginform = document.querySelector('#lgbtn');
loginform.addEventListener('click', (e)=>{
  e.preventDefault();
  const usrnm = document.querySelector('#username').value;
  const pass = document.querySelector('#password').value;

  if(usrnm == username){
    if(pass == password){
      alert('Welcome');

      updateadminauth().then(()=>{
        window.location.assign("/dashboard");
      });
    }else{
      alert('Wrong password');
    }
  }else{
    alert('Who are you?');
  }
});