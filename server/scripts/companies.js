import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
    import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

    // Function to load all companies from Firestore
    async function loadCompanies() {
        const companiesCollectionRef = collection(db, 'companies');
        const snapshot = await getDocs(companiesCollectionRef);
    
        const tableBody = document.getElementById("companiesTableBody");
        const filter = document.getElementById("subscriptionFilter").value;
    
        tableBody.innerHTML = ""; // Clear existing rows
    
        snapshot.forEach(doc => {
            const data = doc.data();
            const { company_name, subscriptionType, status, email } = data;
    
            // Filter by subscription type
            if (filter && subscriptionType !== filter) return;
    
            // Create table row
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>
                <img src="https://via.placeholder.com/40" class="rounded-circle me-2" alt="profile" />
                ${company_name}<br />
                <small class="text-muted">${email}</small>
              </td>
              <td>${subscriptionType}</td>
              <td><span class="status-${status === 'Online' ? 'online' : 'offline'}">${status}</span></td>
              <td><a href="#" class="text-dark">View</a></td>
            `;
            tableBody.appendChild(row);
        });
    }
    async function loadSubscriptionAnalytics() {
        const companiesCollectionRef = collection(db, 'companies');
        const snapshot = await getDocs(companiesCollectionRef);
        const subscriptionsByMonth = {};
    
        snapshot.forEach(doc => {
            const data = doc.data();
            const subscriptionDate = data.subscribedAt.toDate();
            const monthYear = subscriptionDate.toISOString().slice(0, 7);
    
            subscriptionsByMonth[monthYear] = (subscriptionsByMonth[monthYear] || 0) + 1;
        });
    
        const labels = Object.keys(subscriptionsByMonth).sort();
        const data = labels.map(month => subscriptionsByMonth[month]);
    
        const ctx = document.getElementById('subscriptionChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Subscriptions Over Time',
                    data: data,
                    borderColor: '#1FBF83',
                    backgroundColor: 'rgba(31,191,131,0.2)',
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Month' } },
                    y: { title: { display: true, text: 'Subscriptions' } }
                }
            }
        });
    }
    
    // Function to load subscription type data for the bar chart
    async function loadSubscriptionTypeAnalytics() {
        const companiesCollectionRef = collection(db, 'companies');
        const snapshot = await getDocs(companiesCollectionRef);
        const subscriptionCounts = {
            "Quarterly": 0,
            "Semi-Annual": 0,
            "Annual": 0
        };
    
        snapshot.forEach(doc => {
            const { subscriptionType } = doc.data();
            if (subscriptionType in subscriptionCounts) {
                subscriptionCounts[subscriptionType]++;
            }
        });
    
        const labels = Object.keys(subscriptionCounts);
        const data = Object.values(subscriptionCounts);
    
        const ctx = document.getElementById('subscriptionTypeChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Subscription Type Quantity',
                    data: data,
                    backgroundColor: ['#1FBF83', '#58D68D', '#AED6F1'],
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Subscription Type' } },
                    y: { title: { display: true, text: 'Quantity' } }
                }
            }
        });
    }
    
    // Call the functions to load analytics data
    loadSubscriptionAnalytics();
    loadSubscriptionTypeAnalytics();
    
    // Event listener to reload companies when the filter changes
    document.getElementById("subscriptionFilter").addEventListener("change", loadCompanies);
    
    // Initial load
    loadCompanies();
    

