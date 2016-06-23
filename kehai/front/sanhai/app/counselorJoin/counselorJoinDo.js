/**
 * Created by slg on 2016/2/18.
 */
define(['jquery','dialogs','common','base','jquery_ui_min',"lib/jquery_validate/jquery.validate",
    "lib/jquery_validate/addkehai_validate","lib/jquery_validate/messages_zh",],function($,dialogs,common) {

    return{
        init:function(){
            //客服中心hover效果
            $('.serviceList').rNavhover();
            //输入框默认
            $('.realName').placeholder({value: '请填写您的真实姓名'}).attr('placeholder', '');
            $('.contact').placeholder({value: '请填写您的联系方式'}).attr('placeholder', '');

            $("#counselorForm").validate({
                submitHandler: function(form){
                    $.ajax({
                        type:"post",
                        dataType : "json",
                        url:"/register/saveCounselor.do",
                        data:$(form).serialize(),
                        success:function(data){
                            if(common.checkResponse(data) == false){
                                return;
                            }
                            dialogs._timer('您的信息已成功提交至我们平台，我们的客服会尽快与您联系，请保持手机畅通，谢谢合作！','1','3',
                                function(){
                                    location.href = "/login.htm";
                                });
                        },
                        error:function(data){  }
                    });
                },
                rules: {
                    realName: {
                        required: true,
                        maxlength:20
                    },
                    phoneNumber: {
                        required: true,
                        isAccount:true
                    },
                    sex: {
                        required: true
                    },
                    adeptItem:{
                        required: true
                    },
                    des: {
                        required: true,
                        maxlength:200
                    }
                },
                messages: { },
                errorElement :"em",
                errorPlacement: function(error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                }
            });
        }
    }
})