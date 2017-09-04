<?php
    $email=isset($_GET['email'])?$_GET['email']:'';
    $emailsign=isset($_GET['emailsign'])?$_GET['emailsign']:'';
    $emailIn=isset($_GET['emailIn'])?$_GET['emailIn']:'';
    $password=isset($_GET['password'])?$_GET['password']:'';
    // 文件地址
    $file_url='../data/sign.json';
    //打开文件
    $myfile = fopen($file_url,'r');
    //读取打开的文件
    $content=fread($myfile,filesize($file_url));

    $arr=json_decode($content,true);
    if($email!=""){
        for($i=0;$i<count($arr);$i++){
            if($arr[$i]['email']==$email){
                $num=$i;
                break;
            }else{$num=-1;}
        }
        if($num>=0){
            echo "no";
        }else{
            echo "yes";
        }
    }
    if($emailIn!=""){
        for($j=0;$j<count($arr);$j++){
            if($arr[$j]['email']==$emailIn){
                $num1=$j;
                break;
            }else{$num1=-1;}
        }
        if($num1==-1){
            $arr[]=array('email'=>$emailIn,'password'=>$password);
            fclose($myfile);

            // 以写入模式打开文件
            $myfile = fopen($file_url, 'w');

            //重新写入文件
            fwrite($myfile, json_encode($arr));
        }
    }
    if($emailsign!=""){
        for($i=0;$i<count($arr);$i++){
            if($arr[$i]['email']==$emailsign&&$arr[$i]['password']==$password){
                $num=$i;
                break;
            }else{$num=-1;}
        }
        if($num>=0){
            echo "no";
        }else{
            echo "yes";
        }
    }
    


?>