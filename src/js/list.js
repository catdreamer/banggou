/* 
* @Author: Marte
* @Date:   2017-09-06 21:00:38
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 14:45:09
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
          require(['common'],function(){
              readC();
            });
          // 解析数据
          var name= location.search.substring(1).split('&');
                  console.log(name)
                  var gender="";
                  var category ="";
                  var band ="";
                  name.forEach(function(item){
                      var arr=item.split('=');
                      if(arr[0]=='gender'){
                       gender =decodeURI(arr[1]);
                      }
                      if(arr[0]=='category'){
                      category =decodeURI(arr[1]); 
                      }
                      if(arr[0]=='band'){
                      band =decodeURI(arr[1]); 
                      }
                  })
                
                  //页面初始化效果
                  getData(1,40,gender,category,band);
                  function getData(pageNo,qty,gender,category,band,price,discount){
                    var arr =[pageNo,qty,gender,category,band,price,discount];
                            console.log(arr)
                    $.ajax({
                        url: '/mysql/list.php',
                        data: {
                            pageNo: pageNo,
                            qty: qty,
                            category: category,
                            gender: gender,
                            band: band,
                            price: price,
                            discount:discount,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        success: function(res){
                          var $res = JSON.parse(res);
                          console.log($res)
                            fn($res); 
                            
                            var pageNo = $res.pageNo;
                            var arr =[pageNo,qty,gender,category,band,price,discount];
                            console.log(arr)
                            $('.cp').text(pageNo);
                            $('.cg').text($res.total);
                            var totalPage = Math.ceil($res.total/40)-1;
                            $('.tp').text(totalPage+1);
                            //生成页码按钮
                            // var list_a ='';
                            console.log($('.tp').text())
                            $('.page').html('');
                            for(var i =0;i<$('.tp').text();i++){
                              $('.page').append(`<a href="#">${i+1}</a>`);
                              $('.page a').eq(0).addClass('currentPage'); 
                            }
                             
                            console.log(arr)
                            var pageNo1 =arr[0];
                            var qty1 = arr[1];
                            var gender1 = arr[2];
                            var category1 = arr[3];
                            var band1 = arr[4];
                            var price1 = arr[5];
                            var discount1 = arr[6];
                            // console.log(pageNo1,qty1,gender1,category1,band1, price1,discount1)

                            $('.page').on('click','a',function(){
                              $(this).addClass('currentPage').siblings('.page a').removeClass('currentPage');
                                                    
                                var pageNo1 = $(this).index()+1;
                                // console.log(pageNo1,qty1,gender1,category1,band1, price1,discount1)
                                $.ajax({
                                    url: '/mysql/list.php',
                                    data: {
                                        pageNo: pageNo1,
                                        qty: qty1,
                                        category: category1,
                                        gender: gender1,
                                        band: band1,
                                        price: price1,
                                        contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                                    },
                                    success: function(res){
                                      var $res = JSON.parse(res);
                                      var pageNo = $res.pageNo;
                                      $('.cp').text(pageNo);
                                      $('.cg').text($res.total);
                                      var totalPage = Math.ceil($res.total/40)-1;
                                      $('.tp').text(totalPage+1);
                                    // console.log(pageNo1,qty1,gender1,category1,band1,price1,discount1);
                                       fn($res); 
                                     }
                                    });
                             
                              });
                        }   
                    });
                  }
                   //按照性别筛选
                    $('.xingbie_items').on('click','a',function(){
                      var gender = $(this).text();
                      getData(1,40,gender);
                
                    });
                     //按照分类筛选
                     $('.fenlei_items').on('click','a',function(){
                       var category=$(this).text();
                       getData(1,40,'',category);
                      
                     });
                    //    //按照品牌筛选
                      $('.pinpai_items').on('click','a',function(){
                        var band=$(this).text();
                        getData(1,40,'','',band); 
                      });
                    //     //按照价格筛选
                
                      $('#price').on('click',function(){
                          getData(1,40,'','',band,'price'); 
                        });  
                    //     //按照折扣筛选
                      $('#discount').on('click',function(){
                        getData(1,40,'','',band,'','discount'); 
                      });
          Taba();
          require(['common'],function(){
          //返回顶部
            toTop();
       });
    });
});
});

//图片hover切换效果
function Taba(){
  $('.goodslist').on('mouseover',' li .colorTab a img',function(){
      var targetSrc = $(this).attr('src');
      $(this).parent().parent().parent().find('.imgLink img').attr('src',targetSrc);
  });
  $('.goodslist').on('mouseout',' li .colorTab a img',function(){
      var currentSrc = $(this).attr('src').slice(0,18)+'_00--w_300_h_410.jpg';
      $(this).parent().parent().parent().find('.imgLink img').attr('src',currentSrc);  
  });
}
//生成列表
function fn($res){
  var list= $res.data.map(function(item){
      var as = '';
      for(var i=0;i<item.color.length;i++){
          as+=`<a href="#"><img src="../img/list/${item.goodnum}_${(item.color[i])}0_00--w_1000_h_1000.jpg"alt="" /></a>`
          // 601796_30_00--w_90_h_90
      }
      var discount = item.discount?'<label class="discount">'+parseFloat(item.discount)+'折</label>':'';
      var before = item.before?'<i class="before">￥'+item.before+'</i>':'';
      return `<li data-guid="${item.goodnum}" class="good">
            <a class="imgLink" href="http://localhost:1000/html/detail.html?id=${item.goodnum}"><img src="../img/list/${item.goodnum}_00--w_300_h_410.jpg"/></a>
            <span class="clear">
                <a href="" class="brand">${item.band}</a>${discount}
            </span>
            <span>
                <a class="title" href="">【夏季新品】${item.title}</a>
            </span>
            <span>
                <b class="sale">￥${item.price}</b>
                ${before}
            </span>
            <div class="colorTab clear">
              ${as}
            </div>
          </li>`
  }).join('');
  $('.goodslist').html(list);
}