/* 
* @Author: Marte
* @Date:   2017-09-04 15:08:27
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 04:13:11
*/

// require(['config'],function(){
//     require(['jquery'],function(){
//         require(['common'],function(com){}
//     }
// }

function sign(){
    //验证码生成
    var showCode = $('.randomcode2');
    showCode.text(vCode());
    $('.changeCode').on('click',function(){
        showCode.text(vCode());
    });
    //init
    $('.phone_hint').html('请输入手机号码');
    $('.password2_hint').html('请输入密码');
    $('.code2_hint').html('请输入验证码');
    //登录判断
    $('#username2').on('blur',function(){
        if( $('#username2').val()==''){
            $('.phone_hint').html('手机号码不能为空');
        }else{
            var reg = /^1[34578]\d{9}$/;
            if(!reg.test($('#username2').val())){
                $('.phone_hint').html('手机号码不合法');
                return;
            }else{
                $('.phone_hint').html('手机号码合法');
            }
        }  
    }); 
    $('#password2').on('blur',function(){
        if( $('#password2').val()==''){
            $('.password2_hint').html('密码不能为空');
        }else{
            var reg = /^[^><\s]{6,19}$/;
            if(!reg.test($('#password2').val())){
                $('.password2_hint').html('密码不合法');
                return;
            }else{
                $('.password2_hint').html('密码合法');
            }
        }  
    });    
    $('#code2').on('blur',function(){
        if( $('#code2').val()==''){
            $('.code2_hint').html('验证码不能为空');
        }else if($('#code2').val().toLowerCase()!=showCode.text().toLowerCase()){
            $('.code2_hint').html('验证码错误，请重新输入');
            showCode.text(vCode());//验证码的值
            $('#code2').val("");
            return;
        }else{
            $('.code2_hint').html('验证码正确');
        }
     });
        $('#sub2').on('click',function(){
            if(($('#username2').val()!='') && ($('#password2').val()!='') && ($('#code2').val()!='')){
                $.ajax({
                    type: "GET",
                    url: "../mysql/login.php",
                    data: {
                        phone: $('#username2').val(),
                        password: $('#password2').val()
                    },
                    success: function(msg){
                        if(msg === 'fail'){
                           alert('未注册或者信息填写错误');
                        }else if(msg==='ok'){
                            var now = new Date();
                           if($('#self_login').is(':checked')) {
                                now.setDate(now.getDate()+7);
                                // Cookie.set('user',$('#username2').val(),now,'/');
                           }else{
                                now.setDate(now.getDate()+1);
                                
                           }
                           Cookie.set('user',$('#username2').val(),now,'/');
                            // window.location.reload();
                            alert('登录成功');
                            window.location.href='/index.html';
                        }
                    }
                });
            }else{
                alert('请输入登录信息！');
            }
        });
} 
    
