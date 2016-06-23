/**
 * Created by boys on 2015/9/14.
 */

/**
 * 初始化老师待排课页面
 */

define(['jquery','dialogs', 'jquery.datetimepicker'],function($, dialogs){


    function initTeaScheduleCourse() {

        $(".sel_body").live("change", function(){
            $(this).siblings("em").text($(this).find("option:selected").text());
        });

        $("a.pushBtnJs").live("click", function(){
            //openDialog(0,1);
            var orderId = $(this).next("input[name='orderId']").val();
            var courseId = $(this).nextAll("input[name='courseId']").val();
            dialogs._form_time(function(){
                $.post("/courses/scheduleCourse.do", {
                    orderId: orderId,
                    courseId: courseId,
                    dateTime:$(".jcDate").val() + ":00",
                    duration: $("select").val(),
                    courseTheme: $.trim($("#theme").val())
                }, function(resp){
                    if (resp.resCode == "000") {
                        dialogs._timer("排课成功", 1, 1, function(){location.reload();});

                    }else{
                        dialogs._timer("排课失败" + resp.resMsg, 2, 1, null);
                    }
                });
            }, null);
                $("input.datetimepicker").datetimepicker({
                    lang:'ch',
                    format:'Y-m-d H:i',
                    minDate:'0'
                });
        });
    }

    return {
        initTeaScheduleCourse : initTeaScheduleCourse
    }

});