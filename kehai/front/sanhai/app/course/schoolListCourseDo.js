define(['jquery', 'course_center'], function ($, course) {

    //$("#allCourse").attr("class","cur");

    // 初始化科目下拉选项框
    course.loadSubject4Search($("#subject"), null);

    // 初始化首次查询课程信息
    course.loadCourseList("org", "whole", 1);

    // 全部课程 选项卡
    $(".tabList").find("a").eq(0).click(function () {
        course.loadCourseList("org", "whole", 1);
    });

    // 一对一 选项卡
    $(".tabList").find("a").eq(1).click(function () {
        course.loadCourseList("org", "one2one", 1);
    });

    //查询事件
    $("#searchBtn").on("click", function () {
        var subjectId = $("#subject").val();
        var key = ("" == $("#key").val()) ? "ignore" : $("#key").val();
        course.loadCourseSearch("org", subjectId, key, 1);
    });
});
