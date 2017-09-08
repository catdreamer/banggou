/* 
* @Author: Marte
* @Date:   2017-09-07 17:09:55
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-08 20:41:58
*/
require(['config'],function(){
    require(['jquery','common'],function($){ 
        $(function($){
                $('.headtop_wrap').load('/html/public.html .headtop_c');
                $('#header').load('/html/public.html .header_c');
                $('#nav').load('/html/public.html .nav_ul');
                $('.last_bottom_wrap').load('/html/public.html .last_bottom_c');
                $('#footer').load('/html/public.html .footer_c');
                goodDetail();
                auto();
                changeNum();
       })
    })
});
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
            <li class="active"><img src= "../img/list/${$res.goodnum}_00--w_500_h_500.jpg"/></li>
            <li><img src= "../img/list/${$res.goodnum}_30--w_500_h_500.jpg"/></li>
            <li><img src= "../img/list/${$res.goodnum}_31--w_500_h_500.jpg"/></li>
            <li><img src= "../img/list/${$res.goodnum}_32--w_500_h_500.jpg"/></li>
            <li><img src= "../img/list/${$res.goodnum}_33--w_500_h_500.jpg"/></li>
            `;
            var normalImg = `<img src= "../img/list/${$res.goodnum}_00--w_500_h_500.jpg"/></li>`;
            $('.normalPic').html(normalImg);//可能需要调整放大镜按钮
            $('.fiveimgs').html(list);
            //颜色生成
            var cs = '';
            for(var i=0;i<$res.color.length;i++){
                cs+=`<a><img src="../img/list/${$res.goodnum}_${($res.color[i])}0_00--w_500.jpg"alt="" /></a>`;
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

function addCar(){
    $('.addbuyBag').on('click',function(){

    });
}