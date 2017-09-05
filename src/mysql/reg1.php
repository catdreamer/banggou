<?php
	
	
	include 'connect.php';


	$username = isset($_GET['username']) ? $_GET['username'] : '';
	$phone = isset($_GET['phone']) ? $_GET['phone'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';
	
	
			
		
			// 密码md5加密
			$password = md5($password);
			$sql = "insert into users (username,password,phone) values('$username','$password','$phone')";


			// 获取查询结果
			$result = $conn->query($sql);

			if ($result) {
			    echo "ok";
			} else {
			    echo "Error: " . $sql . "<br>" . $conn->error;
			}
	
		

	

	// 释放查询内存(销毁)
	// $result->free();

	//关闭连接
	$conn->close();
?>