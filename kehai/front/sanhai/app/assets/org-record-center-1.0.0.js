/**
 * Created by boys on 2015/9/29.
 * 记录统计
 */
define(['jquery', 'load-org-record-info'], function ($, load) {

    function initOrgRecord() {
        load.loadTeacherList();
        /*tab切换*/
        $('.tab .tabList li').click(function () {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        });
        $('.right_main_mid input').placeholder({value: '请输入课程名称', top: '3px'}).attr('placeholder', '');
        $("#recordReport").trigger("click");
        load.ajaxSalary4Page(null, null, 1);

        $("button.pa").click(function () {
            var teacherId = $(".sel_body").val();
            var courseName = $("#courseName").val();
            if (teacherId == "" && courseName == "") {
                //$("#courseName").focus();
                //return false;
                load.ajaxSalary4Page(null, null, 1);
            }
            load.ajaxSalary4Page(teacherId, courseName, 1);
        });

    }

    return {
        initOrgRecord: initOrgRecord
    }
});