/**
 * Created by boys on 2015/8/7.
 */


    /**
     * 发送请求
     * @param url
     * @param data
     */
    define(['jquery', 'dialogs'], function($, dialogs){

        function sendRequestToServer(url, data){
            $.ajax({
                url:url,
                data:data,
                type:"post",
                dataType:"json",
                success:function(resp){
                    if (resp.resCode == "000") {
                        dialogs._timer("操作成功", 1, 1, function(){location.reload();});
                    }else {
                        dialogs._timer(resp.resMsg, 2, 2, null);
                    }
                },
                beforeSend:function(){

                }
            })
        }

        return {



    /**
     *调课时调用
     * @param courseRecordId
     * @param index
     */
    'changeCourse': function (courseRecordId, index, type) {
        dialogs._class_adjust(function(){
            var url = "/changeTea/dealCourse.do";
            var data = "operType=20" +"&toTime="+ $("input.toTime").val() + ":00" + "&detail="+$("textarea").val() + "&coursesRecordId=" + $.trim($("input.recordId").val());
            sendRequestToServer(url, data);
        }, null);
        $("input#datetimepicker").datetimepicker({
            lang:'ch',
            format:'Y-m-d H:i',
            minDate:'0'
        });
        if(type == 1){
            $("textarea").val("调课");
            $("textarea").hide();
            $("textarea").siblings("label").hide();
            //$("#ui-id-1").text("调课");
        }
        $("input#index").val("第" +index+ "节课");
        $("input.recordId").val(courseRecordId);
        $("input.oper").val(20);
        $("input.orderId").val(courseRecordId);
    },

    /**
     *匹配老师
     * @param orderId
     */
    'chooseTea':function (orderId,type) {
        location.href="<%=basePath%>/orderDeal/find/"+ orderId +".htm?type="+type;
    },


    /**
     *退课
     * @param orderId
     */
    'quitCourse':function (orderId,type) {
        if (type == 1){ //退课
            dialogs._class_cancel(function () {
                var url = "/retireCourses/applicationWithdrawal.do";
                var data = "WithdrawalInfo=" + $("#notice_textarea").val() + "&orderNum=" + orderId;
                sendRequestToServer(url, data);
            }, null);
        }else if(type == 30){ //换老师
            dialogs._teacher_change(function(){
                $("input.oper").val(type);
                $("input.orderId").val(orderId);
                var url = "/changeTea/request.do";
                var data = "operType=" + $(".oper").val() + "&detail=" + $("textarea").val() + "&orderId=" + $(".orderId").val();
                sendRequestToServer(url, data);
            }, null);
        }
    },

    /**
     * 课程总结
     * @param orderId
     */
    'courseSummary':function (orderId) {
        var $orderId = orderId;
        dialogs._class_summary(function(){
            var url = "/orderDeal/addSummary.do";
            var data = "id=" + $orderId + "&summary=" + $.trim($("#notice_textarea").val());
            sendRequestToServer(url, data);
        }, null);
    }
    }

    })


