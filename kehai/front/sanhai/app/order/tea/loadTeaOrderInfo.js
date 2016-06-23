/**
 * Created by boys on 2015/8/11.
 */

define(['jquery','order-deal'], function ($,order) {
    /**
     * 获取老师的已确认的订单信息
     */
    function loadTeaOrderListInfo() {

        //设置打开的菜单
        /////////
        var oSelect_body = $('.sel_body');
        var oSelect_plus = $('.select_plus');

        oSelect_body.change(function () {
            $(this).siblings("em").text($(this).find("option:selected").text());
        });

        /*tab切换*/
        $('.tab .tabList li').click(function () {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings().children('a').removeClass('ac');
            //$('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        });

        var url = "/orderDeal/list.do";
        $("button[name=search]").click(function () {
            var courseType = $("select").val();
            var courseTitle = $("input").val();
            var n = Number(courseTitle);
            var orderId = "";
            if (!isNaN(n)) {
                orderId = $.trim(courseTitle);
                if (orderId == 0) {
                    orderId = "";
                }
                courseTitle = "";
            }
            var data = "courseType=" + courseType + "&" + "courseTitle=" + courseTitle + "&" + "orderId=" + orderId + "&assignTea=3&";
            order.orderListInfo4Page(url, data, 1, 1);
        });

        $(".order_list ul li a").bind('click', function () {
            var orderPayType = $(this).attr("href").substr(1);
            var courseStatus = "";
            if (orderPayType == 3) {
                courseStatus = 1;
            } else if (orderPayType == 4) {
                courseStatus = 0;
            } else if (orderPayType == 2) {
                courseStatus = 0;
            }
            var data = "courseType=" + $("select").val() + "&assignTea=3&orderStatus=2&" + "courseStatus=" + courseStatus + "&";
            order.orderListInfo4Page(url, data, 1);
        });
    }

    return {
        loadTeaOrderListInfo:loadTeaOrderListInfo
    }
});