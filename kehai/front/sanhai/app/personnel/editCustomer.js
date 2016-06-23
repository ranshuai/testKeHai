/**
 * Created by yinjm on 16/3/9.
 */

define(["jquery","dialogs"], function ($){
    $(function(){
        $("#addCustomer button").click(function(){
            if($("#userName").val() == ''){
                _alert("客户姓名不能为空",function(){
                    $("#userName").focus();
                },null);
                return false;
            }
            if($("#userPhone").val() == ''){
                _alert("手机号不能为空",function(){
                    $("#userPhone").focus();
                },null);
                return false;
            }
            $.ajax({
                url:"/personnel/savePotentialData.do",
                type:"post",
                data:$("#addCustomer").serialize(),
                success:function(data){
                    if(data.resCode == '000'){
                        window.location.href = "/personnel/listPersonnel.htm";
                    }else{
                        _alert(data.resMsg,null,null);
                    }
                }
            });
        });
    });
});