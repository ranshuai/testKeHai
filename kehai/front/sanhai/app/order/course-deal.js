/**
 * Created by boys on 2015/8/6.
 */
/**
 * 添加换师记录
 * @param data
 */
define(['jquery','common'], function ($,common) {


    var orgRecordAppend = function (data) {
        if (!common.checkResponse(data)) return;

        $("table tbody").empty();
        var rows = data.data.list;
        if (rows.length > 0) {
            $("table tbody").append("<tr><th>申请编号</th>" +
                "<th>申请人</th>" +
                "<th>课程名称</th>" +
                "<th>理由</th>" +
                "<th>剩余课时数</th>" +
                "<th>操作</th></tr>");
            $("#count").replaceWith("<h5 id=\"count\">共有" + data.data.countSize + "条记录</h5>");
        } else {
            $("#count").replaceWith("<h5 id=\"count\">共有" + 0 + "条记录</h5>");
            return;
        }

        for (var i = 0; i < rows.length; i++) {
            $("tbody").append("<tr></tr>");
            $("tbody tr:last-child").append("<td>" + rows[i].id + "</td>");
            $("tbody tr:last-child").append("<td>" + rows[i].name + "</td>");
            $("tbody tr:last-child").append("<td>" + rows[i].courseTitle + "</td>");
            $("tbody tr:last-child").append("<td class='tc'><span class='dib tl'>" + rows[i].changeTeaReason + "</span></td>");
            var stat = rows[i].changeTeaFlag;
            var tot = parseInt(rows[i].coursesTime / 60); //获取小时数
            var times = parseInt(rows[i].coursesFinishTimes / 60);
            $("tbody tr:last-child").append("<td>" + (tot - times) + "课时</td>");
            $("tbody tr:last-child").append("<td>" + common.df.showOrgOper("3" + rows[i].changeTeaFlag) + "<input type='hidden' id='id' value='" + rows[i].id + "'/></td>");
            if (stat == 32) {
                $("a.bk:last").wrap("<div class=\"pr reject_reason_main\"><a class=\"reason blue\">驳回理由</a><div class=\"reject_reason pa hide\"><i class=\"pa\"></i>" +
                    "<h5>理由：</h5>" +
                    "<p>" + rows[i].rejectTeaReason + "</p>" + "</div></div>");
            }
        }
    };
    /*退课记录*/
    function retireCoureses() {
        var retireStatus = common.df.showoperType1($("select").val());
        var currentPage = "1";
        var key = $("input").val();
        $.ajax({
            type: "post",
            url: "/retireCourses/findRetireCouresesByPrm.do",
            dataType: "json",
            data: {
                "currentPage": currentPage,
                "retireStatus": retireStatus,
                "name": key
            },
            success: function (result) {
                if (common.checkResponse(result) == false) {
                    return;
                }
                $("table tbody").html("");
                var val = result.data.rows;
                if (val.length > 0) {
                    $("table tbody").append("<tr><th>申请编号</th><th>申请人</th><th>课程名称</th><th>退课理由</th><th>所退金额</th><th>操作</th></tr>");
                    $("#count").replaceWith("<span id=\"count\">共有" + val.length + "条记录<span>");
                } else {
                    $("#count").replaceWith("<span id=\"count\">共有" + 0 + "条记录<span>");
                    return;
                }
                for (var i = 0; i < val.length; i++) {
                    $("table tbody").append("<tr></tr>");
                    $("table tbody tr:last-child").append("<td style='font-size:8px'>" + val[i].coursesId + "</td>");
                    $("table tbody tr:last-child").append("<td>" + val[i].name + "</td>");
                    $("table tbody tr:last-child").append("<td>" + val[i].courseTitle + "</td>");
                    $("table tbody tr:last-child").append("<td>" + val[i].reasonsRetreat + "</td>");
                    var stat = val[i].isRetireCourses;
                    if (stat == "3") {
                        $("table tbody tr:last-child td").append("<input type='hidden' value='" + val[i].dismissedRetreat + "'/>");
                    }

                    $("table tbody tr:last-child").append("<td  class=\"orange\" style='font-size: 14px'><span id='price'>" + money().fmoney(val[i].backMoney / 100, 2) + "</span></td>");
                    $("table tbody tr:last-child").append("<td>" + common.df.show_org_RetireCourses_OrgOper(stat) + "<input type='hidden' id='id' value='" + val[i].id + "'/><input id='oderNum' type='hidden' value='" + val[i].id + "' />" +
                        "<input id='orderActualPrice' type='hidden' value='" + val[i].orderActualPrice / 100 + "' />" +
                        "<input id='coursesTime' type='hidden' value='" + val[i].coursesTime / 60 + "' />" +
                        "<input id='coursesFinishTimes' type='hidden' value='" + val[i].coursesFinishTimes / 60 + "' /></td>");
                }
            },
            error: function (xhr, status, error) {
            }
        });
    };
    return {
        orgRecordAppend: orgRecordAppend
    }
});