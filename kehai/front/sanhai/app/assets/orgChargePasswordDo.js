/**
 * 设置台时费账户充值密码
 * 取消台时费JS已作废
 */
define(["jquery", "balance_account", "sendCode", "lib/jquery_validate/jquery.validate.min", "base"], function ($, balanceAccount, sendCode) {

    // 设置高亮
    $("#platformFee").attr("class", "cur");

    $("#chargePassword").placeholder({value: "请输入充值密码"});
    $("#cchargePassword").placeholder({value: "请输入确认密码"});
    $("#phoneNumber").placeholder({value: "请输入手机号码"});

    $("#getCode").on("click", function () {
        sendCode.sendCheckCode($("#phoneNumber").val(), $("#getCode"), "/business/sendCheckCode.do");
    });

    $("button[name='setPayPassword']").on("click", function () {
        balanceAccount.submitChargePassword();
    });
});