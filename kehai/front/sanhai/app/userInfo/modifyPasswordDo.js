
define([
    'jquery',
    'dialogs',
    'common',
    'jquery_md5',
    'lib/jquery_validate/jquery.validate',
    'lib/jquery_validate/addkehai_validate',
    'lib/jquery_validate/messages_zh'
],function($,dialogs,common){

    $("#modifyPwd").validate({
        submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form
            $.ajax({
                type:"post",
                dataType : "json",
                url:"/register/modifyPassword.do",
                data:{
                    oldPassword:$.md5($("#oldPassword").val()).toUpperCase(),
                    password: $.md5($("#password").val()).toUpperCase()
                },
                success:function(data){
                    if(common.checkResponse(data) == false){
                        return;
                    }
                    dialogs._timer(data.resMsg,1,2,function(){
                        document.forms[0].reset();
                    });
                },
                error:function(data){  }
            });
        },
        rules: {
            oldPassword:{
                required:true
            },
            password:{
                required: true,
                isPassword:true,
                minlength: 6,
                maxlength:20
            },
            confirmPassword:{
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            oldPassword:{
                required:"<i></i>原密码不能为空<b></b>"
            },
            password:{
                required:"<i></i>新密码不能为空<b></b>"
            },
            confirmPassword: {
                required: "<i></i>确认密码不能为空<b></b>",
                equalTo: "<i></i>两次输入不一致<b></b>"
            }
        },
        errorElement :"em",
        errorPlacement: function(error, element) { //指定错误信息位置�
            error.appendTo(element.parents(".error_show").find(".error_message"));
        }
    });
});