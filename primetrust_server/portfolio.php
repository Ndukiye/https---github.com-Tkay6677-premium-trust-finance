<?php

require_once 'connection.php';

$id = $_COOKIE['isLoggedIn'];

$sql = "SELECT * FROM portfolio WHERE user_id='$id'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $portfolioData = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $assetsId = $row['asset_id'];
        // Fetch assets for each portfolio entry
        $assetsData = getAssets($assetsId, $conn);
        // Merge portfolio data with associated assets
        $row['assets'] = $assetsData;
        $portfolioData[] = $row;
    }
    echo json_encode($portfolioData);
} else {
    echo json_encode(array("message" => "No portfolio data found."));
}

mysqli_close($conn);

function getAssets($assetsId, $conn) {
    $sql = "SELECT * FROM `assets` WHERE asset_id='$assetsId'";
    $result = mysqli_query($conn, $sql);
    $assetsData = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $assetsData[] = $row;
    }
    return $assetsData;
}
?>
