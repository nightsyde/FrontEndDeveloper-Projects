const baseURL = "https://api.aylien.com/api/v1/classify/"

async function getBioData (url = baseURL, data = {}) {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });


.then(res => res.json());
.then(function(res) {
    document.getElementById('results').innerHTML = res.message
