const API_KEY = 'DJnnk6HvE5THhskryKoWi4zm3YM';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

document.getElementById('status').addEventListener('click', event => getStatus(event));
document.getElementById('submit').addEventListener('click', event => postForm(event));

async function postForm(event) {
    const form = new FormData(document.getElementById('checksform'));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form, 
    });

    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }
}

function displayErrors(data) {
    let heading = `JSHint Results for ${data.file}`;

    if (data.total_errors === 0) {
        results = `<div class='no_errors'>No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class='error_count'>${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results +=  `<div>At the line <span class='line'>${error.line}</span>, `;
            results += `column <span class='column'>${error.col}</span></div>`;
            results += `<div class='error'>${error.error}</div>`;
        }
    }
    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results;
    resultsModal.show();
}

async function getStatus(event) {
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

