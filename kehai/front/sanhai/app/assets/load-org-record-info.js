define(['jquery', 'common', 'pageBar', 'money'], function ($, common, pageBar, money) {

    /**
     * 机构工资列表
     * @param teacherId
     * @param courseName
     * @param currPage
     */
    function ajaxSalary4Page(teacherId, courseName, currPage) {
        var url = "/fund/org/" + currPage + "/salary.do";
        var data = "";
        if (teacherId != null) {
            data += "teacherId=" + teacherId + "&";
        }
        if (courseName != null) {
            data += "courseName=" + courseName + "&";
        }
        $.ajax({
            url: url,
            type: "post",
            data: data,
            dataType: "json",
            success: function (resp) {
                if (resp.resCode == "000") {
                    appendSalaryRecord2Html(resp);
                    var params = new Array();
                    params.push(teacherId);
                    params.push(courseName);
                    pageBar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajaxSalary4Page, params);
                }
            },
            error: function (resp) {
            }
        });
    }

    /**
     * 渲染工资HTML内容
     * @param resp
     */
    function appendSalaryRecord2Html(resp) {
        if (common.checkResponse(resp) == false) return;
        var count = resp.data.countSize;
        var list = resp.data.list;

        if (count > 0) {

            $("#teacherSalaryDiv").find("h5").text("共有" + count + "条记录");
            $("#teacherSalaryDiv").find("tbody").empty();
            $("div[class='page']").empty()

            $.each(list, function (index, value) {
                var content = "<tr valign=\"top\">";
                content += "<td><span>" + value.name + "</span></td>";
                content += "<td class=\"classes_name\">";
                content += "<span><a href=\"javascript:;\" title="+value.courseTitle+">" + value.courseTitle + "（" + common.df.coursesType(value.courseMode, null) + "）</a></span>";
                var records = "";
                var moneyRecord = "";
                var times = "";
                var status = "";
                $.each(value.courseList, function (index1, record) {
                    records += "<span>" + common.df.courseRecordIndex(index1 + 1, null)  + record.courseTheme +"</span>";
                    moneyRecord += "<span>" + money.fmoney(record.money / 100, 2) + "</span>";
                    times += "<p>" + record.dealTime + "</p>";
                    status += "<p>课程已经结束</p>";
                });
                content += records;
                content += "</td>";
                content += "<td class='tc'>";
                //content += "<span class=\"green\" title=\"总课酬\">" + money.fmoney(value.money / 100, 2) + "</span>";
                content += "<span>&nbsp;</span>";
                content += moneyRecord;
                content += "</td>";
                content += "<td class='tc'>";
                content += "<span>&nbsp;</span>";
                content += times
                content += "</td>";
                content += "<td class='tc'><p>共" + value.nums + "节次</p>" + status + "</td>";
                content += "</tr>";
                $(".tabItem:eq(0) table").append(content);
            });
        } else {
            // 有记录清空内容和分页条
            $("#teacherSalaryDiv").find("h5").text("共有" + count + "条记录");
            $("#teacherSalaryDiv").find("tbody").empty();
            $("div[class='page']").empty()
        }
    }

    /**
     * 加载老师列表
     */
    function loadTeacherList() {
        var url = "/fund/org/teaList.do";
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            success: function (resp) {
                if (resp.resCode == "000") {
                    var list = resp.data.rows;
                    $(".sel_body option").slice(1).remove();
                    $.each(list, function (index, value) {
                        var content = "";
                        content += "<option value='" + value.userId + "'>" + value.name + "</option>";
                        $(".sel_body").append(content);
                    });
                }
            },
            error: function (resp) {

            }
        })
    }

    return {
        loadTeacherList: loadTeacherList,
        ajaxSalary4Page: ajaxSalary4Page
    }

});