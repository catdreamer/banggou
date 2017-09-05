<?php

	// 配置参数
include 'connect.php';
	
	$phone = isset($_GET['phone']) ? $_GET['phone']: '';
	// $username = isset($_GET['username']) ? $_GET['username'] : '';
	// $password = isset($_GET['password']) ? $_GET['password'] : '';
	// echo strlen($password);

	
	$sql = "select * from users";
	$result = $conn->query($sql);
	// echo $username;
	// echo $phone;
	if($result->num_rows>0){
		//说明表中的数据不为空
		//查看用户名是否已经存在
		$sql = "select phone from users where phone='$phone'";
		$result = $conn->query($sql);
		// 如果手机号码已经存在
		// 给前端返回一个fail
		if($result->num_rows>0){
			echo "fail";
		}else{
			echo "success";
		}
	}else{
		//表中的数据为空
		echo "success";
	}
	// 释放查询内存(销毁)
	// $result1->free();

	//关闭连接
	$conn->close();		
	
?>