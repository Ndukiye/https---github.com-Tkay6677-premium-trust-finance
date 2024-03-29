<?php
require 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
    $transactionpin = $_POST['pno'];
    $profilepic = $_POST['file'];
    

    // Check if email already exists
    $checkEmailSql = "SELECT * FROM users WHERE email='$email'";
    $checkEmailResult = mysqli_query($conn, $checkEmailSql);

    if (mysqli_num_rows($checkEmailResult) > 0) {
        // Email already exists, display an error or take appropriate action
        echo "Error: Email already exists";
        mysqli_close($conn);
        exit(); // Stop execution if email exists
    }

    // If email doesn't exist, proceed with the user registration
    $sql = "INSERT INTO `users`(`firstname`, `lastname`, `address1`, `address2`, `country`, `mobile1`, `mobile2`, `email`, `city`, `username`, `password`, `transpin`, `filepath`, `status`, `plan`) VALUES ('$firstname','$lastname','$add1','$add2','$country','$mobile1','$mobile2','$email','$city','$username','$password','$transactionpin', 'NA', 'active', '1')";
    $result = mysqli_query($conn, $sql);

    $sql = "SELECT * FROM users ORDER BY id DESC LIMIT 1";
    $result = mysqli_query($conn, $sql);
    $data = mysqli_fetch_assoc($result);
    $userid = $data['id'];

    $sql = "INSERT INTO `tier`(`user_id`,`capital`, `profit`) VALUES ('$userid','0','0')";
    $result = mysqli_query($conn, $sql);

    header("Location: ../dashboard/auth/confirm-mail.html?email=$email");
}

mysqli_close($conn);
?>
