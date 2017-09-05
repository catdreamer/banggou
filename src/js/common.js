/* 
* @Author: lmm
* @Date:   2017-09-04 14:44:05
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-05 21:18:19
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
var Cookie = {
    /**
     * [设置cookie]
     * @param {String} name    [cookie名]
     * @param {String} val     [cookie值]
     * @param {[Date]} expires [有效期]
     * @param {[String]} path    [cookie路径]
     */
    set:function(name,val,expires,path){
        // document.cookie = 'cartlist=1234;expires=' + now
        var cookieStr = name + '=' + val;

        // 有效期
        if(expires){
            cookieStr += ';expires=' + expires.toUTCString();
        }

        // 设置路径
        if(path){
            cookieStr += ';path=' + path;
        }

        // 写入
        document.cookie = cookieStr;
    },
    get:function(name){
        // 先获取所有cookie
        var cookie = document.cookie;
        if(cookie.length === 0){
            return '';
        }

        // 拆分成数组
        cookie = cookie.split('; ');

        // 遍历cookie，找到想要的cookie值
        var res = '';
        cookie.forEach(function(item){
            var arr = item.split('=');

            if(arr[0] === name){
                res = arr[1];
            }
        });

        return  res;
    },
    remove:function(name){
        // 利用设置过期时间达到删除的效果。
        var now = new Date();
        now.setDate(now.getDate()-100);

        // document.cookie = name +'=xxx;expires=' + now.toUTCString();
        Cookie.set(name,null,now);
    }
}

       