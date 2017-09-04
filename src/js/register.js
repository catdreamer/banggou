/* 
* @Author: lmm
* @Date:   2017-09-04 14:03:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-04 21:50:11
*/


// 注册
    
    function regist(){
        var $usernameP = $('#usernameP');
        var $output_usernameP= $('.output_usernameP');
        var $Rsub = $('#Rsub');
        var $Rsub2 = $('#Rsub2');
        var $username = $('#username');
        var $output_username= $('.output_username');
        var $Rsub2 = $('#Rsub2');
        var showCode = $('.showcode');
        
        showCode.text(vCode());
        $('.changeCode').on('click',function(){
            showCode.text(vCode());
        });
        // //手机号验证
        $usernameP.on('blur',function(){
            var reg = /^1[34578]\d{9}$/;
            if($usernameP.val().length<1){
                $output_usernameP.html("手机号不能为空");
                return;
            }
            if(!reg.test($usernameP.val())&& $usernameP.val()>=1){
                $output_usernameP.html("手机号不合法");
                return;
            }
            $.ajax({
                url: '../mysql/reg.php',
                type: 'get',
                data: {phone: $usernameP.val()},
                success: function(msg){
                    if(msg == 'fail'){
                        $output_usernameP.html($usernameP.val()+'太受欢迎，请换一个');
                    }else if(msg=='ok'){
                        $Rsub.on('click',function(){
                            registIn();
                        });
                    }
                }
            
            });
        });
        //用户名验证
        $username.on('blur',function(){
            var reg = /^[a-z][\da-z\-]{5,19}$/i;
            if($username.val().length<1){
               $output_username.html("用户名不能为空"); 
               return;
            }
            if(!reg.test($username.val())&& $username.val().length>0){
                $output_username.html("用户名不合法");
                return;
            }
            $.ajax({
                url: '../mysql/reg.php',
                type: 'get',
                data: {username: $username.val()},
                success: function(msg){
                    if(msg == 'fail'){
                        $output_username.html($username.val()+'太受欢迎，请换一个');
                    }else if(msg=='ok'){
                        $output_username.html('抢占用户名成功');
                        $Rsub2.on('click',function(){
                            registIn();
                        });
                    }
                }
            
            });
        });
    }
    function registIn(){
        var $output_psd = $('.output_psd');
        var $output_code = $('.output_code');
        var $usernameP = $('#usernameP');
        var $password = $('#password');
        // var $inCode = $("#code").text();
        var reg = /^1[34578]\d{9}$/;
        if(!reg.test($usernameP.val())){
           $output_usernameP.html("手机号不合法");
            // alert('注册手机号不合法');
            return;
        }
         var $output_psd = $('.output_psd');
            var $password = $("#password2");
            var reg = /^[a-z][\da-z\-]{5,19}$/i;
            if(!reg.test($username.val())){
                $output_username.html("用户名不合法");
                // alert('注册用户名不合法');
                return;
            }
        var reg=/^\S{6,19}$/;
        if(!reg.test($password.val())){
            $output_psd.html('密码不合法');
            return;
        }
       
        if($("#code").val().toLowerCase()!= $('.showcode').text().toLowerCase()){
            $output_code.html('验证码错误，请重新输入');
           $('.showcode').text(vCode());
            $("#code").val()("");
            return;
        }
        $.ajax({
            url: '../mysql/reg.php',
            type: 'get',
            data: {
                // username: $username.val(),
                password: $password.val(),
                phone: $usernameP.val()
            },
            success: function(msg){
                if(msg === 'success'){
                    alert('已经注册成功，亲可以去浪了');
                }
            }
        });
        // alert('恭喜您'+$username.val()+"注册成功");
        
        // setTimeout(function(){
        //     window.location.reload();
        //     $output_username.html("");
        // },1000);
    }
