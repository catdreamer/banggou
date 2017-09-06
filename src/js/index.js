/* 
* @Author: Marte
* @Date:   2017-09-06 09:07:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 11:50:11
*/
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
