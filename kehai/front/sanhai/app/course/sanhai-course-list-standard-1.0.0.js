/**
 * Created by 蒋淼 on 2015/8/8.
 * 依赖 sanhai-course-standard-1.0.0.js 初始化 loadSubject4Search 下拉选项框
 * 依赖 sanhai-base-pagebar-standard-1.0.0.js setBasePageBar 分页条
 */
define(["jquery", "loadVersionAndMatch", "pageBar", "dialogs", "money"], function ($, loadVersionAndMatch, pageBar, dialogs, money) {

    /**
     * 全部课程使用选择科目进行查询
     * @param targetDiv
     * @param subjectId
     * @注意
     * @1 这个方法 比 loadSubjectAndMatch 多了一个 全部 选项
     * @2 全部课程搜索使用
     */
    function loadSubject4Search(targetDiv, subjectId) {

        var subejctObj = jQuery.parseJSON(loadVersionAndMatch.subjectJson);

        targetDiv.empty();
        targetDiv.append("<option value='0'>全部</option>");

        $.each(subejctObj.subjects, function (index, value) {
            var key = value.secondCode;
            var val = value.secondCodeValue;

            var opt = "<option value='" + key + "'>" + val + "</option>";
            targetDiv.append(opt);
        });

        // 匹配选内容 0 = 全部
        if (null != subjectId && "" != subjectId) {
            targetDiv.parent().find("em").html($("#subject option[value='" + subjectId + "']").text());
            targetDiv.find("option[value='" + subjectId + "']").attr("selected", true);

        } else if (0 == subjectId || "0" == subjectId) {
            targetDiv.parent().find("em").html($("#subject option[value='" + subjectId + "']").text());
            targetDiv.find("option[value='" + subjectId + "']").attr("selected", true);
        }

        targetDiv.change(function () {
            $(this).parent().find("em").html($(this).find("option:selected").text());
        });
    }

    /**
     * 加载课程
     * @param type          whole = 加载全部课程；one2one = 加载一对一课程
     * @param currentPage   当前页
     * @注意
     * @1 对应分页JS setCourseListPageBar
     * @2 scope = teacher 标示教师平台不显示上下架操作
     */
    function loadCourseList(scope, type, currentPage) {

        $.ajax({
            url: "/course/" + type + "/" + currentPage + "/findCourseList.do",
            type: "post",
            dataType: "json",
            success: function (response) {
                if ("" != response.data.courses.data && null != response.data.courses.data) {

                    //
                    $('.tabCont').removeClass('hide');
                    $("#courseEmpty").hide();

                    // 判断是否是第一次加载
                    if ($("tbody tr").length > 1) $("tbody tr").slice(1).remove();

                    $("#totalRows").text("共[" + response.data.courses.totalRows + "]门课程");
                    $.each(response.data.courses.data, function (index, value) {

                        var courseId = value.courseId;
                        var price = money.fmoney(Number(value.price / 100), 2);

                        if ("" == value.advertiseResId || "0" == value.advertiseResId)
                            var imagePath = "/front/sanhai/images/course.png";
                        else
                            var imagePath = "/file/loadImage/" + value.advertiseResId + "/120/68.r";

                        var courseTitle = (value.courseTitle.length > 40) ? value.courseTitle.substring(0, 40) + "..." : value.courseTitle;
                        if (value.courseMode == 0) var courseMode = "一对一";
                        var teacher = (value.teacherEntity == null) ? "" : value.teacherEntity.name;

                        //var create = (value.userEntity == null) ? "" : value.userEntity.name;
                        var create = (value.userEntity.userIdentity == 3) ? value.userEntity.nickName : value.userEntity.name;

                        var title = "创建时间：" + value.createTimeStr;
                        var onlineTitle = "上架时间：" + value.onlineTimeStr;
                        var offlineTitle = "下架时间：" + value.offlineTimeStr;

                        if (value.listed == 0) {
                            var status = "<p id='statusChar' title='" + title + "' style='color:#CC0000'>未上架</p>";

                            if ("teacher" == scope) {
                                var opt = "<a class='blue'>编辑</a>&nbsp;<a class='blue'>删除</a>";
                            } else if ("org" == scope) {
                                var opt = "<a class='blue' name='online'>上架</a>&nbsp;<a class='blue'>编辑</a>&nbsp;<a class='blue'>删除</a>";
                            }
                        }
                        if (value.listed == 1) {
                            var status = "<p id='statusChar' title='" + title + "' style='color:#009966'>已上架</p>";

                            if ("teacher" == scope) {
                                var opt = "<a class='gray'>编辑</a>&nbsp;<a class='gray'>删除</a>";
                            } else if ("org" == scope) {
                                var opt = "<a class='blue' title='" + onlineTitle + "' name='offline'>下架</a>&nbsp;<a class='gray'>编辑</a>&nbsp;<a class='gray'>删除</a>";
                            }
                        }
                        if (value.listed == 2) {
                            var status = "<p id='statusChar' title='" + title + "'>已下架</p>";

                            if ("teacher" == scope) {
                                var opt = "<a class='blue'>编辑</a>&nbsp;<a class='blue'>删除</a>";
                            } else if ("org" == scope) {
                                var opt = "<a class='blue' title='" + offlineTitle + "' name='online'>上架</a>&nbsp;<a class='blue'>编辑</a>&nbsp;<a class='blue'>删除</a>";
                            }
                        }

                        var content = "<tr>" +
                                /*"<td>" + value.courseId + "</td>" +*/
                            "<td class=\"schcourse tl pr\">" + "<img src=" + imagePath + ">" + "<p>" + courseTitle + "</p>" + "<em>" + price + "</em>" + "</td>" +
                                /*"<td>" + courseMode + "</td>" +*/
                                /*"<td>" + teacher + "</td>" +*/
                            "<td>" + create + "</td>" +
                            "<td>" + status + "</td>" +
                            "<td>" + opt + "</td>" +
                            "</tr>";

                        //$("tbody tr:eq(0)").after(content);
                        $("tbody").append(content);

                        if ("teacher" == scope) {       // 教师2个操作
                            // 绑定事件（编辑）
                            $("tbody tr").eq(index + 1).find("td a").eq(0).on("click", function () {
                                if ("已上架" != $(this).parent("td").parent("tr").find("#statusChar").text()) {
                                    location.href = "/course/content/" + courseId + "/courseById.htm";
                                }
                            });

                            // 绑定事件（删除）
                            $("tbody tr").eq(index + 1).find("td a").eq(1).on("click", function () {
                                if ("已上架" != $(this).parent("td").parent("tr").find("#statusChar").text()) {
                                    dialogs._confirm("确定删除课程：" + courseTitle + "?", "提示信息", function () {
                                        removeCourse(courseId, scope, type, currentPage);
                                    }, null);
                                }
                            });
                        } else if ("org" == scope) {  // 机构3个操作 上架后不能编辑和删除
                            //绑定事件（状态变更）
                            $("tbody tr").eq(index + 1).find("td a").eq(0).on("click", function () {
                                courseStatus(courseId, $(this));
                            });

                            // 绑定事件（编辑）
                            $("tbody tr").eq(index + 1).find("td a").eq(1).on("click", function () {
                                if ("已上架" != $(this).parent("td").parent("tr").find("#statusChar").text()) {
                                    location.href = "/course/content/" + courseId + "/courseById.htm";
                                }
                            });

                            // 绑定事件（删除）
                            $("tbody tr").eq(index + 1).find("td a").eq(2).on("click", function () {
                                if ("已上架" != $(this).parent("td").parent("tr").find("#statusChar").text()) {
                                    dialogs._confirm("确定删除课程：" + courseTitle + "?", "提示信息", function () {
                                        removeCourse(courseId, scope, type, currentPage);
                                    }, null);
                                }
                            });
                        }

                    });

                    // 页码
                    var params = new Array();
                    params.push(scope);
                    params.push(type);
                    pageBar.setBasePageBar(response.data.courses.totalPages, response.data.courses.currPage, loadCourseList, params);

                    // 初始化科目
                    loadSubject4Search($("#subject"), 0);

                    // 清空条件输入框
                    $("#key").val("");
                } else {
                    $("#courseEmpty").show().html("<div class='msg'><i></i>&nbsp;&nbsp;您的口袋空空如也，快来<a href='/coursePath/createCourse.htm'>开课</a>吧！</div>");
                }
            },
            error: function () {
                dialogs._timer("请求失败稍后再试", 2, 2, null);
            }
        });
    }

    /**
     * 指定条件查询课程信息
     * @param scope         scope = teacher 教师无上下架；scope = org 机构有上下架
     * @param subjectId     科目ID
     * @param key           查询关键字
     * @param currentPage   当前页
     * @1 对应分页JS setCourseSearchPageBar
     * @2 scope = teacher 标示教师平台不显示上下架操作
     */
    function loadCourseSearch(scope, subjectId, key, currentPage) {
        $.ajax({
            url: "/course/" + subjectId + "/" + key + "/" + currentPage + "/searchCourseList.do",
            type: "post",
            dataType: "json",
            success: function (response) {
                if (response.data.courses.data != null) {

                    // 判断是否是第一次加载
                    if ($("tbody tr").length > 1) $("tbody tr").slice(1).remove();

                    // 清除原始分页
                    $("div[class='page ']").empty();

                    $("#totalRows").text("共[" + response.data.courses.totalRows + "]门课程");

                    $.each(response.data.courses.data, function (index, value) {

                        var courseId = value.courseId;
                        var courseTitle = (value.courseTitle.length > 40) ? value.courseTitle.substring(0, 40) + "..." : value.courseTitle;
                        var price = money.fmoney(Number(value.price / 100), 2);

                        //var resId = value.advertiseResId;
                        if ("" == value.advertiseResId || "0" == value.advertiseResId)
                            var resId = "/front/sanhai/images/course.png";
                        else
                            var resId = "/file/loadImage/" + value.advertiseResId + "/120/68.r";

                        if (value.courseMode == 0) var courseMode = "一对一";
                        var teacher = (value.teacherEntity == null) ? "" : value.teacherEntity.name;
                        //var create = (value.userEntity == null) ? "" : value.userEntity.name;
                        var create = (value.userEntity.userIdentity == 3) ? value.userEntity.nickName : value.userEntity.name;

                        var title = "创建时间：" + value.createTimeStr;
                        var onlineTime = "上架时间：" + value.onlineTimeStr;
                        var offlineTime = "下架时间：" + value.offlineTimeStr;

                        if (value.listed == 0) {
                            var status = "<p id='statusChar' title='" + title + "' style='color:#CC0000'>未上架</p>";

                            if ("teacher" == scope) {
                                var opt = "<a class='blue'>编辑</a>&nbsp;<a class='blue'>删除</a>";
                            } else if ("org" == scope) {
                                var opt = "<a class='blue' name='online'>上架</a>&nbsp;<a class='blue'>编辑</a>&nbsp;<a class='blue'>删除</a>";
                            }
                        }
                        if (value.listed == 1) {
                            var status = "<p id='statusChar' title='" + title + "' style='color:#009966'>已上架</p>";

                            if ("teacher" == scope) {
                                var opt = "<a class='gray'>编辑</a>&nbsp;<a class='gray'>删除</a>";
                            } else if ("org" == scope) {
                                var opt = "<a class='blue' name='offline' title='" + onlineTime + "' >下架</a>&nbsp;<a class='gray'>编辑</a>&nbsp;<a class='gray'>删除</a>";
                            }
                        }
                        if (value.listed == 2) {
                            var status = "<p id='statusChar' title='" + title + "'>已下架</p>";

                            if ("teacher" == scope) {
                                var opt = "<a class='blue'>编辑</a>&nbsp;<a class='blue'>删除</a>";
                            } else if ("org" == scope) {
                                var opt = "<a class='blue' name='online' title='" + offlineTime + "'>上架</a>&nbsp;<a class='blue'>编辑</a>&nbsp;<a class='blue'>删除</a>";
                            }
                        }

                        var content = "<tr style='font-size:14px'>" +
                                /*"<td>" + value.courseId + "</td>" +*/
                            "<td class=\"schcourse tl pr\">" + "<img src=\"" + resId + "\" alt=\"\" />" + "<p>" + courseTitle + "</p>" + "<em>" + price + "</em>" + "</td>" +
                                /*"<td>" + courseMode + "</td>" +*/
                                /*"<td>" + teacher + "</td>" +*/
                            "<td>" + create + "</td>" +
                            "<td>" + status + "</td>" +
                            "<td>" + opt + "</td>>" +
                            "</tr>";

                        $("tbody").append(content);

                        if ("teacher" == scope) {       // 教师2个操作
                            // 绑定事件（编辑）
                            $("tbody tr").eq(index + 1).find("td a").eq(0).on("click", function () {
                                if ("已上架" != $(this).parent("td").parent("tr").find("#statusChar").text()) {
                                    location.href = "/course/content/" + courseId + "/courseById.htm";
                                }
                            });

                            // 绑定事件（删除）
                            $("tbody tr").eq(index + 1).find("td a").eq(1).on("click", function () {
                                if ("已上架" != $(this).parent("td").parent("tr").find("#statusChar").text()) {
                                    dialogs._confirm("确定删除课程：" + courseTitle + "?", "提示信息", function () {
                                        removeCourse4Search(courseId, courseTitle, $(this), scope, subjectId, key, currentPage);
                                    }, null);
                                }
                            });
                        } else if ("org" == scope) {  // 机构3个操作 上架后不能编辑和删除
                            //绑定事件（状态变更）
                            $("tbody tr").eq(index + 1).find("td a").eq(0).on("click", function () {
                                courseStatus(courseId, $(this));
                            });

                            // 绑定事件（编辑）
                            $("tbody tr").eq(index + 1).find("td a").eq(1).on("click", function () {
                                if ("已上架" != $(this).parent("td").parent("tr").find("#statusChar").text()) {
                                    location.href = "/course/content/" + courseId + "/courseById.htm";
                                }
                            });

                            // 绑定事件（删除）
                            $("tbody tr").eq(index + 1).find("td a").eq(2).on("click", function () {
                                if ("已上架" != $(this).parent("td").parent("tr").find("#statusChar").text()) {
                                    dialogs._confirm("确定删除课程：" + courseTitle + "?", "提示信息", function () {
                                        removeCourse4Search(courseId, courseTitle, $(this), scope, subjectId, key, currentPage);
                                    }, null);
                                }
                            });
                        }

                        var params = new Array();
                        params.push(scope);
                        params.push(subjectId);
                        params.push(key);
                        pageBar.setBasePageBar(response.data.courses.totalPages, response.data.courses.currPage, loadCourseSearch, params);
                    });

                } else {

                }
            },
            error: function (response) {

            }
        });
    }

    /**
     * 修改指定课程的状态
     * @param courseId
     * @param target
     * @注意
     * @1 绑定事件到 上架 下架 元素
     * @2 上架 下架 元素必须提供 name="online" 或 name="offline" 属性
     */
    function courseStatus(courseId, target) {
        var opt = target.attr("name");

        $.post("/course/" + opt + "/" + courseId + "/courseStatus.do",
            function (response, status, xhr) {
                if ("000" == response.resCode) {

                    // 点击上架后 上架按钮变更无事件 下架按钮变更设置事件 编辑 删除 禁用 显示下架时间
                    if ("online" == opt) {
                        target.attr("name", "offline").attr("title", "上架时间：" + response.resMsg);
                        target.attr("name", "offline").html("下架");
                        target.parent("td").parent("tr").find("#statusChar").text("已上架");
                        target.parent("td").parent("tr").find("#statusChar").attr("style", "color:#009966");

                        target.parent("td").parent("tr").find("a").eq(1).attr("class", "gray");
                        target.parent("td").parent("tr").find("a").eq(2).attr("class", "gray");

                        dialogs._timer("课程上架成功", 1, 2, null);
                    }

                    // 点击下架后 下架按钮变更无事件 上架按钮变更设置事件 编辑删除启用 显示 上架时间
                    if ("offline" == opt) {
                        target.attr("name", "offline").attr("title", "下架时间：" + response.resMsg);
                        target.attr("name", "online").html("上架");
                        target.parent("td").parent("tr").find("#statusChar").text("已下架");
                        target.parent("td").parent("tr").find("#statusChar").attr("style", "");

                        target.parent("td").parent("tr").find("a").eq(1).attr("class", "blue");
                        target.parent("td").parent("tr").find("a").eq(2).attr("class", "blue");

                        dialogs._timer("课程下架成功", 1, 2, null);
                    }
                } else {
                    dialogs._timer(response.resMsg, 2, 2, null);
                }
            });
    }

    /**
     * 选择创建课程弹出对话框
     */
    function createDialog() {
        $('#add').dialog("open");

        $("#createConfirm").click(function () {
            location.href = "/course/createCourse.htm";
        });

        $("#createCancel").click(function () {
            $('.popBox').dialog("close");
        });
    }

    /**
     * 删除课程列表课程
     * @param courseId
     * @param scope
     * @param type
     * @param currentPage
     */
    function removeCourse(courseId, scope, type, currentPage) {
        $.ajax({
            url: "/course/" + courseId + "/deleteCourse.do",
            type: "post",
            dataType: "json",
            success: function (response) {
                // 删除成功
                if ("000" == response.resCode) {
                    loadCourseList(scope, type, currentPage);
                } else if ("503" == response.resCode) {
                    dialogs._timer("课程被购买不能删除", 2, 2, null);
                } else {
                    dialogs._timer(response.resMsg, 2, 2, null);
                }
            },
            error: function () {
                dialogs._timer("请求失败稍后再试", 2, 2, null);
            }
        });
    }

    /**
     * 删除搜索课程列表课程
     * @param courseId
     * @param courseTitle
     * @param target
     * @param scope
     * @param subjectId
     * @param key
     * @param currentPage
     * @注意
     * @1. 这个对话框只作用在搜素出课程点击删除弹出
     * @2. 这个对话框和 removeDialog 的区别在于 刷新内容是查询的内容
     * @3. 目前 全部课程 页面 分页卡 搜素框 不变，动态变下面显示的内容，所以不论什么类型（如，全部，一对一）都是这个搜索框
     * @4. 由于3的原因没type类型（表示是全部还是一对一）这里单独写了一个
     */
    function removeCourse4Search(courseId, courseTitle, target, scope, subjectId, key, currentPage) {
        $.post("/course/" + courseId + "/deleteCourse.do", function (response, status, xhr) {
            if ("000" == response.resCode) {
                loadCourseSearch(scope, subjectId, key, currentPage);
            } else if ("503" == response.resCode) {
                dialogs._timer("课程被购买不能删除", 2, 2, null);
            } else {
                dialogs._timer(response.resMsg, 2, 2, null);
            }
        });
    }

    return {
        loadSubject4Search: loadSubject4Search,
        loadCourseList: loadCourseList,
        loadCourseSearch: loadCourseSearch
    }
});

