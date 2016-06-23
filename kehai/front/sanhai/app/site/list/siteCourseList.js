/**
 * Created by bbb on 2015/12/10.
 */
define('siteCourseList', ['jquery', 'common', 'money', 'pageBar','dialogs','base','jquery_ui_min'], function ($, common, money, pageBar,dialogs) {

    /**
     * 选课界面
     * 加载对应选项课程并渲染分页
     * @param url
     *
     */
    var loadSelectCourse=function (currentPage) {
        $("#pageBar").html('');
        var courseTitle=encodeURI(encodeURI($("#courseTitle").val()));
        var url = "/site/course/" + $("#courseType").val() + "/" + $("#gradeId").val() + "/" + $("#subjectId").val() + "/" + $("#versionId").val() + "/" + $("#courseMode").val() + "/" + currentPage + "/"+courseTitle+"/"+$("#sortType").val()+"/selectCourse.do"
        var lode='<div class="load_wrap tc pr">'+
            '<img class="pa" src="/front/sanhai/images/loading.gif" alt=""/>'+
            '</div>';
        $("#contentDiv").html(lode);
        $.post(url, function (response, status, xhr) {

            //console.log("--------------------------------------------------");
            //console.log("课程类型（courseType）   -> " + response.data.courseType);
            //console.log("年级编号（gradeId）      -> " + response.data.gradeId);
            //console.log("科目编号（subjectId）    -> " + response.data.subjectId);
            //console.log("教材版本（versionId）    -> " + response.data.versionId);
            //console.log("授课模式（courseMdoe）   -> " + response.data.courseMode);
            //console.log("当前页面（currentPage）  -> " + response.data.currentPage);
            //console.log("--------------------------------------------------");

            // 隐藏导航条
            //$("ul[class='main_l_nav']").hide();

            // 是否有课程
                
            if (null == response.data.list ) {

                $("#contentDiv").html("没有对应课程信息");
            } else {
                $("#contentDiv").empty();

                // 默认图片
                var fileImg = "";
                // 遍历所有记录
                $.each(response.data.list, function (index, value) {

                    if ("" != value.advertiseResId && null != value.advertiseResId && "0" != value.advertiseResId&& undefined != value.advertiseResId){
                        fileImg = "/file/loadImage/" + value.advertiseResId+ "/180/100.r";
                    }else{
                        fileImg = "/front/sanhai/images/course.png";
                    }

                    var courseMode = value.courseMode;
                    var courseId = value.courseId;
                    var auditFlag = 0;
                    var remark = "加入购物车";
                    var price = money.fmoney(Number(value.price)/100,2);
                    var des=value.applicableCommunity.length>15?value.applicableCommunity.substr(0,16)+"...":value.applicableCommunity;
                    var goodrate="";
                    if(value.evalCount==0||value.evalCount==undefined){
                        goodrate="100";
                    }else
                    {
                        goodrate=(value.goodEvaluateTotal/value.evalCount).toFixed(2)*1000/10;
                    }

                    var content=" <div class='main_l_nav_cont_row clearfix'>"+
                        "<dl class='fl'>"+
                        "<dt class='fl'><a href='/site/course/" + value.courseId + "/courseContent.htm' target='_blank'><img src='"+fileImg+"'></a></dt>"+
                        "<dd class='fl'>"+
                        "<div class='class_detail fl'>"+
                        /*"<h3><a href='/site/course/" + value.courseId + "/courseContent.htm' target='_blank'> " + value.courseTitle + "</a>/!*<em>"+(value.courseMode==0?'一对一':'班课')+"</em>*!/</h3>"+*/
                        "<h3><a href='/site/course/" + value.courseId + "/courseContent.htm' target='_blank'> " + value.courseTitle + "</a></h3>"+
                        "<p class='class_money clearfix'><span class='fl'>" + value.grade + value.subject + "</span><strong>" + price + "</strong></p>"+
                        "<p class='class_money clearfix'><span class='fl'>学校：<a href='/site/shool/" + ((value.orgEntity)?value.orgEntity.orgId:"") + "/findCourseByorgId.htm'>" +((value.orgEntity) ? value.orgEntity.orgName :"")+"</a></span><em>共" + value.duration + "课时</em></p>"+
                        "<p class='ellipsis' title='"+value.applicableCommunity+"'>招生对象：" + des + "</p>"+
                        "</div>"+
                        "</dd>"+
                        "</dl>"+
                        "<div class='class_evaluate fl'>"+
                        "<span class='persent'>"+goodrate+"%</span>"+
                        "<em class='myd'>满意度</em>"+
                        "<strong><span>" + value.buyCount + "人</span>已购买 </strong>"+
                        "<strong><span>"+((value.evalCount)&&(value.evalCount!=0) ? value.evalCount+"条" : "暂无" )+"</span>评价</strong>"+
                        "</div>"+
                        "<div class='fl the_last_div'>"+
                        "<button type='btn' class='to_ask to_consult' onclick=\"window.open('/consult/chat.htm?type=course&typeId="+courseId+"','','height=730,width=900');\">去咨询</button>" +
                        "<input type='hidden' value='" + value.courseMode + "'/>" +
                        "<input type='hidden' value='" + value.courseId + "'/>" +
                            /*"<a class='btn to_ask pushBtnJs'>加入购物车</a>"+*/
                        "<a class='btn to_ask' onclick='addShoppingCart($(this))'>加入购物车</a>"+
                        "</div>"+
                        "</div>";

                    // 渲染
                    $("#contentDiv").append(content);
                });
                //显示分页工具条

                pageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                    loadSelectCourse(currPage);
                });
            }

            $('.popBox').dialog({
                autoOpen: false,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).dialog("close")
                }
            });
            $('.to_consult').click(function (){
                var courseId = $(this).parent('div').children('input').eq(1).val();
                $.courseChat(courseId);
            });
            $('.pushBtnJs').click(function () {
                var courseMode = $(this).parent('div').children('input').eq(0).val()
                var courseId = $(this).parent('div').children('input').eq(1).val()
                $("#pushNotice").dialog("open");

                $('#courseMode').val(courseMode);
                $('#courseId').val(courseId);
                return false;
            });

            $('.cancelBtn').click(function () {
                $(".pushNotice").dialog("close");
            })

        });

    };

    continueCourse= function () { //继续选课
        var courseMode = $('#courseMode').val();
        var courseId = $('#courseId').val();
        var auditFlag = 0;
        var remark = $('#notice_textarea').val();
        var count = parseInt($("#shoppingcount").text()) + 1;
        $("#shoppingcount").text(count);
        $.ajax({
            url: "/orderDeal/add.do",
            type: "post",
            dataType: "json",
            data: {
                courseMode: courseMode,
                courseId: courseId,
                auditFlag: auditFlag,
                remark: ""
            },
            success: function (response) {

                //console.log(response.resCode);

                if ("000" == response.resCode) {
                    $('#notice_textarea').val("");
                    $(".pushNotice").dialog("close");

                }
                if ("200" == response.resCode) {
                    window.location.href = "/login.htm";
                    $('#notice_textarea').val("");
                    $(".pushNotice").dialog("close");
                }
                // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                if("300" == response.resCode){
                     //dialog.defaultDialog("warning",response.resMsg,null); 改用 dialogs里面的_timer();
                    dialogs._timer(response.resMsg,2,2,null);
                }
            }
        });

    };

    addShoppingCart=function (obj) {
        var courseMode = obj.parent('div').children('input').eq(0).val();
        var courseId = obj.parent('div').children('input').eq(1).val();
        var auditFlag = 0;
        $.ajax({
            url: "/site/shopping/add.do",
            type: "post",
            dataType: "json",
            data: {
                courseMode: courseMode,
                courseId: courseId,
                auditFlag: auditFlag,
                remark: ""
            },
            success: function (response) {
                if ("000" == response.resCode) {

                    var count = parseInt($("#shoppingcount").text()) + 1;
                    $("#shoppingcount").text(count);
                    dialogs._shoppingcar(function(){
                    },function(){
                        window.location.href = "/shopping/shoppingCoureses.htm";
                    })

                }
                if ("200" == response.resCode) {
                    window.location.href = "/login.htm";
                    $('#notice_textarea').val("");
                    $(".pushNotice").dialog("close");
                }
                // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                if("300" == response.resCode){
                    dialogs._timer(response.resMsg,2,2,null);
                }
            }
        });
    };

    payCourse=function () {//去购物车结算
        var courseMode = $('#courseMode').val();
        var courseId = $('#courseId').val();
        var auditFlag = 0;
        var remark = $('#notice_textarea').val();
        var count = $("#shoppingcount").text();
        $("#shoppingcount").text(count++);
        $.ajax({
            url: "/orderDeal/add.do",
            type: "post",
            dataType: "json",
            data: {
                courseMode: courseMode,
                courseId: courseId,
                auditFlag: auditFlag,
                remark: ""
            },
            success: function (response) {
                if ("000" == response.resCode) {

                    window.location.href = "/shopping/shoppingCoureses.htm";
                    $('#notice_textarea').val("");
                    $(".pushNotice").dialog("close");

                }
                if ("200" == response.resCode) {
                    window.location.href = "/login.htm";
                    $('#notice_textarea').val("");
                    $(".pushNotice").dialog("close");
                }
                // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                if("300" == response.resCode){
                    //dialog.defaultDialog("warning",response.resMsg,null); 改用 dialogs里面的_timer();
                    dialogs._timer(response.resMsg,2,2,null);
                }
            }
        });

    };

    return {
        loadSelectCourse: loadSelectCourse
    }

});
