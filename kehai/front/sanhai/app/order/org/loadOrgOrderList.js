/**
 * Created by boys on 2015/8/11.
 */

/**
 * 初始化机构订单信息，并处理部分点击事件
 */
define(['jquery','order-deal'],function($,order){
    function loadOrgOrderListInfo() {
        //设置打开的菜单
        var oSelect_body = $('.sel_body');
        var oSelect_plus = $('.select_plus');
        oSelect_body.change(function(){
            $(this).siblings("em").text($(this).find("option:selected").text());
        });
        /*tab切换*/
        $('.tab .tabList li').click(function() {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings().children('a').removeClass('ac');
            //if (index == 0) index=1;
            //$('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        });
        //点击搜索时的请求
        $("button[name=search]").click(function(){
            var courseType = $("select").val();
            var courseTitle = $("input").val();
            var n = Number(courseTitle);
            var orderId = "";
            if (!isNaN(n)){
                orderId = $.trim(courseTitle);
                if (orderId == 0){
                    orderId = "";
                }
                courseTitle="";
            }
            var cretia = "courseType="+courseType+"&" + "courseTitle="+courseTitle + "&" + "orderId="+orderId +"&" + "assignTea=3&";
            order.orderListInfo4Page("/orderDeal/list.do", cretia,1, 1);
        });

        //导航条的请求
        $(".order_list ul li a").bind('click', function(){
            var orderPayType = $(this).attr("href").substr(1);
            var orderStatus = orderPayType == -1 ? "" : orderPayType;
            var courseStatus = "";
            if (orderPayType == 3){
                courseStatus = "1";
            }
            if (orderPayType == 2){
                courseStatus = "0";
            }
            var cretia = "courseType="+$("select").val() + "&" + "orderStatus=" + orderStatus +"&" +
                "courseStatus="+ courseStatus +"&";
            order.orderListInfo4Page("/orderDeal/list.do", cretia,1);
        });

        $("a.ajax").live("click", function(){
            var type = $(this).attr("href").substr(1);
            location.href = "/orderDeal/find/" + $(this).siblings("input[name=orderId]").val() + ".htm?type=" + type;
        })
    }
    return {
        loadOrgOrderListInfo:loadOrgOrderListInfo
    }
});

