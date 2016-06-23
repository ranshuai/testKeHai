//alert('do');

//老师的个人中心 我的账户 业务模块

define(
    [
        'money',
        'balance_account',
        'pageBar',
        'sanhai-tea-fund-flow-log-1.0.0',
        'sanhai-withdraw-log-1.0.0',
        'dialogs',
        'sendCode'
    ], function (money, balanceAccount, pagebar, tea, withdraw) {

        // 获得余额账户总金额
        balanceAccount.loadBalanceAccountTotalMoney($(".account_balance_left h2"));

        // 获得余额可提现金额
        balanceAccount.loadBalanceWithdrawalsMoney($(".account_balance_right").find("em").eq(0));

        // 获得余额冻结金额
        balanceAccount.loadBalanceFreezeMoney($(".account_balance_right").find("em").eq(1));

        // 查询绑定银行卡 如果没有绑定提示绑定，如果绑定显示卡号
        balanceAccount.isBankCard(sessionScope);

        // 初始化数据
        tea.initTeaFundFlow();

        // balanceAccount.balanceWithdrawals($("#withdrawalsBtn"), $("#withdrawalsMoney").val());

    });