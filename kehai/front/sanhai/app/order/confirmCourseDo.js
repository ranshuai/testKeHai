/**
 * Created by Administrator on 2015/12/15.
 */


define(
    [
        'jquery',
        'common',
        'confirmCourses',
        'money',
        'dialogs',
        'jquery_ui_min'
    ],function($,common,confirm, money, dialogs){
        confirm.teaConfirmList4Page(1);
        $("#submit").live("click", function(){
            $.post("/orderDeal/update.do", {
                orderId:$(this).next("input").val(),
                assignTea:3,
                salary:$(this).parent("td").siblings("td#salary").find("input").val()
            }, function(resp){
                if (common.checkResponse(resp) == true){
                    if (resp.resCode == "000"){
                        dialogs._timer("操作成功",1, 2, function(){
                            location.href="/courses/find/waitCourses.htm?index=2";
                        });
                    }else{
                        dialogs._timer("操作失败", 2,  2, null);
                    }
                }
            },"json");
        })
    }
)

