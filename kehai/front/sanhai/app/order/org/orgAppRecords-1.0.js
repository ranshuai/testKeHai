
/**
 * Created by boys on 2015/9/12.
 * 机构申请记录js
 */

/**
 * 机构申请页面管理js
 */
define(['jquery','common','requestRecords', 'dialogs'],function($,common,req, dialogs){


function initOrgApplicationRecord() {
    
    $(function() {
        var  signs ="0";
//      retireCoureses();
        var url = "/retireCourses/findRetireCouresesByPrm.do";
        var data = "retireStatus="+common.df.showoperType1($("select").val()) + "&name=" + $("input").val() + "&";
        req.ajax4RequestRetireRecords(url, data, 1);
        $(".tab").delegate('.tabList a','click',function(){
            var index = $(this).parent("li").index();
            if (index == 1) {
                signs = "1";
                var url = "/changeTea/records.do";
                var data = "operType= -1&name=" + $("input").val() + "&";
                req.ajax4RequestChangeTeaRecords(url, data, 1);
            } else {
                signs = "0";
                var url = "/retireCourses/findRetireCouresesByPrm.do";
                var data = "retireStatus="+common.df.showoperType1($("select").val()) + "&name=" + $("input").val() + "&";
                req.ajax4RequestRetireRecords(url, data, 1);
            }
        });

        $("#search").bind("click", function () {
            if (signs == "0") {
                //查找退课的记录,指定条件查询
//          retireCoureses();
                var url = "/retireCourses/findRetireCouresesByPrm.do";
                var data = "retireStatus="+common.df.showoperType1($("select").val()) + "&name=" + $("input").val() + "&";
                req.ajax4RequestRetireRecords(url, data, 1);
            } else {
                var url = "/changeTea/records.do";
                var data = "operType="+$("select").val() +"&name="+$("input").val()+"&";
                req.ajax4RequestChangeTeaRecords(url, data, 1);
            }
        });
        //同意 驳回按钮开始
        var type = 0;
        $("td a").live("click", function () {
            val = $(this).attr("href").substr(1);
            type = val;
            var id = $(this).nextAll("#id").val();
            //点击驳回事处理
            if (val == 32) {
                dialogs._form_reject(function(){
                    $.post("/changeTea/request.do", {
                        operType: val,
                        orderId: id,
                        detail: $("#notice_textarea").val()
                    }, function (resp) {
                        if (!common.checkResponse(resp)) return;
                        if (resp.resCode == "000"){
                            if (type == 31){
                                location.href="/assignTeacher/findOrder.htm?id=" + id + "&type=20";
                            }
                            else{
                                dialogs._timer("操作成功",1,2,null);
                                //signs = 1;
                                $("#search").trigger("click");
                            }
                        }else{
                            dialogs._timer("操作失败",2,2,null);

                        }
                    });
                }, null);

            }
            if (val == 31){
                dialogs._change_teacher_agree(function(){
                    $.post("/changeTea/request.do", {
                        operType: val,
                        orderId: id,
                        detail: $("#notice_textarea").val()
                    }, function (resp) {
                        if (!common.checkResponse(resp)) return;
                        if (resp.resCode == "000"){
                            if (type == 31){
                                location.href="/assignTeacher/findOrder.htm?id=" + id + "&type=20";
                            }
                            else{
                                dialogs._timer("操作成功",1,2,null);
                                $("#search").trigger("click");
                            }

                        }else{
                            dialogs._timer("操作失败",2,2,null);

                        }
                    });
                }, null);
            }
            if (val == 11) {
                dialogs._form_reject(function(){
                    $.ajax({
                        type: "post",
                        url: "/retireCourses/reject.do",
                        dataType: "json",
                        data: {
                            "dismissedRetreat": $("#notice_textarea").val(),
                            "orderNum": id
                        },
                        success: function (result) {
                            if (common.checkResponse(result) == false) return ;
                            if (result.resCode == "000") {
                                dialogs._timer("操作成功",1,2,null);
                                location.reload();
                            }
                        }
                    });
                }, null);
            }
            if (val == 10) {
                var id = $(this).parent("td").find("#id").val();
                var orderActualPrice = $(this).parent("td").parent("tr").find("#orderActualPrice").val();
                var coursesTime = $(this).parent("td").parent("tr").find("#coursesTime").val();
                var coursesFinishTimes = $(this).parent("td").parent("tr").find("#coursesFinishTimes").val();
                var money = (orderActualPrice - (orderActualPrice / coursesTime * coursesFinishTimes)).toFixed(2);
                //var courseMode = $(this).parent("td").parent("tr").find("#courseMode").val();
                //if (courseMode == "0") {
                $.ajax({
                    type:"post",
                    url:"/ptSeat/unUse.do",
                    dataType:"json",
                    data:{'orderId':id},
                    success:function(resp){
                        if (resp.resCode == "000"){
                            var ptSeat = resp.data.ptSeat;
                            var str = "";
                            if (ptSeat > 0){
                                str = "退课后，您会损失"+ptSeat+"小时旁听位";
                            }
                            dialogs._agree_refund(function () {
                                $.ajax({
                                    type: "post",
                                    url: "/retireCourses/agree.do",
                                    dataType: "json",
                                    data: {
                                        "backMoney": parseFloat($("#backMoney").val()) * 100,
                                        "orderNum": id
                                    },
                                    success: function (result) {
                                        if (common.checkResponse(result) == false) return;
                                        if (result.resCode == "000") {
                                            dialogs._timer("操作成功",1,2,null);
                                            location.reload();
                                        }
                                    }
                                });
                            }, null);
                            $("[name='oper']").val(val);
                            $("[name='orderId']").val(id);
                            $("[name='money']").val(money);
                            $("p.notice").replaceWith(str + "<br/>此学生已完成" + (coursesFinishTimes / 60).toFixed(2) + "课时,所退金额还有" + (money / 100).toFixed(2) + "元");
                            $("#backMoney").attr("placeholder", "不得大于" + (money / 100).toFixed(2) + "元");
                        }
                    }
                });
            }
        });

        /*驳回理由滑鼠*/
        $('.reject_reason_main').live('mouseenter', function() {
            $(this).children('.reject_reason').show();
        });
        $('.reject_reason_main').live('mouseleave', function() {
            $(this).children('.reject_reason').hide();
        });
    });
}
    return {
        initOrgApplicationRecord:initOrgApplicationRecord
    }
});