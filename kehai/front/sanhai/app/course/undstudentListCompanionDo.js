
define(
    [
        'jquery',
        'course_center',
        'sanhai-companion-standard-1.0.0'
    ],function($,course,com){

        // 初始化科目下拉选项框（这里使用sanhai-course-list-standard-1.0.0.js方法因为有全部选项）
    course.loadSubject4Search($("#subject"), null);

        // 初始化首次查询课程信息
        com.loadCompanionList(0, "ignore", 1);
        $(".tabList").find("a").eq(0).on("click", function () {
            com.loadCompanionList(0, "ignore", 1);
        });

        //查询事件
        $("#searchBtn").on("click", function () {
            var subjectId = $("#subject").val();
            var key = ("" == $("#key").val()) ? "ignore" : $("#key").val();
            com.loadCompanionList(subjectId, key, 1);
        });
});