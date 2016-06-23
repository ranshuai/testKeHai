/**
 * Created by boys on 2015/10/16.
 */
/**
 * 获取上课记录的用户名
 */
define(['jquery','course-history-1.0','common','dialogs'], function ($,course,common,dialogs) {


    function getNameList() {
        $.post("/courses/nameList.do", function (resp) {
            if (resp.resCode == "000") {
                var nameList = resp.data.nameList;
                if (typeof nameList != "undefined" && nameList.length > 0) {
                    for (var i = 0; i < nameList.length; i++) {
                        $("select").append("<option value='" + nameList[i].name + "'>" + nameList[i].name + "</option>")
                    }
                }
            }
        }, "json");
    }

    /**
     * 初始化上课记录页面
     */
    function initCourseHistory() {
        getNameList();
        course.ajax4CourseHistory("", 1);
        $("button.pa").click(function () {
            var name = common.isNumber($("select").val()) == false ? $("select").val() : "";
            var recordId = common.isNumber($("input").val()) == true ? $("input").val() : "";
            var courseName = common.isNumber($("input").val()) == false ? $("input").val() : "";
            var data = "name=" + name + "&courseRecordId=" + recordId + "&courseName=" + courseName;
            course.ajax4CourseHistory(data, 1);
        });

    }

    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    /**
     * 保存评价信息
     */
    function saveEvalua() {

        $('#org_wrong').addClass('hide');
        $('#tea_wrong').addClass('hide');
        $('#sou_wrong').addClass('hide');
        $('#text_wrong').addClass('hide');
        $('#text_length_wrong').addClass('hide');
        var coursesId = $('#coursesId').val();
        var courseTitle = $('#courseTitle').val();
        var coursesRecordId = $('#coursesRecordId').val();
        var id = $('#id').val();
        var schoolId = $('#schoolId').val();
        var teacherId = $('#teacherId').val();
        var result_org = $("#result_org").text();
        var result_tea = $("#result_tea").text();
        var result_sou = $("#result_sou").text();
        var des = trim($('#notice_textarea').val());

        if (result_org == 0) {
            $('#org_wrong').removeClass('hide');
            return;
        }

        if (result_sou == 0) {
            $('#sou_wrong').removeClass('hide');
            return;
        }
        if (result_tea == 0) {
            $('#tea_wrong').removeClass('hide');
            return;
        }
        if (des == "") {
            $('#text_wrong').removeClass('hide');
            return;
        }
        if (des.length >300) {
            $('#text_length_wrong').removeClass('hide');
            return;
        }

        $.ajax({
            type: "post",
            url: "/evaluate/insertEvaluate.do",
            dataType: "json",
            data: {
                "courseId": coursesId,
                "courseName": courseTitle,
                "orderId": id,
                "coursesRecordId": coursesRecordId,
                "schoolId": schoolId,
                "teacherId": teacherId,
                "orgScore": result_org,
                "teaScore": result_tea,
                "sourceScore": result_sou,
                "des": des

            },
            success: function (result) {

                /* alert(result.resMsg);*/
                $('#org_wrong').addClass('hide');
                $('#tea_wrong').addClass('hide');
                $('#sou_wrong').addClass('hide');
                $('#text_wrong').addClass('hide');
                $('#text_length_wrong').addClass('hide');
                $('.p_right em i').removeClass('active');
                $('.p_right em span').text('0');
                $(".pushNotice").dialog("close");
                $('#notice_textarea').val('')
                location.replace(location.href);
            },
            error: function (xhr, status, error) {
                alert("请求失败.");
            }
        });

    }

    return {
        saveEvalua:saveEvalua,
        initCourseHistory:initCourseHistory
    }

});
