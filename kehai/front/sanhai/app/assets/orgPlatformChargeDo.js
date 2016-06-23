/**
 * 取消台时费JS已作废
 */
define(["balance_account"], function (balanceAccount) {

    $("#platformFee").addClass("cur");

    $("#chargeMoney").placeholder({value: "请输入充值金额"});

    balanceAccount.loadPlatformAccountMoney($(".warning_style").find("h3").eq(1));

    $("#confirmCharge").on("click", function () {
        balanceAccount.platformChargeOperation();
    });

});
