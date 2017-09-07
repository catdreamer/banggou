/* 
* @Author: Marte
* @Date:   2017-09-07 17:09:55
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-07 22:07:21
*/

function goodDetail(){
    //获取参数值
    var id = location.search.substring(4);
    $.ajax({
        url: '/mysql/goods.php',
        data: {id: id},
        success: function(msg){
            var $res = JSON.parse(msg);
            console.log($res)
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
            //尺码生成
        }
    });
    var score = parseInt(Math.random()*(500-10+1))+10;
    $('.score').text(score);
}