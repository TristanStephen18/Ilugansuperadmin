import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
    import { getFirestore, collection, getDocs, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

    getPassengers();


    async function getPassengers() {
        const passengerscollection = collection(db, 'passengers');

        const documents = await getDocs(passengerscollection);

        console.log(documents.docs);

        documents.forEach((doc) => {
            console.log(doc.data());
        });

        // onSnapshot(passengerscollection, (snapshot)=>{
        //     console.log(snapshot);
        // });
    }