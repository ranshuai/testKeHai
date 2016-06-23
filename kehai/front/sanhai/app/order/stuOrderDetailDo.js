/**
 * Created by Tian Jiayuan on 2015/12/18.
 * 学生订单详情模块
 */

define(['jquery', 'dialogs', 'order-deal','common','orderDeatil'],
        function($, dialogs, orderDeal, common) {
            $("#allOrder").trigger("click");
            function initStuOrderDetailInfo(_json) {
                ////////
                //有关退课 调课 换老师的js操作在oderDeatil.js文件中
                ///////
                var json = _json;
                orderDeal.appendOrderDetailInfo(json);
                $("button.look_detail").click(function () {
                    if ($("#userId").val() != "") location.href = "/site/theacher/" + $("#userId").val() + "/toTeacherIndex.htm";
                });
            }

            /**
             * 保存评价信息
             */


            initStuOrderDetailInfo(json);
        }
);