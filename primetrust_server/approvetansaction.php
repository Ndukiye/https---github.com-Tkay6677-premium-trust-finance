<?php 
require_once 'connection.php';
$value = $_POST['userid'];
$amount = $_POST['amount'];
$tx_id = $_POST['tx_id'];

$sql = "UPDATE `transactions` SET `status` = 'successful' WHERE `transaction_id` = ". $tx_id;
$result = mysqli_query($conn, $sql);


$sql = "INSERT INTO `portfolio`(`user_id`, `asset_id`, `amount`, `capital`, `profit`) VALUES ('$value','1','$amount',0,0)";
$result = mysqli_query($conn, $sql);

echo "success";