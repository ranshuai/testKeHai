define(["loadAreaAndMatch","common","dialogs","base",
        'jquery_ui_widget',
        'jquery_iframe_transport',
        'jquery_fileupload',
        'jquery_xdr_transport',
        "fileupload_process","fileupload_validate",
    "lib/jquery_validate/jquery.validate","jquery_Jcrop","basic",
    "lib/jquery_validate/addkehai_validate","lib/jquery_validate/messages_zh","jquery"],
    function(loadAreaAndMatch,common,dialogs){
        return{
            init:function(){
                $('#nickName').placeholder({value:'请输入昵称',ie6Top:10});
                $('#name').placeholder({value:'请输入真实姓名',ie6Top:10});
                $('#email').placeholder({value:'请输入你的邮箱',ie6Top:10});
                $('#schName').placeholder({value:'请输入学校名称',ie6Top:10})

                //客服中心hover效果
                $('.serviceList').rNavhover();
                //切换身份hover效果
                $('.tabRole').rNavhover();

                // 区域
                loadAreaAndMatch.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), null,null);
                loadAreaAndMatch.loadAreaAndMatch($("#provSch"), $("#countrySch"), $("#citySch"), null,null);

                /*点击*/
                $('.form_list').find('.collegeStudentBtnJs').click(function(){
                    $('#speaker').dialog("open");
                    var $this = $(this);

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
                        if(liText == null || liText == ""){
                            dialogs._timer("请选择学校",2,1,"");
                            return;
                        }
                        $this.val(liText);
                        $this.next().val(schoolCode);
                        $('.tabListType li').removeClass('ac');
                        $('#speaker').dialog("close");
                    });
                });

                $("#querySch").click(function(){
                    var schName = $("#schName").val();
                    if( schName == ""){
                        dialogs._timer("请输入学校名称查询",2,1,"");
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
                        dialogs._timer("请选择您要查询的区域",2,1,"");
                        return;
                    }

                    querySchoolList("",areaCode);
                });

                /*form表单提交信息*/
                $( '#teaInfoForm' ).validate({
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
                        },
                        school:{
                            required:true,
                            maxlength:15
                        },
                        high_schoolName:{
                            required:true
                        },
                        teachingFeature:{
                            maxlength:200
                        },
                        teachingGrade:{
                            maxlength:200
                        }
                    },
                    messages:{
                    },
                    errorElement :"em",
                    errorPlacement: function(error, element) { //指定错误信息位置
                        error.appendTo(element.parents(".error_show").find(".error_message"));
                    }
                });

                $("#submitForm").click(function(){

                    if( $('#teaInfoForm').valid() ){
                        if( $("input[name='stuCardAudited']").val() == -1 ){
                            dialogs._timer("请上传学生证",2,1,"");
                            return;
                        }
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
                            data:$('#teaInfoForm').serialize(),
                            success:function(data){
                                if(common.checkResponse(data) == false){
                                    return;
                                }
                               dialogs._timer('保存成功',1,2,function(){
                                   location.href=data.data.url;
                               });
                            },
                            error: function (data) {  }
                        });
                    }
                });

                //上传学生证
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
                        error: function (data) { }
                    });
                }

            }
        }
});
