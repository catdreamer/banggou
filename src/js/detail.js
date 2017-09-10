/* 
* @Author: Marte
* @Date:   2017-09-07 17:09:55
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-10 19:25:03
*/
require(['config'],function(){
    require(['jquery'],function($){ 
        $(function($){
                $('.headtop_wrap').load('/html/public.html .headtop_c');
                $('#header').load('/html/public.html .header_c');
                $('#nav').load('/html/public.html .nav_ul');
                $('.last_bottom_wrap').load('/html/public.html .last_bottom_c');
                $('#footer').load('/html/public.html .footer_c');
                $('#box_top').load('/html/public.html #topandconsult');
                goodDetail();
                auto();
                changeNum();
                require(['common'],function(){
                  //返回顶部
                  toTop();
                    
                });
                //按钮事件
                $('.addbuyBag').on('click',function(){
                    $('.account').css('display','block');
                });
                $('.account_title').on('click',function(){
                    $('.account').css('display','none');
                });
                $('.cshop').on('click',function(){
                    $('.account').css('display','none');
                });
                //结算
                $('.ac').on('click',function(){ console.log(7777)
                    // 添加到购物车
                   var arr_goods = [];
                   // 先查看当前购物车有无cookie
                   var cookies = document.cookie;
                   if(cookies.length>0){
                        cookies = cookies.split('; ');
                        cookies.forEach(function(item){
                        var arr = item.split('=');
                           if(arr[0] == 'cartlist'){
                               arr_goods = JSON.parse(arr[1]);
                           }
                       })
                   }
                    var qty = $('.text').val()*1;
                    var goodnum = $('.bianhao').text();
                    var color = $('.show_cdes').text();
                    var size =$('.show_size').text();
                   // 如何判断cookie中是否已经存在当前商品
                   // arr_goods = [{guid:1,title:xx}，{guid:2,title:xx}，{guid:3,title:xx}]
                   for(var i=0;i<arr_goods.length;i++){
                    if((arr_goods[i].guid === goodnum )&&(arr_goods[i].color === color)&&(arr_goods[i].size === size)){
                        
                        arr_goods[i].qty = qty + parseInt(arr_goods[i].qty); console.log( arr_goods[i].qty);
                        break;
                    }
                   }
                   // arr_goods中不存在当前商品
                   if(i===arr_goods.length){
                    // 获取点击按钮对应商品信息
                    var goods = {
                        // 商品id
                        guid:$('.bianhao').text(),
                        title:$('.good_title').text(),
                        imgurl:$('.autocolor .active img').attr('src'),
                        price:$('.price').text(),
                        color:$('.show_cdes').text(),
                        size: $('.show_size').text(),
                        sale:$('.before').text(),
                        qty:$('.text').val()
                    }
                    arr_goods.push(goods);
                   }
                   document.cookie = 'cartlist=' + JSON.stringify(arr_goods);
                });
                

       })
    })
});
function big1(){
    //初始化
    $(".container img").click(function(){
        $("#move").show();
        var src =$(this).attr('src');
        var index = $(".smallPic li").index($(this));
        $(".bigPicBox img").attr("src", src);
       
    })

    //鼠标居中
    var oMove     = $("#move");//移动
    var oBig      = $(".normalPic");//正常的图
    var oSuperBig = $(".bigPicBox2");//放大的图
    var oSuperDiv = $(".bigPic");//放大的图的父div

    /*放大镜效果*/
    /*
     * 1,当滑入时,鼠标定点在oMove中间的位置
     * 2,oMove只在big框内跟随鼠标运动
     * 3,放大框内的图片,按比例跟随oMove定位
     *
     * */
    oBig.mouseenter(function(){
        oSuperDiv.show();
        oMove.show();
    })
    oBig.mouseleave(function(){
        oSuperDiv.hide();
        oMove.hide();
    })
    oBig.mousemove(function (evt){
        var event = evt || window.event;
        var x = event.pageX - oBig.offset().left - (oMove.width())/2;
        var y = event.pageY - oBig.offset().top - (oMove.width())/2 ;
        /*判断,使Move只在bif块中运动*/
        if(x<=0){x=0}
        if(x>=oBig.width() - oMove.width()){
            x=oBig.width() - oMove.width()
        }
        if(y<=0){y=0}
        if(y>=oBig.height() - oMove.height()){
            y=oBig.height() - oMove.height()
        }
        oMove.css({left: x, top: y});
        oSuperBig.css({left: -x*4, top: -y*4})
    })
}
function goodDetail(){
    //获取参数值
    var id = location.search.substring(4);
    $.ajax({
        url: '/mysql/goods.php',
        data: {id: id},
        success: function(msg){
            var $res = JSON.parse(msg);
            $('.bianhao').text($res.goodnum);
            $('.good_brand').text($res.band);
            $('.good_title').text($res.title);
            $('.price').text('￥'+$res.price);
            $('.before').text('￥'+$res.before);
            $('.discount').text(parseFloat($res.discount)+'折');
            $('.keyword').text($res.category);
            // 5张小图601796_00--w_500_h_500.jpg
            var list = `
            <li class="active"><img src= "../img/list/${$res.goodnum}_00--w_1000_h_1000.jpg"/></li>
            <li><img src= "../img/list/${$res.goodnum}_30--w_1000_h_1000.jpg"/></li>
            <li><img src= "../img/list/${$res.goodnum}_31--w_1000_h_1000.jpg"/></li>
            <li><img src= "../img/list/${$res.goodnum}_32--w_1000_h_1000.jpg"/></li>
            <li><img src= "../img/list/${$res.goodnum}_33--w_1000_h_1000.jpg"/></li>
            `;
            var normalImg = `<img src= "../img/list/${$res.goodnum}_00--w_1000_h_1000.jpg"/></li>`;
            $('.normalPic').html(normalImg);
            //插入放大镜按钮
            var bigBtn = $('<div id="move"></div>');
            $('.normalPic img').after(bigBtn);
            //可能需要调整放大镜按钮
            //放大镜初始化效果
            $('.fiveimgs').html(list);
            var i = `<img  src= "../img/list/${$res.goodnum}_00--w_1000_h_1000.jpg"/>`;
            $('.bigPicBox2').html(i);
            <!--  -->
            //颜色生成
            var cs = '';
            for(var i=0;i<$res.color.length;i++){
                cs+=`<a><img src="../img/list/${$res.goodnum}_${($res.color[i])}0_00--w_1000_h_1000.jpg"alt="" /></a>`;
                // 601796_30_00--w_90_h_90
            }
            $('.autocolor').html(cs);
            
            //尺码生成
            var ss = '';
            var sizes =$res.size.split(',');
            for(var i=0;i<sizes.length;i++){
                ss+=`<a>${sizes[i]}</a>`;
            }
            $('.autosize').html(ss);
            big1();
        }
    });
    var score = parseInt(Math.random()*(500-10+1))+10;
    $('.score').text(score);
    $.ajax({
        url: '/mysql/goodscz.php',
        data: {
            id: id,
        },
        success: function(msg){
            var $msg = JSON.parse(msg);
            var totalsaleNum = 0;
            var totalhaveNum = 0;
            $msg.map(function(item){
            saleNum= item.salenum;
            haveNum = item.havenum;
            totalsaleNum += parseInt(saleNum);
            totalhaveNum += parseInt(haveNum);
            return totalsaleNum,totalhaveNum;
            });
            $('.salenum').text(totalsaleNum);
            $('.kc').text(totalhaveNum);
        }
    });
}


