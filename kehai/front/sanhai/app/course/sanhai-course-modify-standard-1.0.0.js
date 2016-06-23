/**
 * Created by 蒋淼 on 2015/8/8.
 * 保存1对1课程操作
 * @param submitBtn
 * @注意
 * @1 提交请求 button 必须有 name 属性，该属性区分是保存，修改，另存还是直接发布
 * @3 和 submitSaveCourse 不同在于传courseId 和 弹出对话框
 */
define(["jquery", "dialogs", "lib/jquery_validate/jquery.validate.min"], function ($, dialog) {

    return {
        'submitModifyCourse': function (courseId, submitButton, scope) {

            $.validator.addMethod("validateCourseTitle", function (value, element, params) {
                //var tmp = /[\s,，~`$%^&<'>"]/;
                //var tmp = /^[0-9a-zA-Z\u4e00-\u9fa5——#《+》-]+$/;
                var tmp = /['"&|@%*]/;
                if (tmp.test(value)) {
                    return false;
                } else {
                    return true;
                }
            }, "<i></i>不能包含特殊标点符号<b></b>");

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

            $.validator.addMethod("validateMoney", function (value, element, params) {
                var tmp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
                return this.optional(element) || (tmp.test(value));
            }, "<i></i>请输入正确的金额<b></b>");

            $("#modifyCourseForm").validate({
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
                        validateMoney: true,
                        number: true,
                        range: [0, 50000]
                    },
                    salary: {
                        //teaSalary: true,
                        //required: true,
                        validateMoney: true,
                        number: true,
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
                        digits: "<i></i>课程时长必须是整数<b></b>",
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

            if ($('#modifyCourseForm').valid()) {
                var opt = submitButton.attr("name");

                var advertiseResId = $("#advertiseResId").val();
                var courseTitle = $("#courseTitle").val();
                var courseType = $("#courseType").val();

                var provId = $("#provEM").attr("code");
                var prov = $("#provEM").text();
                var countryId = $("#countryEM").attr("code");
                var country = $("#countryEM").text();
                var cityId = $("#cityEM").attr("code");
                var city = $("#cityEM").text();

                if ("null" == provId && "null" == countryId && "null" == cityId) {
                    var addressCode = null;
                    var address = null;
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
                var duration = Number($("#duration").val());                     // 课程时长 = 2小时
                var price = Math.round(Number($("#price").val()) * 100);         // 金额转换为分

                // 机构编辑课程
                if (0 == scope) {
                    var lecturerId = $("#lecturerId").val();
                    if (null == $("#salary").val() || "" == $("#salary").val()) {
                        var salary = 0
                    } else {
                        var salary = Math.round(Number($("#salary").val()) * 100);              // 金额转换为分
                    }
                }

                // 教师编辑课程
                if (1 == scope) {
                    var lecturerId = 0;
                    var salary = 0
                }

                var ac = $("#ac").val();
                var outline = $("#outline").val();
                var des = $("#testpaperInfo").html();

                $.ajax({
                    url: "/course/" + opt + "/operationCourse.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        courseId: courseId,
                        courseTitle: courseTitle,
                        advertiseResId: advertiseResId,
                        courseType: courseType,
                        address: address,
                        addressCode: addressCode,
                        gradeId: gradeId,
                        grade: grade,
                        subjectId: subjectId,
                        subject: subject,
                        teaVersionId: versionId,
                        teaVersion: version,
                        duration: duration,
                        price: price,
                        salary: salary,
                        lecturerId: lecturerId,
                        applicableCommunity: ac,
                        outline: outline,
                        des: des
                    },
                    beforeSend: function () {
                        $("#modify").attr("disabled", true);
                        $("#saveAs").attr("disabled", true);
                        $("#modifyRelease").attr("disabled", true);
                    },
                    complete: function () {
                        $("#modify").attr("disabled", false);
                        $("#saveAs").attr("disabled", false);
                        $("#modifyRelease").attr("disabled", false);
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            if ("modify" == opt)
                                dialog._timer(response.resMsg, 1, 2, function () {
                                    location.href = "/course/content/" + courseId + "/courseById.htm";
                                });
                            if ("saveAs" == opt)
                                dialog._timer(response.resMsg, 1, 2, function () {
                                    location.href = "/course/content/" + courseId + "/courseById.htm"
                                });
                            if ("modifyRelease" == opt)
                                dialog._timer(response.resMsg, 1, 2, function () {
                                    location.href = "/course/content/" + courseId + "/courseById.htm"
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

        }
    }

});

