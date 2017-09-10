/* 
* @Author: Marte
* @Date:   2017-09-06 09:07:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-10 22:14:12
*/


 
require(['config'],function(){
    require(['jquery'],function($){ 
        $(function($){
                $('#topside_banner').load('/html/public.html .bannerImg');
                $('.headtop_wrap').load('/html/public.html .headtop_c');
                $('#header').load('/html/public.html .header_c');
                $('#nav').load('/html/public.html .nav_ul');
                $('.last_bottom_wrap').load('/html/public.html .last_bottom_c');
                $('#footer').load('/html/public.html .footer_c');
                $('#box_top').load('/html/public.html #topandconsult');
                lunBo();
                duanMa();
                // $(window).onload=function(){
                //     // 获取元素
                //     var output= $('.timer timer1');
                //     console.log(output);
                //     // var btn=document.getElementById('btn')
                //     // var btnImg=document.getElementById('btnImg')
                //     times();
                //     function times(){
                //     // 定义一个活动开始的时间字符串
                //     var activeday='2017/9/12 16:22:30';
                //         // 活动开始时间距离1970年的毫秒数
                //     var activeDate=Date.parse(activeday);
                //         // 现在距离1970年的毫秒数 
                //     var nowDate=Date.now()
                //         // 计算差值:***
                //     var timeDif=parseInt((activeDate-nowDate)/1000);
                //     if(timeDif<=0){
                //         clearInterval(abc);
                //         output.css('display','none');
                //     }
                //     // 根据差值计算各个数值
                //         // 秒
                //     var seconds=timeDif%60;
                //         // 分
                //     var minutes=parseInt(timeDif/60)%60;
                //         //小时
                //     var hours=parseInt(timeDif/60/60)%60;
                //         // 天
                //     var days=parseInt(timeDif/60/60/60);
                //         // 根据差值显示 
                //     var totaltimes=`距离秒杀活动开始还有${days}天${ hours}小时${minutes}分钟${seconds}秒`;
                //     output.html(totaltimes);
                // }
                // var abc=setInterval(times,1000);
                // // 绑定时间 当差值为零时停止计算，并将文字消失，图片更换； 
                // } 
                function lunBo(){
                    var outer    = $(".banner_box"); //获取最大的框
                    var oInner   = $("#banner-img"); //获取ul
                    var item     = $("#banner-img li"); //获取li
                    var itemW    = item.width(); //li的宽
                    var leftBtn  = $(".banner-prev"); //获取左边按钮
                    var rightBtn = $(".banner-next"); //获取右边按钮
                    var pageList = $("#banner-index"); //获取页码的ul
                    var pageBtn  = $("#banner-index li"); //获取也页码的li
                    var iTimer   = null; //定时器
                    var index    = 1; //起始索引

                    var Buffer = {
                        //初始化
                        init: function() {
                            //自动播放
                            Buffer.autoPlay();
                            //暂停
                            Buffer.pause();
                            //页码索引
                            Buffer.page();
                            //划过
                            Buffer.pageHover();
                            //上一个
                            Buffer.prev();
                            //下一个
                            Buffer.next();
                        },
                        autoPlay: function() {
                            iTimer = setInterval(function() {
                                index++;
                                oInner.stop().animate({
                                    left: -itemW * index
                                }, function() {
                                    if (index >= 6) {
                                        index = 1;
                                        oInner.css({
                                            left: -itemW * index
                                        })
                                    }
                                    Buffer.page();
                                })
                            }, 3000)
                        },
                        pause: function() {
                            outer.hover(function() {
                                clearInterval(iTimer);
                                $("#banner-btn").show();
                            }, function() {
                                Buffer.autoPlay();
                                $("#banner-btn").hide();
                            })
                        },
                        next: function() {
                            rightBtn.click(function() {
                                index++;
                                oInner.stop().animate({
                                    left: -itemW * index
                                }, function() {
                                    if (index >= 6) {
                                        index = 1;
                                        oInner.css({
                                            left: -itemW * index
                                        })
                                    }
                                    Buffer.page();
                                })
                            })
                        },
                        prev: function() {
                            leftBtn.click(function() {
                                index--;
                                oInner.stop().animate({
                                    left: -itemW * index
                                },function(){
                                    if(index <= 0){
                                        index = 5;
                                        oInner.css({
                                            left: -itemW * index
                                        })
                                    }
                                    Buffer.page();
                                })
                            })
                        },
                        page: function() {
                            pageBtn.removeClass("banner-active");
                            pageBtn.eq(index - 1).addClass("banner-active");
                        },
                        pageHover: function(){
                            pageBtn.hover(function(){
                                index = pageBtn.index($(this)) + 1;
                                oInner.stop().animate({
                                    left: -itemW * index
                                })
                                Buffer.page();
                            },function(){
                                index = pageBtn.index($(this)) + 1;
                                oInner.stop().animate({
                                    left: -itemW * index
                                })
                                Buffer.page();
                            })
                        }
                    }
                    Buffer.init();
                }
                require(['common'],function(){
                    var userName = Cookie.get('user');
                    if(userName!==''){
                        $('.heaerRa').html(userName+',您好');                
                        $('.tuichu').css('display','block'); 
                    }             
                    $('.tuichu').on('click',function(){
                        // 清除cookie
                        var now = new Date();
                        now.setDate(now.getDate()-100);
                        Cookie.set('user',null,now);
                        $('.tuichu').css('display','none');
                        $('.heaerRa').html('登录');
                    });
                    //返回顶部
                    toTop();
                    //导航
                    //显示导航部分
                    $('.left_nav').css('display','block');
                    Nav();

                    rollBar('.duanmaBox','.hot_band_btn_prev','.hot_band_btn_next',1205);

                    //点击关键词或者图片调到列表页，并显示相应商品
                    //关键词搜索text ，图片搜索alt 
                    $('.left_nav_ul dt a').on('click',function(){
                        var now = new Date();
                        now.setDate(now.getDate()+1);
                        var cs =$(this).text();
                        if((cs=='热销分类')||(cs=='鞋履')||(cs=='箱包')||(cs=='配饰')||(cs=='美妆/生活')){
                            Cookie.set('fkey',cs,now,'/');
                        }else if((cs=='男')||(cs=='女')||(cs=='儿童')){
                            Cookie.set('gender',cs,now,'');
                        }
                    });
                    
                    
                    
                    // $('.left_nav_ul dt').on('click','a'function(){
                    //     console.log($(this).text())
                    //     var now = new Date();
                    //     now.setDate(now.getDate()+1);
                    //     Cookie.set('fkey',$(this).text(),now,'/');

                    // });
                    // $('.seachRight a').on('click',function(){
                    //     var now = new Date();
                    //     now.setDate(now.getDate()+1);
                    //     Cookie.set('fkey',$(this).text(),now,'/');
                    // });
                    // $('.duanmaBox a img').on('click',function(){
                    //     console.log($(this).attr('alt'));
                    //     var now = new Date();
                    //     now.setDate(now.getDate()+1);
                    //     Cookie.set('fkey',$(this).attr('alt'),now,'/');
                    // });
                    // $('#main a img').on('click',function(){
                    //     console.log(6)
                    // });
                    // $('.sale_left_list a').on('click',function(){
                    //     var now = new Date();
                    //     now.setDate(now.getDate()+1);
                    //     Cookie.set('fkey',$(this).text(),now,'/');
                    // });
                });
                
                
              
       })
    })
});