//该事件在页面生成之后执行
function auto(){
    //衣服颜色点击事件
    $('.autocolor').on('click','a img',function(){
        $(this).parent().addClass('active').siblings('a').removeClass('active');
        $(this).addClass('checked').siblings('a').removeClass('checked');
        var currentSrc =$(this).attr('src');
        var color = $(this).attr('src')[19];
        var id = $('.bianhao').text();
        $('.normalPic img').attr('src',currentSrc);
        // select * from goodlist where goodnum = 713436 and size = 170 and color=4;
        $.ajax({
            url: '/mysql/goodscz.php',
            data: {
                id: id,
                color: color
            },
            success: function(msg){
                var $msg = JSON.parse(msg);
                  $('.show_cdes').text($msg[0].cdes);
                  var res =0;
                  $msg.map(function(item){
                    var num = item.havenum;
                    res += parseInt(num);
                    return res;
                  });
                  $('.kc').text(res);
                  var si=[];
                  var sizes= $msg.filter(function(ite){
                        if(ite.color==color){
                            si.push(ite.size);
                            return ite,si;
                        }
                   });  
                   console.log(sizes,si);
                   var c=[];
                   $('.good_size_list dd').children('a').map(function(idx,it){
                    console.log(idx,it)
                    var text = $(it).text().split(':')[1].slice(0,3);    
                    c.push(text);

                        
                    return c;

                   });
                   // console.log(c)
                   // var new = [];
                   // for(var i=0;i<c.length;i++){
                   //  for(var j=0;i<si.length;j++){
                   //      if(c[i]!==si[j]){
                   //          new.push(c[i]);console.log()
                   //      }
                   //  }
                   // }
                   
            }
        }); 
    });
    $('.autosize').on('click','a',function(){
        $(this).addClass('active').siblings('a').removeClass('active');
        $(this).addClass('checked').siblings('a').removeClass('checked');
        $('.show_size').text($(this).text());
        var id = $('.bianhao').text();
        var size = $(this).text().split(':')[1].slice(0,3);
        $.ajax({
            url: '/mysql/goodscz.php',
            data: {
                id: id,
                size: size
            },
            success: function(msg){
                var $msg = JSON.parse(msg);
                  console.log($msg)
                  var res =0;
                  $msg.map(function(item){
                    var num = item.havenum;
                    var num1 = item.salenum;
                    res += parseInt(num);
                    return res;
                  });
                  $('.kc').text(res);
                
            }
        }); 
        // ($('.good_color_size:checked')); 
    });
  
}
//数量增加减少
function changeNum(){
    // 减
    $('.dec').on('click',function(){
        var val = $('.text').val();
        val--;
        if(val>=1){
             $('.text').val(val);
         }else{
             $('.text').val('1');
         }
    });
    // 加
    $('.add').on('click',function(){
        var val = $('.text').val();
        val++;
        $('.text').val(val);
    });

    //5张图片
    $('.fiveimgs').on('click','li img',function(){
        var targetSrc = $(this).attr('src');
        $(this).parent().addClass('active').siblings('li').removeClass('active');
        $('.normalPic img').attr('src',targetSrc);
       
    });
}


