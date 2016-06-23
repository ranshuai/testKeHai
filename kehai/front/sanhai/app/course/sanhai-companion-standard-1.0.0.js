/**
 * Created by 蒋淼 on 2015/8/5.
 * 依赖 sanhai-base-dialog-standard-1.0.0.js
 */
define(['jquery','pageBar','course_center','dialogs','money','lib/jquery_validate/jquery.validate.min'],function($,pagebar,course,dialogs,money){


//var subjectJson = "{\"subjects\": [{\"secondCode\": \"10010\",\"secondCodeValue\": \"语文\"},{\"secondCode\": \"10011\",\"secondCodeValue\": \"数学\"},{\"secondCode\": \"10012\",\"secondCodeValue\": \"英语\"},{\"secondCode\": \"10013\",\"secondCodeValue\": \"生物\"},{\"secondCode\": \"10014\",\"secondCodeValue\": \"物理\"},{\"secondCode\": \"10015\",\"secondCodeValue\": \"化学\"},{\"secondCode\": \"10016\",\"secondCodeValue\": \"地理\"},{\"secondCode\": \"10017\",\"secondCodeValue\": \"历史\"},{\"secondCode\": \"10018\",\"secondCodeValue\": \"政治\"},{\"secondCode\": \"10019\",\"secondCodeValue\": \"品德与生活\"},{\"secondCode\": \"10020\",\"secondCodeValue\": \"美术\"},{\"secondCode\": \"10021\",\"secondCodeValue\": \"音乐\"},{\"secondCode\": \"10022\",\"secondCodeValue\": \"体育\"},{\"secondCode\": \"10023\",\"secondCodeValue\": \"信息技术\"},{\"secondCode\": \"10024\",\"secondCodeValue\": \"法制\"},{\"secondCode\": \"10025\",\"secondCodeValue\": \"综合实践\"},{\"secondCode\": \"10026\",\"secondCodeValue\": \"科学\"},{\"secondCode\": \"10027\",\"secondCodeValue\": \"理综\"},{\"secondCode\": \"10028\",\"secondCodeValue\": \"文综\"},{\"secondCode\": \"10029\",\"secondCodeValue\": \"思想品德\"}]}";
var subjectJson = "{\"subjects\": [{\"secondCode\": \"10010\",\"secondCodeValue\": \"语文\"},{\"secondCode\": \"10011\",\"secondCodeValue\": \"数学\"},{\"secondCode\": \"10012\",\"secondCodeValue\": \"英语\"},{\"secondCode\": \"10013\",\"secondCodeValue\": \"生物\"},{\"secondCode\": \"10014\",\"secondCodeValue\": \"物理\"},{\"secondCode\": \"10015\",\"secondCodeValue\": \"化学\"},{\"secondCode\": \"10016\",\"secondCodeValue\": \"地理\"},{\"secondCode\": \"10017\",\"secondCodeValue\": \"历史\"},{\"secondCode\": \"10018\",\"secondCodeValue\": \"政治\"},{\"secondCode\": \"10027\",\"secondCodeValue\": \"理综\"},{\"secondCode\": \"10028\",\"secondCodeValue\": \"文综\"}]}";

function changeTab() {
    var aA = $('.tabList li a');
    var aDiv = $('.tabItem');
    for (var i = 0; i < aA.length; i++) {
        (function (index) {
            aA[i].onclick = function () {

                // 蒋淼修改如果是课程记录则加载信息
                if ("课程记录" == this.text) loadCompanion();

                aA.removeClass('ac');
                this.className = 'ac';
                aDiv.addClass('hide');
                aDiv.eq(index).removeClass('hide');
            };
        })(i);
    }
}

/**
 * 自定义标签
 */
function defineTag() {
    $('.self em').mouseenter(function () {
        var $this = $(this);
        $this.css({'cursor': 'pointer'});
    });
    $('.self em').toggle(function () {
        $('.self em').removeClass('orange');
        $(this).addClass('orange');
    }, function () {
        $('.self em').removeClass('orange');
    });
}

/**
 * 加载科目
 * @param targetDiv
 * @param subjectId
 * @注意
 * @1 这个方法和sanhi-course-standard-1.0.0.js 中 loadSubjectAndMatch 一致
 * @2 这里重写是应为导入sanhai-course-standard-1.0.0.js会冲突
 * @3 不同这里多了全科选项
 */
function loadSubject4Companion(targetDiv, subjectId) {
    
    var subejctObj = jQuery.parseJSON(subjectJson);

    $("#subject").empty();
    $("#subject").append("<option value='0'>全部</option>");
    $.each(subejctObj.subjects, function (index, value) {
        var key = value.secondCode;
        var val = value.secondCodeValue;

        var opt = "<option value='" + key + "'>" + val + "</option>";
        targetDiv.append(opt);
    });

    // 匹配选内容
    if (null != subjectId && "" != subjectId) {
        targetDiv.parent().find("em").html($("#subject option[value='" + subjectId + "']").text());
        targetDiv.find("option[value='" + subjectId + "']").attr("selected", true);
    }

    targetDiv.change(function () {
        $(this).parent().find("em").html($(this).find("option:selected").text());
    });

    //默认禁用
    targetDiv.attr("disabled", true);
}

/**
 * 改变课程类型激活科目选项
 * @param opt   课程类型SELECT选项
 */
function changeCourseType(opt) {
    var courseType = opt.find("option:selected").text();
    if (courseType == "全科陪读") {
        $("#subject").attr("disabled", true);                        // 科目可选

        $("#subject").empty();                                       // 清空SELECT的option
        $("#subject").append("<option value='0'>全科</option>");     //
        var subejctObj = jQuery.parseJSON(subjectJson);
        $.each(subejctObj.subjects, function (index, value) {
            var key = value.secondCode;
            var val = value.secondCodeValue;

            var opt = "<option value='" + key + "'>" + val + "</option>";
            $("#subject").append(opt);
        });

        $("#subject").find("option[value='0']").attr("selected", true);
        $("#subject").parent().find("em").html("全部");
    }
    if (courseType == "单科陪读") {
        $("#subject").attr("disabled", false);

        $("#subject").empty();
        var subejctObj = jQuery.parseJSON(subjectJson);
        $.each(subejctObj.subjects, function (index, value) {
            var key = value.secondCode;
            var val = value.secondCodeValue;

            var opt = "<option value='" + key + "'>" + val + "</option>";
            $("#subject").append(opt);
        });
        $("#subject").find("option[value='10010']").attr("selected", true);
        $("#subject").parent().find("em").html("语文");

    }
}

/**
 * 保存陪读课程
 * @param submitButton
 */
function submitSaveCompanion(submitButton) {

    $.validator.addMethod("validateCourseTitle", function (value, element, params) {
        var tmp = /[\s,，~`$%^&<'>"]/;
        if (tmp.test(value)) {
            return false;
        } else {
            return true;
        }
    }, "<i></i>不能包含空格和特殊标点符号<b></b>");

    //校验输入有效金额数字，小数2位
    $.validator.addMethod("validateMoney", function (value, element, params) {
        var tmp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
        return this.optional(element) || (tmp.test(value));
    }, "<i></i>请输入正确的金额<b></b>");

    $("#createCompanionForm").validate({
        rules: {
            courseTitle: {
                required: true,
                validateCourseTitle:true
            },
            price: {
                validateMoney: true,
                required: true,
                number: true,
                range: [0, 10000]
            }
        },
        messages: {
            courseTitle: {
                required: "<i></i>请输入陪读名称<b></b>"
            },
            price: {
                required: "<i></i>请输入陪读价格（单位元）<b></b>",
                number: "<i></i>陪读价格必须是整数<b></b>",
                range: "<i></i>陪读价格不是有效数字<b></b>"
            }
        },
        errorElement: "em",
        errorPlacement: function (error, element) { //指定错误信息位置
            error.appendTo(element.parents(".error_show").find(".error_message"));
        }
    });

    if ($('#createCompanionForm').valid()) {
        var opt = submitButton.attr("name");
        var courseTitle = $("#courseTitle").val();
        var companionLevelId = $("#companionLevel").val();
        var courseType = $("#courseType").val();
        var subjectId = $("#subject").val();
        var subject = $("#subject").find("option:selected").text();
        var price = Math.round(Number($("#price").val()) * 100);
        var billMethod = $("#billMethod").val();

        var tag = "";
        var tagId = "";
        $(".sele_label .ac span").each(function () {
            if (tag != "") tag += ",";
            if (tagId != "") tagId += ",";
            tag += $(this).text();
            tagId += $(this).attr("code");
        });

        $.ajax({
            url: "/companion/" + opt + "/operationCompanion.do",
            type: "post",
            dataType: "json",
            data: {
                courseTitle: courseTitle,
                companionLevelId: companionLevelId,
                courseType: courseType,
                subjectId: subjectId,
                subject: subject,
                price: price,
                billMethod: billMethod,
                companionTagId: tagId,
                companionTag: tag
            },
             beforeSend: function () {
                $("#saveRelease").attr("disabled", true);
                dialogs._waitDialog("努力处理中请稍后 ......");
            },
            complete: function () {
                $(".eject_warpper_wait").addClass("hide");
                $("#saveRelease").attr("disabled", false);
            },
            success: function (response) {
                if ("000" == response.resCode) {
                    dialogs._timer(response.resMsg,1,2,function () {
                        location.href = "/coursePath/companionList.htm"
                    });
                } else {
                    dialogs._timer(response.resMsg,2,2,null);
                }
            },
            error: function (response) {
                 
            }
        });
    }

}

/**
 * 删除陪读
 * @param courseId      陪读ID
 * @param courseTitle   陪读课程
 * @param target
 * @param subjectId     查询科目ID
 * @param key           查询关键字
 * @param currentPage   当前页
 */
function removeDialog(courseId, courseTitle, target, subjectId, key, currentPage) {

    $("#remove").find("span").html("");
    $("#remove").find("span").append(courseTitle);
    $('#remove').dialog("open");

    $("#removeConfirm").click(function () {
        $.post("/companion/" + courseId + "/deleteCompanion.do", function (response, status, xhr) {
            // 删除成功
            if ("000" == response.resCode) {
                $('#remove').dialog("close");
                loadCompanionList(subjectId, key, currentPage);
            }

            // 删除课程已经存在订单
            if ("503" == response.resCode) {
                $('#remove').dialog("close");

                $("#removeExistOrder").find("span").html("");
                $("#removeExistOrder").find("span").append(courseTitle);

                $("#reoConfirm").click(function () {
                    $("#removeExistOrder").dialog("close");
                })

                $('#removeExistOrder').dialog("open");
            }
        });

    });

    $("#removeCancel").click(function () {
        $("#remove").dialog("close");
    })
}

/**
 * 陪读课程全部陪读和查询陪读信息
 * @param subject
 * @param key
 * @param currentPage
 */
function loadCompanionList(subjectId, key, currentPage) {
    $.ajax({
        url: "/companion/" + subjectId + "/" + key + "/" + currentPage + "/findCompanion.do",
        type: "post",
        dateType: "json",
        success: function (response) {
            if (response.data.companionies.data != null) {

                // 判断是否是第一次加载
                if ($("tbody tr").length > 1) $("tbody tr").slice(1).remove();

                // 清除原始分页
                $("div[class='page ']").empty();

                $("#totalRows").text("共[" + response.data.companionies.totalRows + "]门陪读");

                $.each(response.data.companionies.data, function (index, value) {

                    var courseId = value.courseId;
                    var courseTitle = value.courseTitle;
                    var courseType = value.courseType;

                    if ("20201" == value.companionLevelId) var level = "小学部";
                    if ("20202" == value.companionLevelId) var level = "初中部";
                    if ("20203" == value.companionLevelId) var level = "高中部";

                    if ("8" == value.courseType) courseType = "全科陪读";
                    if ("9" == value.courseType) courseType = "单科陪读";

                    var subject = value.subject;
                    var price = money.fmoney(Number(value.price) / 100, 2);
                    if (1 == value.billMethod)  var bill = "分钟";
                    if (2 == value.billMethod)  var bill = "天";
                    if (3 == value.billMethod)  var bill = "月";

                    var content = "<tr>" +
                        "<td>" + value.courseId + "</td>" +
                        "<td>" + value.courseTitle + "</td>" +
                        "<td>" + courseType + "</td>" +
                        "<td>" + level + "</td>" +
                        "<td>" + subject + "</td>" +
                        "<td>" + price + "/" + bill + "</td>" +
                            //"<td><a class='blue'>删除</a></td>" +
                        "</tr>";

                    $("tbody").append(content);

                    $("tbody tr").eq(index + 1).find("td a").eq(0).on("click", function () {
                        removeDialog(courseId, courseTitle, null, subjectId, key, currentPage);
                    });

                });

                // 页码
                var params = new Array();
                params.push(subjectId);
                params.push(key);
                pagebar.setBasePageBar(response.data.companionies.totalPages, response.data.companionies.currPage, loadCompanionList, params);

                // 初始化科目
                course.loadSubject4Search($("#subject"), subjectId);
                //
                // 清空条件输入框
                $("#key").val("");

            } else {

            }
        },
        error: function () {
           dialogs._timer("请求失败稍后再试", 2,2,null);
        }
    });
}

    return {
        loadCompanionList:loadCompanionList,
        loadSubject4Companion:loadSubject4Companion,
        submitSaveCompanion:submitSaveCompanion,
        changeCourseType:changeCourseType
    }

});