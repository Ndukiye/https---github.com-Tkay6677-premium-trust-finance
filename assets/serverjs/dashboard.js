     console.log(window.location.origin)

     var host = window.location.origin
     var userdata = "";
     // Function to fetch data from PHP using AJAX
     function FetchUserData(path, elementid = "") {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = xhr.responseText;
              console.log(data)
              if (elementid != "") {
                userdata = JSON.parse(data);
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
    function renderUserData(value, elementid) {
      var data = JSON.parse(value);
      var dataContainer = document.getElementById(elementid);
      dataContainer.innerText = data.username ;
    }
    
    // Fetch data when the page loads
    var path = host + '/primetrust_server/';
    FetchUserData(path + "loaduser.php", 'username');

    FetchUserData(path + "portfolio.php")
    .then((data) => {
      jsondata = JSON.parse(data)
      console.log("port received:", jsondata);

     
    })

    FetchUserData(path + "tier.php")
    .then((data) => {
      jsondata = JSON.parse(data)
      console.log("tier received:", jsondata);
      var dataContainer = document.getElementById("capital");
      dataContainer.innerText = jsondata.capital;

      dataContainer = document.getElementById("profits");
      dataContainer.innerText = jsondata.profit;
      
     
    })
    
    FetchUserData(path + "isloggedin.php")
      .then((data) => {
        console.log("Data received:", data);
        if (data != 1) {
          window.location.href = host + "/dashboard/auth/sign-in.html";
        }
      })
    
  
