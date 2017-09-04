<?php
	/*
		sql语句返回值
			* select : 数据
			* insert : true/false
			* delect : true/false
			* update : true/false
		XSS跨域脚本攻击
			* 永远不要相信客户端输入的信息的安全性
			* 对输入进行过滤
			* 对输出进行处理
	 */
	include 'connect.php';
	
	// $username = isset($_GET['username']) ? $_GET['username'] : '';
	$phone = isset($_GET['phone']) ? $_GET['phone'] : '';

	//查看用户名是否已经存在
	// $sql = "select username from users where username='$username'";
	//查看手机号是否已经存在
	$sql = "select phone from users where phone='$phone'";
	$result = $conn->query($sql);

	// 如果用户名或者手机号已经存在
	// 给前端返回一个fail
	if($result->num_rows>0){
		echo "fail";
	}else{
		echo "ok";
		$password = isset($_GET['password']) ? $_GET['password'] : '';
		if($password==""){
			return;
		}else{
			// 密码md5加密
			$password = md5($password);
			$sql = "insert into users (username,password,phone) values('$username','$password','$phone')";


			// 获取查询结果
			$result = $conn->query($sql);

			if ($result) {
			    echo "success";
			} else {
			    echo "Error: " . $sql . "<br>" . $conn->error;
			}
		}
		


		// /*
		// 	password_hash()     //对密码加密.
		// 		* PASSWORD_DEFAULT：Bcrypt加密算法，字段超过60个字符长度，
		// 		* PASSWORD_BCRYPT：字符串长度总为60。
		// 	password_verify()    //验证已经加密的密码，检验其hash字串是否一致.
		//  */
		// // $password = password_hash($password,PASSWORD_DEFAULT);

		// $sql = "insert into users (username,password,phone) values('$username','$password','$phone')";


		// // 获取查询结果
		// $result = $conn->query($sql);

		// if ($result) {
		//     echo "success";
		// } else {
		//     echo "Error: " . $sql . "<br>" . $conn->error;
		// }
	}

	
	

	// 释放查询内存(销毁)
	//$result->free();

	//关闭连接
	$conn->close();
?>