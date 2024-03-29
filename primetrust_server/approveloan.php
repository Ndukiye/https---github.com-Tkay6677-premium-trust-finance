<?php 
require_once 'connection.php';
$value = $_POST['userid'];
$amount = $_POST['amount'];
$loan_id = $_POST['loan_id'];

$sql = "UPDATE `loan` SET `status` = 'approved' WHERE `loan_id` = ". $loan_id;
$result = mysqli_query($conn, $sql);

$sql = "INSERT INTO `transactions`(`user_id`, `asset_id`, `amount`, `transaction_type`, `price`, `status`) VALUES ('$value','1','$amount','loan approved','$amount','successful')";
$result = mysqli_query($conn, $sql);

$sql = "INSERT INTO `portfolio`(`user_id`, `asset_id`, `amount`, `capital`, `profit`) VALUES ('$value','1','$amount',0,0)";
$result = mysqli_query($conn, $sql);

echo "success";