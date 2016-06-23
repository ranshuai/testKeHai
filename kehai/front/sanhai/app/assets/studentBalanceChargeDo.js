/**
 * Created by Administrator on 2015/12/28.
 */
define(["balance_account"], function (balanceAccount) {
    $("#accountCenter").addClass("cur");          // 设置高亮

    $("#money").placeholder({value: "请输入充值金额"});

    // 用户余额账户总金额
    balanceAccount.loadBalanceAccountTotalMoney($(".warning_style").find("h3").eq(1));

    // 余额充值
    $("#confirmCharge").on("click", function () {
        balanceAccount.balanceChargeOperation();
    });
});
