var host = window.location.origin
     // Function to fetch data from PHP using AJAX
     function fetchDataFromPHP(path, elementid = "") {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = xhr.responseText;
              if (elementid != "") {
                //renderData(data, elementid);
              }
              resolve(data);
            } else {
              reject(new Error("Failed to fetch data from the server"));
            }
          }
        };
        xhr.send();
      });
    }
  
    // Function to render data in an HTML tag
    function renderData(value, elementid) {
      var data = value;
      var dataContainer = document.getElementById(elementid);
     // alert(data)
      dataContainer.innerText = data;
    }
  
  var path = host + '/primetrust_server/';
  // Fetch data when the page loads

  
  var btcbalance = 0;
  var usdbalance = 0;

  fetchDataFromPHP(path + "portfolio.php")
  .then((data) => {

    var bla  = JSON.parse(data);

    try {
      bla.forEach(element => {
        console.log("Data received:", element);
        switch (parseFloat(element.asset_id)) {
          case 1:
              btcbalance += parseFloat(element.amount);
              break;
          case 2:
              usdbalance += parseFloat(element.amount);
              break;
        }
      });
      
    } catch (error) {
      
    }
    
    

    function fetchCrypto() {
      return fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR')
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
  function displayCurrency() {
      fetchCrypto()
          .then(data => {
              console.log(data.USD)
              console.log(btcbalance.toFixed(5), usdbalance.toFixed(5))
              renderData(btcbalance.toFixed(5) + " BTC", "asset0");
              renderData("$" + (usdbalance).toFixed(5), "asset1");
              renderData("$" + (usdbalance+(btcbalance*data.USD)).toFixed(5), "balance");
             
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }

  displayCurrency()


    // console.log(btcbalance.toFixed(5), usdbalance.toFixed(5))
    // renderData(btcbalance.toFixed(5) + " BTC", "asset0");
    // renderData("$" + usdbalance.toFixed(5), "asset1");
    // renderData("$" + (usdbalance+btcbalance).toFixed(5), "balance");
   
  });





