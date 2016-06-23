
define(["jquery","common","loadAreaAndMatch","dialogs", "birthday","base",
        'jquery_ui_widget',
        'jquery_iframe_transport',
        'jquery_fileupload',
        'jquery_xdr_transport',
        "basic",
        "lib/jquery_validate/jquery.validate", "lib/jquery_validate/addkehai_validate",
        "lib/jquery_validate/messages_zh","jquery.datetimepicker"],
    function($,common,loadAreaAndMatch,dialogs){
        // <!--回显数据开始----------------------->

        var stuShowForm =function(){

            $("input[type=radio][name=sex]").each(function() {
                if ($(this).val() == userInfo.sex) {
                    $(this).attr("checked", "checked");
                }
            });

            //获得所要回显的值
            var checkArray =userInfo.weakCourse.split(",");
            //获得所有的复选框对象
            var checkBoxAll = $("input[name='weakCourse']");
            $.each(checkBoxAll,function(j,checkbox){
                var checks=$(checkbox);
                checks.attr("checked",false);
            });
            var weakCourse = $(".weakCourse").html("");
            for(var i=0;i<checkArray.length;i++){
                //获取所有复选框对象的value属性，然后，用checkArray[i]和他们匹配，如果有，则说明他应被选中
                $.each(checkBoxAll,function(j,checkbox){
                    var checks=$(checkbox);
                    if(checkArray[i]==checks.val()){
                        if(weakCourse.html() != ""){
                            weakCourse.append(",");
                        }
                        weakCourse.append(checks.siblings().text());
                        checks.attr("checked",true);
                    }
                });
            }

            $("#calss option").each(function() {
                if ($(this).val() == userInfo.calss) {
                    $(".calss").html("").append($(this).text());
                    $(this).attr("selected", "selected");
                }
            });


            // 显示图片
            if(userInfo.ppResId != ""){
                loadImg = '<img src="/file/loadImage/'+userInfo.ppResId +'.r?' + new Date().getTime() +'">';
                $(".picture").html("").append(loadImg);
                $(".user_logo_warp").html("").append(loadImg);
            }

            $("input[name=nickName]").val(userInfo.nickName);
            $("input[name=name]").val(userInfo.name);
            $("input[name=school]").val(userInfo.school);
            $("input[name=tel]").val(userInfo.tel);
            $("input[name=email]").val(userInfo.email);

            var content = userInfo.introduce;

            content = common.textAreaEscape(content);

            $("#introduce").val(content);
            $("#introduce").text($("#introduce").val());


            // 区域
            loadAreaAndMatch.loadAreaAndMatch($("#prov"), $("#country"), $("#city"),userInfo.areaCode,userInfo.areaName);

            //加载生日
            $("input.datetimepicker").datetimepicker({
                lang:'ch',
                format:'Y-m-d',
                timepicker:false
            });

        };

        stuShowForm();

        $(".stuShowForm").click(function(){
            stuShowForm();
        });

        <!--回显数据结束----------------------->

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
                    data:$(form).serialize(),
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        dialogs._timer("保存完成",1,2,function(){
                             window.location.href="/per/perfectInfo.htm";
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
                /* weakCourse:{
                 required:true
                 },*/
                calss:{
                    required:true
                },
                prov:{
                    required:true,
                    isAddress:true
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
                 required:"<i></i>请选择薄弱科目<b></b>"
                 },*/
                calss:{
                    required:"<i></i>请选择年级<b></b>"
                },
                school:{
                    required:"<i></i>请输入就读学校<b></b>"
                }

            },
            //errorClass:"dd",
            errorElement :"em",
            errorPlacement: function(error, element) { //指定错误信息位置
                error.appendTo(element.parents(".error_show").find(".error_message"));
            }
        });

    });

