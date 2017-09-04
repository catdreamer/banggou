<?php

	include 'connect.php';
	
	// $username = isset($_GET['username']) ? $_GET['username'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';
	$phone = isset($_GET['phone']) ? $_GET['phone']: '';

	//查看用户名是否已经存在
	$sql = "select phone from users where phone='$phone'";
	$result = $conn->query($sql);

	// 如果用户名已经存在
	// 给前端返回一个fail
	if($result->num_rows>0){
		echo "fail";
	}else{
		// 密码md5加密
		$password = md5($password);

		$sql = "insert into users (username,password,phone) values('$username','$password','$phone')";


		// 获取查询结果
		$result = $conn->query($sql);

		if ($result) {
		    echo "插入数据成功";
		} else {
		    echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}

	
	

	// 释放查询内存(销毁)
	//$result->free();

	//关闭连接
	$conn->close();
?>