// URL de l'API pour les taux de change EUR/USD
// const apiUrl = "https://v6.exchangerate-api.com/v6/2da17f58272f199413255b3b/";

// Fonction pour récupérer les données
const apiKey = '2da17f58272f199413255b3b'; // Remplacez par votre clé API
const baseCurrency = 'EUR'; // Devise de base
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

async function fetchExchangeRates() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Taux de change :", data.conversion_rates);
  } catch (error) {
    console.error("Erreur lors de la connexion à l'API :", error);
  }
}

fetchExchangeRates();






function displayData(data) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Nettoie le conteneur

   
    const observations = data.dataSets[0].observations;
    const structure = data.structure.dimensions.observation;

    for (let key in observations) {
        const [dateIndex] = key.split(":");
        const value = observations[key][0];
        const date = structure[0].values[dateIndex].name;


        const entry = document.createElement("p");
        entry.textContent = `Date : ${date} - Taux : ${value}`;
        container.appendChild(entry);
    }
}
