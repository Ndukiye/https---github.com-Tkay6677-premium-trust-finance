
var host = window.location.origin
var imgpath = host + "/assets/images/coins/02.png" 

// Function to fetch data from PHP using AJAX
function FetchTransaction(path, elementid = "") {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = xhr.responseText;
             // console.log(data)
              if (elementid != "") {
                renderUserData(data, elementid);
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
function renderTransactionData(value, elementid) {
 var data = JSON.parse(value);
 var dataContainer = document.getElementById(elementid);
 dataContainer.innerText = data.firstname + " " + data.lastname ;
}

// Fetch data when the page loads
var path = host + '/primetrust_server/';
FetchTransaction(path + "transactions.php")
.then((data) => {
    bla = JSON.parse(data);
    bla.forEach(element => {


        // Create a new table row
  var newRow = document.createElement("tr");
  newRow.classList.add("white-space-no-wrap"); // Add class to the new row

  // Create and append cells to the new row
  newRow.innerHTML = `
    <td>
      <img src="${imgpath}" class="img-fluid avatar avatar-30 avatar-rounded" alt="img23" />
      Bitcoin BTC
    </td>
    <td class="pe-2">$${element.amount}</td>
    <td>${element.transaction_type}</td>
    <td>
      </svg>
      08/09/2024 2:30 
    </td>
    <td class="text-warning">${element.status}</td>
  `;

  // Append the new row to the table body (assuming the table has id "myTable")
  var tableBody = document.getElementById("myTableBody");
  tableBody.appendChild(newRow);
        console.log(element)
    });
    

});

