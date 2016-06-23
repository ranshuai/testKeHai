/**
 * Created by boys on 2015/9/16.
 * 机构资产中心
 */

/**
 * 机构财产中心-资产合计页面初始化js
 */
define(['jquery','load-org-account-info-1.0.0','sanhai-withdraw-log-1.0.0'], function ($,load,withd) {

    function initOrgAccountCenter() {
        $(function () {

            // 选项卡切换
            $('.tab .tabList li').click(function () {
                $(this).children("a").addClass("ac").parent("li").siblings("li").children("a").removeClass("ac");
                $('.tabCont .tabItem:eq(' + $(this).index() + ')').show().siblings().hide();
            });

            // 支出
            $("#expenditure").click(function () {
                $(this).children("a").addClass("ac").parent("li").siblings("li").children("a").removeClass("ac");
                $(this).siblings(".view_record").removeClass('hide');
                load.ajax4FundExpand2Page(1);
            });

            // 收入
            $("#income").click(function () {
                $(this).children("a").addClass("ac").parent("li").siblings("li").children("a").removeClass("ac");
                $(this).siblings(".view_record").addClass('hide');
                load.ajax4FundIncome2Page(1);
            });

            // 提现
            $("#withdrawals").click(function () {
                $(this).children("a").removeClass("ac").addClass("view_record_orange");
                withd.loadUserWithdrawals(1);
            });

            /*弹窗初始化*/
            $('.popBox').dialog({
                autoOpen: false,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).dialog("close")
                }
            });
            /*解绑*/
            $('.pushbtnJs').click(function () {
                $("#tch_bundling").dialog("open");
                return false;
            });
            //清除选项
            $('.cancelBtn').click(function () {

                $(".tch_bundling").dialog("close");
            });

            /*详情  滑鼠*/
            $('.sch_details').live("mouseenter", function () {
                $(this).children('a').children('i').addClass('down').parent('a').siblings('.details_main').show();
            });
            $('.sch_details').live("mouseleave", function () {
                $(this).children('a').children('i').removeClass('down').parent('a').siblings('.details_main').hide();
            });

            //获取收入明细的分页请求
            load.ajax4FundIncome2Page(1);
        })
    }

    return {
        initOrgAccountCenter: initOrgAccountCenter
    }
});