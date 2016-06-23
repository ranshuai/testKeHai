/**
 * Created by boys on 2015/9/16.
 * 机构资产中心页面填充类
 */
define(['jquery', 'pageBar', 'common', 'money', 'dialogs'], function ($, pagebar, common, money, dialogs) {

    /**
     * 机构收入
     * @param currPage
     */
    function ajax4FundIncome2Page(currPage) {
        var url = "/fund/org/" + currPage + "/income.do";
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    if (resp.data.countSize === '0') {
                        $('.fund_statistics .no_course').removeClass('hide');
                        return
                    }
                    $('.fund_statistics .yes_course').removeClass('hide');
                    appendFundIncome2Html(resp);        // 加载收入记录
                    var params = new Array();
                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajax4FundIncome2Page, params);
                }
            },
            error: function (resp) {
                dialogs._timer("亲，不要总是刷新我哦！");
            }
        })
    }

    /**
     * 根据服务器返回的内容设置机构资产统计收入页面内容
     * @param resp
     */
    function appendFundIncome2Html(resp) {
        if (false == common.checkResponse(resp)) return;
        var count = resp.data.countSize;
        var list = resp.data.list;

        if (count > 0) {
            $("#incomeTotalRows").html("共有" + count + "条记录");
            $("#incomeLog").empty();

            $.each(list, function (index, value) {

                var courseTitle = "";

                if (2000 == value.blotterCode) courseTitle = value.courseTitle;
                if (2001 == value.blotterCode)  courseTitle = value.nickName;
                //if (2002 == value.blotterCode) courseTitle = value.theme;
                if (2002 == value.blotterCode) courseTitle = value.orderCourseTitle;
                if (2003 == value.blotterCode) courseTitle = value.videoTitle;

                var content = "<tr valign=\"top\">";
                content += "<td>" + value.dealTime + "</td>";
                content += "<td>" + common.df.fundFlowType(value.blotterCode, courseTitle, common.df.coursesType(value.courseMode, null), value.name) + "</td>";
                content += "<td class=\"green\"><em>" + money.fmoney(value.money / 100, 2) + "</em></td>";
                content += "<td>" + value.orderId + "</td>";
                content += "<td>交易成功</td>";
                content += "</tr>";

                $("#incomeLog").append(content);
            });

        } else {
            $("#incomeTotalRows").html("共有0条记录");
            $("#incomeLog").empty();
        }
    }

    /**
     * 机构支出
     * @param currPage
     */
    function ajax4FundExpand2Page(currPage) {
        var url = "/fund/org/" + currPage + "/expand.do";
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    if (resp.data.countSize === '0') {
                        $('.fund_statistics .no_course').removeClass('hide');
                        return
                    }
                    $('.fund_statistics .yes_course').removeClass('hide');
                    appendFundExpand2Html(resp);
                    var params = new Array();
                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajax4FundExpand2Page, params);
                }
            },
            error: function (resp) {
                dialogs._timer("亲，不要总是刷新我哦！");
            }
        })
    }

    /**
     * 根据服务器返回的内容设置机构资产统计支出页面内容
     * @param resp
     */
    function appendFundExpand2Html(resp) {

        if (false == common.checkResponse(resp)) return;
        var count = resp.data.countSize;
        var list = resp.data.list;

        if (count > 0) {
            $("#expenditureTotalRows").html("共有" + count + "条记录");
            $("#expenditureLog").empty();

            $.each(list, function (index, value) {

                // 旁听课程题目是theme属性
                //if (4202 == value.blotterCode) value.courseTitle = value.theme;
                if (4202 == value.blotterCode) value.courseTitle = value.orderCourseTitle;

                var content = "<tr valign=\"top\">";
                content += "<td>" + value.dealTime + "</td>";
                content += "<td>" + common.df.fundFlowType(value.blotterCode, value.courseTitle, common.df.coursesType(value.courseMode, null), value.name) + "</td>";
                content += "<td class=\"orange_d\"><em>" + money.fmoney(value.money / 100, 2) + "</em></td>";
                var name = value.draweeId == "0" ? "平台" : value.name;
                content += "<td>" + name + "</td>";

                // 退款显示详细
                if (4200 == value.blotterCode) {
                    content += "<td class=\"tl\">交易成功&nbsp;<a href='/orderDeal/find/" + value.orderId + ".htm?type=0' class='blue'>详细</a>";
                } else {
                    content += "<td class=\"tl\">交易成功";
                }

                var courseContent = "";
                if (value.courseList != null) {
                    if (value.courseList.length > 0) {
                        courseContent += "<div class=\"sch_details pr clearfix\">";
                        courseContent += "<a href=\"javascript:;\" class=\"blue details\">详情<i></i></a>";
                        courseContent += "<div class=\"details_main pa hide tc\">";
                        courseContent += "<i></i>";
                        courseContent += "<table>";
                        courseContent += "<tr><th>节次</th><th>上课时间</th><th>金额</th></tr>";
                        $.each(value.courseList, function (index, record) {
                            courseContent += "<tr valign='top'>";
                            courseContent += "<td class='tc'>" + common.df.courseRecordIndex(record.recordIndex, null) + "</td>";
                            courseContent += "<td class='tc'>" + new Date(parseFloat(record.bookCoursesTime)).format("yyyy-MM-dd") + "</td>";
                            courseContent += "<td class=\"orange_d tc\">-" + money.fmoney(parseInt(record.coursesTimes) / 60 * parseInt(record.salary) / 100, 2) + "</td>";
                            courseContent += "</tr>"
                        });
                        courseContent += "</table>";
                        courseContent += "</div>";
                        courseContent += "</div>";
                    }
                }

                content += courseContent;
                content += "</td>";
                content += "</tr>";

                $("#expenditureLog").append(content);
            });
        } else {
            $("#expenditureTotalRows").html("共有0条记录");
            $("#expenditureLog").empty();
        }
    }

    return {
        ajax4FundIncome2Page: ajax4FundIncome2Page,
        ajax4FundExpand2Page: ajax4FundExpand2Page
    }
});