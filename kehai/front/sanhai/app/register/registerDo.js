/**
 * Created by mahuihuang on 15/11/28.
 */


require([
    'jquery',
    'dialogs',
    'extendJquery',
    'common',
    'base',
    'jquery_md5',
    'jquery_ui_min',
    'lib/jquery_validate/jquery.validate',
    'lib/jquery_validate/addkehai_validate',
    'lib/jquery_validate/messages_zh',
    'sanhai_buttonCountdown'
    ],
    function($,dialogs,resetForm,common){

    var firstClick = true;

    $('#sendCheckCode').click(function(){
        var btn =this;
        if("true"==$(btn).attr("sended")){
            $("#code").val("");
            common.changeImg('imgObj');
            $(btn).attr("sended","false");
            //return;
        }
        if( !$("#account").valid()){
            return;
        }
        if( !$("#code").valid()){
            return;
        }
        var oldText = $(btn).text();


        $("#account").attr("readonly","true");
        $("#account").css("background","#bfbfbf");

        if ($("#account").val().length != 11){
            return false;
        }
        var interval = null;
        //console.log(firstClick);
        if (firstClick){
            firstClick = !firstClick;
            $('.picVerification').removeClass('hide').addClass('show');
            return;
        }else{
            firstClick = !firstClick;
            myCode = $("#code").val();
            var interval = $(btn).countdown(60);
            $('.picVerification').removeClass('show').addClass('hide');
        }

        $.ajax({
            type:"post",
            url:"/register/sendCheckCode.do",
            data:{account:$("#account").val(),code:myCode},
            success:function(data){
                if(common.checkResponse(data) == false){
                    $(btn).removeAttr("disabled").text(oldText);
                    window.clearInterval(interval);
                    firstClick = true;
                    common.changeImg('imgObj');
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
    });


    function radUserIdentity( i ){
        $("#userIdentity").val(i) ;
    }

    $('#checkbox1').click(function(){
        radUserIdentity(0);
    });
    $('#checkbox2').click(function(){
        radUserIdentity(1);
    });

    $("#accountForm").validate({
        submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form
            $("#password").val($.md5($("#passd").val()).toUpperCase());
            var data = $(form).serialize();
            $(":input").attr("disabled", true);
            $.ajax({
                type:"post",
                url:"/register/registerUser.do",
                data:data,
                success:function(data){
                    if(common.checkResponse(data) == false){
                        $("#passd").val("");
                        $("#confirmPassword").val("");
                        $(":input").removeAttr('disabled');
                        return;
                    }
                    location.href = "/reg/perfectInfo.htm";

                },
                error:function(data){
                    $(":input").removeAttr('disabled');
                }
            });
        },

        rules: {
            account: {
                required: true,
                isAccount:true,
                remote: {
                    url: "/register/exist.do",     //后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json",           //接受数据格式
                    data: {                     //要传递的数据
                        account: function() {
                            return $("#account").val();
                        }
                    }
                }
            },
            passd: {
                required: true,
                isPassword:true,
                minlength: 6,
                maxlength:20
            },
            confirmPassword: {
                required: true,
                equalTo: "#passd"
            },
            checkCode: {
                digits:true,
                required: true,
                minlength: 6,
                maxlength:6
            },
            agree: {
                required: true
            },
            radTea:{required: true},
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
            }
        },
        messages: {
            account: {
                required: "<i></i>手机号不能为空",
                remote:"<i></i>该手机号已被注册"
            },
            passd: {
                required: "<i></i>密码不能为空"
            },
            confirmPassword: {
                required: "<i></i>确认密码不能为空",
                equalTo: "<i></i>两次输入不一致"
            },
            checkCode: {
                required: "<i></i>短信验证码不能为空",
                maxlength: "<i></i>请输入6位短信验证码",
                minlength: "<i></i>请输入6位短信验证码"
            },
            agree:"<i></i>您没有同意协议",
            radTea:"<i></i>请选择身份",
            code:{
                required:"<i></i>请先填写图片验证",
                remote:"<i></i>图片验证码错误"
            }
        },
        //focusCleanup:true,
        errorElement :"em",
        errorPlacement: function(error, element) { //指定错误信息位置  errorPlacement 这里相当于一个循环
            error.appendTo(element.parents(".error_show").find(".error_message"));
        },
        success: function(label){
            label.attr("class",'checked');
        }
    });
    $('.popBox').dialog({
        autoOpen: false,
        width: 600,
        height:500,
        modal: true,
        resizable: false,
        close: function() {
            $(this).dialog("close")
        }
    });
    $(".agreement a").click(function(){
        $(".agreement_dialog").dialog("open");
    });

    $("#checkCode").parent("div").children('button').removeAttr('disabled');
    $('#accountForm').resetForm({
        without:{
            type:['radio']
        }
    });

        $('input[name="agree"]').attr('checked','checked');

    //图片换一换
        $('#changeImg').click(function(){
            var objId = $('#imgObj').attr('id');

            common.changeImg(objId);

        });
        
        //客服中心hover效果
        $('.serviceList').rNavhover();
        //切换身份hover效果
        $('.tabRole').rNavhover();
        //联系客服弹窗
        $('.customerBtn').click(function(){
            dialogs._customerService()
        });


/*        $('.tab .tabList li').click(function() {
        var i = $('.tab .tabList li').index($(this));
        $(this).children('a').addClass('active').parent('li').siblings('li').children('a').removeClass('active');
        // $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        if(i == 0){
            $("#tea").hide();
            $("#userIdentity").val(2) ;// 2 学生
        }else if(i==1){
           /!* $("#tea").show();
            $("input[name='radTea']").attr("checked",false);*!/
            radUserIdentity(0);
        }else if( i==2 ){
            $("#tea").hide();
            $("#userIdentity").val(3) ;// 3 学校
        }

    });*/
        //点击重选身份返回
        $('.newRegDetails .regMainHeader a').click(function(){
           $(this).parents('.newRegDetails').removeClass('show').addClass('hide');
           $('.newRegister').removeClass('hide').addClass('show');
        });
        //选择身份跳转
        $('.registerIdentity li').click(function(){
            $(this).parents('.newRegister').removeClass('show').addClass('hide');
            $('.newRegDetails').removeClass('hide').addClass('show');
            var i = $('.registerIdentity li').index($(this));
            var txt=$('.newRegDetails .regMainHeader h1');
            if(i == 0){
                txt.html('学生注册');
                $("#userIdentity").val(2) ;// 2 学生
            }else if(i==1){
                txt.html('教师注册');
                radUserIdentity(0);
            }else if( i==2 ){
                txt.html('学校注册');
                $("#userIdentity").val(3) ;// 3 学校
            }
        })

});
