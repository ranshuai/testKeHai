define('moneyDeficiencyDo', ['money', 'dialogs', 'lib/jquery_validate/jquery.validate.min', 'module/cookie', 'base'], function (money,dialogs) {

    var a = function () {
        /*只有学生身份显示购物车*/
        if(user.userIdentity==2){
            $('.shopping_car').removeClass('hide');
        }
        $('.detail_messages').children('span').eq(0).children('em').eq(0).text(shc_moneydef.tradeCount);
        $('.detail_messages').children('span').eq(0).children('em').eq(1).text(money.fmoney(Number(shc_moneydef.tradeMoney) / 100, 2));
        $('.detail_messages').children('span').eq(0).children('em').eq(2).text(money.fmoney(Number(shc_moneydef.totalMoney) / 100, 2));
        $('.detail_messages').children('span').eq(1).children('em').text(money.fmoney(Number(shc_moneydef.tradeMoney) / 100, 2));

        $("#confirmPay").one("click", function () {
            //shoppingCarPayOperation();
            $("#shoppingCarPay").validate({
                rules: {
                    chargeWay: {
                        required: true
                    }
                },
                messages: {
                    chargeWay: {
                        required: "<i></i>请选择支付方式<b></b>"
                    }
                },
                errorElement: "em",
                errorPlacement: function (error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                },
                submitHandler: function (form) {
                    // 禁用提交按钮
                    $(form).find(":submit").attr({"disabled": "disabled"});

                    if (2 == $("input[type='radio']:checked").val()) {
                        alert("暂时不支持此方式充值");
                        //启用提交按钮
                        $(form).find(":submit").removeAttr("disabled");
                    }

                    if (1 == $("input[type='radio']:checked").val()) {
                        //form.action = "/alipay/alipayTradeSubmit.do?tradeOrder=${requestScope.tradeOrder}";
                        //form.action = "/alipay/alipayTradeSubmit.do?userId=" + shc_moneydef.userId + "&tradeOrder=" + shc_moneydef.tradeOrder;
                        form.action = "/alipayweb/alipayWebTradeSubmit.do?tradeOrder=" + shc_moneydef.tradeOrder;

                        form.submit();
                    }

                    if (0 == $("input[type='radio']:checked").val()) {

                        $.ajax({
                            type: "post",
                            url: "/cash/shoppingCarPay4Cash.do",
                            dataType: "json",
                            data: {
                                "requestFormToken": shc_moneydef.sessionFormToken,
                                "tradeOrder": shc_moneydef.tradeOrder,
                                "tradeMoney": shc_moneydef.tradeMoney
                            }, beforeSend: function () {
                                $("#confirmPay").attr("disabled", true);
                                dialogs._waitDialog("努力处理中请稍后 ......");
                            },
                            complete: function () {
                                $(".eject_warpper_wait").addClass("hide");
                                $("#confirmPay").attr("disabled", false);
                            },
                            success: function (response) {
                                if ("000" == response.resCode) {
                                    addCookie("tradeMoney", response.data.tradeData.tradeMoney, 0);
                                    addCookie("tradeCount", response.data.tradeData.tradeCount, 0);
                                    addCookie("tradeCourse", response.data.tradeData.tradeCourse, 0);

                                    location.href = "/shopping/toTradeSuccessPage.htm";
                                } else if ("400" == response.resCode) {
                                    location.href = "/front/repeat.html";
                                } else {
                                    dialogs._timer(response.resMsg,2,2,null);
                                }
                            },
                            error: function (xhr, status, error) {
                                dialogs._timer("网络异常稍后再试",2,2,null);
                            }
                        });
                    }


                }
            });
        });
    }

    return {
        a: a
    }


})