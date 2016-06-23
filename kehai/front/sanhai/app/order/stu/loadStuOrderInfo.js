/**
 * Created by boys on 2015/8/11.
 */

define(['jquery','order-deal'], function ($,order) {


    /**
     * 用于处理学生订单列表信息的方法，并处理了部分按钮的点击事件
     */
    function loadStuOrderListInfo() {

        //设置打开的菜单
        ///////
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
        //页面初始化
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
            var data = "courseType=" + courseType + "&courseTitle=" + courseTitle + "&orderId=" + orderId + "&assignTea=3&";
            order.orderListInfo4Page(url, data, 1, 1);
        });

        $(".order_list ul li a").bind('click', function () {
            var orderPayType = $(this).attr("href").substr(1);
            var orderStatus = orderPayType == -1 ? "" : orderPayType;
            var courseStatus = "";
            if (orderPayType == 3) {
                courseStatus = "1";
            }
            if (orderPayType == 2) {
                courseStatus = "0";
            }

            var data = "courseType=" + $("select").val() + "&orderStatus=" + orderStatus + "&courseStatus=" + courseStatus + "&";
            order.orderListInfo4Page(url, data, 1);
        });

        //此处对订单进行退课 换老师 操作
        $("tbody a.ajax").live("click", function () {
//      $("#pushNotice label").text($(this).text()+"理由:");
            var type = $(this).attr("href").substr(1);
            $("[name='oper']").val(type.substr(1));
            location.href = "/orderDeal/find/" + $(this).siblings("input[name=orderId]").val() + ".htm?type=" + type;
//      $("#pushNotice").dialog("open");
        });
    }

    return {
        loadStuOrderListInfo : loadStuOrderListInfo
    }
});