/**
 * Created by Tian Jiayuan on 2015/12/18.
 * 老师订单详情的模块定义
 */


define(['jquery', 'dialogs', 'orderDeatil','order-deal','common'],
    function($, dialogs, orderDeatil, orderDeal, common){
        $("#allOrderList").trigger("click");
        orderDeal.appendOrderDetailInfo(json);
});
