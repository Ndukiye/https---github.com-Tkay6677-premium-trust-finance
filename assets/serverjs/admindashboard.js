console.log(window.location.origin)
var host = window.location.origin
var imgpath = host + "/premiumtrustfinance.io/assets/images/coins/02.png" 
var alldata  = "";
// Function to fetch data from PHP using AJAX
function FetchData(path, elementid = "") {
 return new Promise((resolve, reject) => {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", path, true);
   xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
       if (xhr.status === 200) {
         var data = xhr.responseText;
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
 dataContainer.innerText = data;
}

// Fetch data when the page loads
var path = host + '/premiumtrustfinance.io/primetrust_server/';
FetchData(path + "isloggedin.php")
 .then((data) => {
   console.log("Data received:", data);
   if (data != 1) {
     window.location.href = host + "/premiumtrustfinance.io/dashboard/admin/sign-in.html";
   }
 })


  FetchData(path + "_alldata.php")
 .then((data) => {
    var jsondata = JSON.parse(data);
    alldata = jsondata
    console.log("Data received:", jsondata);
    
    //total balance
    try {
      var totalbalance = 0.000;
      jsondata.portfolio.forEach(element => {
        totalbalance += parseFloat(element.amount);
      });
      renderData(totalbalance + " BTC","balance");
    } catch (error) {
      console.log(error)
    }
   

    //number of clients
    try {
      var totalusers = 0;
      jsondata.users.forEach(element => {
        totalusers += 1;
      });
      renderData(totalusers,"userno");
    } catch (error) {
      
    }
   

    //transactions
    try {
      var numberofTransaction = 0;
      jsondata.transactions.forEach(element => {
        numberofTransaction += 1;
        var userid = element.user_id;
        var fullname = "";
        jsondata.users.forEach(user => {
          if (user.id == userid) {
            fullname = user.firstname + " " + user.lastname;
          }
        })
        var newRow = document.createElement("tr");
        newRow.classList.add("white-space-no-wrap");
        newRow.innerHTML = `
      <td>
        <img src="${imgpath}" class="img-fluid avatar avatar-30 avatar-rounded" alt="img23" />
        ${fullname}
      </td>
      <td class="pe-2">$${element.amount}</td>
      <td>${element.transaction_type}</td>
      <td>
        </svg>
        ${element.transaction_date}
      </td>
      <td class="text-warning">${element.status}</td>
        `;
  
        var tableBody = document.getElementById("myTableBody");
        tableBody.appendChild(newRow);
        
      });
      renderData(numberofTransaction, "tot")
  
    } catch (error) {
      
    }


        //pending transactions
        try {
          var numberofPending = 0;
          jsondata.transactions.forEach(element => {
            if (element.status == "pending"){
              numberofPending += 1
              var userid = element.user_id;
              var tx_id = element.transaction_id;
              var amount = element.amount;
              var fullname = "";
              var email = "";
              jsondata.users.forEach(user => {
                if (user.id == userid) {
                  fullname = user.firstname + " " + user.lastname;
                  email = user.email;
                }
              })
              var newRow = document.createElement("tr");
              newRow.classList.add("white-space-no-wrap");
              newRow.innerHTML = `
            <td>
              <img src="${imgpath}" class="img-fluid avatar avatar-30 avatar-rounded" alt="img23" />
              ${fullname}
            </td>
            <td class="pe-2">$${element.amount}</td>
            <td>${element.transaction_type}</td>
            <td>
              </svg>
              ${element.transaction_date}
            </td>
            <td class="text-warning">${element.status}</td>
            <td><a class="button" type="button"  onclick="confirmTransaction('${tx_id}', '${userid}', '${amount}', '${fullname}', '${email}')" style="border: 1px solid #FF971D;; padding: 0.2rem; color: white; background-color: #FF971D;">Confirm</a></td>
              `;
        
              var tableBody = document.getElementById("pendingtrans");
              tableBody.appendChild(newRow);

            }
          
            
          });
          renderData(numberofPending, "npt")  
      
        } catch (error) {
          
        }
   
    //User data
    try {
      jsondata.users.forEach(user => {
      var userid = user.id;
      var fullname = user.firstname + " " + user.lastname;
      var accountStatus = user.status;
      var planId = user.plan;
      var planName = "";
      var capital = 0;
      var profit = 0;
      var accountbalance = 0;
      jsondata.plan.forEach(plan => {
       console.log(plan)
        if (plan.plan_id == planId) {
        
          planName = plan.Plan_name;
        }
      })
      jsondata.portfolio.forEach(portfolio => {
        if (portfolio.user_id == userid) {
          capital = portfolio.capital;
          profit = portfolio.profit;
          accountbalance += parseFloat(portfolio.amount);
        }
      })
      var newRow = document.createElement("tr");
      newRow.innerHTML = `
      <form action = "#">
      <td><a href="../app/user-profile.html?user=${userid}">${fullname}</a></td>
      <td><select class="form-select-custom" style="padding:10px 15px 10px 15px;color:#fff;background-color:#202022;background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 16px 12px;
      border: 1px solid #69697a;
      border-radius: .5rem;" id="validationDefault04" required>
      <option selected disabled value="">${accountStatus}</option>
      <option>activate</option>
      <option>Deactivate</option>
  </select></td>
      <td><select class="form-select-custom" style="padding:10px 15px 10px 15px;color:#fff;background-color:#202022;background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 16px 12px;
      border: 1px solid #69697a;
      border-radius: .5rem;" id="validationDefault04" required>
      <option selected disabled value="">${planName}</option>
      <option>Elite Plan</option>
      <option>Deluxe Plan</option>
      <option>Executive/Platinum Plan</option>
  </select></td>
      <td><input type="text" placeholder="${capital} BTC" style="background-color: #202022; border: none; color: white;"> </td>
      <td><input type="text" placeholder="${profit} BTC" style="background-color: #202022; border: none; color: white;"></td>
      <td><input type="text" placeholder="${accountbalance} BTC" style="background-color: #202022; border: none; color: white;"></td>
      <td><a class="button" type="submit" style="border: 1px solid #FF971D;; padding: 0.2rem; color: white; background-color: #FF971D; border-radius: 0.2rem;">Save Changes</a></td>
      </form>
      `;

      var tableBody = document.getElementById("usertable");
      tableBody.appendChild(newRow);
    });

    } catch (error) {  }

    //loans
    var numberofloans = 0
    jsondata.loans.forEach(loan => {
      if (loan.status == "pending") { 
        numberofloans += 1;
        var loan_id = loan.loan_id;
        var userid = loan.user_id;
        var fullname = "";
        var amount = loan.amount;
        var country = "";
        var email = "";
        var phone = "";
  
        jsondata.users.forEach(user => {
          if (userid == user.id) {
            fullname = user.firstname + " " + user.lastname;
            country = user.country;
            email = user.email;
            phone = user.mobile1;
          }
        })
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td>
                                      <img src="../../assets/images/coins/02.png" class="img-fluid avatar avatar-30 avatar-rounded" alt="img23" />
                                     <a href="../app/user-profile.html">${fullname}</a> 
                                   </td>
                                   <td class="pe-2">$${amount}</td>
                                   <td>
                                      ${country}
                                   </td>
                                   <td>
                                      </svg>
                                      ${phone}
                                   </td>
                                   <td>
                                      ${email}
                                   </td>
                                   <td><a class="button" type="button"  onclick="approveLoan('${loan_id}', '${userid}', '${amount}', '${fullname}', '${email}')" style="border: 1px solid #FF971D; padding: 0.2rem; color: white; background-color: green;">Approve</a>
                                    <a class="button" type="button" onclick="rejectLoan('${loan_id}', '${userid}' , '${amount}', '${fullname}', '${email}')" style="border: 1px solid #FF971D; padding: 0.2rem; color: white; background-color: red;">Reject</a></td>
        `;
  
        var tableBody = document.getElementById("loantable");
        tableBody.appendChild(newRow);
      }
     
    });
    renderData(numberofloans, "loannum")  


 })

 function approveLoan(loanid, user, amount, name, email) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", path + "approveloan.php", true); // Replace "submit.php" with your PHP script URL
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhr.onload = async function() {
     if (xhr.status === 200) {
        // Request was successful
        console.log(xhr.responseText); // Log response from PHP script
        if (xhr.responseText == "success") {
          await sendMail(email, "Loan Approved 💸", "Your loan of " + amount + " has been approved")
          alert("Loan successfully Approved for " + name)
         window.location.reload(true)
        }
     } else {
        // Request failed
        console.error("Error:", xhr.status);
     }
  };
  xhr.send("userid=" + encodeURIComponent(user) + "&amount=" + encodeURIComponent(amount) + "&loan_id=" + encodeURIComponent(loanid));


}

 function rejectLoan(loanid, user, amount, name, email) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", path + "rejectloan.php", true); // Replace "submit.php" with your PHP script URL
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhr.onload = async function() {
     if (xhr.status === 200) {
        // Request was successful
        console.log(xhr.responseText); // Log response from PHP script
        if (xhr.responseText == "success") {
          await sendMail(email, "Loan Not Approved ❌", "Your loan of " + amount + " is not approved please contact support for more details  ")
          alert("Loan successfully Rejected for " + name) 
         window.location.reload()
        }
     } else {
        // Request failed
        console.error("Error:", xhr.status);
     }
  };
  xhr.send("userid=" + encodeURIComponent(user) + "&amount=" + encodeURIComponent(amount) + "&loan_id=" + encodeURIComponent(loanid))
  
 }


//  FetchData(path + "_transactions.php")
//  .then((data) => {
//     var totalusers = 0;
//     var jsondata = JSON.parse(data);
//     console.log("Data received:", jsondata);
//     jsondata.forEach(element => {
//         totalusers += 1;
//     });
//     renderData(totalusers,"userno");
    
//  })



 function sendMail(email, subject, message) {
     (function() {
         emailjs.init("oWSavVXBL8t6f0W-i");
     })();

     var params = {
         sendername: "Premium Trust Finance, Admin",
         to: email,
         subject: subject,
         //replyto: document.querySelector("#replyto").value,
         message: message
     };

     var serviceID = "service_2tjma45";
     var templateUD = "template_nt4g7oj";

     emailjs.send(serviceID, templateUD, params)
     .then( res => {
         //alert("email sent")
     }).catch();
 }

 function confirmTransaction(tx_id, user, amount, name, email) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", path + "approvetansaction.php", true); // Replace "submit.php" with your PHP script URL
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhr.onload = async function() {
     if (xhr.status === 200) {
        // Request was successful
        console.log(xhr.responseText); // Log response from PHP script
        if (xhr.responseText == "success") {
          await sendMail(email, "Credit Alert 💸", "amount of " + amount + " has been credited to your account")
          alert("Transaction successfully Approved for " + name)
          window.location.reload()
        }
     } else {
        // Request failed
        console.error("Error:", xhr.status);
     }
  };
  xhr.send("userid=" + encodeURIComponent(user) + "&amount=" + encodeURIComponent(amount) + "&tx_id=" + encodeURIComponent(tx_id));

 }