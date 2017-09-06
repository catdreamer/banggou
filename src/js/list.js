/* 
* @Author: Marte
* @Date:   2017-09-06 21:00:38
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 23:19:38
*/
function req(){
    $.ajax({
        url: '../mysql/list.php',
        data: {
            pageNo: 1,
            qty: 4
        },
        success: function(res){
            var $res = JSON.parse(res);
            console.log($res);
            var list= $res.data.map(function(item){
                var as = '';
                for(var i=0;i<item.color.length;i++){
                    as+=`<a href="#"><img src="../img/list/${item.goodnum}_${(item.color[i])}0_00--w_90_h_90.jpg"alt="" /></a>`
                    // 601796_30_00--w_90_h_90
                }
                var discount = item.discount?'<label class="discount">'+parseFloat(item.discount)+'折</label>':'';
                var before = item.before?'<i class="before">￥'+item.before+'</i>':'';
                return `<li data-guid="${item.goodnum}" class="good">
                      <a class="imgLink" href="#"><img src="../img/list/${item.goodnum}_00--w_300_h_410.jpg"/></a>
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
