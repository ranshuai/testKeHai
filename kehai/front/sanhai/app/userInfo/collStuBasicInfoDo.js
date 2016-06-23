
define(["jquery","common","loadAreaAndMatch","dialogs", "birthday","base",
        'jquery_ui_widget',
        'jquery_iframe_transport',
        'jquery_fileupload',
        'jquery_xdr_transport',
        "basic",
        "lib/jquery_validate/jquery.validate", "lib/jquery_validate/addkehai_validate",
        "lib/jquery_validate/messages_zh"],
    function($,common,loadAreaAndMatch,dialogs){

        // 区域
        loadAreaAndMatch.loadAreaAndMatch($("#provSch"), $("#countrySch"), $("#citySch"), null,null);
        <!--回显数据开始----------------------->

        var collStuShowFrom = function(){
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

            if(userInfo.accompanyFeature != ""){
                var accompanyFeature = userInfo.accompanyFeature.split(",");
                var accompanyFeatureUl = $(".accompanyFeature");
                accompanyFeatureUl.html("");
                $.each(accompanyFeature,function(i,value){
                    var li = "<li class='ac'><i class='ac'></i><span>"+value+"</span></li>";
                    accompanyFeatureUl.append(li);
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


            $("input[name=school]").val(userInfo.school);
            $("input[name=major]").val(userInfo.major);


            $("#schoolName0").val(userInfo.high_school_schoolName);
            $("#schoolId0").val(userInfo.high_school_schoolId);
            $("#typeSort0").val(0);

            $("#schoolName1").val(userInfo.middle_school_schoolName);
            $("#schoolId1").val(userInfo.middle_school_schoolId);
            $("#typeSort1").val(1);

            $("#schoolName2").val(userInfo.primary_school_schoolName);
            $("#schoolId2").val(userInfo.primary_school_schoolId);
            $("#typeSort2").val(2);

            var content =common.textAreaEscape(userInfo.teachingFeature);

            $("#teachingFeature").val(content);
            $("#teachingFeature").text($("#teachingFeature").val());
            $("input[name='teachingFeature']").val(content);

            content = common.textAreaEscape(userInfo.teachingGrade);

            $("#teachingGrade").val(content);
            $("#teachingGrade").text($("#teachingGrade").val());
            $("input[name='teachingGrade']").val(content);

            // 显示图片
            if(userInfo.ppResId != ""){
                loadImg = '<img src="/file/loadImage/'+userInfo.ppResId+'.r?' + new Date().getTime() +'">';
                $(".picture").html("").append(loadImg);
                $(".user_logo_warp").html("").append(loadImg);
            }

            // 显示图片
            if(userInfo.collegeStudentCard != ""){
                var imgArr =  userInfo.collegeStudentCard.split(",");
                $.each(imgArr,function(i,value){
                   if(i){
                       loadImg = '<img src="/file/loadImage/'+value+'.r?' + new Date().getTime() +'">';
                       $(".cardUploadSch").append(loadImg);
                   }else{
                       loadImg = '<img src="/file/loadImage/'+value+'.r?' + new Date().getTime() +'">';
                       $(".cardUploadSch").html("").append(loadImg);
                   }
                });
            }
        }

        collStuShowFrom();
        $(".collStuShowFrom").click(function(){
            collStuShowFrom();
        });
        /*--回显数据结束-----------------------*/

        $('.form_list').find('.collegeStudentBtnJs').click(function(){
            $('#speaker').dialog("open");
            var $this = $(this);
            //$(this).blur();
            $('.popCont').find('input').focus();
            var liText = null;
            var schoolCode = null;
            $('.tabListType').undelegate();
            $('.tabListType').delegate('li','click',function(){
                $(this).addClass('ac').siblings('li').removeClass('ac');
                liText = $(this).text();
                schoolCode = $(this).attr('schoolCode');
            });
            $('.confirmBtn').click(function(){

                $this.val(liText);
                $this.next().val(schoolCode);
                if(liText == null || liText == ""){
                    dialogs._timer("请选择学校",2,2,"");
                    return;
                }
                $('.tabListType li').removeClass('ac');
                $('#speaker').dialog("close");
            });
        });


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

                var accompanyFeature = ""
                $(".sele_label .ac span").each(function(){
                    if(accompanyFeature != ""){
                        accompanyFeature+=",";
                    }
                    accompanyFeature+=$(this).text();
                });
                $("input[name='accompanyFeature']").val(accompanyFeature);

                $.ajax({
                    type:"post",
                    url:"/perfectInfo/perfectInfoCollStu.do",
                    data:$(form).serialize(),
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        dialogs._timer('保存成功',1,2,function(){
                            location.reload();
                        });
                    },
                    error: function (data) { dialogs._timer("保存失败",2,2,"") }
                });
            },
            rules:{
                nickName:{required:true,maxlength:15},
                name:{
                    required:true,
                    maxlength:15
                },
                email:{
                    email:true
                },
                prov:{
                    required:true,
                    isAddress:true
                }
            },
            messages:{
            },
            errorElement :"em",
            errorPlacement: function(error, element) { //指定错误信息位置
                error.appendTo(element.parents(".error_show").find(".error_message"));
            }
        });

        $("#educationForm").validate({
            submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form
                $.ajax({
                    type:"post",
                    dataType:"json",
                    url:"/perfectInfo/perfectInfoCollStu.do",
                    data:$(form).serialize(),
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        dialogs._timer('保存成功',1,2,function(){
                            location.reload();
                        });
                    },
                    error: function (data) {  }
                });
            },
            rules: {
                school:{
                    required:true,
                    maxlength:15
                }/*,
                 major:{
                 required:true,
                 maxlength:15
                 }*/
            },
            messages: {},
            errorElement :"em",
            errorPlacement: function(error, element) { //指定错误信息位置
                error.appendTo(element.parents(".error_show").find(".error_message"));
            }
        });

        $("#featureForm").validate({
            submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form
                $.ajax({
                    type:"post",
                    url:"/perfectInfo/perfectInfoCollStu.do",
                    data:$(form).serialize(),
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        dialogs._timer('保存成功',1,2,function(){
                            location.reload();
                        });
                    },
                    error: function (data) {}
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

        $("#querySch").click(function(){
            var schName = $("#schName").val();
            if( schName == ""){
                dialogs._timer("请输入学校名称查询",2,2,"");
                return ;
            }
            querySchoolList(schName,"");
        });

        $("#areaQuery").click(function(){
            var provId = $("#provSchEm").attr("code");
            var prov = $("#provSchEm").text();
            var countryId = $("#countrySchEm").attr("code");
            var country = $("#countrySchEm").text();
            var cityId = $("#citySchEm").attr("code");
            var city = $("#citySchEm").text();

            if ("null" == countryId && "null" == cityId) {
                var areaCode = provId;
            } else if ("null" != countryId && "null" == cityId) {
                var areaCode = countryId;
            } else if ("null" != countryId && "null" != cityId) {
                var areaCode = cityId;
            }
            if("null" == areaCode){
                dialogs._timer("请选择您要查询的区域",2,2,"");
                return;
            }
            querySchoolList("",areaCode);
        });

        //上传身份证或者护照图片
        $('#collegeStudentCard').fileupload({
            "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
            "maxFileSize": 1024*1024*2,
            "done": function (e, data, response) {
                var resId = data.result.data.ids;
                var loadImg = "<img src='/file/loadImage/" + resId + ".r' />";
                var collegeStudentCard =  $("input[name='collegeStudentCard']").val();
                if(collegeStudentCard){
                    $(".cardUploadSch").append(loadImg);
                    resId+=","+collegeStudentCard;
                }else{
                    $(".cardUploadSch").html("").append(loadImg);
                    $("input[name='stuCardAudited']").val(0);
                }

                $("input[name='collegeStudentCard']").val(resId);
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

        function querySchoolList(schName,areaCode){
            $.ajax({
                type:"post",
                url:"/perfectInfo/querySchList.do?time="+new Date().getTime(),
                data:{schName:schName,areaCode:areaCode},
                success:function(data){
                    var objul = $(".tabListType")
                    objul.html("");
                    $.each(data, function(index, item){
                        var li = "<li class='test_ellipsis' title="+item.schoolName+" schoolCode="+item.schoolID+">"+item.schoolName+"</li>";
                        objul.append(li);
                    });
                },
                error: function (data) {  }
            });
        }

    });

