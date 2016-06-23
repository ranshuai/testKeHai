/**
 * Created by 蒋淼 on 2015/8/8.
 * 保存1对1课程操作
 * @param submitButton
 * @param scope
 * @注意
 * @1 提交请求 button 必须有 name = "save" 属性，该属性区分是保存，修改，另存还是直接发布
 */
//define(['jquery', 'base_dialog_standard', 'lib/jquery_validate/jquery.validate.min'], function ($, dialog) {
define(["jquery", "dialogs", "lib/jquery_validate/jquery.validate"], function ($, dialog) {

    return {
        'submitSaveCourse': function (submitButton, scope) {

            $.validator.addMethod("teaSalary", function (value, element, params) {
                var teacher = $("#teacher").val();
                if (null == teacher || "" == teacher) {
                    return true;
                } else {
                    if (null == value || "" == value) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }, "<i></i>输入教师课酬<b></b>");

            $.validator.addMethod("validateCourseTitle", function (value, element, params) {
                //var tmp = /[\s,，~`$%^&<'>"]/;
                //var tmp = /^[0-9a-zA-Z\u4e00-\u9fa5——#《+》-]+$/;
                var tmp = /['"&|@%*]/;
                if (tmp.test(value)) {
                    return false;
                } else if (value.trim() == "") {
                    return false;
                } else {
                    return true;
                }
            }, "<i></i>不能包含特殊标点符号<b></b>");

            $.validator.addMethod("validateMoney", function (value, element, params) {
                var tmp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
                return this.optional(element) || (tmp.test(value));
            }, "<i></i>请输入正确的金额<b></b>");

            $("#createCourseForm").validate({
                rules: {
                    courseTitle: {
                        required: true,
                        validateCourseTitle: true,
                        rangelength: [3, 100]
                    },
                    //prov: {
                    //    min: 1
                    //},
                    duration: {
                        required: true,
                        digits: true,
                        range: [1, 9000]
                    },
                    price: {
                        required: true,
                        number: true,
                        validateMoney: true,
                        range: [0, 50000]
                    },
                    salary: {
                        number: true,
                        validateMoney: true,
                        range: [0, 10000]
                    },
                    ac: {
                        required: true,
                        validateCourseTitle: true,
                        rangelength: [2, 50]
                    },
                    outline: {
                        rangelength: [0, 500]
                    }
                    //testpaperInfo: {
                    //    rangelength: [0, 200]
                    //}
                },
                messages: {
                    courseTitle: {
                        required: "<i></i>请输入课程名称<b></b>",
                        rangelength: "<i></i>课程名称长度3~100个文字<b></b>"
                    },
                    //prov: {
                    //    min: "<i></i>请选择所在省<b></b>"
                    //},
                    duration: {
                        required: "<i></i>请输入课程时长<b></b>",
                        digits: "<i></i>课程时长数必须是整数<b></b>",
                        range: "<i></i>课程时长有效范围1~9000<b></b>"
                    },
                    price: {
                        required: "<i></i>请输入课程价格（单位元）<b></b>",
                        number: "<i></i>课程价格不是有效数字<b></b>",
                        range: "<i></i>课程价格有效范围0~50000<b></b>"
                    },
                    salary: {
                        //required: "<i></i>请输入课酬<b></b>",
                        number: "<i></i>课酬价格不是有效数字<b></b>",
                        range: "<i></i>课酬有效范围0~10000<b></b>"
                    },
                    ac: {
                        required: "<i></i>输入招生对象<b></b>",
                        rangelength: "<i></i>招生对象长度2~50个文字<b></b>"
                    },
                    outline: {
                        rangelength: "<i></i>课程大纲长度0~500个文字<b></b>"
                    }
                    //testpaperInfo: {
                    //    rangelength: "<i></i>课程介绍长度0~200个文字<b></b>"
                    //}
                },
                errorElement: "em",
                errorPlacement: function (error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                }
            });

            if ($('#createCourseForm').valid()) {
                var opt = submitButton.attr("name");
                var advertiseResId = $("#advertiseResId").val();
                var courseTitle = $("#courseTitle").val();
                var courseType = $("#courseType").val();
                var isWrongCourse = $("#isWrongCourse").val();

                var provId = $("#provEM").attr("code");
                var prov = $("#provEM").text();
                var countryId = $("#countryEM").attr("code");
                var country = $("#countryEM").text();
                var cityId = $("#cityEM").attr("code");
                var city = $("#cityEM").text();

                if ("null" == provId && "null" == countryId && "null" == cityId) {
                    var addressCode = "";
                    var address = "";
                } else if ("null" != provId && "null" == countryId && "null" == cityId) {
                    var addressCode = provId;
                    var address = prov;
                } else if ("null" != provId && "null" != countryId && "null" == cityId) {
                    var addressCode = provId + "," + countryId;
                    var address = prov + "," + country;
                } else if ("null" != provId && "null" != countryId && "null" != cityId) {
                    var addressCode = provId + "," + countryId + "," + cityId;
                    var address = prov + "," + country + "," + city;
                }

                var gradeId = $("#grade").val();
                var grade = $("#grade").find("option:selected").text();
                var subjectId = $("#subject").val();
                var subject = $("#subject").find("option:selected").text();

                var versionId = $("#version").val();
                var version = $("#version").find("option:selected").text();
                var duration = Number($("#duration").val());                     // 课程时长 = 小时
                var price = Math.round(Number($("#price").val()) * 100);         // 金额转换为分

                // 机构保存课程 授课匹配 课酬输入
                if (0 == scope) {
                    var lecturerId = $("#lecturerId").val();
                    if (null == $("#salary").val() || "" == $("#salary").val()) {
                        var salary = 0
                    } else {
                        var salary = Math.round(Number($("#salary").val()) * 100);
                    }
                }

                // 教师保存课程 授课人ID=0 在Controller会再讲登录用户ID赋值，保证教师登录授课人就是自己 无课酬
                if (1 == scope) {
                    var lecturerId = 0;
                    var salary = 0
                }

                var ac = $("#ac").val();
                var outline = $("#outline").val();                                             // 富文本内容
                var des = $("#testpaperInfo").html();

                $.ajax({
                    url: "/course/" + opt + "/operationCourse.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        courseTitle: courseTitle,
                        courseType: courseType,
                        courseMode: 0,                           //授课方法 0 一对一 1 班课
                        address: address,
                        addressCode: addressCode,
                        gradeId: gradeId,
                        grade: grade,
                        subjectId: subjectId,
                        subject: subject,
                        teaVersionId: versionId,
                        teaVersion: version,
                        duration: duration,
                        lecturerId: lecturerId,
                        price: price,
                        des: des,
                        advertiseResId: advertiseResId,
                        salary: salary,
                        applicableCommunity: ac,
                        outline: outline,
                        isWrongCourse:isWrongCourse
                    },
                    beforeSend: function () {
                        $("#save").attr("disabled", true);
                        $("#saveRelease").attr("disabled", true);
                    },
                    complete: function () {
                        $("#save").attr("disabled", false);
                        $("#saveRelease").attr("disabled", false);
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            dialog._timer(response.resMsg, 1, 2, function () {
                                if (response.data.courseMode == 4) {
                                    location.href = "/courses/"+ response.data.courseMode +"/"+ response.data.courseId +"/pk.htm";
                                } else {
                                    location.href = "/coursePath/courseList.htm";
                                }
                            });
                        } else {
                            dialog._timer(response.resMsg, 2, 2, null);
                        }
                    },
                    error: function () {
                        dialog._timer("请求失败稍后再试", 2, 2, null);
                    }
                });

            }
        },

        /**
         * 清除保存课程表单数据
         * @param scope 0 = 机构；1 = 教师
         * @注意
         * @1. scope = 0 机构要清除教师ID、教师名称、课酬
         * @2. scope = 1 教师
         */
        'cleanFormData': function (scope) {
            $("#advertiseResId").val("");

            $("div[class='formR']").find("img").attr("src", "/front/sanhai/images/teacher_banner.png");
            $("#courseTitle").val("");

            $("#courseType").parent("span").find("em").html("小学");
            $("#courseType").find("option[value='1']").attr("selected", true);

            $("#provEM").text("选择省");
            $("#provEM").attr("code", "null");
            $("#prov").find("option[value='-1']").attr("selected", true);

            $("#countryEM").text("选择地区");
            $("#courntyEM").attr("code", "null");
            $("#country").find("option[value='-1']").attr("selected", true);

            $("#cityEM").text("选择县");
            $("#cityEM").attr("code", "null");
            $("#city").find("option[value='-1']").attr("selected", true);

            $("#grade").parent("span").find("em").html("一年级");
            $("#grade").find("option[value='1001']").attr("selected", true);

            $("#subject").parent("span").find("em").html("语文");
            $("#subject").find("option[value='10010']").attr("selected", true);

            //$("#version").parent("span").find("em").html("人教版");
            //$("#version").find("option[value='20601']").attr("selected", true);

            $("#duration").val("");

            if (0 == scope) {
                $("#lecturerId").val("0");
                $("#teacher").val("");
                $("#salary").val("");
            }

            $("#ac").val("");
            $("#outline").val("");

            $("#price").val("");
            $("#testpaperInfo").val("");
        }
    }

});