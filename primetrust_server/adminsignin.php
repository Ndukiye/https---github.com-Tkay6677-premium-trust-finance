<?php 
header("Access-Control-Allow-Origin: *");
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = strtoupper($_POST['email']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM admin WHERE email='$email' AND password='$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        setcookie('isLoggedIn', $row["id"], time() + 3600, '/');
        header("Location:  ../dashboard/admin/dashboard.html");
    } else {
        header("Location:  ../dashboard/admin/sign-in.html?state=failed");
    }
    $result = mysqli_query($conn, $sql);
}
mysqli_close($conn);
?>