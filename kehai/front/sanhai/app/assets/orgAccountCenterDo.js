define(['jquery', 'balance_account', 'org-account-center-1.0.0'], function ($, balanceAccount, org) {

    // 可提现金额
    balanceAccount.loadBalanceWithdrawalsMoney($(".form_list em").eq(0));

    // 冻结金额
    balanceAccount.loadBalanceFreezeMoney($(".form_list em").eq(1));

    // 加载总金额
    balanceAccount.loadBalanceAccountTotalMoney($(".account_balance_left h2"));

    // 提现申请
    // balanceAccount.balanceWithdrawals($("#withdrawalsBtn"), $("#withdrawalsMoney").val());

    // 交易记录
    org.initOrgAccountCenter();

    // 查询绑定银行卡 如果没有绑定提示绑定，如果绑定显示卡号
    balanceAccount.isBankCard(sessionScope);
});
