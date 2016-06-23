/**
 * Created by boys on 2015/9/12.
 * 学生申请记录操作方法
 */
define(['jquery','appRecords','common'], function ($,app,common) {

    function initStuAppRecord() {
        $(function () {
            //调课记录
            var url = "/changeTea/home.do";
            var data = "operType=2";
            app.ajaxStuRecords4Page(url, data, 1);
            var signs = "0";
            /*驳回理由滑鼠*/
            $('.reject_reason_main').live('mouseenter', function () {
                $(this).children('.reject_reason').show();
            });
            $('.reject_reason_main').live('mouseleave', function () {
                $(this).children('.reject_reason').hide();
            });
            //设置index的默认位置
            index = 0;
            /*tab切换*/
            $('.tab .tabList li').click(function () {

                index = $(this).index();
                $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
                $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
                if (index == 0) {
                    signs = "0";
                    $("#search").trigger("click");
                } else if (index == 1) { //退课
                    signs = "1";
                    var url = "/retireCourses/findRetireCouresesByPrm.do";
                    var data = "retireStatus=" + common.df.showoperType1($("select").val()) + "&name=" + $("input").val() + "&";
                    app.ajaxRetireCoureses4Page(url, data, 1);

                } else { //换老师
                    signs = "2";
                    $("#search").trigger("click");
                }
            });
            $("#search").bind("click", function () {
                if (signs == "1") {
                    var url = "/retireCourses/findRetireCouresesByPrm.do";
                    var data = "retireStatus=" + common.df.showoperType1($("select").val()) + "&name=" + $("input").val() + "&";
                    app.ajaxRetireCoureses4Page(url, data, 1);
                } else if (signs == "0") {
                    var url = "/changeTea/home.do";
                    var operType = index == 2 ? $("select").val() - 3 : $("select").val();
                    var val = $.trim($("input").val());
                    var data = "operType=" + operType;
                    if (common.isNumber(val)) {
                        data += "&orderId=" + $("input").val() + "&";
                    }
                    else {
                        data += "&name=" + $("input").val() + "&";
                    }
                    app.ajaxStuRecords4Page(url, data, 1);
                } else {
                    var url = "/changeTea/records.do";
                    var operType = index == 2 ? $("select").val() - 3 : $("select").val();
                    var data = "operType=" + operType + "&name=" + $("input").val() + "&";
                    app.ajaxStuChangeTeaRecords4Page(url, data, 1);
                }
            });
        })
    }

    return {
        initStuAppRecord:initStuAppRecord
    }
});