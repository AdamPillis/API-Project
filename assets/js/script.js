const API_KEY = 'DJnnk6HvE5THhskryKoWi4zm3YM';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

document.getElementById('status').addEventListener('click', e => getStatus(e));

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let resultsModalTitle = document.getElementById('resultsModalTitle');
    let resultsContent = document.getElementById('results-content');

    resultsModalTitle.innerText = 'API Key Status';
    resultsContent.innerText = `Your key is valid until
                                 ${data.expiry}`;

    resultsModal.show();
}
