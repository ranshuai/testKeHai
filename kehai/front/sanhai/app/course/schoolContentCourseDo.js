/**
 * Created by Administrator on 2015/12/21.
 */
define(
    [
        'jquery',
        'money',
        'loadVersionAndMatch',
        'loadAreaAndMatch',
        'dialogs',
        'sanhai-course-modify-standard-1.0.0',
        'common',
        'umeditor_config',
        'umeditor',
        "lib/jquery_validate/messages_zh"
    ], function ($, money, loa, area, dialogs, mod, common) {

        // 菜单高亮
        //$("#allCourse").attr("class", "cur");

        $('.click_open_edit1').toggle(function () {
            var $this = $(this);
            $('.open_editor_cont').addClass('hide');
            $('.click_open_cont').removeClass('hide');
            $this.html('取 消');
        }, function () {
            var $this = $(this);
            $('.open_editor_cont').removeClass('hide');
            $('.click_open_cont').addClass('hide');
            $this.html('<i></i>编 辑');
        });

        // textarea自适应高度
        $.fn.autoHeight = function () {
            function autoHeight(elem) {
                elem.style.height = 'auto';
                elem.scrollTop = 0; //防抖动
                elem.style.height = elem.scrollHeight + 'px';
            }

            this.each(function () {
                autoHeight(this);
                $(this).on('keyup', function () {
                    autoHeight(this);
                });
            });
        };
        $('textarea[autoHeight]').autoHeight();

        /* 回显课程信息 发ajax请求-------------------*/
        var desEdit, courseId = $("#modifyCourseForm").attr("courseId");
        var gradeId;
        $.ajax({
            type: "post",
            url: "/course/courseInfoByCourseId.do",
            dataType: "json",
            data: {courseId: courseId},
            success: function (data) {
                //课程内容
                var courseInfo = data.data.courseInfo;
                if ('' != courseInfo.advertiseResId) {
                    $("#modifyImg").attr("src", "/file/loadImage/" + courseInfo.advertiseResId + "/350/220.r");
                } else {
                    $("#modifyImg").attr("src", "/front/sanhai/images/defaultCourse.jpg");
                }
                gradeId = courseInfo.gradeId;
                $(".edit_cont_warpper .formR").eq(1).text(courseInfo.courseTitle);
                $(".edit_cont_warpper .formR").eq(2).text(['小学', '小升初', '初中', '中考', '高中', '高考'][courseInfo.courseType - 1]);
                $(".edit_cont_warpper .formR").eq(3).text(courseInfo.address);
                $(".edit_cont_warpper .formR").eq(4).text(courseInfo.grade);
                $(".edit_cont_warpper .formR").eq(5).text(courseInfo.subject);
                $(".edit_cont_warpper .formR").eq(6).text(courseInfo.teaVersion);
                $(".edit_cont_warpper .formR").eq(7).text(courseInfo.duration + "小时");
                //$(".edit_cont_warpper .formR").eq(8).text(0 != courseInfo.lecturerId ? courseInfo.teacherEntity.name : "");
                //$(".edit_cont_warpper .formR").eq(9).text(0 != courseInfo.salary ? money.fmoney(Number(courseInfo.salary) / 100, 2) : "");
                $(".edit_cont_warpper .formR").eq(8).text(money.fmoney(Number(courseInfo.price) / 100, 2));
                $(".edit_cont_warpper .formR").eq(9).text(courseInfo.applicableCommunity);
                $(".edit_cont_warpper .formR").eq(10).html(courseInfo.outline);
                $(".edit_cont_warpper .formR .outline_edit").html(courseInfo.des);

                //课程编辑
                $("#courseTitle").val(courseInfo.courseTitle);
                loa.loadCourseTypeAndMatch($("#courseType"), courseInfo.courseType);
                area.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), courseInfo.addressCode, courseInfo.address);
                loa.loadGrandAndMatch($("#grade"), courseInfo.gradeId, courseInfo.grade);
                loa.loadSubjectAndMatch($("#subject"), courseInfo.subjectId, courseInfo.subject);
                loa.loadVersionAndMatch($("#version"), courseInfo.teaVersionId, courseInfo.teaVersion);

                if ('' != courseInfo.advertiseResId) {
                    $("#courseImg").attr("src", "/file/loadImage/" + courseInfo.advertiseResId + "/350/220.r");
                    $("#advertiseResId").val(courseInfo.advertiseResId);
                } else {
                    $("#courseImg").attr("src", "/front/sanhai/images/fileupload.jpg");
                }

                $("#modifyCourseForm").find("input[name='duration']").val(courseInfo.duration);

                if (0 == courseInfo.lecturerId) {
                    $("#modifyCourseForm").find("input[name='lecturerId']").val("0");
                    $("#modifyCourseForm").find("input[name='teacher']").val("");
                }

                if (0 != courseInfo.lecturerId) {
                    $("#modifyCourseForm").find("input[name='lecturerId']").val(courseInfo.lecturerId);
                    //$("#modifyCourseForm").find("input[name='teacher']").val(courseInfo.teacherEntity.name);
                }

                if (0 == courseInfo.salary) $("#modifyCourseForm").find("input[name='salary']").val("");
                if (0 != courseInfo.salary) $("#modifyCourseForm").find("input[name='salary']").val(money.moneyNoComma(Number(courseInfo.salary) / 100, 2));

                // 2016-03-21 处理5000金额格式化后变为5000.00问题
                var _price = money.moneyNoComma(Number(courseInfo.price) / 100, 2);
                $("#modifyCourseForm").find("input[name='price']").val((_price.indexOf(".00") > 0) ? _price.slice(0, _price.indexOf(".00")) : _price);

                $("#ac").val(courseInfo.applicableCommunity);
                $("#outline").val(common.textAreaEscape(courseInfo.outline));

                // 富文本
                desEdit = UM.getEditor("testpaperInfo");
                desEdit.ready(function () {
                    desEdit.setContent(courseInfo.des);
                });
            },
            error: function (data) {
            }
        });

        /* ------------------------------------------------[课程内容 暂时注释]------------------------------------------------ */
        /* if ('' != advertiseResId) {
         $("#modifyImg").attr("src", "/file/loadImage/" + advertiseResId + "/350/220.r");
         } else {
         $("#modifyImg").attr("src", "/front/sanhai/images/defaultCourse.jpg");
         }

         if (1 == courseType) $(".edit_cont_warpper .formR").eq(2).text('小学');
         if (2 == courseType) $(".edit_cont_warpper .formR").eq(2).text('小升初');
         if (3 == courseType) $(".edit_cont_warpper .formR").eq(2).text('初中');
         if (4 == courseType) $(".edit_cont_warpper .formR").eq(2).text('中考');
         if (5 == courseType) $(".edit_cont_warpper .formR").eq(2).text('高中');
         if (6 == courseType) $(".edit_cont_warpper .formR").eq(2).text('高考');

         $(".edit_cont_warpper .formR").eq(3).text(address);

         $(".edit_cont_warpper .formR").eq(4).text(grade);

         $(".edit_cont_warpper .formR").eq(5).text(subject);
         //$(".edit_cont_warpper .formR").eq(6).text('${course.teaVersion}');
         $(".edit_cont_warpper .formR").eq(6).text(duration + "小时");

         if (0 == 'lecturerId') $(".edit_cont_warpper .formR").eq(7).text("");
         if (0 != 'lecturerId') $(".edit_cont_warpper .formR").eq(7).text(teacherEntity);

         if (0 == 'salary') $(".edit_cont_warpper .formR").eq(8).text("");
         if (0 != 'salary') $(".edit_cont_warpper .formR").eq(8).text(money.fmoney(Number(salary) / 100, 2));

         $(".edit_cont_warpper .formR").eq(9).text(money.fmoney(Number(price) / 100, 2));*/
        /* ------------------------------------------------[课程内容]------------------------------------------------ */

        /* ------------------------------------------------[课程编辑 暂时注释]------------------------------------------------ */
        //loa.fileUpload($("#fileupload"));

        /* // 富文本
         var desEdit = UM.getEditor("testpaperInfo");
         desEdit.ready(function () {
         desEdit.setContent(des);
         });

         loa.loadCourseTypeAndMatch($("#courseType"), courseType);

         area.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), addressCode, address);
         loa.loadGrandAndMatch($("#grade"), gradeId, grade);
         loa.loadSubjectAndMatch($("#subject"), subjectId, subject);
         //loadVersionAndMatch($("#version"), '${course.teaVersionId}', '${course.teaVersion}');

         if ('' != advertiseResId) {
         $("#courseImg").attr("src", "/file/loadImage/" + advertiseResId + "/350/220.r");
         } else {
         $("#courseImg").attr("src", "/front/sanhai/images/fileupload.jpg");
         }

         $("#modifyCourseForm").find("input[name='duration']").val(duration);

         if (0 == lecturerId) {
         $("#modifyCourseForm").find("input[name='lecturerId']").val("0");
         $("#modifyCourseForm").find("input[name='teacher']").val("");
         }

         if (0 != lecturerId) {
         $("#modifyCourseForm").find("input[name='lecturerId']").val(lecturerId);
         $("#modifyCourseForm").find("input[name='teacher']").val(teacherEntity);
         }

         if (0 == salary) $("#modifyCourseForm").find("input[name='salary']").val("");
         if (0 != salary) $("#modifyCourseForm").find("input[name='salary']").val(money.moneyNoComma(Number(salary) / 100, 2));

         // 2016-03-21 处理5000金额格式化后变为5000.00问题
         var _price = money.moneyNoComma(Number(price) / 100, 2);
         $("#modifyCourseForm").find("input[name='price']").val((_price.indexOf(".00") > 0) ? _price.slice(0, _price.indexOf(".00")) : _price);*/
        /* ------------------------------------------------[课程编辑 ]------------------------------------------------ */

        /* ------------------------------------------------[匹配教师]------------------------------------------------ */
        dialogs._initBaseDialog(null);

        $("#teacher").on("click", function () {
            $("#org").attr("class", "blue");
            $("#platform").attr("class", "gray");

            /**
             * 2016-05-19 蒋淼修改
             * 1、将 $("#searchTeaBtn").on("click", function ())搜索事件的绑定移动到里面
             * 2、将 $("#org").on("click", function ()) 切换机构事件的绑定移动到里面
             * 3、将 $("#platform").on("click", function ()) 切换平台事件的绑定移动奥里面
             */

                // 绑定搜索事件，搜索教师
            $("#searchTeaBtn").on("click", function () {
                var org = $("#org").attr("class");
                var platform = $("#platform").attr("class");

                if ("blue" == org) var scope = "org";
                if ("blue" == platform) var scope = "platform";

                loa.loadSearchTeacher($("#name").val(), scope, 1);
            });

            // 加载教师信息
            loa.matchTeacher(null, $('#grade'), $('#subject'), $('#version'));

            // 绑定的切换本校和平台事件
            $("#org").on("click", function () {
                $("#org").attr("class", "blue");
                $("#platform").attr("class", "gray");
                loa.matchTeacher($(this), $('#grade'), $('#subject'), $('#version'));
            });
            $("#platform").on("click", function () {
                $("#platform").attr("class", "blue");
                $("#org").attr("class", "gray");
                loa.matchTeacher($(this), $('#grade'), $('#subject'), $('#version'))
            });
        });

        $("#cleanTeacher").on("click", function () {
            loa.cleanTeacher();
        });
        /* ------------------------------------------------[匹配教师]------------------------------------------------ */

        /* ------------------------------------------------[按钮事件]------------------------------------------------ */
        $("button[name='modify']").on("click", function () {
            // 富文本内容是否过多
            if (desEdit.getContent().length > 60000) {
                dialogs._timer("课程介绍内容过多，请缩减填写内容", 2, 2, null);
                return false;
            } else {
                mod.submitModifyCourse(courseId, $(this), 0);
            }
        });

        $("button[name='saveAs']").on("click", function () {
            // 富文本内容是否过多
            if (desEdit.getContent().length > 60000) {
                dialogs._timer("课程介绍内容过多，请缩减填写内容", 2, 2, null);
                return false;
            } else {
                mod.submitModifyCourse(courseId, $(this), 0);
            }
        });

        $("button[name='modifyRelease']").on("click", function () {
            // 富文本内容是否过多
            if (desEdit.getContent().length > 60000) {
                dialogs._timer("课程介绍内容过多，请缩减填写内容", 2, 2, null);
                return false;
            } else {
                mod.submitModifyCourse(courseId, $(this), 0);
            }
        });
        /* ------------------------------------------------[按钮事件]------------------------------------------------ */
        /*
         *学校编辑课程
         * 点击click_open_edit1 触发的事件 通过课程分类筛选对应的年级
         * gradeId 设置选中的值
         */
        $('.click_open_edit1 ').click(function () {
            function filterGrade() {
                function filterGradeDefault() {
                    $('#grade').empty();
                    var arr = [
                        '<option value="1001">一年级</option><option value="1002">二年级</option><option value="1003">三年级</option><option value="1004">四年级</option><option value="1005">五年级</option><option value="1006">六年级</option>',
                        '<option value="1007">预初</option><option value="1008">初一</option><option value="1009">初二</option><option value="1010">初三</option>',
                        '<option value="1011">高一</option><option value="1012">高二</option><option value="1013">高三</option>'
                    ];
                    var unm = $('#courseType option:selected').val();
                    if (unm === '1' || unm === '2') {
                        $('#grade').append(arr[0]);
                    } else if (unm === '3' || unm === '4') {
                        $('#grade').append(arr[1]);
                    } else if (unm === '5' || unm === '6') {
                        $('#grade').append(arr[2]);
                    }
                    if (gradeId) $("#grade").val(gradeId);
                    var text = $('#grade option:selected').text()
                    $('#grade').prev().text(text);
                }

                filterGradeDefault();

                $('#courseType').change(function () {
                    filterGradeDefault();
                });
            }

            filterGrade();
        });
    });