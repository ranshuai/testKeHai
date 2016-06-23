/**
 * Created by Administrator on 2015/12/29.
 */

define(['jquery','balance_account','sendCode'],function($,balance,send){
    // 菜单高亮
    //$("#accountCharge").attr("class", "cur");

    $("#payPassword").placeholder({value: "请输入支付密码"});
    $("#cpayPassword").placeholder({value: "请输入确认密码"});

    $("#getCode").on("click", function () {
        //send.sendCheckCode($("#phoneNumber").val(), $("#getCode"), "/business/sendCheckCode.do");
        send.sendCheckCode(sessionPhone, $("#getCode"), "/business/sendCheckCode.do");
    });

    $("button[name='setPayPassword']").on("click", function () {
        balance.submitPayPassword(sessionPhone);
    });

});

