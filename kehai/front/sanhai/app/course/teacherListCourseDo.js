/**
 * Created by Administrator on 2015/12/14.
 */

define(
    [
        'jquery',
        'course_center'

    ],function($,course){

        // 初始化科目下拉选项框
        course.loadSubject4Search($("#subject"), null);

        // 初始化首次查询课程信息
        course.loadCourseList("teacher", "whole", 1);

        $(".tabList").find("a").eq(0).click(function () {
            course.loadCourseList("teacher", "whole", 1);
        });

        $(".tabList").find("a").eq(1).click(function () {
            course.loadCourseList("teacher", "one2one", 1);
        });

        //查询事件
        $("#searchBtn").on("click", function () {
            var subjectId = $("#subject").val();
            var key = ("" == $("#key").val()) ? "ignore" : $("#key").val();
            course.loadCourseSearch("teacher", subjectId, key, 1);
        });
});

