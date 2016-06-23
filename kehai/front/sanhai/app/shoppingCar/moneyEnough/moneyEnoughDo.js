/**
 * Created by 蒋淼 on 2015/12/18.
 * 购物车提交支付请求
 */
define('moneyEnoughDo', ["jquery", "dialogs", "money", "module/cookie", "common", "base", "module/jquery.md5"],
    function ($, dialogs, money) {
        /*只有学生身份显示购物车*/
        if (user.userIdentity == 2) {
            $('.shopping_car').removeClass('hide');
        }
        var enough = function () {

            $('.detail_messages').children('span').eq(0).children('em').eq(0).text(monenough.tradeCount);
            $('.detail_messages').children('span').eq(0).children('em').eq(1).text(money.fmoney(Number(monenough.tradeMoney) / 100, 2));
            $('.detail_messages').children('span').eq(0).children('em').eq(2).text(money.fmoney(Number(monenough.totalMoney) / 100, 2));
            $('.detail_messages').children('span').eq(1).children('em').text(money.fmoney(Number(monenough.tradeMoney) / 100, 2));

            function submitTradePay(requestFormToken, tradeOrder) {
                var payPassword = $("#payPassword").val();
                payPassword = $.md5(payPassword).toUpperCase();

                $.ajax({
                    type: "post",
                    url: "/shopping/shoppingCarPay.do",
                    dataType: "json",
                    data: {
                        "payPassword": payPassword,
                        "requestFormToken": requestFormToken,
                        "tradeOrder": tradeOrder
                    },
                    beforeSend: function () {
                        if (null == $("#payPassword").val() || "" == $("#payPassword").val()) {
                            dialogs._timer("请输入支付密码", 2, 2, null);
                            return false;
                        }

                        $("#payButton").attr("disabled", true);
                        dialogs._waitDialog("拼死处理中，请稍后 ......");
                    },
                    complete: function () {
                        $(".eject_warpper_wait").addClass("hide");
                        $("#payButton").attr("disabled", false);
                    },
                    success: function (response) {

                        if ("000" == response.resCode) {

                            if (null != response.data.tradeData) {
                                delCookie("ptCourse");
                                addCookie("ptCourse", response.data.tradeData, 0);
                            } else {
                                delCookie("ptCourse");
                            }

                            location.href = "/shopping/toTradeSuccessPage.htm";
                        } else if ("105" == response.resCode) {
                            location.href = "/front/param.html";
                        } else if ("400" == response.resCode) {
                            location.href = "/front/repeat.html";
                        } else {
                            dialogs._timer(response.resMsg, 2, 2, null);
                        }
                    },
                    error: function (xhr, status, error) {
                        dialogs._timer("网络异常稍后再试", 2, 2, null);
                    }
                });
            };

            // 支付
            $("#payButton").on("click", function () {
                submitTradePay(monenough.requestFormToken, monenough.tradeOrder);
            });
        }

        return {
            enough: enough
        }
    });