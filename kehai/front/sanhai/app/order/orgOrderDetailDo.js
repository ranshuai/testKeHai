/**
 * Created by Tian Jiayuan on 2015/12/18.
 * 机构订单详情的模块定义
 */

define(['jquery', 'dialogs', 'order-deal', 'common'],
    function($, dialogs, orderDeal, common){
        $("#allOrder").trigger("click");
        orderDeal.appendOrderDetailInfo(json);
        //匹配老师
        $("a.chooseTea").click(function(){
            var text = $("#orderId").text().split(' ');
            location.href="/orderDeal/find/"+ text[0] +".htm?type=20";
        });
        //编辑
        $("a.edit").click(function(){
            dialogs._order_edit(function(){
                var text = $("#orderId").text().split(' ');
                var price = $("#price").val();
                var times = $("#times").val();
                $.post("/orderDeal/update.do", {
                    orderId: text[0],
                    orderActualPrice:price*100,
                    coursesTime:times*60
                },function(resp){
                    if (common.checkResponse(resp) == false) return;
                    if (resp.resCode == "000"){
                        dialogs._wait("操作成功", 2, function(){location.reload();});
                    }else{
                        dialogs._wait("操作失败", 2
                            , null);
                    }
                });
            }, null);
            $("#price").val($(this).data("money"));
            $("#times").val($(this).data("time"))
        });
    }
);
