/**
 * Created by boys on 2015/9/15.
 */

/**
 * 初始化匹配老师页面
 */
define(['jquery', 'common', 'money','dialogs'],
function($, common, money,dialogs){
    function getArgs(url, p) {
        var params = url.split('?');
        if (params.length == 1) return null;
        var args = params[1].split('&');
        for (var i=0; i<args.length; i++) {
            var arg = args[i].split('=');
            if (p == arg[0]) return arg[1];
        }
    }

    function  loadAssignTeaInfo(){
        var url = location.href;
        var id = getArgs(url, "id");
        var type = getArgs(url, 'type');
        $.post("/assignTeacher/findOrder.do", "id="+id+"&type="+type+"&", function(resp){
            if (resp.resCode == "000"){
                var data = resp.data;
                $("#resId").attr("src", data.ppResId == 0 || data.ppResId==null ? '../../front/sanhai/images/course.png' : "/file/loadImage/"+data.ppResId + ".r");
                $("#ordertime").text(new Date(parseFloat(data.order.orderGenerateTime)).format("yyyy-MM-dd hh:mm:ss"));
                $("#orderId").text(data.order.id);
                $("#title").text(data.order.courseTitle);
                $("#courseMode").text(common.df.coursesType(data.order.courseMode));
                $("#og").text(data.order.grade);
                $("#grade").val(data.order.gradeId);
                $("#os").text(data.order.subject);
                $("#subject").val(data.order.subjectId);
                $("#version").val(data.order.teaVersionId);
                $("#ct").html(data.order.coursesTime/60 + "&nbsp;小时");
                if (data.order.assignTeaFlag == 2){
                    $("#lecturer").text(data.order.lecturer);
                    $("#teaId").val(data.order.teacherId);
                    $(".lect").show();
                }
                $("#money").text(money.fmoney(data.order.orderActualPrice/100,2));
                $("#money").data("money", data.order.orderActualPrice/100);
                if (data.order.assignTeacherFlag != 3){
                    $(".findLect").show();
                }
                $("#buyer").text(data.buyer);
                var money1 = data.order.orderActualPrice/100;
                var time = data.order.coursesTime/60;
                $("#time").val(time);
                var price = (money1) / (time);
                $("#salary").attr("placeholder", "金额不得大于 " + money.fmoney(price, 2));
            }
        }, "json");
    }
    return {
        initAssignTeacher: function() {
            loadAssignTeaInfo();
            $("input").focus(function () {
                $("#reason").text("");
            });

            $("button.save").click(function () {
                if ($("#lecturerId").val() == "") {
                    $("#reason").text("请选择老师");
                    return false;
                }
                if ($("#salary").val() == "") {
                    $("#reason").text("课酬金额不能为空");
                    return;
                }
                if (!common.isMoneyNumber($("#salary").val())) {
                    $("#reason").text("您输入的数值不合适");
                    return;
                }

                var money = $("#money").data("money");
                var time = $("#time").val();
                var salary = $("#salary").val();
                if (parseFloat(money) < parseFloat(salary) * parseInt(time)) {
                    $("#reason").text("课酬金额不能超过课程单价");
                    return;
                }
                salary = new Number(salary).toFixed(2) * 100;
                $.ajax({
                    url: "/assignTeacher/saveAssignTeacher.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        orderId: $("#orderId").text(),
                        teaId: $("#lecturerId").val(),
                        teaName: $("#teacher").val(),
                        salary: parseInt(salary)
                    },
                    beforeSend: function () {
                        $("button.save").attr("disabled", true);
                        dialogs._waitDialog("努力处理中请稍后 ......");
                    },
                    complete: function () {
                        $(".eject_warpper_wait").addClass("hide");
                        $("button.save").attr("disabled", false);
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            dialogs._timer("匹配老师成功", 1,2,function () {
                                location.href = "/orderDeal/list.htm";
                            });
                        } else {
                            dialogs._timer(response.resMsg,2,2,null);
                        }
                    },
                    error: function () {
                        dialogs._timer("请求失败稍后再试", 2,2,null);
                    }
                });
            });
            $("button.cancle").click(function () {
                location.href = "/orderDeal/list.htm";
            });
        }
    }
});
