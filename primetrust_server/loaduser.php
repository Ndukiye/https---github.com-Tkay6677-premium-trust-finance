<?php
require_once 'connection.php';
// Assuming your PHP script fetches some data from a database or another source
$id = $_COOKIE['isLoggedIn'];

$sql = "SELECT * FROM `users` WHERE `id` = $id";
$result = mysqli_query($conn, $sql);

$data = mysqli_fetch_assoc($result);


// Return the data as JSON
echo json_encode($data);

