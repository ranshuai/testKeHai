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
        'dialogs',
        'money',
        'common',
        'pageBar',
        'PTCoursePopBox',
        'base'
    ],
    function ($, showSelectNav, loadHotCourse,siteMainNav,siteSearchBar,siteTopBar,dialogs,money,common,pageBar,PopBox,jquery_ui_min) {

        //视频滑鼠
        $('.videoListMain').on('mouseenter','dl',function(){
            $(this).children('.startStudy').slideDown();
        }).on('mouseleave','dl',function(){
            $(this).children('.startStudy').slideUp();
        });

        function searchVideoCourse() {

        }

        searchVideoCourse.prototype.binarySearch=function(arrs, index) {
            var value = {};
            var left = 0;
            var right= arrs.length;
            while(left <= right)
            {
                var center = Math.floor((left+right)/2);
                if(arrs[center]['id'] == index){
                    value = arrs[center];
                    return value;
                }
                if(index < arrs[center].id){
                    right = center - 1;
                }else
                {
                    left = center + 1;
                }
            }
        };
        searchVideoCourse.prototype.init = function () {
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
            /*搜索框默认的文字*/
            $('.select_type_List .sele_type').text('课海');
            $('.select_type_List ul li').eq(2).text('课程');

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
            /***************************************************/
            if (ptCourseData.theme) {
                $("#theme").val(ptCourseData.theme);
                $('.subTitleBar_text1').placeholder({value: ''});
                $('.subTitleBar_text1').val(ptCourseData.theme);

            }

        };
        searchVideoCourse.prototype._init = function () {
            var t = this;
            t.init();
            t.loadSelectvideoCourse(1);
            new siteTopBar().render();
            loadHotCourse.loadHotCourse();
            new siteMainNav().render();
            new siteSearchBar().render();
        };
        searchVideoCourse.prototype.render = function () {
            this._init();
        };

        /**
         * 加载旁听课程信息
         * @param currPage
         */
        searchVideoCourse.prototype.loadSelectvideoCourse = function (currPage) {
            var t = this;
            var userId = ptCourseData.userId;
            var userIdentity=ptCourseData.userIdentity;
            var theme = encodeURI(encodeURI($("#theme").val()));
            var url = "/site/videoCourse/" + currPage + "/"+theme+"/selectvideoCourseList.do";
            $("#contentDiv").html("<span style='padding-left:26px'>加载中...</span>");
            $.post(url, function (response, status, xhr) {
                // 是否有课程
                if (null == response.data.list || 0 == response.data.list) {
                    $("#contentDiv").html("<span style='padding-left:26px'>没有对应课程信息</span>");
                    $("#courseCount").text('0');
                } else {
                    $("#courseCount").text(response.data.countSize);
                    $("#contentDiv").empty();
                    // 默认图片
                    var fileImg = "";
                    // 遍历所有记录
                    var isExistVideoCard=response.data.isExistVideoCard;
                    var allBuyVideos= response.data.buyedVideos;
                    $.each(response.data.list, function (index, value) {
                        if ("" != value.courseResId && null != value.courseResId && "0" != value.courseResId && undefined != value.courseResId) {
                            fileImg = "/file/loadImage/" + value.courseResId + "/180/100.r";
                        } else {
                            fileImg = "/front/sanhai/images/course.png";
                        }
                        var courseId = value.courseId;

                        var content = "<dl class='fl'>";
                        content += "<dt>";
                        content += "<a href=\"/site/videoCourse/" +value.videoId+"/detail.htm\" target=\"_blank\"><img src=" + fileImg + " ></a>";
                        content += "</dt>";
                        content += "<dd class=\"startStudy pa hide\">";
                        content +="<input type='hidden' value='" + value.videoId + "'/>";
                        if(isExistVideoCard==0){
                            content += "<a onclick='playVideo($(this))'>开始学习<i></i></a>";
                        }else{
                            if(allBuyVideos!=null&&allBuyVideos.length>0){
                                var sta=0;
                                $.each(allBuyVideos, function (index, value1) {
                                    if(value1.coursesId==value.videoId){
                                        sta=1;
                                        return false;
                                    }
                                })

                                if(sta==1){
                                    content += "<a onclick='playVideo($(this))'>开始学习<i></i></a>";
                                }else{
                                    content += "<a onclick='addShoppingCart($(this))'>加入购物车<i></i></a>";
                                }
                                sta=0;
                            }else{
                                content += "<a onclick='addShoppingCart($(this))'>加入购物车<i></i></a>";
                            }

                        }
                        content += "</dd>";
                        content += "<dd>";
                        content += "<h5><a href=\"/site/videoCourse/"+value.videoId+"/detail.htm\" target=\"_blank\">" + value.theme + "</a></h5>";
                        content += "<p class=\"clearfix\">";
                        content += "<a href=\"/site/theacher/" + value.teacherId + "/toTeacherIndex.htm\" target=\"_blank\"><span class=\"fl\">主讲人：" + value.teanickName + "</span></a>";
                        content += "<span class=\"fr orange\">"+ money.fmoney(value.price / 100, 2) + "</span>";
                        content += "</p>";
                        content += "<p class=\"clearfix\">";
                        if (value.schoolInfo != undefined) {
                            content += "<a href=\"/site/shool/" + value.schoolId + "/findCourseByorgId.htm\" target=\"_blank\"><span class=\"fl schName\" title=\""+(value.schoolInfo.length > 0 ? (value.schoolInfo[0].orgName != undefined ? value.schoolInfo[0].orgName : 1) : 1)+"\">学校："+ (value.schoolInfo.length > 0 ? (value.schoolInfo[0].orgName != undefined ? value.schoolInfo[0].orgName : 1) : 1) + "</span></a>";
                        }
                        content += "<span class=\"fr\">"+ (value.buyCount==''?0:value.buyCount) +"人在学</span>";
                        content += "</p>";
                        content += "</dd>";
                        content += "</dl>";
                        // 渲染
                        $("#contentDiv").append(content);

                        //视频滑鼠
                        $('.videoListMain').on('mouseenter','dl',function(){
                            $(this).children('.startStudy').slideDown();
                        }).on('mouseleave','dl',function(){
                            $(this).children('.startStudy').slideUp();
                        });


                    });
                    //显示分页工具条
                    pageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                        //console.log("显示分页加载条: "+currPage);
                        t.loadSelectvideoCourse(currPage);

                    })
                    // alert($('.com_sel_role').children('li').size());

                    var timer = null;
                    $('.com_sel_role').children('li').hover(function (ev) {
                        var scrollTop = $(document).scrollTop();
                        var scrollLeft = $(document).scrollLeft();
                        var $this = $(this)
                        clearInterval(timer);
                        timer = setInterval(function () {
                            $this.find('.title_list ').removeClass('hide').css('zIndex', '1');

                            clearInterval(timer);
                        }, 500)
                    }, function () {
                        clearInterval(timer);
                        $(this).find('.title_list ').addClass('hide').css('zIndex', '0');
                    });

                    /*加入购物车*/
                    addShoppingCart = function (obj) {
                        var videoId = obj.parent('dd').children('input').val();
                        //console.log(videoId)
                        var auditFlag = 0;
                        $.ajax({
                            url: "/site/shopping/add.do",
                            type: "post",
                            dataType: "json",
                            data: {
                                courseMode: 3,
                                courseId: videoId,
                                auditFlag: auditFlag,
                                remark: ""
                            },
                            success: function (response) {
                                if ("000" == response.resCode) {
                                    var count = parseInt($("#shoppingcount").text()) + 1;
                                    $("#shoppingcount").text(count);
                                    dialogs._shoppingcar(function () {

                                    }, function () {
                                        window.location.href = "/shopping/shoppingCoureses.htm";
                                    });
                                }
                                if ("200" == response.resCode) {
                                    window.location.href = "/login.htm";
                                    $('#notice_textarea').val("");
                                    $(".pushNotice").dialog("close");
                                }
                                // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                                if ("300" == response.resCode) {
                                    dialogs._timer(response.resMsg,2,2,null);
                                }
                            }
                        });
                    };

                    window.openWindow = function(url) {
                        //console.log("打开一个窗口");
                        var width = window.screen.availWidth;
                        var height = window.screen.availHeight;
                        var tempWindow = window.open(url, '_blank','channelmode=yes,fullscreen=no,location=0,width=' + width + ",height=" +height + ",top=0, left=0");
                        return false;
                    }

                    /*开始学习*/
                    playVideo = function (obj) {
                        var videoId = obj.parent('dd').children('input').val();
                        $.ajax({
                            url: "/video/playBack.do",
                            type: "post",
                            data: {
                                videoId: videoId
                            },
                            dataType: "json"
                        }).success(function (response, status, xhr) {
                            if ("000" == response.resCode) {
                                openWindow (response.data.url);
                            } else {
                                dialogs._timer(response.resMsg,2,2,null);
                            }
                        }).fail(function (response, status, xhr) {

                        });
                    };


                    popBuyAudit = function (courseId,studentId,classid) {

                        //判断是否登录
                        var userId = ptCourseData.userId;
                        var userIdentity=ptCourseData.userIdentity;
                        if (userId == "null") {
                            location.href = "/login.htm";
                            return;
                        }

                        if(userIdentity!=null&&userIdentity!=2){
                            dialogs._wait("请用学生身份登录", 2);
                            return;
                        }
                        $.ajax({
                            url: "/site/ptcourse/plan/selectArrangeCourseByCourseIdAndUserId.do",
                            type: "post",
                            dataType: "json",
                            data: {
                                courseId: courseId,
                                studentId:studentId
                            },
                            success: function (response) {
                                /* if (!common.checkResponse(response)) {
                                 return false;
                                 }*/

                                var htmlStr = "";
                                var isBuy=false;
                                $.each(response.data.allArrangeCourseList, function (index_1, item_1) {
                                    isBuy=false;
                                    htmlStr += "<div class='courItem clearfix'>";
                                    htmlStr += "<div class='fl' style='width:240px'>";
                                    $.each(response.data.arrangeCourseList, function (index, item_2) {
                                        if(item_1.classId==item_2.classId){
                                            isBuy=true;
                                        }
                                    })
                                    if(isBuy==true){
                                        htmlStr += "<input type='checkbox' id='checkbox" + index_1 + "' name='classid'  disabled='disabled' value='" + item_1.classId + "' />";
                                    }else{
                                        if(item_1.classId==classid){
                                            htmlStr += "<input type='checkbox' id='checkbox" + index_1 + "' name='classid'  checked value='" + item_1.classId + "' />";
                                        }else{
                                            htmlStr += "<input type='checkbox' id='checkbox" + index_1 + "' name='classid'  value='" + item_1.classId + "' />";
                                        }

                                    }
                                    htmlStr += "  <label for='checkbox" + index_1 + "'><strong>" + item_1.theme + "</strong></label>";
                                    htmlStr += "</div>";
                                    htmlStr += "<div class='fl tc' style='width:160px'>" + new Date(parseFloat(item_1.classStartTime)).format("MM-dd hh:mm") + "</div>";
                                    htmlStr += "<div class='fr tl' style='width:123px'>";
                                    htmlStr += "<strong class='font20 orange'>" + money.fmoney(item_1.ptPrice / 100, 2) + "</strong>";
                                    htmlStr += "<input class='price' type='hidden' value="+item_1.ptPrice / 100+">";
                                    htmlStr += "</div>";
                                    htmlStr += "</div>";
                                });
                                $("#couserlists").html(htmlStr);
                            }
                        });

                        $('#toPay').click(function () {

                            if($("#couserlists").html()==""){
                                return;
                            }else{

                                var classids = "";
                                $("#couserlists input[type = checkbox]:checked").each(function (index) {

                                    classids += $(this).val() + ",";
                                });
                                var ids = classids.substring(0, classids.length - 1);
                                if(ids==''){
                                    return;
                                }
                                $("#couserlists").html("");
                                $(".popBox").dialog("close");
                                location.href = "/site/ptcourse/buyPtCourse.htm?classIds="+ids;
                            }
                        });

                    }

                }
            });

        }
        return searchVideoCourse;
    }
);