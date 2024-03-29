<?php
require 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_COOKIE['isLoggedIn'];
    $firstname = $_POST['fname'];
    $lastname = $_POST['lname'];
    $add1 = $_POST['add1'];
    $add2 = $_POST['add2'];
    $country = $_POST['country'];
    $mobile1 = $_POST['mob1'];
    $mobile2 = $_POST['mob2'];
    $email = strtoupper($_POST['email']);
    $city = $_POST['city'];
    $username = $_POST['uname'];
    $password = $_POST['pass'];
    // $transactionpin = $_POST['pno'];
    // $profilepic = $_POST['file'];
    // "UPDATE `users` SET `firstname`='$firstname',`lastname`='$lastname',`address1`='$add1',`address2`='$add2',`country`='$country',`mobile1`='$mobile1',`mobile2`='$mobile2',`email`='$email',`city`='$city',`username`='$username',`password`='$password',`transpin`='$transactionpin' WHERE id = $id";


    $sql = "UPDATE `users` SET `firstname`='$firstname',`lastname`='$lastname',`address1`='$add1',`address2`='$add2',`country`='$country',`mobile1`='$mobile1',`mobile2`='$mobile2',`email`='$email',`city`='$city',`username`='$username',`password`='$password' WHERE id = $id";

    $result = mysqli_query($conn, $sql);
    $url = "";
    if (null != $_SERVER['HTTPS'] && $_SERVER['HTTPS'] === 'on') {
        $url = "https://";
    }else {
        $url = "http://";
    }

    $url.=$_SERVER['HTTP_HOST'];
    header("Location: " . $url . "/dashboard/app/user-add.html?state=success");
}

mysqli_close($conn);
?>
