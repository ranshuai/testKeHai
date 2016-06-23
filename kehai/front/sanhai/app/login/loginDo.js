/**
 * Created by Administrator on 2015/12/29.
 */

define(['jquery','dialogs','jquery_md5'], function ($,dialogs) {

    /*登录方式*/
    $('.logon_mode .normal').click(function () {
        $('.input_way').removeClass('send_verify_code');
        $(this).addClass('ac').siblings().removeClass('ac');
    });
    $('.logon_mode .phone').click(function () {
        $('.input_way').addClass('send_verify_code');
        $(this).addClass('ac').siblings().removeClass('ac');
    });
    /*老师、学生登录*/
    $('.logon_tab .teacher').click(function () {

        $(this).addClass('ac').siblings().removeClass('ac');
        $("#role").val('0');
    });
    $('.logon_tab .student').click(function () {
        $(this).addClass('ac').siblings().removeClass('ac');
        $("#role").val('2');
    });

    /*学校、课程顾问登录*/
    $('.logon_tab .school').click(function () {
        $(this).addClass('ac').siblings().removeClass('ac');
        $("#role").val('3');
    });
    $('.logon_tab .course').click(function () {
        $(this).addClass('ac').siblings().removeClass('ac');
        $("#role").val('4');
    });

    $("#userLogin").click(function () {
        login("false");
    });

    //form表单范围的回车事件处理。
    $("form").keydown(function (event) {
        if (event.keyCode == 13) {//keyCode=13是回车键
            event.preventDefault();
            login("false");
        }
    });

    $("#forgetPassword").click(function () {
        location.href = "/forgetPwd.htm";
    });

    $("#orgLogin").click(function () {
        if ($(this).text() == "学校平台登录") {
            $(this).text("教师学生平台登录");
        } else {
            $(this).text("学校平台登录");
        }

        $(".teaOrStu").toggle();
        $(".orgOrCou").toggle();
        if ($(".teaOrStu").is(":hidden")) {
            $(".logon_tab .school").trigger("click");
        } else {
            $(".logon_tab .student").trigger("click");
        }
    });

    function login(isAutoReg) {
        var acc = $("#account").val();
        var pwd = $("#password").val();
        if (acc == "" || pwd == "") {
            dialogs._timer("请输入账号密码",2,2,"");
            return;
        }
        var rememb;
        if ($("#rememb").attr("checked")) {
            rememb = true;
        } else {
            rememb = false;
        }

        if (pwd.length != 32)
            pwd = $.md5(pwd).toUpperCase();

        $.ajax({
            type: "post",
            dataType: "json",
            url: "/use/login.do",
            data: {
                account: acc,
                password: pwd,
                userIdentity: $("#role").val(),
                isAutoReg: isAutoReg,
                rememb: rememb
            },
            success: function (data) {
                if (data.resCode == "303") {
                    /*  if (confirm(data.resMsg)) {
                     login("true");
                     return;
                     } else {
                     return;
                     }*/

                    dialogs._confirm(data.resMsg,'', function () {
                        login("true");
                    }, "");

                    return false;

                } else if ("000" != data.resCode) {
                    dialogs._timer(data.resMsg,2,2,function () {
                        $("#password").focus();
                    });
                    return;
                }

                // location.href = data.data.url;
                location.href = '/site/index.html';
            },
            error: function (data) {
            }
        });
    }

    /*班海 课海切换*/
    $('#KH').click(function(){
        $('.kehai').removeClass('hide');
        $('.banhai').addClass('hide')
    });
    $('#BH').click(function(){
        $('.banhai').removeClass('hide');
        $('.kehai').addClass('hide')
    });
    $('#nickname').focus


    /*班海验证*/
    function BHlogin() {
        var acc = $("#BHuserName").val();
        var pwd = $("#BHpassword").val();
        if (acc == "" || pwd == "") {
            dialogs._timer("请输入账号密码",2,2,"");
            return;
        }
        var rememb;
        if ($("#BHrememb").attr("checked")) {
            rememb = true;
        } else {
            rememb = false;
        }

        if (pwd.length != 32)
            pwd = $.md5(pwd).toUpperCase();

        $.ajax({
            type: "post",
            dataType: "json",
            url: "/use/banHailogin.do",
            data: {
                account: acc,
                password: pwd,
                rememb: rememb
            },
            success: function (data) {
                if (data.resCode == "303") {
                    dialogs._confirm(data.resMsg,'', function () {
                        BHlogin();
                    }, "");
                    return false;
                } else if ("000" != data.resCode) {
                    dialogs._timer(data.resMsg,2,2,function () {
                        $("#BHpassword").focus();
                    }, "");
                    return;
                }
                if(data.data.isFirstLogin=='true'){//第一次登录,需要设置昵称
                    dialogs._BHTransfer(function(){
                        var nickName =$('#nickname').val() == ''? '班海学生':$('#nickname').val();
                       // alert($('#nickname').val());
                       // //ar nickName =$('#nickname').val() == ''? '班海学生':$('#nickname').val();
                       // var nickName;
                       // if($('#nickname').val()!=''){
                       //
                       //     nickName = $('#nickname').val();
                       //     alert('昵称是：'+nickName);
                       // }else{
                       //     nickName = '班海学生';
                       //     alert('昵称是：'+nickName);
                       // }
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            url: "/use/updateNickName.do",
                            data: {
                                nickName: nickName
                            },
                            success: function (data) {

                                location.href = data.data.url;
                            },
                            error: function (data) {
                            }
                        });
                    },function(){
                        var nickName =$('#nickname').val() == ''? '班海学生':$('#nickname').val();
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            url: "/use/updateNickName.do",
                            data: {
                                nickName: nickName
                            },
                            success: function (data) {

                                /*location.href = data.data.url;*/
                            },
                            error: function (data) {
                            }
                        });
                    });
                    //$('#nickname').blur();
                    //$('#nickname').focus(function(){
                    //        $(this).val('');
                    //});
                    //$('#nickname').blur(function(){
                    //        if($(this).val()==''){
                    //            $(this).val('班海学生')
                    //        };
                    //});
                }else{
                    location.href = "/index.htm";
                }
            },
            error: function (data) {
            }
        });
    }

   $("#BHuserLogin").click(function () {
        
       BHlogin();
    });

    
});