// function l_getData(ele,qty,rel){
//     if(rel===true){
//         var url = 'api/goodRandom.php';
//     }else{
//         var  url = '../api/goodRandom.php';
//     }
//     $.ajax({
//         url: url,
//         data: {count: qty},
//         success: function(res){
//             res = JSON.parse(res);
//             fn(ele,res,rel);
//         }

//     });
// }
// function fn(ele,res,rel){
//     var $box = $(ele);
//     var list = res.map(item=>{
//         if(rel===true){
//             var imgurl = item.imgurl.slice(3);
//             var href = "html/goods.html?name="+item.name+"&imgurl="+item.imgurl+"&price="+item.price+"&sale="+item.sale+"&guid="+item.guid;
//         }else{
//             var imgurl = item.imgurl;
//             var href = "goods.html?name="+item.name+"&imgurl="+item.imgurl+"&price="+item.price+"&sale="+item.sale+"&guid="+item.guid;
//         }
//         return `<li data-guid="${item.guid}">  
//           <a href="${href}"><img src="${imgurl}"/></a>
//           <p>${item.name}</p>
//           <p>原价：<del>${item.price}</del></p>
//           <p class="sale">现价：<span>${item.sale}</span></p>
//           <p>优惠：${item.price-item.sale}</p>
//         </li>`
//     }).join('');
//     $box.html(list);
// }
function duanMa(){
    $.ajax({
        url: 'mysql/goodDuanma.php',
        data: {count: 10},
        success: function(res){
            var $res = JSON.parse(res);
            var list= $res.data.map(function(item){
                return `<li data-guid="${item.id}">
                      <a href="#"><img src="${item.imgurl}"/></a>
                    </li>`
            }).join('');
            $('.duanmaBox').html(list);
        }
    });    
}

    

