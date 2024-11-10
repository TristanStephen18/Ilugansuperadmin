import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, Timestamp, query, where } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

// Reference to the 'ilugan' collection
const iluganCollectionRef = collection(db, 'admin', 'admin1', 'ilugan');

// Listen for real-time updates on the collection
onSnapshot(iluganCollectionRef, async () => {
    const snapshot = await getDocs(iluganCollectionRef);
    
    // Extract document IDs and parse them as dates
    const dataWithDates = snapshot.docs.map(doc => {
        const docDate = new Date(doc.id); // Parse document ID as date
        return { date: docDate, data: doc.data() };
    });

    console.log(dataWithDates);
    console.log(snapshot);

    // Sort documents by date in descending order (newest first)
    dataWithDates.sort((a, b) => b.date - a.date);

    if (dataWithDates.length < 2) {
        console.error("Not enough data to calculate percentage change.");
        return;
    }

    // Get the most recent two documents (today and yesterday)
    const todayData = dataWithDates[0].data;
    const yesterdayData = dataWithDates[1].data;

    console.log(todayData);
    console.log(yesterdayData);

    // Fields we want to compare
    const metrics = ["mobileusers", "totalrevenue", "webusers"];

    metrics.forEach(metric => {
        const todayValue = todayData[metric] || 0;
        const yesterdayValue = yesterdayData[metric] || 0;

        console.log(todayValue);
        console.log(yesterdayValue);

        // Calculate the percentage change
        const percentageChange = yesterdayValue 
            ? ((todayValue - yesterdayValue) / yesterdayValue) * 100 
            : 0;

        // Update the HTML with today's data and percentage change
        const element = document.querySelector(`.${metric} .card-text`);
        const percentageElement = document.querySelector(`.${metric} .small-text`);

        if (element) {
            element.textContent = todayValue !== undefined ? todayValue : 'N/A';
        }
        if (percentageElement) {
            percentageElement.textContent = yesterdayValue !== undefined 
                ? `${percentageChange.toFixed(2)}% ${percentageChange >= 0 ? 'increase' : 'decrease'} since yesterday`
                : "No data for comparison";
        }
    });
});

const companiesCollectionRef = collection(db, 'companies');

// Calculate date range for the last two days
const today = new Date();
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(today.getDate() - 2);

// Convert to Firestore Timestamp format
const twoDaysAgoTimestamp = Timestamp.fromDate(twoDaysAgo);

// Function to load recent transactions from Firestore with real-time updates
function loadRecentTransactions() {
    // Query to fetch companies with `subscribedAt` within the last two days
    const recentQuery = query(companiesCollectionRef, where("subscribedAt", ">", twoDaysAgoTimestamp));

    // Listen for real-time updates to the recent transactions query
    onSnapshot(recentQuery, (snapshot) => {
        // Reference the HTML table body
        const tableBody = document.querySelector(".transaction-table tbody");
        tableBody.innerHTML = ""; // Clear existing data

        // Iterate over each document and add it to the table
        snapshot.forEach(doc => {
            const data = doc.data();
            const { company_name, subscriptionType, status, email } = data;

            // Generate table row HTML
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <img src="https://via.placeholder.com/40" class="rounded-circle me-2" alt="profile" />
                    ${company_name}<br />
                    <small class="text-muted">${email}</small>
                </td>
                <td>${subscriptionType}</td>
                <td>
                    <span class="status-${status === 'Online' ? 'online' : 'offline'}">${status}</span>
                </td>
                <td><a href="#" class="text-dark">View</a></td>
            `;

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    });
}

// Call the function to initiate the real-time listener
loadRecentTransactions();
