/**
 * Created by Administrator on 2015/12/17.
 */

define(
    [
        'jquery',
        'balance_account',
        'sanhai-stu-fund-log-1.0.0',
        'sanhai-unstu-fund-log-1.0.0'
    ], function ($, balanceAccount, fund, unstu) {

        // 获得余额账户总金额
        balanceAccount.loadBalanceAccountTotalMoney($(".account_balance_left h2"));

        // 获得余额可提现金额
        balanceAccount.loadBalanceWithdrawalsMoney($(".account_balance_right").find("em").eq(0));

        // 获得余额冻结金额
        balanceAccount.loadBalanceFreezeMoney($(".account_balance_right").find("em").eq(1));

        // 查询绑定银行卡 如果没有绑定提示绑定，如果绑定显示卡号
        balanceAccount.isBankCard(sessionScope);

        // 加载收入记录
        unstu.initUnstuFundFlow(1);

        // balanceAccount.balanceWithdrawals($("#withdrawalsBtn"), $("#withdrawalsMoney").val());

    });

