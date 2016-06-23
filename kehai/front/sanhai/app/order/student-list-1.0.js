/**
 * Created by boys on 2015/9/2. 显示老师的学生列表信息
 */

define(
    [
        'jquery',
        'common',
        'pageBar'
    ],function($,common,pagebar){
    function studentList4Page(currPage) {
        var url = "/orderDeal/" + currPage + "/myStudents.do";
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

                    appendSutdentList(resp.data);
                    var params = new Array();

                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, studentList4Page, params);
                }
            },
            error: function (resp) {
                alert("错误" + resp.resMsg);
            }
        });
    }

    function appendSutdentList(data){
    var count = data.countSize;
    var userFlag = data.userFlag;
    if (count == 0){
        if(userFlag == 0){
            $("div.msg p a").attr("href", "/course/createCourse.htm");
        }else if(1 == userFlag){
            $("div.msg p a").attr("href", "/companion/createCompanion.htm");
        }

        $(".tabItem:eq(0)").show().siblings().hide();
        return;
    }
    $("#count").replaceWith("<h5 id=\"count\">共有"+count+"条记录</h5>");
    var list = data.list;
    $("table tbody").empty();
    $.each(list, function(index, value){
        var content ="<tr>";
            if (value.ppResId == ""){
                content += "<td class=\'tl\'><a href=\"#\"><img src=\"/front/sanhai/images/person.png\" alt=\"学生头像\" title=\"学生头像\" class=\"stu\"/>";
            }else {
                content += "<td class=\'tl\'><a href=\"#\"><img src=\"/file/loadImage/"+ value.ppResId+".r\" alt=\"学生头像\" title=\"学生头像\" class=\"stu\"/>";
            }
            content += "&nbsp;&nbsp;<span class=\"name\">"+value.name+"</span></a>&nbsp;&nbsp;&nbsp;<a href=\"javascript:;\"><i class=\"talk_icon\"></i></a>";
            content += "</td>";
            content += "<td style='padding-top:30px;'>"+value.phoneNumber+"</td>";
        var courseList = value.courseList;
        var courses = "";
        $.each(courseList, function(index, course){
            switch (parseInt(course.courseMode)){
                case 2: courses += "<p style=\"margin: 10px 0;\">陪读课程</p>";break;
                default :courses += "<p class='ellipsis' style=\"margin: 10px 0;\">"+course.courseTitle+"</p>";
            }
        });
            content += "<td>"+courses+"</td>";
            content += "<td style='padding-top:30px;'><a class=\"blue\" href=\"/orderDeal/student/"+value.userId+".htm\">详情</a></td></tr>";
        $("table tbody").append(content);
    })

}

    return {
        studentList4Page : studentList4Page
    }
});