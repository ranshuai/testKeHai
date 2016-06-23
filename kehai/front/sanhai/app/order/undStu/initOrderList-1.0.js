/**
 * Created by boys on 2015/10/24.
 */

/**
 * 初始化订单页面
 */
define(
    [
        'jquery',
        'app/order/order-deal'
    ],function($,order){
    function initOrderList() {
        var url = "/orderDeal/list.do";
        order.orderListInfo4Page(url, "assignTea=3&", 1);
        $("button[name=search]").click(function(){
            var courseType = $("select").val();
            var courseTitle = $("input").val();
            var n = Number(courseTitle);
            var orderId="";
            if (!isNaN(n)){
                orderId = n;
                if (orderId == 0){
                    orderId = "";
                }
                courseTitle="";
            }
            var data = "courseType=" +　courseType + "&courseTitle=" + courseTitle + "&orderId=" + orderId + "&assignTea=3&";
            order.orderListInfo4Page(url, data, 1);
        });

        /*tab切换*/
        $('.tab .tabList li').click(function() {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings().children('a').removeClass('ac');
            //$('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        });

        $("ul li a").bind('click', function(){
            var orderPayType = $(this).attr("href").substr(1);
            var courseStatus = "";
            if (orderPayType == 3){
                courseStatus = 1;
            }else if (orderPayType == 4){
                courseStatus = 0;
            }else{
                courseStatus=0;
            }
            var data = "courseType=" + $("select").val() + "&assignTea=3&orderStatus=2&courseStatus=" + courseStatus + "&";
            order.orderListInfo4Page(url, data, 1);
        });
    }
    return {
        initOrderList:initOrderList
    }
});

