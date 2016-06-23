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
        'base',
        'kpTree'
    ],
    function ($, showSelectNav, loadHotCourse,siteMainNav,siteSearchBar,siteTopBar,dialogs,money,common,pageBar,PopBox,jquery_ui_min) {

        function searchPtCourseDo() {

        }

        searchPtCourseDo.prototype.binarySearch=function(arrs, index) {
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
        searchPtCourseDo.prototype.init = function () {
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
             $('.select_type_List .sele_type').text('课表');
             $('.select_type_List ul li').eq(1).text('课程');

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
                $('.subTitleBar_text1').placeholder({value: ''})
                $('.subTitleBar_text1').val(ptCourseData.theme);
            }

        };
        searchPtCourseDo.prototype._init = function () {
            var t = this;
            t.init();
            t.loadSelectPtCourse(1);
            new siteTopBar().render();
            loadHotCourse.loadHotCourse();
            new siteMainNav().render();
            new siteSearchBar().render();
        };
        searchPtCourseDo.prototype.render = function () {
            this._init();
        };



        /**
         * 加载旁听课程信息
         * @param currPage
         */
        searchPtCourseDo.prototype.loadSelectPtCourse = function (currPage) {
            var t = this;
            var courseTitle = encodeURI(encodeURI($("#courseTitle").val()));
            var theme = encodeURI(encodeURI($("#theme").val()));
            var url = "/site/ptcourse/" + currPage + "/"+theme+"/selectCourse.do";
            $("#contentDiv").html("<span style='padding-left:26px'>加载中...</span>");
            $.post(url, function (response, status, xhr) {

                // 是否有课程
                if (null == response.data.list || 0 == response.data.list) {
                    $("#contentDiv").html("<span style='display:inline-block; margin-top:20px'>没有对应课程信息</span>");
                    $("#courseCount").text('0');
                } else {
                    $("#courseCount").text(response.data.countSize);
                    $("#contentDiv").empty();

                    // 默认图片
                    var fileImg = "";
                    var userImg = "";
                    var teaImg = "";
                    var orgImg = "";

                    $('#courseCount').text(response.data.countSize);
                    // 遍历所有记录
                    var knowHtml="";

                    var coursetype="";

                    var knows="";
                    $.each(response.data.list, function (index, value) {

                        //知识点
                        if(value.pushType==1){
                            knowHtml="";
                            knows="";
                            coursetype="(知识点讲解)";
                            knows="知识点讲解：";
                            var knowledgePoints=value.knowledgePoints;
                            knowledgePoints=knowledgePoints.substr(1,knowledgePoints.length-2);
                            var knowledgePoint=knowledgePoints==''?'':knowledgePoints.split(",");
                            if(knowledgePoint.length<=0){
                                knowHtml+="暂无知识点";
                            }
                            for(var k = 0; k < knowledgePoint.length; k++){
                                var point=knowledgePoint[k];
                                var knowledge= t.binarySearch(zNodes, parseInt(point))
                                knowHtml+=knowledge.name+" "
                            }
                        }

                        if(value.pushType==0){
                            knowHtml="";
                            knows="";
                            coursetype="(题目讲解)";
                            knows="题目讲解：";
                            var pics=value.topics;
                            pics=pics.substr(1,pics.length-2);
                            var knowledgePoint=pics==''?'':pics.split(",");
                            knowHtml=knowledgePoint.length+"题";
                        }

                        if(value.pushType==2){
                            knowHtml="";
                            knows="";
                            coursetype="";
                        }


                        if ("" != value.courseResId && null != value.courseResId && "0" != value.courseResId && undefined != value.courseResId) {
                            fileImg = "/file/loadImage/" + value.courseResId + "/180/100.r";
                        } else {
                            fileImg = "/front/sanhai/images/course.png";
                        }
                        if ("" != value.userResId && null != value.userResId && "0" != value.userResId && undefined != value.userResId) {
                            userImg = "/file/loadImage/" + value.userResId + "/60/60.r";
                        } else {
                            userImg = "/front/sanhai/images/person.png";
                        }
                        if ("" != value.teaResId && null != value.teaResId && "0" != value.teaResId && undefined != value.teaResId) {
                            teaImg = "/file/loadImage/" + value.teaResId + "/60/60.r";
                        } else {
                            teaImg = "/front/sanhai/images/person.png";
                        }
                        if ("" != value.orgResId && null != value.orgResId && "0" != value.orgResId && undefined != value.orgResId) {
                            orgImg = "/file/loadImage/" + value.orgResId + "/60/60.r";
                        } else {
                            orgImg = "/front/sanhai/images/def_school.jpg";
                        }
                        var courseId = value.courseId;
                        var content = "<div class=\"main_l_nav_cont_row clearfix\">";
                        content += "<dl class=\"fl\">";
                        content += "<dt class=\"fl\">";
                        content += "<a href=\"/site/ptcourse/" + value.ptId + "/detail.htm\" target=\"_blank\"><img src=" + fileImg + " ></a>";
                        content += "</dt>";
                        content += "<dd class=\"fl\">";
                        content += "<div class=\"class_detail\">";
                        content += "<h3><span class='orange'>"+coursetype+"</span>";
                        content += "<a href=\"/site/ptcourse/" + value.ptId + "/detail.htm\" target=\"_blank\">" + value.theme + "</a>";
                        content += "</h3>";
                        content += "<div class=\"PTSelCont pr\">";
                        content += "<p class=\"\">";
                        content += "<span>课程状态：</span>";
                        content += "<em class=\"PTStatus\">" + common.df.ptCourseStatus(value.ptCourseStatus) + "</em>";
                        content += "</p>";
                        content += "<p class='clearfix'>";
                        content += "<span class='fl'>"+knows+"</span>";
                        content +=  "<em style='width: 190px;display: inline-block' title='"+knowHtml+"' class='fl ellipsis'> "+knowHtml+"</em>";
                        content += "</p>";
                        content += "<p class=\"\">";
                        content += "<span>上课时间：</span>";
                        content += "<em>" + new Date(parseFloat(value.classStartTime)).format("MM-dd hh:mm") + "</em>";
                        content += "</p>";
                        content += "<p>";
                        content += "<span>旁听价格：</span>";
                        content += "<em class=\"orange font20\">" +  money.fmoney(value.ptPrice / 100 * value.courseTime/60, 2) + "</em>";
                        content += "</p>";
                        content += "<ul class=\"com_sel_role clearfix pa\">";
                        if(value.studentId!=value.schoolId){
                            content += "<li class=\"fl pr\">";
                            content += "<em class=\"pa stu\"></em>";
                            content += "<a href=\"/site/student/" + value.studentId + "/toStudentIndex.htm\">";
                            content += "<div>";
                            content += "<img src=" + userImg + " alt=\"学生\" width='60px' height='60px'/>";
                            content += "</div> </a>";
                            content += "<ul class=\"title_list pa hide\">";
                            content += "<li>";
                            content += "<span>姓名 ：</span>";
                            content += "<span>" + value.usernickName + "</span>";
                            content += "</li>";
                            content += "<li>";
                            content += "<span>性别 ：</span>";
                            content += "<span>" + (value.userSex == 0 ? '男' : '女') + "</span>";
                            content += "</li>";
                            content += "<li>";
                            content += "<span>在校平均分 ：</span>";
                            content += "<span>70</span>";
                            content += "</li>";
                            content += "</ul>";
                            content += "</li>";
                        }
                        if(value.teacherId!=0){
                            content += "<li class=\"fl pr\">";
                            content += "<em class=\"pa tea\"></em>";
                            content += "<a href=\"/site/theacher/" + value.teacherId + "/toTeacherIndex.htm\">";
                            content += "<div>";
                            content += "<img src=" + teaImg + " alt=\"教师\" width='60px' height='60px'/>";
                            content += "</div> </a>";
                            content += "<ul class=\"title_list pa hide\">";
                            content += "<li>";
                            content += "<span>教师 ：</span>";
                            content += "<span>" + value.teaName + "</span>";
                            content += "</li>";
                            if (value.teaInfo != undefined) {
                                content += "<li>";
                                content += "<span> 学生数：</span>";
                                content += "<span>"+ (value.teaInfo.length > 0 ? (value.teaInfo[0].teaStudents != undefined ? value.teaInfo[0].teaStudents : 1) : 1) + "</span>";
                                content += "</li>";
                                content += "<li>";
                                content += "<span>评分 ：</span>";
                                content += "<span>" + (value.teaInfo.length > 0 ? (value.teaInfo[0].teaEvaScore != undefined ? parseFloat(value.teaInfo[0].teaEvaScore).toFixed(1) : parseFloat(5.0)) : parseFloat(5.0)) + "</span>";
                                content += "</li>";
                                content += "<li>";
                                content += "<span>授课时长 ：</span>";
                                content += "<span>" + (value.teaInfo.length > 0 ? (value.teaInfo[0].courseTimes != undefined ? value.teaInfo[0].courseTimes/60 : 1) : 1) + "</span>";
                                content += "</li>";
                            }
                            content += "</ul>";
                            content += "</li>";
                        }

                        content += "<li class=\"fl pr\">";
                        content += "<em class=\"pa sch\"></em>";
                        content += "<a href=\"/site/shool/" + value.schoolId + "/findCourseByorgId.htm\">";
                        content += "<div>";
                        content += "<img src=" + orgImg + " alt=\"学校\" width='60px' height='60px'/>";
                        content += "</div> </a>";
                        content += "<ul class=\"title_list pa hide\">";

                        if (value.schoolInfo != undefined) {
                            content += "<li>";
                            content += "<span>" + (value.schoolInfo.length > 0 ? (value.schoolInfo[0].orgName != undefined ? value.schoolInfo[0].orgName : 1) : 1) + "</span>";
                            content += "</li>";
                            content += "<li>";
                            content += "<span>教师 ：</span>";
                            content += "<span>" + (value.schoolInfo.length > 0 ? (value.schoolInfo[0].schoolTeachers != undefined ? value.schoolInfo[0].schoolTeachers : 1) : 1) + "</span>";
                            content += "</li>";
                            content += "<li>";
                            content += "<span>课程 ：</span>";
                            content += "<span>" + (value.schoolInfo.length > 0 ? (value.schoolInfo[0].schoolCourses != undefined ? value.schoolInfo[0].schoolCourses : 2) : 2) + "</span>";
                            content += "</li>";
                            /*content += "<li>";
                            content += "<span>已招人数 ：</span>";
                            content += "<span>" + (value.schoolInfo.length > 0 ? (value.schoolInfo[0].schoolStudents != undefined ? value.schoolInfo[0].schoolStudents : 1) : 1) + "</span>";
                            content += "</li>";*/
                        }
                        content += "</ul>";
                        content += "</li>";
                        content += "</ul>";
                        content += "</div>";
                        content += "</div>";
                        content += "</dd>";
                        content += "</dl>";
                        content += "<div class=\"fr buyAudit\">";
                        content += "<button class=\"c_bg_color2 c_btn_size3\" onclick=\"popBuyAudit('" + value.courseId + "','"+value.studentId+"','"+value.classId+"')\">购买旁听</button>";
                        content += "</div>";
                        content += "</div>";
                        // 渲染
                        $("#contentDiv").append(content);


                    });
                    //显示分页工具条
                    pageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                        //console.log("显示分页加载条: "+currPage);
                        t.loadSelectPtCourse(currPage);

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


                    window.popBuyAudit = function (courseId,studentId,classid) {
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
                                /*弹窗全选*/
                                PopBox.selBoxAll();
                            }
                        });

                        /*弹窗初始化*/
                        $('.popBox').dialog({
                            autoOpen: true,
                            width: 600,
                            modal: true,
                            resizable: false,
                            close: function () {
                                $(this).dialog("close")
                            }
                        });
                        //清除选项
                        $('.cancelBtn').click(function () {
                            $(".popBuyAudit").dialog("close");
                        });
                        /*预览*/
                        $("#popBuyAudit").dialog("open");

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



        return searchPtCourseDo;
    }
);