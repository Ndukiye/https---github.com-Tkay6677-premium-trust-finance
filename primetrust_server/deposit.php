<?php
require_once 'connection.php';

// Check if the form data is received
if(isset($_POST['amount'])) {
    // Retrieve form data
    $amount = $_POST['amount'];
    $pubkey = $_POST['depositaddress'];
    $id = $_COOKIE['isLoggedIn'];

    // Prepare and execute SQL query
    $sql = "INSERT INTO `transactions`(`user_id`, `asset_id`, `amount`, `transaction_type`, `price`, `pubkey`, `status`) VALUES ('$id','1','$amount','deposit','$amount', '$pubkey','pending')";
    $result = mysqli_query($conn, $sql);

    // Check if SQL query is successful
    if($result) {
        // Send response if successful
        echo "success";
    } else {
        // Send error response if SQL query fails
        echo "error: " . mysqli_error($conn);
    }
} else {    
    // Send error response if form data is not received
    echo "error: Form data not received";
}
?>
