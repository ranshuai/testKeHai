/**
 * Created by Administrator on 2015/12/15.
 */
define(
    [
        'jquery',
        'common',
        'pageBar',
        'order-deal',
        'loadTeaOrderInfo'

    ],function($,common,pagebar,order,load){

        var url = "/orderDeal/list.do";

        order.orderListInfo4Page(url, "assignTea=3&", 1);
        load.loadTeaOrderListInfo();
        //if ($(".tabItem:eq(0)").is(':visible')){
        //    $(".tabItem:eq(1)").hide();
        //}
    });