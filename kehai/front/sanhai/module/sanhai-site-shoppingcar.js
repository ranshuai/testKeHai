/**
 * 购物车支付设置支付密码
 */
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
                    defaultDialog("warning", data.resMsg, null);
                }
            },
            error: function (data) {
                defaultDialog("error", "请求失败稍后再试", null);
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
                defaultDialog("warning", "输入支付密码！", "");
                return false;
            }
            $("#payButton").attr("disabled", true);
            baseWaitDialog("努力处理中请稍后 ......");
        },
        complete: function () {
            $(".eject_warpper_wait").addClass("hide");
            $("#payButton").attr("disabled", false);
        },
        success: function (response) {
            if ("000" == response.resCode) {
                addCookie("tradeMoney", response.data.tradeData.tradeMoney, 0);
                addCookie("tradeCount", response.data.tradeData.tradeCount, 0);
                addCookie("tradeCourse", response.data.tradeData.tradeCourse, 0);

                location.href = "/shopping/toTradeSuccessPage.htm";
            } else if ("105" == response.resCode) {
                location.href = "/front/param.html";
            } else if ("400" == response.resCode) {
                location.href = "/front/repeat.html";
            } else {
                defaultDialog("warning", response.resMsg, null);
            }
        },
        error: function (xhr, status, error) {
            defaultDialog("warning", "网络异常稍后再试", null);
        }
    });
}