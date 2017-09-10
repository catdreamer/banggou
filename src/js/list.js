/* 
* @Author: Marte
* @Date:   2017-09-06 21:00:38
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 04:33:00
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
                            $('.cp').text(pageNo);
                            $('.cg').text($res.total);
                            var totalPage = Math.ceil($res.total/40)-1;console.log(totalPage);
                            $('.tp').text(totalPage+1);
                             // $('page').find('currentPage').siblings('a').hide();
                            for(var i = 0;i<totalPage;i++){
                              var a = $('<a></a>').text(i+2).attr('href','#');
                              $('.currentPage').after(a);
                              // $('.currentPage').appendTo('.page_a');
                            }


                            $('.page').on('click','a',function(){
                              var pageNo = $(this).index()+1;
                                $(this).addClass('currentPage').siblings('a').removeClass('currentPage');
                                $.ajax({
                                    url: '/mysql/list.php',
                                    data: {
                                        pageNo: pageNo,
                                        qty: qty,
                                        category: category,
                                        gender: gender,
                                        band: band,
                                        price: price,
                                        contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                                    },
                                    success: function(res){
                                      var $res = JSON.parse(res);

                                      var pageNo = $res.pageNo;
                                      $('.cp').text(pageNo);console.log(pageNo);
                                      $('.cg').text($res.total);console.log($res.total);
                                      // var totalPage = Math.ceil($res.total/40)-1;console.log(totalPage);
                                      

                                      console.log();
                                      // $('.tp').text(totalPage+1);
                                      // $('.page').prop('.currentPage').siblings('a').hide();
                                      // for(var i = 0;i<=totalPage-1;i++){
                                      //   var a = $('<a></a>').text(i-1).attr('href','#');
                                      //   $('.currentPage').after(a);

                                      // }
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
                      console.log(gender)
                      $('.page').find('.currentPage').siblings('a').hide();
                      $('.page').eq(0).show();
                      getData(1,40,gender);
                    });
                     //按照分类筛选
                       $('.fenlei_items').on('click','a',function(){
                         var category=$(this).text();
                         console.log(category)
                         getData(1,40,'',category);
                       });
                    //    //按照品牌筛选
                        $('.pinpai_items').on('click','a',function(){
                          var band=$(this).text();
                          var pageNo = $(this).index()+1;
                          console.log(band)
                          getData(pageNo,40,'','',band); 
                        });
                    //     //按照价格筛选
                    // console.log($('#price'))
                      $('#price').on('click',function(){

                          // var price=$(this).text();
                          // var pageNo = $(this).index();
                          // console.log(band)
                          getData(1,40,'','',band,'price'); 
                        });  
                    //     //按照折扣筛选
                    $('#discount').on('click',function(){

                        // var price=$(this).text();
                        // var pageNo = $(this).index();
                        // console.log(band)
                        getData(1,40,'','',band,'','discount'); 
                      });
         
          // req();
          Taba();
          require(['common'],function(){
            //返回顶部
            toTop();
          
            // var fkey = Cookie.get('fkey');
            // // var category = Cookie.get('category');
     
          //   $.ajax({
          //       url: '/mysql/list.php',
          //       data: {
          //           pageNo: 1,
          //           qty: 40,
          //           category: fkey,

          //           contentType: "application/x-www-form-urlencoded; charset=UTF-8"
          //       },
          //       success: function(res){
          //           var $res = JSON.parse(res);
          //           fn($res);
          //       } 
          //     // var userName = Cookie.get('fkey');console.log(userName);
          // });
       });
    });
});
});

// function req(){
//   //分页
//   $('.page').on('click','a',function(){
//     $(this).addClass('currentPage').siblings('a').removeClass('currentPage');
//     var pageNo = $(this).index()+1;
//     console.log(pageNo)
//     getData(pageNo);
//   });
//   //按照性别筛选
//   $('.xingbie_items').on('click','a',function(){
//     var gender = $(this).text();
//     console.log(gender)
//     getData(1,40,gender);
//   });
//   //按照分类筛选
//    $('.fenlei_items').on('click','a',function(){
//      var category=$(this).text();
//      console.log(category)
//      getData(1,40,'',category);
//    });
//    //按照品牌筛选
//     $('.pinpai_items').on('click','a',function(){
//       var band=$(this).text();
//       var pageNo = $(this).index()+1;
//       console.log(band)
//       getData(pageNo,40,'','',band); 
//     });
//     //按照价格筛选
//     //按照尺寸筛选
//     //高级筛选
//     //按照尺寸筛选
// }









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
// //生成列表页
// function fn(){
//   var $res = JSON.parse(res);
//   console.log($res);
//   var list= $res.data.map(function(item){
//       var as = '';
//       for(var i=0;i<item.color.length;i++){
//           as+=`<a href="#"><img src="../img/list/${item.goodnum}_${(item.color[i])}0_00--w_500.jpg"alt="" /></a>`
//           // 601796_30_00--w_90_h_90
//       }
//       var discount = item.discount?'<label class="discount">'+parseFloat(item.discount)+'折</label>':'';
//       var before = item.before?'<i class="before">￥'+item.before+'</i>':'';
//       return `<li data-guid="${item.goodnum}" class="good">
//             <a class="imgLink" href="http://localhost:1000/html/detail.html?id=${item.goodnum}"><img src="../img/list/${item.goodnum}_00--w_300_h_410.jpg"/></a>
//             <span class="clear">
//                 <a href="" class="brand">${item.band}</a>${discount}
//             </span>
//             <span>
//                 <a class="title" href="">【夏季新品】${item.title}</a>
//             </span>
//             <span>
//                 <b class="sale">￥${item.price}</b>
//                 ${before}
//             </span>
//             <div class="colorTab clear">
//               ${as}
//             </div>
//           </li>`
//   }).join('');
//   $('.goodslist').html(list);
// }
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