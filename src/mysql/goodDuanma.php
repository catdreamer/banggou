<?php
    // 连接数据库
    include 'connect.php';
    /*param 前端传count 商品数量*/
    $count = isset($_GET["count"])?$_GET["count"]:0;
    $sql = "select * from  duanma";
    $sql .= " limit 0,$count";
    // 获取查询结果
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    // 格式化数据
    $res = array(
        'qty'=>$count,
        'total'=>$conn->query('select count(*) from duanma')->fetch_row()[0],
        'data'=>$row,
        'status'=>200,
        'msg'=>'success'
    );
    //把结果输出到前台（得到json字符串）
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    //关闭连接
    $conn->close();
?>