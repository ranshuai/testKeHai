define(["jquery","common","dialogs","sanhai_buttonCountdown","lib/jquery_validate/jquery.validate",
        "lib/jquery_validate/addkehai_validate","lib/jquery_validate/messages_zh","base",
        "sanhai_buttonCountdown","jquery_md5"]
    ,function($,common,dialogs){

    this.sendCheckCode = function(btn) {

        if("true"==$(btn).attr("sended")){
            $("#code").val("");
            changeImg('imgObj');
            $(btn).attr("sended","false");
            return;
        }

        if( !$("#account").valid()){
            return;
        }
        if( !$("#code").valid()){
            return;
        }

        var oldText = $(btn).text();
        var interval = $(btn).countdown(60);

        $("#account").attr("readonly","true");
        $("#account").css("background","#bfbfbf");

        $.ajax({
            type:"post",
            url:"/register/forgetCheckCode.do",
            data:{account:$("#account").val(),code:$("#code").val()},
            success:function(data){
                if(common.checkResponse(data) == false){
                    $(btn).removeAttr("disabled").text(oldText);
                    window.clearInterval(interval);
                    changeImg('imgObj');
                    $("#account").removeAttr("readonly");
                    $("#account").css("background","");
                    return;
                }
                $(btn).attr("sended","true");
            },
            error:function(data) {
                $(btn).removeAttr("disabled").text(oldText);
                window.clearInterval(interval);
                $("#account").removeAttr("readonly");
                $("#account").css("background","");
            }
        });
    }

     return{
         init:function(){
             //客服中心hover效果
             $('.serviceList').rNavhover();
             //切换身份hover效果
             $('.tabRole').rNavhover();

             $(".changeCodeImg").click(function(){
                 common.changeImg('imgObj');
             });

             $("#forgetPwdForm").validate({
                 submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form
                     $.ajax({
                         type:"post",
                         dataType : "json",
                         url:"/register/forgetPassword.do",
                         data:{
                             account:$("#account").val(),
                             password:$.md5($("#password").val()).toUpperCase(),
                             checkCode:$("#checkCode").val()
                         },
                         success:function(data){
                             if(common.checkResponse(data) == false){
                                 return;
                             }
                             dialogs._timer("密码已重置，请登入 ",1,2,function(){
                                 location.href = "/login.htm";
                             });
                         },
                         error:function(data){  }
                     });
                 },
                 rules: {
                     account: {
                         required: true,
                         isAccount:true,
                         remote: {
                             url: "/register/isExist.do",     //后台处理程序
                             type: "post",               //数据发送方式
                             dataType: "json",           //接受数据格式
                             data: {                     //要传递的数据
                                 account: function() {
                                     return $("#account").val();
                                 }
                             }
                         }
                     },
                     password: {
                         required: true,
                         isPassword:true,
                         minlength: 6,
                         maxlength:20
                     },
                     confirmPassword: {
                         required: true,
                         equalTo: "#password"
                     },
                     code:{
                         required: true,
                         remote: {
                             url: "/register/isCode.do",     //后台处理程序
                             type: "post",               //数据发送方式
                             dataType: "json",           //接受数据格式
                             data: {                     //要传递的数据
                                 account: function() {
                                     return $("#code").val();
                                 }
                             }
                         }
                     },
                     checkCode: {
                         digits:true,
                         required: true,
                         minlength: 6,
                         maxlength:6
                     }
                 },
                 messages: {
                     account: {
                         required: "<i></i>手机号不能为空<b></b>",
                         remote:"<i></i>该账号不存在<b></b>"
                     },
                     password: {
                         required: "<i></i>密码不能为空<b></b>"
                     },
                     confirmPassword: {
                         required: "<i></i>确认密码不能为空<b></b>",
                         equalTo: "<i></i>两次输入不一致<b></b>"
                     },
                     checkCode: {
                         required: "<i></i>短信验证码不能为空<b></b>",
                         maxlength: "<i></i>请输入6位验证码<b></b>",
                         minlength: "<i></i>请输入6位验证码<b></b>"
                     },
                     code:{
                         required:"<i></i>请先填写图片验证<b></b>",
                         remote:"<i></i>图片验证码错误<b></b>"
                     }
                 },
                 errorElement :"em",
                 errorPlacement: function(error, element) { //指定错误信息位置
                     error.appendTo(element.parents(".error_show").find(".error_message"));
                 }
             });

             $(".backPage").click(function(){
                 window.history.back(-1);
                 //返回并刷新
                 // window.location.href=document.referrer;
             });
         }
     }
});