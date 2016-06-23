
define(["jquery","common","loadAreaAndMatch","dialogs","birthday","base","basicSchool",
        "lib/jquery_validate/jquery.validate", "lib/jquery_validate/addkehai_validate",
        "lib/jquery_validate/messages_zh","umeditor_config","umeditor"],
    function($,common,loadAreaAndMatch,dialogs){

        var edit = UM.getEditor('des');

        switch (userInfo.audited){
            case "0":{
                $(".red").text("(审核中)");
                break;
            }
            case "1":{
                $(".red").text("(审核成功)");
                break;
            }
            case "2":{
                $(".red").text("(审核失败)");
                $(".click_open_edit").eq(1).attr("class","click_open_edit");
                if(userInfo.offlineOrg ==1){
                    $(".offlineOrgYes").eq(1).show();
                    $("input[name='orgImg']").val(userInfo.orgImg);
                }else{
                    $(".offlineOrgYes").eq(0).show();
                    $("input[name='personIDImg']").val(userInfo.personIDImg);
                }
                break;
            }
        }

        <!--回显数据开始----------------------->

        var schShowFrom = function () {

            //获得所要回显的值
            var checkArray =userInfo.trainingCourseType.split(",");
            //获得所有的复选框对象
            var checkBoxAll = $("input[name='trainingCourseType']");
            $.each(checkBoxAll,function(j,checkbox){
                var checks=$(checkbox);
                checks.attr("checked",false);
            });
            var trainingCourseType = $(".trainingCourseType").html("");
            for(var i=0;i<checkArray.length;i++){
                //获取所有复选框对象的value属性，然后，用checkArray[i]和他们匹配，如果有，则说明他应被选中
                $.each(checkBoxAll,function(j,checkbox){
                    var checks=$(checkbox);
                    if(checkArray[i]==checks.val()){
                        if(trainingCourseType.html() != ""){
                            trainingCourseType.append(",");
                        }
                        trainingCourseType.append(checks.siblings().text());
                        checks.attr("checked",true);
                    }
                });
            }

            checkArray =userInfo.trainingCourse.split(",");
            checkBoxAll = $("input[name='trainingCourse']");
            $.each(checkBoxAll,function(j,checkbox){
                var checks=$(checkbox);
                checks.attr("checked",false);
            });
            var trainingCourse = $(".trainingCourse").html("");
            for(var i=0;i<checkArray.length;i++){
                $.each(checkBoxAll,function(j,checkbox){
                    var checks=$(checkbox);
                    if(checkArray[i]==checks.val()){
                        if(trainingCourse.html() != ""){
                            trainingCourse.append(",");
                        }
                        trainingCourse.append(checks.siblings().text());
                        checks.attr("checked",true);
                    }
                });
            }

            $("#email").val(userInfo.email);
            $("#detailAddress").val(userInfo.detailAddress);

         /*   var content = common.textAreaEscape(userInfo.des);
            $("#des").val(content);
            $("#des").text($("#des").val());
            $("input[name='des']").val(content);*/

            edit.ready(function(){
                edit.setContent(userInfo.des);
            });

            // 显示图片
            if(userInfo.ppResId){
                loadImg = '<img src="/file/loadImage/'+userInfo.ppResId+'.r?' + new Date().getTime() +'">';
                $(".picture").html("").append(loadImg);
                $(".user_logo_warp").html("").append(loadImg);
            }

            $("input[type=radio][name=offlineOrg]").each(function() {
                if ($(this).val() == userInfo.offlineOrg) {
                    existOrg(userInfo.offlineOrg);
                    $(this).attr("checked", "checked");
                }
            });

            $("#iDType option").each(function(){
                var flag= userInfo.iDType;
                if( flag == 0){
                    flag =1;
                }
                if( $(this).val()== flag){
                    $(".iDType").text($(this).text());
                    $(this).attr("selected", "selected");
                }
            });

            $("input[name=legalPersonName]").val(userInfo.legalPersonName);
            $("input[name=orgPID]").val(userInfo.orgPID);
            $("input[name=legalPersonID]").val(userInfo.legalPersonID);


            //审核的图片显示
            if(userInfo.offlineOrg ==1){
                if(userInfo.orgImg != ""){
                    $("input[name='IDImg']").val(userInfo.orgImg);
                    var loadImg = '<img src="/file/loadImage/'+userInfo.orgImg+'.r"/>';
                    $(".cardUploadSch").addClass('papersUploadSch').html("").append(loadImg);
                }
            }else{
                if( userInfo.personIDImg != ""){
                    var pIDImg = userInfo.personIDImg.split(',');
                    for (var i=0;i<pIDImg.length;i++)
                    {
                        personIDImg1=pIDImg[0];
                        personIDImg2=pIDImg[1];
                    }
                    $("input[name='IDImg1']").val(personIDImg1);
                    $("input[name='IDImg2']").val(personIDImg2);
                    var loadImg = '<div class="cardUploadSch fl"><img src="/file/loadImage/'+personIDImg1+'.r"/></div><div class="cardUploadSch fl"><img src="/file/loadImage/'+personIDImg2+'.r"/></div>';
                    $(".cardUploadSch").replaceWith(loadImg);
                }
            }

            // 区域
            loadAreaAndMatch.loadAreaAndMatch($("#prov"), $("#country"), $("#city"),userInfo.areaCode,userInfo.areaName);
        };

        schShowFrom();

        $(".schShowFrom").click(function(){
            schShowFrom();
        });
        <!--回显数据结束----------------------->

        $( '#schInfoForm' ).validate({
            submitHandler: function(form){

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


                $.ajax({
                    type:"post",
                    url:"/orgInfo/regOrgInfo.do",
                    data:$(form).serialize(),
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        dialogs._timer("保存成功",1,2,function(){
                            location.reload();
                        });
                    },
                    error:function(data){}
                });
            },
            rules:{
                orgName:{
                    maxlength:20,
                    required:true,
                    remote: {
                        url: "/orgInfo/existOrgName.do",     //后台处理程序
                        type: "post",               //数据发送方式
                        dataType: "json",           //接受数据格式
                        data: {                     //要传递的数据
                            account: function() {
                                return $("#account").val();
                            }
                        }
                    }
                },
                email:{
                    email:true
                },
                trainingCourseType:{
                    required:true
                },
                trainingCourse:{
                    required:true
                },
                prov: {
                    min:1
                },
                country: {
                    min:1
                },
                city: {
                    min:1
                },
                detailAddress:{
                    maxlength:50
                }
            },
            messages:{
                orgName: {
                    required: "<i></i>学校名称不能为空<b></b>",
                    remote:"<i></i>该名字已被使用<b></b>"
                },
                trainingCourseType:'<i></i>请选择培训课程类型<b></b>',
                trainingCourse:'<i></i>请选择培训科目<b></b>',
                prov:{min:"<i></i>请选择完整地区<b></b>"},
                country:{min:"<i></i>请选择完整地区<b></b>"},
                city:{min:"<i></i>请选择完整地区<b></b>"}
            },
            errorElement :"em",
            errorPlacement: function(error, element) { //指定错误信息位置
                error.appendTo(element.parents(".error_show").find(".error_message"));
            }
        });

        $("#orgForm").validate({
            submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form

                var IDImg = $("input[name='IDImg']").val();
                if(IDImg == ""){
                    dialogs._timer("请上传证件照片", 2,2, "");
                    return;
                }

                if($("input[name='offlineOrg']:checked").val() == 1){
                    $("input[name='orgImg']").val(IDImg);
                    $("input[name=iDType]").val(0);
                }else{
                    $("input[name='personIDImg']").val(IDImg);
                }

                $.ajax({
                    type:"post",
                    url:"/orgInfo/regOrgInfo.do",
                    data:$(form).serialize(),
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        dialogs._timer("保存成功",1,2,function(){
                            location.reload();
                        });
                    },
                    error:function(data){}
                });
            },
            rules: {
                offlineOrg:{
                    required:true
                },
                legalPersonName:{
                    required:true,
                    maxlength:10
                },
                legalPersonID:{
                    required:true,
                    isIdCardNoOrPassport:true,
                    maxlength:20
                },
                orgPID:{
                    required:true,
                    number:true,
                    maxlength:20
                }
            },
            messages: {
                offlineOrg:{
                    required:"<i></i>请选择机构性质<b></b>"
                },
                legalPersonName:{
                    required:"<i></i>法人姓名不能为空<b></b>"
                },
                orgPID:{required: "<i></i>营业执照不能为空<b></b>",number:"<i></i>请输入正确的营业执照号<b></b>"}

            },
            errorElement :"em",
            errorPlacement: function(error, element) { //指定错误信息位置
                error.appendTo(element.parents(".error_show").find(".error_message"));
            }
        });

        //上传身份证图片
        $('#personIDImgupload').fileupload({
            "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
            "maxFileSize": 1024*1024*2,
            "done": function (e, data, response) {
                var resId = data.result.data.ids;
                var loadImg = "<img src='/file/loadImage/" + resId + ".r' width='220px' height='160px' />";
                $(".cardUploadSch").html("").append(loadImg);
                $("input[name='IDImg']").val(resId);
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

        function existOrg(flag){
            if(flag ==0){
                $(".offlineOrgYes").eq(0).show();
                $(".offlineOrgYes").eq(1).hide();
            }else{
                $(".offlineOrgYes").eq(0).hide();
                $(".offlineOrgYes").eq(1).show();
            }
        }
    });

