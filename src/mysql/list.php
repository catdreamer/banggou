<?php
	//引入其他php文件
	include 'connect.php';
	// 获取前端传过来的数据
	$pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 40;
	$category = isset($_GET['category']) ? $_GET['category'] : '';
    $gender = isset($_GET['gender']) ? $_GET['gender'] : '';
    $band = isset($_GET['band']) ? $_GET['band'] : '';
	// 编写sql语句
	$sql = "select * from goods";
    $count ="select count(*) from goods";
    // $ran = " limit $startIdx,$qty ";
    
	// 利用php条件语句拼接sql

    if($category){
        $sql .= " where category='$category'";
        $count ="select count(*) from goods where category='$category'";
    }
    if($gender){
        $sql .= " where gender='$gender'";
        $count ="select count(*) from goods where gender='$gender'";
    } 
    if($band){
        $sql .= " where band='$band'";
        $count ="select count(*) from goods where band='$band'";
    }
    // if($price){
    //     $sql .= " where band='$band'";
    //     $count ="select count(*) from goods where band='$band'";
    // }
    $startIdx = $qty*($pageNo-1);
    $sqls = " $sql limit $startIdx,$qty ";
    

	// 获取查询结果
	$result = $conn->query($sqls);

	
	$row = $result->fetch_all(MYSQLI_ASSOC);

	/*//释放查询结果集
    $result->close();*/

    // 格式化数据
    // select count(*) as value from goods where  gender='男';
    $res = array(
    	'pageNo'=>$pageNo,
    	'qty'=>$qty,
    	'total'=>$conn->query($count)->fetch_row()[0],
    	'data'=>$row,
    	'status'=>200,
    	'msg'=>'success'
    );

    //把结果输出到前台（得到json字符串）
    echo json_encode($res,JSON_UNESCAPED_UNICODE);


	// 释放查询内存(销毁)
	//$result->free();

	//关闭连接
	$conn->close();
?>