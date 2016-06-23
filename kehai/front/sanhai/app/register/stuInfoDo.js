define(["jquery","loadAreaAndMatch","common","dialogs","base",
        'jquery_ui_widget',
        'jquery_iframe_transport',
        'jquery_fileupload',
        'jquery_xdr_transport',"dialogs","jquery_Jcrop","basic",
        "lib/jquery_validate/jquery.validate","lib/jquery_validate/addkehai_validate",
        "lib/jquery_validate/messages_zh","datetimepicker"]
    ,function($,loadAreaAndMatch,common,dialogs){

        return{
            init:function(){
                $('#nickName').placeholder({value:'请输入昵称',ie6Top:10});
                $('#name').placeholder({value:'请输入真实姓名',ie6Top:10});
                $('#email').placeholder({value:'请输入你的邮箱',ie6Top:10});

                //客服中心hover效果
                $('.serviceList').rNavhover();
                //切换身份hover效果
                $('.tabRole').rNavhover();

                // 区域
                loadAreaAndMatch.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), null,null);
                //加载生日
                $("input.datetimepicker").datetimepicker({
                    lang:'ch',
                    format:'Y-m-d',
                    timepicker:false
                });
                $("#stuInfoForm").validate({
                    submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form
                        var provId = $("#provEM").attr("code");
                        var prov = $("#provEM").text();
                        var countryId = $("#countryEM").attr("code");
                        var country = $("#countryEM").text();
                        var cityId = $("#cityEM").attr("code");
                        var city = $("#cityEM").text();

                        if ("null" == countryId && "null" == cityId) {
                            var addressCode = provId;
                            var address = prov;
                        } else if ("null" != countryId && "null" == cityId) {
                            var addressCode = provId + "," + countryId;
                            var address = prov + "," + country;
                        } else if ("null" != countryId && "null" != cityId) {
                            var addressCode = provId + "," + countryId + "," + cityId;
                            var address = prov + "," + country + "," + city;
                        }

                        var birthday =  $("input.datetimepicker").val().replace(/[^0-9]/ig, "");
                        $("input[name='address']").val(address);
                        $("input[name='addressCode']").val(addressCode);
                        $("input[name='birthday']").val(birthday);
                        $.ajax({
                            type:"post",
                            url:"/perfectInfo/perfectInfoStu.do",
                            data:$("#stuInfoForm").serialize(),
                            success:function(data){
                                if(common.checkResponse(data) == false){
                                    return;
                                }
                                dialogs._timer("保存完成",1,2,function(){
                                    location.href='/';
                                });
                            },
                            error:function(data){
                            }
                        });
                    },
                    rules: {
                        nickName:{
                            required:true,
                            maxlength:30
                        },
                        name: {
                            // required: true,
                            maxlength:30
                        },
                        email:{
                            email:true
                        },
                        /*  weakCourse:{
                         required:true
                         },*/
                        calss:{
                            required:true
                        },
                        prov:{
                            min:1
                        },
                        country:{
                            min:1
                        },
                        city:{
                            min:1
                        },
                        introduce:{
                            maxlength:300
                        },tel:{
                            isPhone:true
                        },school:{
                            required:true,
                            maxlength:30
                        }
                    },
                    messages: {
                        nickName:{
                            required:"<i></i>昵称不能为空<b></b>"
                        },
                        userName: {
                            required:"<i></i>请输入真实姓名<b></b>"
                        },
                        /* weakCourse:{
                         required:"<i></i>请选择薄弱环节<b></b>"
                         },*/
                        calss:{
                            required:"<i></i>请选择年级<b></b>"
                        },
                        school:{required:"<i></i>请输入就读学校<b></b>"},
                        prov:{min:"<i></i>请选择完整所在地<b></b>"},
                        country:{min:"<i></i>请选择完整所在地<b></b>"},
                        city:{min:"<i></i>请选择完整所在地<b></b>"}
                    },
                    errorElement :"em",
                    errorPlacement: function(error, element) { //指定错误信息位置
                        error.appendTo(element.parents(".error_show").find(".error_message"));
                    }
                });
            }
        }
});
