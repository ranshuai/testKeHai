
//订单管理业务模块

define(['jquery','order-deal','loadStuOrderInfo'],function($,order,loa){


    var url = "/orderDeal/list.do";
    //var hash = location.hash;
    //var pageNum = hash.substr(hash.lastIndexOf('=')+1);
    order.orderListInfo4Page(url, "", 1);
    loa.loadStuOrderListInfo();
});
