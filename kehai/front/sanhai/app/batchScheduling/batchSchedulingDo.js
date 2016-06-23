/**
 * Created by slg on 2016/4/6.
 */
define('batchSchedulingDo',['jquery','dialogs','jquery_ui_min','jquery.datetimepicker'],function($,dialog){

    function batchScheduling(){

        $.each($("input[name=time]"), function(index, value){
            if (time < parseInt($(value).val())/60){
                $(value).attr("checked", "");
                $(value).attr("disabled",'disabled');
            }
        });
        var checkSubmitFlg1 = false;
        $('.preservation').click(function(){
            var time1=$('.datetimepicker1').val();
            var time2=$('.datetimepicker2').val();
            var chk_value =[];
            $('input[name="week"]:checked').each(function(){
                chk_value.push($(this).val());
            });
            var weeked=chk_value.join(",");
            var duration=$("input[type='radio']:checked").val();
            if(weeked=='' || time1=='' || time2==''||duration==undefined){
                dialog._timer("请将信息填写完整", 2, 1);
                return;
            }
            if(checkSubmitFlg1 ==true){
                return; //当表单被提交过一次后checkSubmitFlg将变为true,根据判断将无法进行提交。
            }
            checkSubmitFlg1 =true;
            $.post("/courses/batch/pk.do", {
                orderId: orderid,
                weeks: weeked,
                time:time1 + ":00",
                date:time2,
                duration: duration
            }, function(resp){
                if (resp.resCode == "000") {
                    //dialogs._timer("排课成功", 1, 1, function(){location.reload();});
                    window.location.href="/courses/ctManage.htm";
                }else{
                    dialogs._timer("排课失败" + resp.resMsg, 2, 1, null);
                }
            });


        });

        $('.cancel').click(function(){
            window.location.href="/courses/ctManage.htm";
        });

        var index = new Date().getHours();
        $("input.datetimepicker1").datetimepicker({
            lang:'ch',
            datepicker:false,
            format:'H:i',
            step:30
        });

        $("input.datetimepicker2").datetimepicker({
            lang:'ch',
            minDate:'0',
            timepicker:false,
            format:'Y-m-d',
            value:bookCoursesTime
        });
    }
    batchScheduling()
});