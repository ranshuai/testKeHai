/**
 * Created by boys on 2015/8/12.
 */

//老师的申请记录管理
define(['common', 'pageBar', 'dialogs'], function (common, pagebar, dialogs) {
    /**
     * 老师的调课记录填充方法
     * @param data
     */
    function teaRecordAppend(data) {
        if (!common.checkResponse(data)) return;
        $("table tbody").html("");
        var rows = data.data.list;
        var userFlag = data.data.userFlag;
        if (rows.length > 0) {
            $("table tbody").append("<tr><th>编号</th><th>申请人</th><th>课程名称</th><th>节次</th><th>调课理由</th><th>目标时间</th><th>操作</th></tr>");
            $("#count").replaceWith("<h5 id=\"count\">共有" + data.data.countSize + "条记录</h5>");
        } else {
            $("#count").replaceWith("<h5 id=\"count\">共有" + 0 + "条记录</h5>");
            return;
        }
        for (var i = 0; i < rows.length; i++) {
            $("table tbody").append("<tr></tr>");
            $("table tbody tr:last-child").append("<td>" + rows[i].id + "</td>");
            $("table tbody tr:last-child").append("<td>" + rows[i].name + "</td>");
            $("table tbody tr:last-child").append("<td>" + rows[i].coursesName + "</td>");
            $("table tbody tr:last-child").append("<td>第" + rows[i].recordIndex + "节</td>");
            $("table tbody tr:last-child").append("<td class=\"tc\"><span class='dib tl'>" + rows[i].reasonRetire + "</span></td>");
            var stat = rows[i].changeCourseFlag;
            var time = rows[i].targetTime == 0 ? rows[i].bookCoursesTime : rows[i].targetTime;
            var fromTime = new Date(parseFloat(time)).format("MM-dd hh:mm:ss");
            var toTime = new Date(parseFloat(time) + parseInt(rows[i].coursesTimes) * 60 * 1000).format("hh:mm:ss");
            $("table tbody tr:last-child").append("<td  class=\"orange\" style='font-size: 12px'>" + fromTime + "<br/>&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;" + toTime + "</td>");
            $("table tbody tr:last-child").append("<td>" + common.df.showOrgOper(userFlag + rows[i].changeCourseFlag) +
                "<input type='hidden' id=\"id\" value='" + rows[i].coursesRecordId + "'/>" +
                "<input type=\"hidden\" id=\"index\" value='" + rows[i].recordIndex + "' />" +
                "<input type=\"hidden\" id=\"targetTime\" value='" + rows[i].targetTime + "' /></td>");
            if (stat == "32" || stat == "22") {
                $("a.bk:last").wrap("<div class=\"pr reject_reason_main\"><a class=\"reason blue\">驳回理由</a><div class=\"reject_reason pa hide\"><i class=\"pa\"></i>" +
                    "<h5>理由：</h5>" +
                    "<p>" + rows[i].disagreeReason + "</p>" + "</div></div>");
            }

        }
    }

    /**
     * 老师调课记录分页操作的方法
     * @param url
     * @param data
     * @param currPage
     */
    function ajaxTeaRecords4Page(url, data, currPage) {
        var a = data;
        data += "&currPage=" + currPage;
        $.ajax({
            url: url,
            data: data,
            type: "post",
            dataType: "json",
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    teaRecordAppend(resp);
                    var params = new Array();
                    params.push(url);
                    params.push(a);
                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajaxTeaRecords4Page, params);
                }

            }
            ,
            error: function (resp) {
            }
        })
    }

    /**
     * 老师退课记录填充页
     * @param result
     */
    function teaRetireCoursesRecords(result) {
        $("table tbody").html("");
        var val = result.data.list;
        if (val.length > 0) {
            $("table colgroup").remove();
            $("table tbody").before("<colgroup>" +
                "<col width=\"220px\"/>" +
                "<col width=\"140px\"/>" +
                "<col width=\"280px\"/>" +
                "<col width=\"130px\"/>" +
                "<col width=\"100px\"/>" +
                "<col width=\"100px\"/>" +
                "</colgroup>");
            $("table tbody").append("<tr><th>编号</th><th>申请人</th><th>课程名称</th><th>退课理由</th><th>所退金额</th><th>状态</th></tr>");
            $("#count").replaceWith("<h5 id=\"count\">共有" + result.data.countSize + "条记录</h5>");
        } else {
            $("#count").replaceWith("<h5 id=\"count\">共有" + 0 + "条记录</h5>");
            return;
        }
        for (var i = 0; i < val.length; i++) {
            $("table tbody").append("<tr></tr>");
            $("table tbody tr:last-child").append("<td>" + val[i].coursesId + "</td>");
            $("table tbody tr:last-child").append("<td>" + val[i].name + "</td>");
            $("table tbody tr:last-child").append("<td>" + val[i].courseTitle + "</td>");
            $("table tbody tr:last-child").append("<td class='tl'>" + val[i].reasonsRetreat + "</td>");
            var stat = val[i].isRetireCourses;
            if (stat == "3") {
                $("table tbody tr:last-child td").append("<input type='hidden' value='" + val[i].dismissedRetreat + "'/>");
            }

            $("table tbody tr:last-child").append("<td  class=\"orange\"> ￥<span id='price'>" + val[i].backMoney / 100 + "</span></td>");
            $("table tbody tr:last-child").append("<td>" + common.df.show_RetireCourses_OrgOper(stat) + "</td>");
        }
    }


    /**
     * 老师退课分页
     * @param url
     * @param data
     * @param currPage
     */
    function ajaxRetireCoureses4Page(url, data, currPage) {
        var a = data;
        data += "&currentPage=" + currPage;
        $.ajax({
            url: url,
            data: data,
            type: "post",
            dataType: "json",
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    teaRetireCoursesRecords(resp);
                    var params = new Array();
                    params.push(url);
                    params.push(a);
                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajaxRetireCoureses4Page, params);
                }
            },
            error: function (resp) {
            }
        })
    }

    /**
     * 初始化老师调课记录
     */
    function initTeaChangeRecords() {
        /*切换标示*/
        $(function () {

            //调课记录
            var url = "/changeTea/home.do";
            var data = "operType=2";
            ajaxTeaRecords4Page(url, data, 1);
            //////
            var signs = "0";
            /*驳回理由滑鼠*/
            $('.reject_reason_main').live('mouseenter', function () {
                $(this).children('.reject_reason').removeClass('hide');
            });
            $('.reject_reason_main').live('mouseleave', function () {
                $(this).children('.reject_reason').addClass("hide");
            });
            ///////理由框结束
            /*tab切换*/
            $('.tab .tabList li').click(function () {
                var index = $(this).index();
                $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
                $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
                if (index == 0) {
                    signs = "0";
                    $("#search").trigger("click");
                } else {
                    signs = "1";
                    var url = "/retireCourses/findRetireCouresesByPrm.do";
                    var data = "retireStatus=" + common.df.showoperType1($("select").val()) + "&name=" + $("input").val() + "&";
                    ajaxRetireCoureses4Page(url, data, 1);
                }
            });

            //处理客户的点击事件
            $("td a").live("click", function () {
                //调课驳回事处理
                var id = $(this).parent("td").find("#id").val();
                var val = $(this).attr("href").substr(1);
                if (val == 22) {
                    dialogs._form_reject(function () {
                        dealTkCourse(val, id);
                    }, null);
                    //openDialog(13);
                    //$("[name='oper']").val(val);
                    //$("[name='id']").val(id);
                    //return;
                }
                //调课同意时间
                if (val == 21) {
                    dialogs._agree_change(function () {
                        dealTkCourse(val, id);
                    }, null);
                    var targetTime = $(this).siblings("input#targetTime").val();
                    $("input.index").val("第" + $(this).siblings("input#index").val() + "课时");
                    $("input.target").val(new Date(parseFloat(targetTime)).format("yyyy-MM-dd hh:mm:ss"));
                }
            });
            //清除选项
            /* $('.cancelBtn').live("click", function() {
             $(".pushNotice").dialog("close");
             });*/

            /////////
            $("#search").bind("click", function () {
                if (signs == "0") {
                    var url = "/changeTea/home.do";
                    var data = "operType=" + $("select").val();
                    var val = $.trim($("input").val());
                    if (common.isNumber(val)) {
                        data += "&orderId=" + $("input").val() + "&";
                    }
                    else {
                        data += "&name=" + $("input").val() + "&";
                    }
                    ajaxTeaRecords4Page(url, data, 1);
                } else {
                    var url = "/retireCourses/findRetireCouresesByPrm.do";
                    var data = "retireStatus=" + common.df.showoperType1($("select").val()) + "&name=" + $("input").val() + "&";
                    ajaxRetireCoureses4Page(url, data, 1);
                }
            });

            function dealTkCourse(oper, id) {
                var targetTime = $("input.target").val();
                $.post("/changeTea/dealCourse.do", {
                    operType: oper,
                    coursesRecordId: id,
                    toTime: targetTime,
                    detail: $("#notice_textarea").val()
                }, function (resp) {
                    if (resp.resCode == "000") {
                        dialogs._timer("操作成功", 1, 2, function () {
                            location.reload();
                        });
                    } else if (resp.resCode == "1003") {
                        dialogs._timer(resp.resMsg, 2, 2, null);
                    } else {
                        dialogs._timer("操作失败", 2, 2, null);
                    }
                });
            };
        })
    }

    /**
     * Created by Administrator on 2015/12/15.
     */



    return {
        initTeaChangeRecords : initTeaChangeRecords

    }

})