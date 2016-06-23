/**
 * Created by Administrator on 2015/12/18.
 * 取消台时这个JS已经作废
 */
define(['jquery', 'pageBar', 'common', 'money'], function ($, Pagebar, common, money) {

    // 机构台时费支出记录
    function loadPlatformExpand(currentPage) {
        $.ajax({
            url: "/fund/expand/" + currentPage + "/orgPlatformFlowRecord.do",
            type: "post",
            dateType: "json",
            success: function (response) {
                var count = response.data.countSize;
                var list = response.data.list;

                $("#expandDiv").find("h5").text("共有" + count + "条记录");
                $("#expandDiv").find("tbody").empty();
                $("div[class='page']").empty();

                $.each(list, function (index, value) {

                    var content = "<tr valign=\"top\">";
                    content += "<td>" + value.dealTime + "</td>";
                    content += "<td>" + common.df.fundFlowType(value.blotterCode) + "</td>";
                    var name = value.draweeId == "0" ? "平台" : value.name;
                    content += "<td>" + name + "</td>";
                    content += "<td class='orange_d'>" + money.fmoney(value.money / 100, 2) + "</td>";
                    content += "<td>交易成功</td>";
                    content += "</tr>";

                    $("#expandDiv").find("tbody").append(content);
                });

                // 页码
                var params = new Array();
                Pagebar.setBasePageBar(response.data.totalPages, response.data.currPage, loadPlatformExpand, params);
            },
            fail: function () {

            }
        });
    }

    // 机构台时费支出记录
    function loadPlatformIncome(currentPage) {
        $.ajax({
            url: "/fund/income/" + currentPage + "/orgPlatformFlowRecord.do",
            type: "post",
            dateType: "json",
            success: function (response) {
                var count = response.data.countSize;
                var list = response.data.list;

                $("#incomeDiv").find("h5").text("共有" + count + "条记录");
                $("#incomeDiv").find("tbody").empty();
                $("div[class='page']").empty()

                $.each(list, function (index, value) {

                    var content = "<tr valign=\"top\">";
                    content += "<td>" + value.dealTime + "</td>";
                    content += "<td>" + common.df.fundFlowType(value.blotterCode) + "</td>";
                    var name = value.payeeId == "0" ? "平台" : value.name;
                    content += "<td>" + name + "</td>";
                    content += "<td class='green'>" + money.fmoney(value.money / 100, 2) + "</td>";
                    content += "<td>交易成功</td>";
                    content += "</tr>";

                    $("#incomeDiv").find("tbody").append(content);
                });

                // 页码
                var params = new Array();
                Pagebar.setBasePageBar(response.data.totalPages, response.data.currPage, loadPlatformIncome, params);
            },
            fail: function () {

            }
        });
    }

    return {
        loadPlatformIncome: loadPlatformIncome,
        loadPlatformExpand: loadPlatformExpand
    }
});