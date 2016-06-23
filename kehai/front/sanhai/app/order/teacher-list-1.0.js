/**
 * Created by boys on 2015/9/2. 显示学生的老师列表信息
 */

define(['jquery','common','module/sanhai-base-pagebar-standard-1.0.0'], function ($,common,pagebar) {


    function teacherList4Page(currPage) {
        var url = "/orderDeal/" + currPage + "/myTeachers.do";
        var data = "";
        if (arguments.length == 2) {
            data = arguments[1];
        }
        $.ajax({
            url: url,
            dataType: "json",
            type: "post",
            data: data,
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    appendTeacherList(resp.data);
                    var params = new Array();
                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, teacherList4Page, params);
                }
            },
            error: function (resp) {
            }
        });
    }

    function appendTeacherList(data) {
        var count = data.countSize;
        if (count == 0) {
            $(".tabItem:eq(0)").show().siblings().hide();
            return;
        }
        $("#count").replaceWith("<h5 id=\"count\">共有" + count + "条记录</h5>");
        var list = data.list;
        $("table tbody").empty();
        $.each(list, function (index, value) {
            var content = "<tr>";
            if (value.ppResId == "") {
                content += "<td class='tl'><a href=\"#\"><img src=\"/front/sanhai/images/person.png\" alt=\"老师头像\" title=\"老师头像\" class=\"stu\"/>";
            } else {
                content += "<td class='tl'><a href=\"#\"><img src=\"/file/loadImage/" + value.ppResId + ".r\" alt=\"老师头像\" title=\"老师头像\" class=\"stu\"/>";
            }
            content += "&nbsp;&nbsp;<span class=\"name\">" + value.name + "</span></a>&nbsp;&nbsp;&nbsp;<a href=\"javascript:;\"><i class=\"talk_icon\"></i></a>";
            content += "</td>";
            content += "<td style='padding-top:30px;'>" + value.phoneNumber + "</td>";
            var courseList = value.courseList;
            var courses = "";
            $.each(courseList, function (index, course) {
                courses += "<p class='ellipsis'>" + course.courseTitle + "</p>";
            });
            content += "<td>" + courses + "</td>";
            content += "<td style='padding-top:30px;'><a class=\"blue\" href=\"/site/theacher/" + value.teacherId + "/toTeacherIndex.htm\">详情</a></td></tr>";
            $("table tbody").append(content);
        })

    }

    return {
        teacherList4Page: teacherList4Page
    }
})