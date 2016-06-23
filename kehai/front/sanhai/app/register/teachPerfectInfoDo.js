

define(
    [
        'jquery',
        'loadAreaAndMatch',
        'loadVersionAndMatch',
        'common',
        'dialogs',
        'jquery_ui_widget',
        'jquery_iframe_transport',
        'jquery_fileupload',
        'jquery_xdr_transport',
        "fileupload_process","fileupload_validate",
        'lib/jquery_validate/jquery.validate',
        'lib/jquery_validate/addkehai_validate',
        'lib/jquery_validate/messages_zh',
        'base',
        'jquery_ui_min',
        'basic'
    ],
    function(
        $,
        loadAreaAndMatch,
        loadVersionAndMatch,
        common,
        dialogs
    ){
        /*弹窗初始化*/
        $(function(){

            $("#professionalTitle option").each(function() {
                if ($(this).val() == teaInfo.professionalTitle) {
                    $(".professionalTitle").html("").append($(this).text());
                    $(this).attr("selected", "selected");
                }
            });

            $("#highestDegree option").each(function() {
                if ($(this).val() == teaInfo.highestDegree) {
                    $(".highestDegree").html("").append($(this).text());
                    $(this).attr("selected", "selected");
                }
            });

            //客服中心hover效果
            $('.serviceList').rNavhover();
            //切换身份hover效果
            $('.tabRole').rNavhover();

            //$('#nickName').placeholder({value:'请输入昵称',ie6Top:10});
            $('#name').placeholder({value:'请输入真实姓名',ie6Top:10});
            //$('#email').placeholder({value:'请输入你的邮箱',ie6Top:10});

            // 区域
            loadAreaAndMatch.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), null,null);
            //教材版本
            loadVersionAndMatch.loadVersionAndMatch($("#textbookVersion"), null, null);

            $( '#teaInfoForm' ).validate({
                rules:{
                    //nickName:{required:true,maxlength:15},
                    name:{
                        required:true,
                        isSpace:true,
                        maxlength:30
                    },
                    email:{
                        email:true
                    },
                    prov:{
                        required:true,
                        isAddress:true
                    },
                    classCode:{
                        required:true
                    },
                    courseCode:{
                        required:true
                    },
                    teachingFeature:{
                        maxlength:300
                    },
                    teachingGrade:{
                        maxlength:300
                    }
                     /* textbookVersion:{
                     required:true
                     }*/
                },
                messages:{
                    name:{
                        required:"<i></i>请输入真实姓名<b></b>"
                    },
                    classCode:{
                        required:"<i></i>请选择擅长授课年级<b></b>"
                    },
                    courseCode:{
                        required:"<i></i>请选择科目<b></b>"
                    },
                    teachingFeature:{
                        required:"<i></i>最多可输入300个字符"
                    },
                    teachingGrade:{
                        required:"<i></i>最多可输入300个字符"
                    }
                },
                errorElement :"em",
                errorPlacement: function(error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                }
            });

            $("#auditForm").validate({
                rules:{
                    /*iDNumber:{
                        required:true,
                        isIdCardNoOrPassport:true
                    },*/
                    /*teachingFeature:{
                        maxlength:400
                    },
                    teachingGrade:{
                        maxlength:400
                    }*/
                },
                errorElement :"em",
                errorPlacement: function(error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                }
            });

            $("#submitForm").click(function(){
                if( $('#teaInfoForm').valid()){
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
                    $("input[name='address']").val(address);
                    $("input[name='addressCode']").val(addressCode);
                    //$("input[name='iDType']").val($("#iDType").val());
                    //$("input[name='iDNum']").val($("#iDNumber").val());

                    $("input[name='teachingFeature']").val($("#teachingFeature").val());
                    $("input[name='teachingGrade']").val($("#teachingGrade").val());

                    /*var teaTag = ""
                    $(".sele_label .ac span").each(function(){
                        if(teaTag != ""){
                            teaTag+=",";
                        }
                        teaTag+=$(this).text();
                    });
                    $("input[name='teaTag']").val(teaTag);*/

                    /*if($("input[name=iDCardImg]").val() == "" && $("input[name=teaCerImg]").val() == ""){
                        dialogs._timer("请上传审核资料",2,2,"");
                        return;
                    }*/
                    $.ajax({
                        type:"post",
                        url:"/perfectInfo/perfectInfoTea.do",
                        data:$('#teaInfoForm').serialize(),
                        success:function(data){
                            if(common.checkResponse(data) == false){
                                return;
                            }
                            dialogs._timer("保存成功",1,2,function(){
                                location.href=data.data.url;
                            });
                        },
                        error: function (data) {  }
                    });
                }
            });

            $("#degreeForm").validate({
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form

                    $("input[name=major]").val($("#major").val());

                    $.ajax({
                        type:"post",
                        url:"/perfectInfo/perfectInfoTea.do",
                        data:$(form).serialize(),
                        success:function(data){
                            if(common.checkResponse(data) == false){
                                return;
                            }
                            dialogs._timer("保存成功",1,2,function(){
                                $(form).parents('.click_open_cont').addClass('hide');
                                $(form).parents('.click_open_cont').prev('.click_open_title').removeClass('hide');
                            });
                        },
                        error: function (data) {  }
                    });
                },
                rules: {
                    highestDegree:{
                        required:true
                    },
                    school:{
                        required:true,
                        maxlength:30
                    },
                    major:{
                        required:true,
                        maxlength:30
                    }
                },
                messages: {},
                errorElement :"em",
                errorPlacement: function(error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                }
            });

            $("#experienceForm").validate({
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form

                    $("input[name=teachingExperience]").val($("#teachingExperience").val());
                    $.ajax({
                        type:"post",
                        url:"/perfectInfo/perfectInfoTea.do",
                        data:$(form).serialize(),
                        success:function(data){
                            if(common.checkResponse(data) == false){
                                return;
                            }
                            dialogs._timer("保存成功",1,2,function(){
                                $(form).parents('.click_open_cont').addClass('hide');
                                $(form).parents('.click_open_cont').prev('.click_open_title').removeClass('hide');
                            });
                        },
                        error: function (data) { }
                    });
                },
                rules: {
                    seniority:{
                        number:true,
                        required:true,
                        maxlength:2
                    },
                    teachingExperience:{
                        maxlength:200
                    }
                },
                messages: {},
                errorElement :"em",
                errorPlacement: function(error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                }
            });

            //上传身份证或者护照图片
            /*$('#iDCardUpload').fileupload({
                "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
                "maxFileSize": 1024*1024*2,
                "done": function (e, data, response) {
                    var resId = data.result.data.ids;
                    var loadImg = "<img src='/file/loadImage/" + resId + ".r' />";
                    $(".cardUploadSch").eq(0).html("").append(loadImg);
                    $("input[name='iDCardImg']").val(resId);
                    $("input[name='teaCardAudited']").val(0);

                },
                "processfail": function (e, data) {
                    var index = data.index, file = data.files[index];
                    if(file.size > 1024*1024*2){
                        dialogs._timer("上传的文件太大了",2,2, null);
                    } else if (file.error) {
                        dialogs._timer("文件类型错误",2,2, null);
                    }
                },
                "url": '/file/upload.se',
                "autoUpload": true,
                "formData": {},
                "dataType": 'json'
            });*/

            //上传教师资格证
            /*$('#teachCer').fileupload({
                "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
                "maxFileSize": 1024*1024*2,
                "done": function (e, data, response) {
                    var resId = data.result.data.ids;
                    var loadImg = "<img src='/file/loadImage/" + resId + ".r' />";
                    $(".cardUploadSch").eq(1).html("").append(loadImg);
                    $("input[name='teaCerImg']").val(resId);
                    $("input[name='teaCerAudited']").val(0);
                },
                "processfail": function (e, data) {
                    var index = data.index, file = data.files[index];
                    if(file.size > 1024*1024*2){
                        dialogs._timer("上传的文件太大了",2,2, null);
                    } else if (file.error) {
                        dialogs._timer("文件类型错误",2,2, null);
                    }
                },
                "url": '/file/upload.se',
                "autoUpload": true,
                "formData": {},
                "dataType": 'json'
            });*/

        });
    });