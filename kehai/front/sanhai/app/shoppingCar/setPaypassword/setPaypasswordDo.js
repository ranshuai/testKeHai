/**
 * Created by slg on 2015/12/19.
 */
define('setPaypasswordDo', ['jquery', 'dialogs', 'money', 'common', 'sendCode','jquery_md5', "module/cookie", 'messages_zh', 'base', 'lib/jquery_validate/jquery.validate.min'],
    function ($, dialogs, money, common, sendCode) {

        /*只有学生身份显示购物车*/
        if (user.userIdentity == 2) {
            $('.shopping_car').removeClass('hide');
        }

        var setPaypaw = function () {

            $('.detail_messages').children('span').eq(0).children('em').eq(0).text(setpay.tradeCount);
            $('.detail_messages').children('span').eq(0).children('em').eq(1).text(money.fmoney(Number(setpay.tradeMoney) / 100, 2));
            $('.detail_messages').children('span').eq(0).children('em').eq(2).text(money.fmoney(Number(setpay.totalMoney) / 100, 2));
            $('.detail_messages').children('span').eq(1).children('em').text(money.fmoney(Number(setpay.tradeMoney) / 100, 2));

            // 验证码
            $("#getCode").on("click", function () {
                sendCode.sendCheckCode($("#phoneNumber").val(), $("#getCode"), "/business/sendCheckCode.do");
            });

            function setPayPassword() {
                $("#setPayPassword").validate({
                    rules: {
                        password: {
                            required: true,
                            rangelength: [6, 12]
                        },
                        confirmPassword: {
                            required: true,
                            rangelength: [6, 12],
                            equalTo: "#password"
                        },
                        checkCode: {
                            required: true,
                            rangelength: [6, 6]
                        },
                    },
                    messages: {
                        password: {
                            required: "<i></i>请输入支付密码<b></b>",
                            rangelength: "<i></i>密码长度6~12位<b></b>"
                        },
                        confirmPassword: {
                            required: "<i></i>请输入确认密码<b></b>",
                            rangelength: "<i></i>密码长度6~12位<b></b>",
                            equalTo: "<i></i>支付密码与确认密码不一致<b></b>"
                        },
                        checkCode: {
                            required: "<i></i>请输入验证码<b></b>",
                            rangelength: "<i></i>验证码长度6位<b></b>"
                        }
                    },
                    errorElement: "em",
                    errorPlacement: function (error, element) { //指定错误信息位置
                        error.appendTo(element.parents(".error_show").find(".error_message"));
                    }
                });

                if ($('#setPayPassword').valid()) {
                    var payPassword = $("#confirmPassword").val();
                    payPassword = $.md5(payPassword).toUpperCase();
                    var checkCode = $("#checkCode").val();
                    var phone = $("#phoneNumber").val();

                    $.ajax({
                        type: "post",
                        url: "/business/setBalanceAccountPayPassword.do",
                        data: {
                            "phone": phone,
                            "payPassword": payPassword,
                            "checkCode": checkCode
                        },
                        success: function (data) {
                            if ("000" == data.resCode) {

                                // 变更支付内容样式
                                $("h4[class='please_password']").html("请输入支付密码");

                                // 变更购物车导航条颜色
                                $(".detail_messages").attr("class", "detail_messages clearfix success_style");
                                $(".detail_messages").attr("style", "background-color:#dff0d8");

                                // 隐藏输入密码显示支付密码
                                $('.please_input_warp').eq(0).attr("class", "please_input_warp");
                                $('.please_input_warp').eq(1).attr("class", "please_input_warp hide");
                            } else {
                                dialogs._timer(data.resMsg, 2, 2, null);
                            }
                        },
                        error: function (data) {
                            dialogs._timer("请求失败稍后再试", 2, 2, null);
                        }
                    });
                }
            }

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
                            dialogs._timer("输入支付密码!", 2, 2, null);
                            return false;
                        }
                        $("#payButton").attr("disabled", true);
                        dialogs._waitDialog("努力处理中请稍后 ......");
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

                            //addCookie("tradeMoney", response.data.tradeData.tradeMoney, 0);
                            //addCookie("tradeCount", response.data.tradeData.tradeCount, 0);
                            //addCookie("tradeCourse", response.data.tradeData.tradeCourse, 0);

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
            }

            // 设置支付密码
            $("button[name='setPayPassword']").on("click", function () {
                setPayPassword();
            });

            // 支付
            $("#payButton").on("click", function () {
                submitTradePay(setpay.requestFormToken, setpay.tradeOrder);
            });

        }

        return {
            setPaypaw: setPaypaw
        }
    });
