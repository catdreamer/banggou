/* 
* @Author: lmm
* @Date:   2017-09-04 14:03:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-05 21:06:26
*/


// 注册
function register(){
    var showCode = $('.showcodeP');
    showCode.text(vCode());
    $('.changeCode').on('click',function(){
       showCode.text(vCode());
    });
    
    //init
    $('.output_usernameP').html('请输入手机号码');
    $('.output_psdP').html('请输入密码');
    $('.output_codeP').html('请输入验证码');
    //验证
    $('#usernameP').on('blur',function(){
        if($('#usernameP').val()==''){
              $('.output_usernameP').html("手机号不能为空");
            return;
        }else{
             var reg = /^1[34578]\d{9}$/;
             if(!reg.test($('#usernameP').val())){
                $('.output_usernameP').html("手机号不合法");
                 return;
             }else{
                $('.output_usernameP').html("手机号合法");
                $.ajax({
                    url: '../mysql/reg.php',
                    // type: 'GET',
                    data: {
                        phone: $('#usernameP').val()
                        // username: 'auto'
                    },
                    success: function(msg){
                        console.log(msg);
                        if(msg === 'fail'){
                            $('.output_usernameP').html($('#usernameP').val()+'该手机号已经注册过');
                            return;
                        }else if(msg==='success'){
                           $('.output_usernameP').html('该手机号可注册');  
                           return; 
                        }
                    }
                            
                });

            }
        }
        
    });
    $('#passwordP').on('blur',function(){
        if( $('#passwordP').val()==''){
            $('.output_psdP').html('密码不能为空');
        }else{
            var reg = /^[^><\s]{6,19}$/;
            if(!reg.test($('#passwordP').val())){
                $('.output_psdP').html('密码不合法');
                return;
            }else{
                $('.output_psdP').html('密码合法');
            }
        }  
    });    
    $('#codeP').on('blur',function(){
        if( $('#codeP').val()==''){
            $('.output_codeP').html('验证码不能为空');
        }else if($('#codeP').val().toLowerCase()!=showCode.text().toLowerCase()){
            $('.output_codeP').html('验证码错误，请重新输入');
            showCode.text(vCode());//验证码的值
            $('#codeP').val("");
            return;
        }else{
            $('.output_codeP').html('验证码正确');
        }
    });
    $('#Rsub').on('click',function(){
        if(($('#usernameP').val()!='') && ($('#passwordP').val()!='') && ($('#codeP').val()!='')){
            var reg = /^1[34578]\d{9}$/;
            if(!reg.test($('#usernameP').val())){
                alert('请输入合法的手机号才可注册！');
                $('#usernameP').val('');
                $('#passwordP').val('');
                $('#codeP').val('');
            }else{
                if($('#passwordP').val().length>5){
                   $.ajax({
                       type: "GET",
                       url: "../mysql/reg1.php",
                       data: {
                           phone: $('#usernameP').val(),
                           password: $('#passwordP').val()
                       },
                       success: function(res){console.log(res)
                           if(res ==='ok'){
                                window.location.reload();
                               alert('已经注册成功，亲可以去买买买啦');
                               window.location.href='http://localhost:1000/html/login';
                           }else{
                               alert('注册失败，请填写正确的注册信息');
                           }
                       }
                   });
                }else{
                    alert('请输入合法的密码信息！');
                    $('#usernameP').val('');
                    $('#passwordP').val('');
                    $('#codeP').val('');
                }
            }   
        }else{
            alert('请输入完整注册信息！');
        }
    });
}
