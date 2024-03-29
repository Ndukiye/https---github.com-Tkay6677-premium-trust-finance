function fetchCrypto(apiUrl) {
    //'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR'
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data; // Returning fetched data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to render data in an HTML tag
function displayCurrency(elementId) {
    fetchCrypto()
        .then(data => {
            var dataContainer = document.getElementById(elementId);
            console.log(data.USD)
            dataContainer.innerText = data.USD;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Example usage:
displayCurrency('btcDataContainer'); // Displaying data in an HTML element with id 'btcDataContainer'
