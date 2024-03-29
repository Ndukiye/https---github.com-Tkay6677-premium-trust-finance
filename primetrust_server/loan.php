<?php
require 'connection.php';
require_once 'loaduser.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_COOKIE['isLoggedIn'];
    $amount = $_POST['amount'];
    $pubkey = $_POST['pubkey'];
    $password = $_POST['pass'];

    $state = "";

    if ($data['password'] == $password) {
        $sql = "INSERT INTO `loan`(`user_id`, `amount`, `pubkey`, `status`) VALUES ('$id','$amount','$pubkey', 'pending')";
        $result = mysqli_query($conn, $sql);
        $state = "correctpassword";
    }else {
        $state = "incorrectpassword";
    }

    
    // $url = "";
    // if (isset($_SERVER['HTTPS'] && $_SERVER['HTTPS'] === 'on')) {
    //     $url = "https://";
    // }else {
    //     $url = "http://";
    // }

    // $url.=$_SERVER['HTTP_HOST'];
    $url = "http://www.premiumtrustfinance.io";
    header("Location: " . $url . "/dashboard/loan/loan.html?pass=$state");
}

mysqli_close($conn);
?>
