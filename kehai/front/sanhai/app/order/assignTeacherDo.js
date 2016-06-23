/**
 * Created by Tian Jiayuan on 2015/12/28.
 * 匹配老师处理
 */

define(['jquery', 'loadVersionAndMatch', 'initAssignTeacherJs'],
    function($, loadMatch, initAssignTeacherJs){

        $("#allOrder").trigger('click');
        /*弹窗初始化*/
        $('.popBox').dialog({
            autoOpen: false,
            width: 600,
            modal: true,
            resizable: false,
            close: function () {
                $(this).dialog("close")
            }
        });
        /* --------------------------------------[匹配教师]-------------------------------------- */
        $("#teacher").on("click", function () {
            $("#org").attr("class", "blue");
            $("#platform").attr("class", "gray");
            loadMatch.matchTeacher(null, $('#grade'), $('#subject'), $('#version'));
        });

        //切换本校共和平台
        $("#org").on("click", function () {
            $("#org").attr("class", "blue");
            $("#platform").attr("class", "gray");
            loadMatch.matchTeacher($(this), $('#grade'), $('#subject'), $('#version'));
        });
        $("#platform").on("click", function () {
            $("#platform").attr("class", "blue");
            $("#org").attr("class", "gray");
            loadMatch.matchTeacher($(this), $('#grade'), $('#subject'), $('#version'))
        });

        // 搜索教师
        $("#searchTeaBtn").on("click", function () {
            var org = $("#org").attr("class");
            var platform = $("#platform").attr("class");

            if ("blue" == org) var scope = "org";
            if ("blue" == platform) var scope = "platform";

            loadMatch.loadSearchTeacher($("#name").val(), scope, 1);
        });
        initAssignTeacherJs.initAssignTeacher();
});