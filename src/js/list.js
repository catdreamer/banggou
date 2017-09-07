/* 
* @Author: Marte
* @Date:   2017-09-06 21:00:38
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-07 17:07:22
*/
function getData(pageNo,qty,gender,category,band){
  $.ajax({
      url: '/mysql/list.php',
      data: {
          pageNo: pageNo,
          qty: qty,
          category: category,
          gender: gender,
          band: band,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8"
      },
      success: function(res){
          var $res = JSON.parse(res);
          console.log($res);
          var list= $res.data.map(function(item){
              var as = '';
              for(var i=0;i<item.color.length;i++){
                  as+=`<a href="#"><img src="../img/list/${item.goodnum}_${(item.color[i])}0_00--w_500.jpg"alt="" /></a>`
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
  });
}
function req(){
  //分页
  $('.page').on('click','a',function(){
    $(this).addClass('currentPage').siblings('a').removeClass('currentPage');
    var pageNo = $(this).index()+1;
    console.log(pageNo)
    getData(pageNo);
  });
  //按照性别筛选
  $('.xingbie_items').on('click','a',function(){
    var gender = $(this).text();
    console.log(gender)
    getData(1,40,gender);
  });
  //按照分类筛选
   $('.fenlei_items').on('click','a',function(){
     var category=$(this).text();
     console.log(category)
     getData(1,40,'',category);
   });
   //按照品牌筛选
    $('.pinpai_items').on('click','a',function(){
      var band=$(this).text();
      var pageNo = $(this).index()+1;
      console.log(band)
      getData(pageNo,40,'','',band); 
    });
    //按照价格筛选
    //按照尺寸筛选
    //高级筛选
    //按照尺寸筛选
}
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