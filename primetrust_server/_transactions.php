<?php
require_once 'connection.php';

$sql = "SELECT * FROM `transactions`";
$result = mysqli_query($conn, $sql);
$transactionsData = array();
while ($row = mysqli_fetch_assoc($result)) {
    $transactionsData[] = $row;
}


// Return the data as JSON
echo json_encode($transactionsData);