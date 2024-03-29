<?php
require_once 'connection.php';
// Function to fetch data from a table
function fetchData($con, $tableName) {
    $result = mysqli_query($con ,"SELECT * FROM $tableName");
    $data = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

// Fetch data from different tables
$users = fetchData($conn, "users");
$assets = fetchData($conn, "assets");
$transactions = fetchData($conn, "transactions");
$orders = fetchData($conn, "orders");
$portfolio = fetchData($conn, "portfolio");
$loans = fetchData($conn, "loan");
$plan = fetchData($conn, "plan");
$tier = fetchData($conn, "tier");

// Assemble data into an array
$data = [
    'users' => $users,
    'assets' => $assets,
    'transactions' => $transactions,
    'orders' => $orders,
    'portfolio' => $portfolio,
    'loans' => $loans,
    'plan' => $plan,
    'tier' => $tier
];

// Convert data to JSON format
$json_data = json_encode($data);

// Output JSON
echo $json_data;

// Close connection
mysqli_close($conn);

// require_once 'connection.php';


// $sql = "SELECT * FROM users";
// $result = mysqli_query($conn, $sql);


// if (mysqli_num_rows($result) > 0) {
//     $alldata = array();
//     while ($row = mysqli_fetch_assoc($result)) {
//         $row['id'];
//         $Data = getAssets("user_id", $row['id'], "transactions" ,$conn);
//         $row['transactions'] = $Data;

//         $row['id'];
//         $Data = getAssets("user_id", $row['id'], "transactions" ,$conn);
//         $row['transactions'] = $Data;
        
//         $alldata[] = $row;
//     }
//     echo json_encode($alldata);
// } else {
//     echo json_encode(array("message" => "No portfolio data found."));
// }

// mysqli_close($conn);

// function getAssets($key, $value, $table ,$conn) {
//     $sql = "SELECT * FROM $table WHERE $key='$value'";
//     $result = mysqli_query($conn, $sql);
//     $assetsData = array();
//     while ($row = mysqli_fetch_assoc($result)) {
//         $assetsData[] = $row;
//     }
//     return $assetsData;
// }
?>
