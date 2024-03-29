<?php
require_once 'connection.php';

$sql = "SELECT * FROM `users`";
$result = mysqli_query($conn, $sql);
$usersData = array();
while ($row = mysqli_fetch_assoc($result)) {
    $usersData[] = $row;
}


// Return the data as JSON
echo json_encode($usersData);