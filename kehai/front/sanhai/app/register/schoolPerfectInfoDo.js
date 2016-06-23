/**
 * Created by mahuihuang on 15/11/28.
 */



define([
    'jquery',
    'loadAreaAndMatch',
    'common',
    'dialogs',
    'base',
    'basicSchool',
    'jquery_ui_min',
    'lib/jquery_validate/jquery.validate',
    'lib/jquery_validate/addkehai_validate',
    'lib/jquery_validate/messages_zh',
    "fileupload_process","fileupload_validate",
    "umeditor_config","umeditor"

], function ($, loadAreaAndMatch, common, dialogs) {
    //客服中心hover效果
    $('.serviceList').rNavhover();
    //切换身份hover效果
    $('.tabRole').rNavhover();

    var edit = UM.getEditor('des');

    $('#orgName').placeholder({value: '请输入昵称', ie6Top: 10});
    $('#email').placeholder({value: '请输入你的邮箱', ie6Top: 10});
    // 区域
    loadAreaAndMatch.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), null, null);

    $('#schInfoForm').validate({
        submitHandler: function (form) {   //表单提交句柄,为一回调函数，带一个参数：form

            var IDImg = $("input[name='IDImg']").val();
            var IDImg1 = $("input[name='IDImg1']").val();
            var IDImg2 = $("input[name='IDImg2']").val();


            if ($("input[name='offlineOrg']:checked").val() == 1) {
                if(IDImg == ""){
                    dialogs._timer("请上传营业执照", 2,2, "");
                    return;
                }
            } else {
                if(IDImg1 == "" || IDImg2 == ""){
                    dialogs._timer("请上传证件照片", 2,2, "");
                    return;
                }
            }


            if ($("input[name='offlineOrg']:checked").val() == 1) {
                $("input[name='orgImg']").val(IDImg)
            } else {
                //$("input[name='personIDImg']").val(IDImg);
                $("input[name='personIDImg']").val(IDImg1+","+IDImg2);

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

            $.ajax({
                type: "post",
                url: "/orgInfo/regOrgInfo.do",
                data: $(form).serialize(),
                success: function (data) {
                    if (common.checkResponse(data) == false) {
                        return;
                    }
                    dialogs._timer("保存完成",1,2,function(){
                        location.href = data.data.url + "?orgName=" + encodeURI(encodeURI(data.data.orgName));
                    });
                    /*!//倒计时跳转页面
                     $(".settime_dialog").dialog("open");
                     $('.settime_dialog').parent().addClass('settime_dialog_box');
                     jump(5);*/
                },
                error: function (data) {
                }
            });
        },
        rules: {
            orgName: {
                required: true,
                maxlength: 30,
                remote: {
                    url: "/orgInfo/existOrgName.do", //后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json",           //接受数据格式
                    data: {                     //要传递的数据
                        account: function () {
                            return $("#account").val();
                        }
                    }
                }
            },
            email: {
                email: true
            },
            trainingCourseType: {
                required: true
            },
            trainingCourse: {
                required: true
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
            detailAddress: {
                maxlength: 50
            },
            /* des:{
             maxlength:100
             },*/
            offlineOrg: {
                required: true
            },
            legalPersonName: {
                required: true,
                maxlength: 30
            },
            legalPersonID: {
                required: true,
                isIdCardNoOrPassport: true,
                maxlength: 20
            },
            orgPID: {
                required: true,
                number:true,
                maxlength: 20
            }

        },
        messages: {
            orgName: {
                required: "<i></i>学校名称不能为空<b></b>",
                remote: "<i></i>该学校已被注册<b></b>"
            },
            trainingCourseType: '<i></i>请选择培训课程分类<b></b>',
            trainingCourse: '<i></i>请选择培训科目<b></b>',
            offlineOrg: {
                required: "<i></i>请选择机构性质<b></b>"
            },
            legalPersonName: {
                required: "<i></i>法人姓名不能为空<b></b>"
            },
            prov:{min:"<i></i>请选择完整地区<b></b>"},
            country:{min:"<i></i>请选择完整地区<b></b>"},
            city:{min:"<i></i>请选择完整地区<b></b>"},
            legalPersonID:{required: "<i></i>证件号码不能为空<b></b>"},
            orgPID:{required: "<i></i>营业执照不能为空<b></b>",number:"<i></i>请输入正确的营业执照号<b></b>"}
        },
        errorElement: "em",
        errorPlacement: function (error, element) { //指定错误信息位置
            error.appendTo(element.parents(".error_show").find(".error_message"));
            $('form em.error').each(function(index,obj){
                var widr=$(this).parents('.error_show').find('.formR').css('width');
                var widl=$(this).parents('.error_show').find('.formL').css('width');
                var wid=parseInt(widr)+parseInt(widl)+14;
                $(this).css({'top':'5px','left':wid+'px'})
            })
        }
    });

   /* $("#orgForm").validate({
        submitHandler: function (form) {   //表单提交句柄,为一回调函数，带一个参数：form


            if ($(".cardUploadSch img").length == 0) {
                dialogs._timer("请上传身份证", 2, 2, "");
                return;
            }

            $.ajax({
                type: "post",
                url: "<%=basePath%>/orgInfo/regOrgInfo.do",
                data: $(form).serialize(),
                success: function (data) {
                    if (common.checkResponse(data) == false) {
                        return;
                    }
                    dialogs._timer("保存完成",1,2,"");
                    $(".click_open_cont").addClass("hide");
                    $(".click_open_title").removeClass("hide")
                },
                error: function (data) {
                }
            });
        },
        rules: {
            offlineOrg: {
                required: true
            },
            legalPersonName: {
                required: true,
                maxlength: 10
            }

        },
        messages: {
            offlineOrg: {
                required: "<i></i>请选择机构性质<b></b>"
            },
            legalPersonName: {
                required: "<i></i>法人姓名不能为空<b></b>"
            }
        },
        errorElement: "em",
        errorPlacement: function (error, element) { //指定错误信息位置
            error.appendTo(element.parents(".error_show").find(".error_message"));
        }
    });*/

    //上传身份证图片
    $('.personIDImgupload').fileupload({
        "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
        "maxFileSize": 1024*1024*2,
        "done": function (e, data, response) {
            var resId = data.result.data.ids;
            var loadImg = "<img src='/file/loadImage/" + resId + ".r' width='220px' height='160px' />";
            $(this).parent().siblings().children(".cardUploadSch").html("").append(loadImg);
            //判断是否真实机构
            if(!$('input[name="offlineOrg"]').attr('checked')){
                if($(this).hasClass('idImg1')){
                    $("input[name='IDImg1']").val(resId);
                }else{
                    $("input[name='IDImg2']").val(resId);
                }
            }else{
                $("input[name='IDImg']").val(resId);
            }
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


    //切换是否真实机构
    $('#yes').click(function () {
        existOrg(1);
    });
    $('#no').click(function () {
        existOrg(0);
    });

    function existOrg(flag) {
        if (flag == 0) {
            $(".offlineOrgYes").eq(0).show();
            $(".offlineOrgYes").eq(1).hide();
            $(".offlineOrgYes").eq(2).show();
            $(".offlineOrgYes").eq(3).hide();

        } else {
            $(".offlineOrgYes").eq(0).hide();
            $(".offlineOrgYes").eq(1).show();
            $(".offlineOrgYes").eq(2).hide();
            $(".offlineOrgYes").eq(3).show();
        }
        //  $(".offlineOrgYes").toggle();
    }

    //刷新页面清空form表单
    window.onload = function () {
        document.forms[0].reset();
    }


    //function jump(count) {
    //    window.setTimeout(function(){
    //        count--;
    //        if(count > 0) {
    //            $('#num').html("").append(count);
    //            jump(count);
    //        } else {
    //            location.href="<%=basePath%>/index.htm";
    //        }
    //    }, 1000);
    //}
});
