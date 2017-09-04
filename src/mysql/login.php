<?php
	include 'connect.php';
	$phone = isset($_GET['phone']) ? $_GET['phone'] : '';
	// $username = isset($_GET['username']) ? $_GET['username'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';
	echo $phone;
	// 密码md5加密
	$password = md5($password);
	
	echo $password;
	// $sql = "select * from users where username='$username' and password='$password'";
	$sql = "select * from users where phone='$phone' and password='$password'";
	

	// 获取查询结果
	$result = $conn->query($sql);

	$row = $result->fetch_row();

	// print_r($row[0]);

	if($row[0]){
		echo 'ok';
	}else{
		echo 'fail';
	}
	

	$result->free();


	$conn->close();
?>