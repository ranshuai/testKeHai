/**
 * 取消台时费JS已作废
 */
require(['jquery', 'org-platform-record-1.0.0',"balance_account"], function ($, org,balanceAccount) {

    org.loadPlatformIncome(1);
    balanceAccount.loadPlatformAccountMoney($(".account_balance").find("h2").eq(1));

    // 购买按钮 判断是否设置充值密码
    $("#platformCharge").on("click", function () {
        balanceAccount.isSetPlatformFeePassword();
    });

    // tab切换
    $('.tab .tabList li').click(function () {
        var index = $(this).index();
        $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
        $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
    });

    // 支出
    $("#expand").on("click", function () {
        org.loadPlatformExpand(1);
    });

    // 收入
    $("#income").on("click", function () {
        org.loadPlatformIncome(1);
    });

});
