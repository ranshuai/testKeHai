/**
 * Created by Administrator on 2015/12/17.
 */

//我的账户

require(
    [
        'jquery',
        'money',
        'balance_account',
        "sanhai-stu-fund-log-1.0.0",
        'sanhai-withdraw-log-1.0.0'

    ], function ($, money, balanceAccount, fund, withdraw) {

        // 用户余额账户总金额
        balanceAccount.loadBalanceAccountTotalMoney($(".account_balance_left h2 span"));

        // 查询绑定银行卡 如果没有绑定提示绑定，如果绑定显示卡号
        balanceAccount.isBankCard(sessionScope);

        // 加载收入
        fund.loadUserFundFlowLog(1);

        // 交易和提现记录
        $('.tab .tabList li').click(function () {
            var index = $(this).index();

            if (0 == index) fund.loadUserFundFlowLog(1);
            if (1 == index) withdraw.loadUserWithdrawals(1);

            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        });

        // 充值操作
        $("#chargeBtn").on("click", function () {
            balanceAccount.isSetBalancePassword();
        });

        // 申请提现
        //balanceAccount.balanceWithdrawals($("#withdrawalsBtn"), $("#totalMoney").val());

    });