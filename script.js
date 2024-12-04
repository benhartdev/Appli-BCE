// URL de l'API pour les taux de change EUR/USD
const apiUrl = "https://data-api.ecb.europa.eu/service/data/EXR/M.USD.EUR.SP00.A";

// Fonction pour récupérer les données
async function fetchExchangeRate() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json' // Spécifie le format de réponse (JSON recommandé)
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }

        const data = await response.json(); 
        console.log("Données récupérées :", data);
        displayData(data);
    } catch (error) {
        console.error("Erreur lors de la connexion à l'API BCE :", error);
    }
}

fetchExchangeRate();

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
