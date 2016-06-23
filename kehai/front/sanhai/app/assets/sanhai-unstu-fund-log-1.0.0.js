define(['jquery','common','money','pageBar','sanhai-withdraw-log-1.0.0'], function ($,common,money,pagebar,withd) {


    function initUnstuFundFlow() {

        // 选项卡选择
        $(".tab .tabList li").click(function () {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        });

        // 支出选项卡
        $("#expenditure").click(function () {
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $(this).siblings('.view_record').show();
            loadUnstudentExpenditureLog(1);
        });

        // 收入选项卡
        $("#income").click(function () {
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $(this).siblings('.view_record').hide();
            loadUnstudentIncomeLog(1);
        });

        // 提现选项卡
        $("#withdrawals").click(function () {
            $(this).children('a').removeClass('ac').addClass('view_record_orange');
            withd.loadUserWithdrawals(1);
        });

        /*详情  滑鼠*/
        $('.sch_details').mouseenter(function () {
            $(this).children('a').children('i').addClass('down').parent('a').siblings('.details_main').show();
        });
        $('.sch_details').mouseleave(function () {
            $(this).children('a').children('i').removeClass('down').parent('a').siblings('.details_main').hide();
        });

        // 默认收入
        loadUnstudentIncomeLog(1);
    }

    /**
     * 加载大学生收入明细
     * @param currentPage
     */
    function loadUnstudentIncomeLog(currentPage) {
        $.ajax({
            url: "/fund/income/" + currentPage + "/unstudentFlowRecord.do",
            type: "post",
            dateType: "json",
            success: function (response) {

                $("#incomeTotalRows").html("共有" + response.data.countSize + "条记录");
                $("#incomeLog").empty();
                $("#pageBar").empty();

                $.each(response.data.list, function (index, value) {

                    var content = "<tr valign=\"top\">";
                    content += "<td>" + value.dealTime + "</td>";
                    content += "<td>" + common.df.fundFlowType(value.blotterCode) + "</td>";
                    var name = value.payeeId == "0" ? "平台" : value.name;
                    content += "<td>" + name + "</td>";
                    content += "<td class='green'>" + money.fmoney(value.money / 100, 2) + "</td>";
                    content += "<td>交易成功</td>";
                    content += "</tr>";

                    $("#incomeLog").append(content);
                });

                // 页码
                var params = new Array();
                pagebar.setBasePageBar(response.data.totalPages, response.data.currPage, loadUnstudentIncomeLog, params);

            },
            fail: function () {

            }
        });
    }

    /**
     * 加载大学生支出明细
     * @param currentPage
     */
    function loadUnstudentExpenditureLog(currentPage) {
        $("#pageBar").empty();
    }
    return {
        initUnstuFundFlow:initUnstuFundFlow
    }
});