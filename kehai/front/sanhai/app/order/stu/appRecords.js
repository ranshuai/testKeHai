/**
 * Created by boys on 2015/8/12.
 */
//学生记录管理的js方法

/**
 * 针对老师和学生的调课记录数据的填充
 * @param data
 */
define(['jquery', 'common','pageBar', 'money'], function ($, common,pageBar, money) {
    function recordsAppend(data) {
        if (!common.checkResponse(data)) return;
        $("table tbody").html("");
        var rows = data.data.list;
        var userFlag = data.data.userFlag;
        if (rows.length > 0) {
            $("table colgroup").remove();
            $("table tbody").before("  <colgroup>" +
                "<col width=\"120px\"/>" +
                "<col width=\"100px\"/>" +
                "<col width=\"200px\"/>" +
                "<col width=\"60px\"/>" +
                "<col width=\"160px\"/>" +
                "<col width=\"118px\"/>" +
                "<col width=\"120px\"/>" +
                "</colgroup>");
            $("table tbody").append("<tr><th>申请编号</th><th>申请人</th><th>课程名称</th><th>节次</th><th>调课理由</th><th>目标时间</th><th>操作</th></tr>");
            $("#count").replaceWith("<h5 id=\"count\">共有" + data.data.countSize + "条记录</h5>");
        } else {
            $("#count").replaceWith("<h5 id=\"count\">共有" + 0 + "条记录</h5>");
            return;
        }
        for (var i = 0; i < rows.length; i++) {
            $("table tbody").append("<tr></tr>");
            $("table tbody tr:last-child").append("<td>" + rows[i].id + "</td>");
            $("table tbody tr:last-child").append("<td>" + rows[i].name + "</td>");
            $("table tbody tr:last-child").append("<td>" + rows[i].coursesName + "</td>");
            $("table tbody tr:last-child").append("<td>第" + rows[i].recordIndex + "节</td>");
            $("table tbody tr:last-child").append("<td class='tc'><span class='tl dib'>" + rows[i].reasonRetire + "</span></td>");
            var stat = rows[i].changeCourseFlag;
            var time = rows[i].targetTime == 0 ? rows[i].bookCoursesTime : rows[i].targetTime;
            $("table tbody tr:last-child").append("<td  class=\"orange\" style='font-size: 12px'>" + new Date(parseFloat(time)).format("MM-dd hh:mm:ss") + "</td>");
            $("table tbody tr:last-child").append("<td>" + common.df.showOrgOper(userFlag + rows[i].changeCourseFlag) + "<input type='hidden' value='" + rows[i].coursesRecordId + "'/></td>");
            if (stat == "32" || stat == "22") {
                $("a.bk:last").wrap("<div class=\"pr reject_reason_main\"><a class=\"reason blue\">驳回理由</a><div class=\"reject_reason pa hide\"><i class=\"pa\"></i>" +
                    "<h5>理由：</h5>" +
                    "<p>" + rows[i].disagreeReason + "</p>" + "</div></div>");
                //$("table tbody tr:last-child td").append("<input type='hidden' value='"+ rows[i].disagreeReason+"'/>");
            }
        }
    }

    /**
     * 学生调课记录分页操作的方法
     * @param url
     * @param data
     * @param currPage
     */
    function ajaxStuRecords4Page(url, data, currPage) {
        var a = data;
        data += "&currPage=" + currPage;
        $.ajax({
            url: url,
            data: data,
            type: "post",
            dataType: "json",
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    recordsAppend(resp);
                    var params = new Array();
                    params.push(url);
                    params.push(a);
                    pageBar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajaxStuRecords4Page, params);
                }
            },
            error: function (resp) {
                alert("错误" + resp.resMsg);
            }
        })
    }

    /**
     * 学生换老师的记录数据填充
     * @param data
     */
    function changeTeacherRecords(data) {
        if (!common.checkResponse(data)) return;
        var rows = data.data.list;
        var len = rows.length;
        $("table tbody").empty();
        if (len > 0) {
            $("#count").replaceWith("<h5 id=\"count\">共有" + data.data.countSize + "条记录</h5>");
            $("table colgroup").remove();
            $("table tbody").before("  <colgroup>" +
                "<col width=\"120px\"/>" +
                "<col width=\"200px\"/>" +
                "<col width=\"220px\"/>" +
                "<col width=\"220px\"/>" +
                "<col width=\"130px\"/>" +
                "</colgroup>");
            $("table tbody").append("<tr></tr>");
            $("table tbody tr").append("<th>申请编号</th><th>课程名称</th><th>理由</th><th>现任教师</th><th>状态</th>");
        } else {
            $("#count").replaceWith("<h5 id=\"count\">共有" + 0 + "条记录</h5>");
        }

        for (var i = 0; i < rows.length; i++) {
            $("table tbody").append("<tr></tr>");
            $("table tbody tr:last-child").append("<td>" + rows[i].id + "</td>");
            $("table tbody tr:last-child").append("<td>" + rows[i].courseTitle + "</td>");
            $("table tbody tr:last-child").append("<td class='tc'><span class='tl dib'>" + rows[i].changeTeaReason + "</span></td>");
            var stat = rows[i].changeTeaFlag;
            var name = rows[i].name ? rows[i].name : "无";
            $("table tbody tr:last-child").append("<td>" + name + "</td>");
            if (rows[i].assignTeacherFlag == 3)
                $("table tbody tr:last-child").append("<td>" + common.df.coursesStatus(rows[i].changeTeaFlag) + "</td>");
            else
                $("table tbody tr:last-child").append("<td><span>处理中</span></td>");
            if (stat == "32" || stat == "22") {
                $("a.bk:last").wrap("<div class=\"pr reject_reason_main\"><a class=\"reason blue\">驳回理由</a><div class=\"reject_reason pa hide\"><i class=\"pa\"></i>" +
                    "<h5>理由：</h5>" +
                    "<p>" + rows[i].rejectTeaReason + "</p>" + "</div></div>");
            }

        }
    }

    /**
     * 学生换教师记录的分页信息
     * @param url
     * @param data
     * @param currPage
     */
    function ajaxStuChangeTeaRecords4Page(url, data, currPage) {
        var a = data;
        data += "&currPage=" + currPage;
        $.ajax({
            url: url,
            data: data,
            type: "post",
            dataType: "json",
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    changeTeacherRecords(resp);
                    var params = new Array();
                    params.push(url);
                    params.push(a);
                    pageBar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajaxStuChangeTeaRecords4Page, params);
                }
            },
            error: function (resp) {
            }
        })
    }


    /*退课记录*/
    /**
     * 填充退课记录信息
     * @param result
     */
    function appendStuRetireCoursesRecords(result) {
        $("table tbody").html("");
        var val = result.data.list;
        if (val.length > 0) {
            $("table colgroup").remove();
            $("table tbody").before("<colgroup>" +
                "<col width=\"120px\"/>" +
                "<col width=\"240px\"/>" +
                "<col width=\"280px\"/>" +
                "<col width=\"130px\"/>" +
                "<col width=\"100px\"/>" +
                "</colgroup>");
            $("table tbody").append("<tr><th>申请编号</th><th>课程名称</th><th>退课理由</th><th>所退金额</th><th>状态</th></tr>");
            $("#count").replaceWith("<h5 id=\"count\">共有" + result.data.countSize + "条记录</h5>");
        } else {
            $("#count").replaceWith("<h5 id=\"count\">共有" + 0 + "条记录</h5>");
            return;
        }
        for (var i = 0; i < val.length; i++) {
            $("table tbody").append("<tr></tr>");
            $("table tbody tr:last-child").append("<td>" + val[i].id + "</td>");
            /* $("table tbody tr:last-child").append("<td>"+ val[i].name +"</td>");*/
            $("table tbody tr:last-child").append("<td>" + val[i].courseTitle + "</td>");
            $("table tbody tr:last-child").append("<td class='tc'><span class='tl dib'>" + val[i].reasonsRetreat + "</span></td>");
            var stat = val[i].isRetireCourses;
            /*   if(stat == "3"){
             $("table tbody tr:last-child td").append("<input type='hidden' value='"+ val[i].dismissedRetreat+"'/>");
             }*/

            $("table tbody tr:last-child").append("<td  class=\"orange\" style='font-size: 14px'> <span id='price'>" + money.fmoney(val[i].backMoney / 100, 2) + "</span></td>");
            $("table tbody tr:last-child").append("<td>" + common.df.show_RetireCourses_OrgOper(stat) + "</td>");
            if (stat == "3") {
                $("a.bk:last").wrap("<div class=\"pr reject_reason_main\"><a class=\"reason blue\">驳回理由</a><div class=\"reject_reason pa hide\"><i class=\"pa\"></i>" +
                    "<h5>理由：</h5>" +
                    "<p>" + val[i].dismissedRetreat + "</p>" + "</div></div>");
            }
        }
    }

    /**
     * 退课记录分页信息
     */
    function ajaxRetireCoureses4Page(url, data, currPage) {
        var a = data;
        data += "&currentPage=" + currPage;
        $.ajax({
            url: url,
            data: data,
            type: "post",
            dataType: "json",
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    appendStuRetireCoursesRecords(resp);
                    var params = new Array();
                    params.push(url);
                    params.push(a);
                    pageBar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajaxRetireCoureses4Page, params);
                }
            },
            error: function (resp) {
            }
        })
    }

    return {
        ajaxStuRecords4Page:ajaxStuRecords4Page,
        ajaxStuChangeTeaRecords4Page:ajaxStuChangeTeaRecords4Page,
        ajaxRetireCoureses4Page:ajaxRetireCoureses4Page

    }
});