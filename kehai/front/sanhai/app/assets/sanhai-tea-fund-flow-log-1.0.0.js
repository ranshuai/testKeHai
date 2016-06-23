/**
 * Created by boys on 2015/9/22.
 * 老师的收支记录
 */

/**
 * 加载老师支出明细
 * @param currPage
 */
define(['jquery','common','money','pageBar','sanhai-withdraw-log-1.0.0'], function ($,common,money,pagebar,withdraw) {


    function loadTeaFundExpandLog(currPage) {
        $.ajax({
            url: "/fund/tea/" + currPage + "/expand.do",
            type: "post",
            dataTye: "json",
            success: function (resp) {
                if (common.checkResponse(resp) == true) {
                    $("#expenditureTotalRows").html("共有" + resp.data.countSize + "条记录");
                    $("#expenditureLog").empty();

                    $.each(resp.data.list, function (index, value) {
                        var dealTime = value.dealTime;
                        var content = "<tr valign=\"top\">";
                        content += "<td>" + dealTime.substring(0, dealTime.indexOf('.')) + "</td>";
                        content += "<td>" + df.fundFlowType(value.blotterCode, null, null, null) + "</td>";
                        content += "<td class=\"orange_d\"><em>-" + money.fmoney(value.money / 100, 2) + "</em></td>";
                        content += "<td>交易成功</td>";
                        content += "</tr>";

                        $("#expenditureLog").append(content);
                    });
                    // 页码
                    var params = new Array();
                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, loadTeaFundExpandLog, params);
                }
            },
            error: function (resp) {
                //console.log(resp);
            }
        })
    }

    /**
     * 加载老师收入明细
     * @param currPage
     */
    function loadTeaFundIncomeLog(currPage) {
        $.ajax({
            url: "/fund/tea/" + currPage + "/income.do",
            type: "post",
            dataType: "json",
            success: function (resp) {
                if (common.checkResponse(resp) == true) {
                    $("#incomeTotalRows").html("共有" + resp.data.countSize + "条记录");
                    $("#incomeLog").empty();

                    $.each(resp.data.list, function (index, value) {

                        var content = "<tr valign=\"top\">";
                        content += "<td>" + value.orgName + "</td>";
                        content += "<td><p>" + value.courseTitle + "</p>";
                        var indexs = "";
                        var dealTimes = "";
                        var moneys = "";
                        $.each(value.payList, function (index, pay) {
                            indexs += "<p>第" + pay.recordIndex + "节次  " + pay.courseTheme + "</p>";
                            dealTimes += "<p>" + pay.dealTime + "</p>";
                            moneys += "<p>" + money.fmoney(pay.money / 100, 2) + "</p>";
                        });
                        content += indexs + "</td>";
                        //content += "<td><p>" + money.fmoney(value.totalMoney / 100, 2) + "</p>" + moneys + "</td>";
                        content += "<td class='green'><p>&nbsp;</p>" + moneys + "</td>";
                        content += "<td><p>&nbsp;</p>" + dealTimes + "</td>";
                        content += "<td>交易成功</td>";
                        content += "</tr>";

                        $("#incomeLog").append(content);
                    });
                    // 页码
                    var params = new Array();
                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, loadTeaFundIncomeLog, params);
                }
            },
            error: function (resp) {
                //console.log(resp);
            }
        })
    }

    /**
     * 老师资金页面初始化
     */
    function initTeaFundFlow() {

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

            loadTeaFundExpandLog(1);
        });

        // 收入选项卡
        $("#income").click(function () {
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $(this).siblings('.view_record').hide();

            loadTeaFundIncomeLog(1);
        });

        // 提现选项卡
        $("#withdrawals").click(function () {
            $(this).children('a').removeClass('ac').addClass('view_record_orange');
            withdraw.loadUserWithdrawals(1);
        });

        /*详情  滑鼠*/
        $('.sch_details').mouseenter(function () {
            $(this).children('a').children('i').addClass('down').parent('a').siblings('.details_main').show();
        });
        $('.sch_details').mouseleave(function () {
            $(this).children('a').children('i').removeClass('down').parent('a').siblings('.details_main').hide();
        });

        // 默认收入
        loadTeaFundIncomeLog(1);
    }

    return {
        initTeaFundFlow:initTeaFundFlow
    }
});