<?php 
require_once 'connection.php';
$value = $_POST['userid'];
$amount = $_POST['amount'];
$loan_id = $_POST['loan_id'];


$sql = "UPDATE `loan` SET `status` = 'rejected' WHERE `loan_id` = ". $loan_id;
$result = mysqli_query($conn, $sql);

echo "success";