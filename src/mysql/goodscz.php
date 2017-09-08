
	<?php
	include 'connect.php';
	
	$id = isset($_GET['id']) ? $_GET['id'] : '';
	$color = isset($_GET['color']) ? $_GET['color'] : '';
	$size = isset($_GET['size']) ? $_GET['size'] : '';
	
	$sql = "select * from goodlist";
	
	
// select * from goodlist where goodnum = 713436 and size = 170 and color=4;

	$sql .= " where goodnum='$id'";

	
	if($color){
		     $sql .= "and color='$color' and havenum>0";
		}
	// echo $sql;
	if($size){
	    $sql .= " and size='$size' and havenum>0";
	}
	// if($color&&$size){
	// 	$sql .= " and color='$color' and size='$size'";
	// }	
	// 获取查询结果
	$result = $conn->query($sql);

	// 使用查询结果集
	// $row = $result->fetch_assoc();
	$row = $result->fetch_all(MYSQLI_ASSOC);
	//释放查询结果集
    $result->close();

    //把结果输出到前台
    echo json_encode($row,JSON_UNESCAPED_UNICODE);


	// 释放查询内存(销毁)
	//$result->free();

	//关闭连接
	$conn->close();
?>