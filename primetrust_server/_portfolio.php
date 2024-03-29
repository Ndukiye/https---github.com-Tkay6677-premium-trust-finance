<?php
require_once 'connection.php';

$sql = "SELECT * FROM `portfolio`";
$result = mysqli_query($conn, $sql);
$portfolioData = array();
while ($row = mysqli_fetch_assoc($result)) {
    $portfolioData[] = $row;
}


// Return the data as JSON
echo json_encode($portfolioData);