<?php

require_once 'connection.php';

$id = $_COOKIE['isLoggedIn'];

$sql = "SELECT * FROM transactions WHERE user_id='$id'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $portfolioData = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $portfolioData[] = $row;
    }
    echo json_encode($portfolioData);
} else {
    echo json_encode(array("message" => "No transactions data found."));
}

mysqli_close($conn);

