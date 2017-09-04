/* 
* @Author: Marte
* @Date:   2017-09-04 15:08:27
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-04 21:29:40
*/

function sign(){ 
    var showCode = $('.randomcode2');
    showCode.text(vCode());
    $('.changeCode').on('click',function(){
        showCode.text(vCode());
    });
    $('#sub2').on('click',function(){
        var reg = /^1[34578]\d{9}$/;
        if(!reg.test($('#username2').val())){
            $('.phone_hint').html('手机号码不合法');
            return;
        }
        var reg=/^\S{6,19}$/;
            if(!reg.test($('#password2').val())){
                $('.password2_hint').html('密码不合法');
                return;
            }
        var _showCode=showCode.text();

            if($('#code2').val().toLowerCase()!=_showCode.toLowerCase()){
                alert('验证码错误，请重新输入');
                showCode.text(vCode());//验证码的值
                $('#code2').val("");
                return;
            }
            
        $.ajax({
            type: "get",
            url: "../mysql/login.php",
            data: {
            phone:$('#username2').val(),
            password:$('#password2').val()
            },
            success: function(msg){
                if(msg === 'fail'){
                   alert('未注册或者密码错误');
                }else if(msg==='ok'){
                    alert("登录成功");
                    // setTimeout(function(){
                    //     output.html("");
                    //     window.location.href="../index.html";
                    // },2000);
                }
            }
        });
    });
}