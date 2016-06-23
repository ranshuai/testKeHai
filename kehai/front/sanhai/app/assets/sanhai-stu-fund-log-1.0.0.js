/**
 * Created by Administrator on 2015/12/17.
 */
/**
 * 加载学生的收支明细
 * @param currentPage
 */
define(['jquery', 'common', 'pageBar', 'dialogs', 'money'], function ($, common, pageBar, dialogs, money) {
    function loadUserFundFlowLog(currentPage) {
        $.ajax({
            url: "/fund/stu/" + currentPage + "/record.do",
            type: "post",
            dateType: "json",
            success: function (response) {
                if (common.checkResponse(response) == true) {
                    $("#tradeLog").empty();
                    $("#tradeTotalRows").text("共" + response.data.countSize + "笔交易记录");
                    $.each(response.data.list, function (index, value) {

                        var courseTitle = value.courseTitle;
                        var courseMode = "";
                        var status = "交易成功";

                        if (2000 == value.blotterCode) courseTitle = value.courseTitle;
                        if (2001 == value.blotterCode)  courseTitle = value.nickName;
                        if (2002 == value.blotterCode) courseTitle = value.theme;
                        //if (2002 == value.blotterCode) courseTitle = value.orderCourseTitle;
                        if (2003 == value.blotterCode) courseTitle = value.videoTitle;
                        if (4202 == value.blotterCode) courseTitle = value.orderCourseTitle;

                        var detail = common.df.fundFlowType(value.blotterCode, courseTitle, courseMode, null);
                        var content = "<tr valign='top'>" +
                            "<td>" + value.dealTime + "</td>" +
                            "<td>" + detail + "</td>";

                        if (value.blotterCode == "1000" || value.blotterCode == "4200" || value.blotterCode == "4202") {
                            content += "<td class=\"green\">+" + money.fmoney(Number(value.money) / 100, 2) + "</td>";
                        } else {
                            content += "<td class=\"orange_d\">-" + money.fmoney(Number(value.money) / 100, 2) + "</td>";
                        }

                        if (0 == value.status) status = "<td class=\"orange_d\">交易失败</td>";
                        if (1 == value.status) status = "<td class=\"green\">交易成功</td>";
                        if (9 == value.status) status = "<td class=\"orange_d\">申请中</td>";

                        content += status + "</tr>";
                        $("#tradeLog").append(content);
                    });
                    // 页码
                    var params = new Array();
                    pageBar.setBasePageBar(response.data.totalPages, response.data.currPage, loadUserFundFlowLog, params);
                }
            },
            error: function (response) {
                dialogs._timer("亲，不要总刷新我啊！", 2, 2, null);
            }
        });
    }

    return {
        loadUserFundFlowLog: loadUserFundFlowLog
    }
});