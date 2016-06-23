
define(["jquery","common","loadAreaAndMatch","dialogs","base",
        'jquery_ui_widget',
        'jquery_iframe_transport',
        'jquery_fileupload',
        'jquery_xdr_transport',
        "basic",
        "lib/jquery_validate/jquery.validate", "lib/jquery_validate/addkehai_validate",
        "lib/jquery_validate/messages_zh"],
    function($,common,loadAreaAndMatch,dialogs){
        /*  //设置打开的菜单
         $("#setInfo").trigger('click');*/

        /*  $('#nickName').placeholder({value:'请输入昵称',ie6Top:10})
         $('#name').placeholder({value:'请输入真实姓名',ie6Top:10})
         $('#email').placeholder({value:'请输入你的邮箱',ie6Top:10})*/
        <!--回显数据开始----------------------->

        var teaShowForm=function(){
           /* //教材版本
            loadVersionAndMatch($("#textbookVersion"), null, null);*/
            // 区域
            loadAreaAndMatch.loadAreaAndMatch($("#prov"), $("#country"), $("#city"),userInfo.areaCode,userInfo.areaName);

            $("input[type=radio][name=sex]").each(function() {
                if ($(this).val() == userInfo.sex) {
                    $(this).attr("checked", "checked");
                }
            });

            $(".sele_label span").each(function(){
                $(this).siblings("i").removeClass("ac").parent().removeClass("ac");
            });
            if(userInfo.teaTag != ""){
                var teaTag = userInfo.teaTag.split(",");
                var teaTagUl = $(".teaTag");
                teaTagUl.html("");
                $.each(teaTag,function(i,value){
                    var li = "<li class='ac'><i class='ac'></i><span>"+value+"</span></li>"
                    teaTagUl.append(li);
                    $(".sele_label span").each(function(){
                        if($(this).text() == value){
                            $(this).siblings("i").addClass("ac").parent().addClass("ac");
                        }
                    });
                });
            }

            $("input[name=nickName]").val(userInfo.nickName);
            $("input[name=name]").val(userInfo.name);
            $("input[name=email]").val(userInfo.email);


            //获得所要回显的值
            var checkArray =userInfo.classCode.split(",");
            //获得所有的复选框对象
            var checkBoxAll = $("input[name='classCode']");
            var className = $(".className").html("");

            $.each(checkBoxAll,function(j,checkbox){
                var checks=$(checkbox);
                checks.attr("checked",false);
            });

            for(var i=0;i<checkArray.length;i++){
                //获取所有复选框对象的value属性，然后，用checkArray[i]和他们匹配，如果有，则说明他应被选中
                $.each(checkBoxAll,function(j,checkbox){
                    var checks=$(checkbox);
                    if(checkArray[i]==checks.val()){
                        if(className.html() != ""){
                            className.append(",");
                        }
                        className.append(checks.siblings().text());
                        checks.attr("checked",true);
                    }
                })
            }

            checkArray =userInfo.courseCode.split(",");
            checkBoxAll = $("input[name='courseCode']");
            var courseName = $(".courseName").html("");

            $.each(checkBoxAll,function(j,checkbox){
                var checks=$(checkbox);
                checks.attr("checked",false);
            });

            for(var i=0;i<checkArray.length;i++){
                $.each(checkBoxAll,function(j,checkbox){
                    var checks=$(checkbox);
                    if(checkArray[i]==checks.val()){
                        if(courseName.html() != ""){
                            courseName.append(",");
                        }
                        courseName.append(checks.siblings().text());
                        checks.attr("checked",true);
                    }
                })
            }

            $("#textbookVersion option").each(function() {
                if ($(this).val() == userInfo.textbookVersion) {
                    $(".version").html("").append($(this).text());
                    $(this).attr("selected", "selected");
                }
            });

            $("#professionalTitle option").each(function() {
                if ($(this).val() == userInfo.professionalTitle) {
                    $(".professionalTitle").html("").append($(this).text());
                    $(this).attr("selected", "selected");
                }
            });

            $("input[name=seniority]").val(userInfo.seniority);

            var content = common.textAreaEscape(userInfo.teachingExperience);

            $("#teachingExperience").val(content);
            $("#teachingExperience").text($("#teachingExperience").val());
            $("input[name='teachingExperience']").val(content);

            content =  common.textAreaEscape(userInfo.teachingFeature);

            $("#teachingFeature").val(content);
            $("#teachingFeature").text($("#teachingFeature").val());
            $("input[name='teachingFeature']").val(content);

            content =  common.textAreaEscape(userInfo.teachingGrade);

            $("#teachingGrade").val(content);
            $("#teachingGrade").text($("#teachingGrade").val());
            $("input[name='teachingGrade']").val(content);

            // 显示图片
            if(userInfo.ppResId && parseFloat(userInfo.ppResId)>0){
                loadImg = '<img src="/file/loadImage/'+userInfo.ppResId+'.r?' + new Date().getTime() +'">';
                $(".picture").html("").append(loadImg);
                $(".user_logo_warp").html("").append(loadImg);
            }

            // 显示图片
            if(userInfo.iDCardImg){
                loadImg = '<img src="/file/loadImage/'+userInfo.iDCardImg+'.r?' + new Date().getTime() +'">';
                $(".cardUploadSch").eq(0).html("").append(loadImg);
                $(".cardUploadSch").eq(2).html("").append(loadImg);
            }

            // 初始化教师资格认证信息
            if(userInfo.teaCerImg){
                $("#courseImg").attr("src", "/file/loadImage/"+ userInfo.teaCerImg +"/350/220.r");
                loadImg = '<img src="/file/loadImage/'+userInfo.teaCerImg+'.r?' + new Date().getTime() +'">';
                $(".cardUploadSch").eq(1).html("").append(loadImg);
                $(".cardUploadSch").eq(3).html("").append(loadImg);
            }
            if (userInfo.teaCerAudited == 0 || userInfo.teaCerAudited == -1) {
                $('#experienceForm').removeClass('hide').addClass('show');
            } else {
                if (userInfo.teaCerAudited == 3) {
                    $("#teaCerAuditState").html('您的资料正在审核中，请耐心等待...');
                } else if (userInfo.teaCerAudited == 2) {
                    $("#teaCerAuditState").html('审核失败');
                    $("#seniorityAudit").parent().after('<br><button id="editTeaCerBtn" class="hide btn btnBlue w100 againEditTeaCer">重新编辑</button>');
                } else if (userInfo.teaCerAudited == 1) {
                    $("#teaCerAuditState").html('审核成功');
                }
                $('#experienceForm').removeClass('show').addClass('hide');
                $('#experienceForm').parent().siblings('.examine').removeClass('hide').addClass('show');
                $("#courseImgAudit").attr("src", "/file/loadImage/"+ userInfo.teaCerImg +"/250/170.r");
                $("#seniorityAudit").html(userInfo.seniority);
                $("#professionalTitle option").each(function() {
                    if ($(this).val() == userInfo.professionalTitle) {
                        $("#professionalTitleAudit").html($(this).text());
                    }
                });
            }

            // 初始化学历认证信息
            $("#highestDegree option").each(function() {
                if ($(this).val() == userInfo.highestDegree) {
                    $(".highestDegree").html("").append($(this).text());
                    $(this).attr("selected", "selected");
                }
            });
            $("input[name=school]").val(userInfo.school);
            $("input[name=major]").val(userInfo.major);
            if(userInfo.diplomaImg){
                $("#diplomaImgShow").attr("src", "/file/loadImage/"+ userInfo.diplomaImg +"/350/220.r");
            }
            if (userInfo.diplomaAudited == 0 || userInfo.diplomaAudited == -1) {

            } else {
                if (userInfo.diplomaAudited == 3) {
                    $("#diplomaAuditState").html('您的资料正在审核中，请耐心等待...');
                } else if (userInfo.diplomaAudited == 2) {
                    $("#diplomaAuditState").html('审核失败');
                    $("#majorAudit").parent().after('<br><button id="editDiplomaBtn" class="hide btn btnBlue w100 againEditDiploma">重新编辑</button>');
                } else if (userInfo.diplomaAudited == 1) {
                    $("#diplomaAuditState").html('审核成功');
                }
                $('#degreeForm').parent('.form_list').removeClass('show').addClass('hide').siblings('.examine').removeClass('hide').addClass('show');
                $("#diplomaImgAudit").attr("src", "/file/loadImage/"+ userInfo.diplomaImg +"/250/170.r");
                $("#highestDegree option").each(function() {
                    if ($(this).val() == userInfo.highestDegree) {
                        $("#highestDegreeAudit").html($(this).text());
                    }
                });
                $("#schoolAudit").html(userInfo.school);
                $("#majorAudit").html(userInfo.major);
            }

            // 初始化身份认证
            $("#iDType option").each(function(){
                if ($(this).val() == userInfo.iDType) {
                    $(this).attr("selected", "selected");
                }
            });
            $("input[name=iDNum]").val(userInfo.iDNum);
            if(userInfo.iDCardImg){
                $("#iDCardShowA").attr("src", "/file/loadImage/"+ userInfo.iDCardImg +"/172/90.r");
            }
            if(userInfo.iDCardBackImg){
                $("#iDCardShowB").attr("src", "/file/loadImage/"+ userInfo.iDCardBackImg +"/172/90.r");
            }
            if (userInfo.teaCardAudited == 0 || userInfo.teaCardAudited == -1) {
                $('#auditForm').removeClass('hide').addClass('show');
            } else {
                if (userInfo.teaCardAudited == 3) {
                    $("#iDCardAuditState").html('您的资料正在审核中，请耐心等待...');
                } else if (userInfo.teaCardAudited == 2) {
                    $("#iDCardAuditState").html('审核失败');
                    $("#iDNumberAudit").parent().after('<br><button id="editIdCardBtn" class="hide btn btnBlue w100 againEditIdCard">重新编辑</button>');
                } else if (userInfo.teaCardAudited == 1) {
                    $("#iDCardAuditState").html('审核成功');
                }
                $("#iDCardAuditA").attr("src", "/file/loadImage/"+ userInfo.iDCardImg +"/250/170.r");
                $("#iDCardAuditB").attr("src", "/file/loadImage/"+ userInfo.iDCardBackImg +"/250/170.r");
                $("#iDNumberAudit").html(userInfo.iDNum);
                $('#auditForm').parent('.form_list').removeClass('show').addClass('hide').siblings('.examine').removeClass('hide').addClass('show');
            }

            //点击重新编辑
            $('.againEditTeaCer').click(function(){
                $('#experienceForm').removeClass('hide').addClass('show');
                $('#experienceForm').parent().siblings('.examine').removeClass('show').addClass('hide');
            });
            $('.againEditDiploma').click(function(){
                $(this).parents('.examine').removeClass('show').addClass('hide').siblings('.form_list').removeClass('hide').addClass('show');
            });
            $('.againEditIdCard').click(function(){
                $(this).parents('.examine').removeClass('show').addClass('hide').siblings('.form_list').removeClass('hide').addClass('show');
            });

        }

        teaShowForm();

        $(".teaShowForm").click(function(){
            teaShowForm();
        });
        <!--回显数据结束----------------------->
        //修改表单，提交表单验证开始------------------------------------------------

        $( '#teaInfoForm' ).validate({
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
                $("input[name='address']").val(address);
                $("input[name='addressCode']").val(addressCode);

                var teaTag = ""
                $(".sele_label .ac span").each(function(){
                    if(teaTag != ""){
                        teaTag+=",";
                    }
                    teaTag+=$(this).text();
                });
                $("input[name='teaTag']").val(teaTag);

                $.ajax({
                    type:"post",
                    url:"/perfectInfo/perfectInfoTea.do",
                    data:$(form).serialize(),
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        dialogs._timer("保存完成",1,2,function(){
                            location.reload();
                        });
                    },
                    error: function (data) { }
                });
            },
            rules:{
                name:{
                    required:true,
                    maxlength:30
                },
                prov:{
                    required:true,
                    isAddress:true
                },
                teachingGrade:{ maxlength:300 },
                teachingFeature:{ maxlength:300 },
                classCode:{
                    required:true
                },
                courseCode:{
                    required:true
                }
            },
            messages:{
                name:{
                    required:"<i></i>请填写真实姓名"
                },
                classCode:{
                    required:"<i></i>请选择擅长授课年级"
                },
                courseCode:{
                    required:"<i></i>请选择科目"
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

        $("#courseForm").validate({
            submitHandler: function(form){
                $.ajax({
                    type:"post",
                    url:"/perfectInfo/perfectInfoTea.do",
                    data:$(form).serialize(),
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        dialogs._timer("保存完成",1,2,function(){
                            location.reload();
                        });
                    },
                    error: function (data) { }
                });
            },
            rules: {
                classCode:{
                    required:true
                },
                courseCode:{
                    required:true
                }/*,
                 textbookVersion:{
                 required:true
                 }*/
            },
            messages: {},
            errorElement :"em",
            errorPlacement: function(error, element) { //指定错误信息位置
                error.appendTo(element.parents(".error_show").find(".error_message"));
            }
        });

        $("#degreeForm").validate({
            submitHandler: function(form){
                $.ajax({
                    type:"post",
                    url:"/perfectInfo/perfectInfoTea.do",
                    data:$(form).serialize() + "&diplomaAudited=3",
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }

                        var teacherInfo = JSON.parse(data.data.teaInfo);
                        $("#diplomaImgAudit").attr("src", "/file/loadImage/"+ teacherInfo.diplomaImg +"/250/170.r");
                        $("#highestDegree option").each(function() {
                            if ($(this).val() == teacherInfo.highestDegree) {
                                $("#highestDegreeAudit").html($(this).text());
                            }
                        });
                        $("#schoolAudit").html(teacherInfo.school);
                        $("#majorAudit").html(teacherInfo.major);
                        $("#diplomaAuditState").html('您的资料正在审核中，请耐心等待...');
                        $("#editDiplomaBtn").remove();
                        $('#degreeForm').parent('.form_list').removeClass('show').addClass('hide').siblings('.examine').removeClass('hide').addClass('show');
                    },
                    error: function (data) { }
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
            submitHandler: function(form){
                $.ajax({
                    type:"post",
                    url:"/perfectInfo/perfectInfoTea.do",
                    data:$(form).serialize() + "&teaCerAudited=3",
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        console.log(data);
                        var teacherInfo = JSON.parse(data.data.teaInfo);
                        $("#courseImgAudit").attr("src", "/file/loadImage/"+ teacherInfo.teaCerImg +"/250/170.r");
                        $("#seniorityAudit").html(teacherInfo.seniority);
                        $("#professionalTitle option").each(function() {
                            if ($(this).val() == teacherInfo.professionalTitle) {
                                $("#professionalTitleAudit").html($(this).text());
                            }
                        });
                        $('#experienceForm').removeClass('show').addClass('hide');
                        $("#teaCerAuditState").html('您的资料正在审核中，请耐心等待...');
                        $("#editTeaCerBtn").remove();
                        $('#experienceForm').parent().siblings('.examine').removeClass('hide').addClass('show');
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

        $("#featureForm").validate({
            submitHandler: function(form){
                $.ajax({
                    type:"post",
                    url:"/perfectInfo/perfectInfoTea.do",
                    data:$(form).serialize(),
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        dialogs._timer("保存成功",1,2,"");
                        location.reload();
                    },
                    error: function (data) {  }
                });
            },
            rules: {
                teachingGrade:{ maxlength:200 },
                teachingFeature:{ maxlength:200 }
            },
            messages: {},
            errorElement :"em",
            errorPlacement: function(error, element) { //指定错误信息位置
                error.appendTo(element.parents(".error_show").find(".error_message"));
            }
        });

        $("#auditForm").validate({
            submitHandler: function(form){
                $.ajax({
                    type:"post",
                    url:"/perfectInfo/perfectInfoTea.do",
                    data:$(form).serialize() + "&teaCardAudited=3",
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        var teacherInfo = JSON.parse(data.data.teaInfo);
                        $("#iDCardAuditA").attr("src", "/file/loadImage/"+ teacherInfo.iDCardImg +"/250/170.r");
                        $("#iDCardAuditB").attr("src", "/file/loadImage/"+ teacherInfo.iDCardBackImg +"/250/170.r");
                        $("#iDNumberAudit").html(teacherInfo.iDNum);
                        $("#iDCardAuditState").html('您的资料正在审核中，请耐心等待...');
                        $("#editIdCardBtn").remove();
                        $('#auditForm').parent('.form_list').removeClass('show').addClass('hide').siblings('.examine').removeClass('hide').addClass('show');
                    },
                    error: function (data) {  }
                });
            },
            rules:{
                iDNum: {
                    required:true,
                    isIdCardNoOrPassport: true
                }
            },
            messages: {},
            errorElement :"em",
            errorPlacement: function(error, element) { //指定错误信息位置
                error.appendTo(element.parents(".error_show").find(".error_message"));
            }
        });

        //上传身份证或者护照图片
        $('#iDCardUpload').fileupload({
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
        });

        // 上传身份证照片正面
        $('#iDCardUploadA').fileupload({
            "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
            "maxFileSize": 1024*1024*2,
            "done": function (e, data, response) {
                var resId = data.result.data.ids;

                var loadImg = "<img src='/file/loadImage/" + resId + "/172/90.r' />";
                $(".cardUploadSchA").eq(0).html("").append(loadImg);
                $("input[name='iDCardImg']").val(resId);
                // $("input[name='teaCardAudited']").val(0);
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
        });

        // 上传身份证照片反面
        $('#iDCardUploadB').fileupload({
            "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
            "maxFileSize": 1024*1024*2,
            "done": function (e, data, response) {
                var resId = data.result.data.ids;

                var loadImg = "<img src='/file/loadImage/" + resId + "/172/90.r' />";
                $(".cardUploadSchB").eq(0).html("").append(loadImg);
                $("input[name='iDCardBackImg']").val(resId);
                // $("input[name='teaCardAudited']").val(0);
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
        });

        //上传身份证或者护照图片
        $('#teachCer').fileupload({
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
        });

        // 上传教师资格证书
        $('#fileupload').live("click", function () {
            $(this).fileupload({
                "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
                "maxFileSize": 1024 * 1024 * 2,
                "done": function (e, data, response) {
                    var resId = data.result.data.ids;
                    //ID赋值到隐藏域
                    // $("#advertiseResId").val(resId);
                    $("#teaCerImg").val(resId);
                    $("input[name='teaCerImg']").val(resId);

                    // 显示图片
                    $("#courseImg").attr("src", "/file/loadImage/" + resId + "/350/220.r");
                },
                "processfail": function (e, data) {
                    var index = data.index, file = data.files[index];
                    if (file.size > 1024 * 1024 * 2) {
                        dialogs._timer("上传的文件太大了", 2, 2, null);
                    } else if (file.error) {
                        dialogs._timer("文件类型错误", 2, 2, null);
                    }
                },
                "url": "/file/upload.se",
                "autoUpload": true,
                "formData": {
                    //userId:
                },
                "dataType": "json"
            });
        });

        // 上传教师毕业证书
        $('#fileupload2').live("click", function () {
            $(this).fileupload({
                "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
                "maxFileSize": 1024 * 1024 * 2,
                "done": function (e, data, response) {
                    var resId = data.result.data.ids;
                    //ID赋值到隐藏域
                    $("#diplomaImg").val(resId);

                    // 显示图片
                    $("#diplomaImgShow").attr("src", "/file/loadImage/" + resId + "/350/220.r");
                },
                "processfail": function (e, data) {
                    var index = data.index, file = data.files[index];
                    if (file.size > 1024 * 1024 * 2) {
                        dialogs._timer("上传的文件太大了", 2, 2, null);
                    } else if (file.error) {
                        dialogs._timer("文件类型错误", 2, 2, null);
                    }
                },
                "url": "/file/upload.se",
                "autoUpload": true,
                "formData": {
                    //userId:
                },
                "dataType": "json"
            });
        });

        (function(){
            function editCallback(fn){
                //此处需要等待后台审核的数据
                var teaCard = "${teaInfo.teaCardAudited}";
                var teaCar = "${teaInfo.teaCerAudited}";

                if(teaCard == 2 || teaCar == 2 || teaCar == -1 || teaCard == -1){
                    $('.title_edit').find('.audit_data_error').removeClass('hide');
                    $('.audit_data_succer').removeClass('hide');
                    $('.audit_data').addClass('hide');

                    $('.audit_data_error').click(function(){
                        $(this).addClass('hide');
                        $('.audit_data_succer').addClass('hide');
                        $('.audit_data').removeClass('hide');
                    });

                    //回调函数
                    fn&&fn();

                }else{
                    $('.audit_data').addClass('hide');
                    $('.audit_data_error').addClass('hide');
                }

                $('.audit_data_succer').removeClass('hide');
            }
            //点击保存保存信息
            editCallback(function(){
                /* $('.click_open_preservation').click(function(){
                 editCallback();
                 });*/

                $('.click_open_cancelBtn').click(function(){
                    $('.audit_data_succer').removeClass('hide');
                    $('.audit_data').addClass('hide');
                    $('.audit_data_error').removeClass('hide');

                });

            });

        })();

    });

