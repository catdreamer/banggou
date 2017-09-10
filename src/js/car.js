/* 
* @Author: Marte
* @Date:   2017-09-10 18:30:03
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 05:00:53
*/

require(['config'],function(){
    require(['jquery'],function($){ 
        $(function($){
                // $('.headtop_wrap').load('/html/public.html .headtop_c');
                $('.last_bottom_wrap').load('/html/public.html .last_bottom_c');
                $('#footer').load('/html/public.html .footer_c');
                $('#box_top').load('/html/public.html #topandconsult');
            });
        // 先查看当前购物车有无cookie
        var cookies = document.cookie;
        if(cookies.length>0){
            cookies = cookies.split('; ');
            cookies.forEach(function(item){
                var arr = item.split('=');
                if(arr[0] == 'cartlist'){
                    arr_goods = JSON.parse(arr[1]);
                    console.log(arr_goods);
                    var totalnum = [];
                    var goods = arr_goods.map(function(item){
                        var qty = item.qty*1; 
                        var sb=item.price;
                        var length = item.price.length
                        var mon = sb.substring(1, length);
                        var money =qty * mon;
                        totalnum.push(item.qty);
                        var totaln = '';
                        totalnum.forEach(function(ite){
                            console.log(ite)
                            totaln = Number(totaln)+Number(ite);
                        });
                        require(['common'],function(){
                            var now = new Date();
                            now.setDate(now.getDate()+1);
                            Cookie.set('bags',totaln,now,'/');
                        });
                       
                        return `
                        <ul class="car_single_goods clear">                      
                            <li class="single_01">
                                <input type="checkbox" class="single_goods_checkbox" id="ingle_goods_checkbox">
                            </li>                                                 
                            <li class="single_02 clear">
                                <dl class="clear">
                                    <dt>
                                        <a href="/html/detail.html?id=${item.guid}">
                                            <img src="${item.imgurl}">
                                        </a>
                                    </dt>
                                    <dd>
                                        <a href="">
                                            <p title="${item.title}">${item.title}</p>
                                            </a>
                                        <i>商品编号：${item.guid}</i>
                                        <em class="su14">该商品支持14天退换货</em>
                                    </dd>
                                </dl>     
                            </li>              
                            <li class="single_03">
                                <p>颜色：${item.color}</p>
                                <p>尺码：${item.size}</p>
                            </li>                 
                            <li class="single_04">
                                <i>${item.sale}</i>
                                <em class="price">${item.price}</em>
                                <ul id="main_box">
                                    <li class="select_box"> 
                                        <div>修改优惠</div>
                                            <ul class="son_ul" style="display: none;">
                                                <li version="-1" value="不使用活动优惠" title="不使用活动优惠" class="mbshop_cart_1127_single_06_chose">
                                                    <label class="mbshop_radio">
                                                        <input value="-1" type="radio">
                                                        <i class="iconfont"></i>
                                                        <b>不使用活动优惠</b>
                                                    </label>
                                                </li>
                                            </ul>
                                    </li>        
                                </ul>                  
                            </li>                    
                            <li class="single_05 clear">
                                <span name="num-edit-cut" class="mbshop_cart_1127_single_label_left dec">-</span>
                                    <input type="text" value="${item.qty}" name="numEdit" class="mbshop_cart_1127_single_goods_num text">      <span name="num-edit-add" class="mbshop_cart_1127_single_label_right add">+</span>
                            </li>                 
                            <li class="single_07">￥${money}</li>
                           
                            <li class="single_09">
                                <a href="javascript:void(0);" class="in_favorites" name="245353">移入我的点赞</a>         <a href="javascript:void(0);" class="delete_goods">删除</a>
                            </li>    
                        </ul>`
                    }).join('');
                    $('.single_good').html(goods); 
                }
            })
        }
        //购物车操作
        //购物车商品数量
         // console.log(totalnum);
        // var wo =$('.car_single_goods').find('.single_05 .text').val();
        // console.log(wo)
        //// 减
        $('.car_single_goods').on('click','.dec',function(){
            var val = $(this).next('.text').val();
            val--;
            
            
            if(val>=1){
                var num = $(this).next('.text').val(val).val();
                console.log(num)

             }else{
                 var num =$(this).next('.text').val('1').val();
                 console.log(num)
             }
             var mon = $(this).parent().parent()
            .find('.single_04').find('.price').text()
            .slice(1,3);
            var money =num * mon;
             $(this).parent().next().text(money);
        });
        // 加
        $('.car_single_goods').on('click','.add',function(){
            var val = $(this).prev('.text').val();
            val++;
            var num =$(this).prev('.text').val(val).val();
            // console.log(num)
            var mon = $(this).parent().parent()
            .find('.single_04').find('.price').text()
            .slice(1,3);
            var money =num * mon;
            $(this).parent().next().text(money);
           
        });

        // //已选商品数
        // var val = []

        $('#ingle_goods_checkbox').on('click',function(){
            $(this).addClass('checked');
            // var val =$(this).parent().parent().find('.single_05').find('.text').val();
            // console.log(val)
        });
        // console.log($('#ingle_goods_checkbox:checked'))
        // $('.checked').
        // var num =
        // $('.checkgood').text(num);
        //结算事件
        require(['common'],function(){
            // readC();
            $('.gopaid').on('click',function(){
                if($('.single_goods_checkbox').is(':checked')) {
                    var userName = Cookie.get('user');
                    if(userName==''){
                        alert('您好，请登录，点击进入登录页面');
                        window.location.href='/html/login';
                        // $('.heaerRa').html(userName+',您好');                
                        // $('.tuichu').css('display','block'); 
                    }else{
                        alert('可以结算，跳转支付页面中。。')
                    }
                }else{
                    alert('您好，选择商品之后才可以进行结算');
                }
                 
            });
            
            
        });
        
        
    });

});
