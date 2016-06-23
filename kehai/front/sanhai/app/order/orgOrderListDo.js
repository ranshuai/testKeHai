/**
 * Created by Administrator on 2015/12/17.
 */

define(['jquery','order-deal','loadOrgOrderList'],function($,order,load){
        var url = "/orderDeal/list.do";
    order.orderListInfo4Page(url, "",1);
    load.loadOrgOrderListInfo();
});
