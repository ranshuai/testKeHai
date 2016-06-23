/**
 * Created by boys on 2015/10/24.
 */


/**
 * 获取上课记录的用户名
 */
function getNameList(){
    $.post("/courses/nameList.do", function(resp){
        if (resp.resCode == "000"){
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
 * 初始化老师讲课记录页面
 */
function initTeaCourseHistory() {
    getNameList();
    ajax4CourseHistory("", 1);
    $("button.pa").click(function(){
        var name = common.isNumber($("select").val()) == false ? $("select").val() : "";
        var recordId = common.isNumber($("input").val()) == true ? $("input").val() : "";
        var　courseName = common.isNumber($("input").val()) == false ? $("input").val() : "";
        var data = "name=" + name + "&courseRecordId=" + recordId + "&courseName=" +　courseName;
        ajax4CourseHistory(data, 1);
    });

    $("textarea").live("focus", function(){
        //$("p.reason").hide();
    });
}
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function saveEvalua() {
    $('#wrong_text').addClass('hide');
    $('#wrong_text_length').addClass('hide');
    var coursesId = $('#coursesId').val();
    var courseTitle = $('#courseTitle').val();
    var userId1 = $('#userId1').val();
    var username = $('#username').val();
    var coursesRecordId = $('#coursesRecordId').val();
    var des = trim($('#notice_textarea').val());
    var orderid = $('#id').val();
    if(des==""){
        $('#wrong_text').removeClass('hide');
        return;
    }
    if(des.length>300){
        $('#wrong_text_length').removeClass('hide');
        return;
    }
    $.ajax({
        type: "post",
        url: "/evaluate//insertEvaluateStu.do",
        dataType: "json",
        data: {
            "stuId": userId1,
            "stuName": username,
            "courseId": coursesId,
            "courseName": courseTitle,
            "coursesRecordId": coursesRecordId,
            "des": des,
            "orderid": orderid

        },
        success: function (result) {

            $('#wrong_text').addClass('hide');
            $('#wrong_text_length').addClass('hide');
            $('#notice_textarea').val('')
            location.replace(location.href);
        },
        error: function (xhr, status, error) {
            alert("请求失败.");
        }
    });
}
