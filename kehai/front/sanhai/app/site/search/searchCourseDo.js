/**
 * Created by bbb on 2015/12/15.
 */
define([
        'jquery',
        'showSelectNav',
        'loadHotCourse',
        'app/site/siteMainNav',
        'app/site/siteSearchBar',
        'app/site/siteTopBar',
        'pageBar',
        'money',
        'dialogs',
        'common',
        'base'
    ],

    function ($, showSelectNav, loadHotCourse, siteMainNav, siteSearchBar,siteTopBar,pageBar,money,dialogs) {

        function searchCourseDo() {

        }
        searchCourseDo.prototype.init = function () {
            /*只有学生身份显示购物车*/
            if(user.userIdentity==2){
                $('.shopping_car').removeClass('hide');
            }
            var oUl = $('#js-sidebar');
            var aLi = oUl.children();
            var aUl = $('.more_class_cont');
            var timer = null;
            aLi.mouseover(function () {
                var $this = $(this);
                aLi.removeClass('active');
                $this.addClass('active');
                aUl.addClass('hide');
                var index = $this.index();
                aUl.eq(index).removeClass('hide');
                aLi.css({
                    'cursor': 'pointer'
                });
            });
            aLi.mouseout(function () {
                aLi.removeClass('active');
                aUl.addClass('hide');
            });
            $('.subTitleBar_text1').placeholder({value: '请输入课程名称、关键词等...'})
            $('.select_type_List').rSetUpTab();


            //客服中心hover效果
            $('.serviceList').rNavhover();
            //切换身份hover效果
            $('.tabRole').rNavhover();
            /*******************左侧栏***********************/
            try {

                /*设置当前页面MainNav的选中状态*/
                var pageIdentity = $("#pageIdentity").val();
                $("#" + pageIdentity).addClass("ac");
                if (pageIdentity == "mainNavIndex") {
                    $("#mainNavBarMenu").removeClass("hide");
                } else {
                    $("#mainNavBarMenu").addClass("hide");
                    // $("#mainNavToggle").click(function(){
                    //     $("#mainNavBarMenu").toggle();
                    // });
                    $(".all_class_type ").hover(function () {
                        $("#mainNavBarMenu").removeClass('hide');
                    }, function () {
                        $("#mainNavBarMenu").addClass('hide');
                    });


                }
            } catch (error) {
                //console.log(error.toString());
            }

            if (courseListData.courseTitle) {
                $("#courseTitle").val(courseListData.courseTitle);
                $('.subTitleBar_text1').placeholder({value: ''})
                $('.subTitleBar_text1').val(courseListData.courseTitle);

            }
        };
        searchCourseDo.prototype._init = function () {
            var t = this;
            t.init();
            new siteTopBar().render();
            t.loadSelectCourse(1);
            loadHotCourse.loadHotCourse();
            new siteMainNav().render();
            new siteSearchBar().render();
        };
        searchCourseDo.prototype.render = function () {
            this._init();
        };

        /**
         * 选课界面
         * 加载对应选项课程并渲染分页
         * @param url
         *
         */
        searchCourseDo.prototype.loadSelectCourse=function (currentPage) {
            var t = this;
            var courseTitle=encodeURI(encodeURI($("#courseTitle").val()));
            var url = "/site/course/"+ currentPage + "/"+courseTitle+"/selectCourse.do";
             $("#contentDiv").html("<span style='padding-left:26px'>加载中...</span>");
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
                if (null == response.data.list || 0 == response.data.list) {
                    $("#contentDiv").html("<span style='margin-top:20px; display:inline-block'>没有对应课程信息</span>");
                    $("#courseCount").text('0');
                } else {
                    $("#courseCount").text(response.data.countSize);
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
                        var goodrate=""
                        if(value.evalCount==0||value.evalCount==undefined){
                            goodrate="100";
                        }else
                        {
                            goodrate=(value.goodEvaluateTotal/value.evalCount).toFixed(2)*1000/10;
                        }

                        var content=" <div class='main_l_nav_cont_row clearfix'>"+
                            "<dl class='fl m"+index+"'>"+
                            "<dt class='fl'><a href='/site/course/" + value.courseId + "/courseContent.htm' target='_blank'><img src='"+fileImg+"'></a></dt>"+
                            "<dd class='fl'>"+
                            "<div class='class_detail fl'>"+
                            "<h3><a href='/site/course/" + value.courseId + "/courseContent.htm' target='_blank'> " + value.courseTitle + "</a><em>"+(value.courseMode==0?'一对一':'班课')+"</em></h3>"+
                            "<p class='class_money clearfix'><span class='fl'>科目：" + value.subject + "</span><strong>" + price + "</strong></p>"+
                            "<p class='class_money clearfix'><span class='fl'>学校：<a href='/site/shool/" + ((value.orgEntity)?value.orgEntity.orgId:"") + "/findCourseByorgId.htm'>" +((value.orgEntity) ? value.orgEntity.orgName :"")+"</a></span><em>共" + value.duration + "课时</em></p>"+
                            "<p class='ellipsis' title='"+value.applicableCommunity+"'>招生对象：" + des + "</p>"+
                            "</div>"+
                            "</dd>"+
                            "</dl>"+
                            "<div class='class_evaluate fl u"+index+"'>"+
                            "<div><span class='persent'>"+goodrate+"%</span><em class='myd'>满意度</em></div>"+
                            "<div><strong><span>" + value.buyCount + "人</span>已购买 </strong>"+
                            "<strong><span>"+((value.evalCount)&&(value.evalCount!=0) ? value.evalCount+"条" : "暂无" )+"</span>评价</strong></div>"+
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

                        var a=$('#contentDiv').find(".m"+index).parent().height()-27;
                        $('#contentDiv').find(".u"+index).css('height',a+'px');


                    });
                    //显示分页工具条

                    pageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                        t.loadSelectCourse(currPage);
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




        return searchCourseDo;
    }
);