/**
 * Created by liqinghua on 16/1/27.
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
                url:"/personnel/addPotentialData.do",
                type:"post",
                data:$("#addCustomer").serialize(),
                success:function(data){
                    if(data.resCode == '000'){
                        _confirm("添加成功,是否继续添加?",function(){
                            $('#addCustomer')[0].reset();
                        },function(){
                            window.location.href = "/personnel/listPersonnel.htm";
                        });
                    }else{
                        _alert(data.resMsg,null,null);
                    }
                }
            });
        });
    });
});