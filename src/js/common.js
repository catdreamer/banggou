/* 
* @Author: lmm
* @Date:   2017-09-04 14:44:05
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-04 21:20:38
*/

// tab切换
;function switchTab(tabele,contele){
    //初始化
    $(tabele).eq(0).addClass('active');
    $(contele).eq(0).nextAll().hide();
    //点击事件
    $(tabele).on('click',function(){
        var idx = $(this).index();
        $(this).addClass('active').siblings(tabele).removeClass('active');
        $(contele).eq(idx).show().siblings(contele).hide();
    });
}
//随机验证码
function vCode(){
    var arr_char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var res = '';
    for(var i=0;i<4;i++){
        var idx = parseInt(Math.random()*arr_char.length);
        res += arr_char[idx];
    }
    return res;
}


    

       