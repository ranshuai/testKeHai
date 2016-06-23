/**
 * Created by bbb on 2015/12/17.
 */
define([
        'jquery',
        'dialogs',
        'money',
        'common',
        'PTCoursePopBox',
        'base',
        'kpTree'
    ],

    function ($, dialogs, money, common,PopBox) {

        function stu_courseDo() {
            this.$a = $('.tabList').children('li').eq(0).children('a');
            this.$b = $('.tabList').children('li').eq(1).children('a');
        }

        attention=function (val, attentiontype) {
//        alert(orgid+" "+attentiontype)
            var stuId = stuData.stuId;
            $.ajax({
                url: "/attention/intoAttention.do",
                type: "post",
                dataType: "json",
                data: {
                    attentionObjId: stuId,
                    attentionType: attentiontype
                },
                success: function (response) {

                    //console.log(response.resCode);

                    if ("000" == response.resCode) {
                        Kh.addAttention(val);
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                    }
                    if ("300" == response.resCode) {
                        dialogs._timer(response.resMsg,2,2,null);
                    }

                }
            });
        };

        binarySearch=function(arrs, index) {
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

        stu_courseDo.prototype.loadCourse = function (currPage, stuid, type) {
            $.ajax({
                url: "/site/student/loadCourse.do",
                type: "post",
                dataType: "json",
                data: {
                    stuId: stuid,
                    currPage: currPage,
                    type: type
                },
                success: function (response) {

                    if (!common.checkResponse(response)) {
                        return false;
                    }
                    var htmlStr = "";
                    // 默认图片
                    var fileImg = "";
                    var count = 0;
                    if (type == 0) {
                        $('.tabList').children('li').eq(1).children('a').removeClass();
                        $('.tabList').children('li').eq(0).children('a').addClass("ac");
                        if (response.data.list == null || response.data.list.length == 0) {
                            htmlStr += "没有对应的课程";
                        } else {
                            var knowHtml="";

                            var coursetype="";

                            var knows="";
                            $.each(response.data.list, function (index, value) {
                                /*if ("" != value.courseResId && null != value.courseResId && "0" != value.courseResId && undefined != value.courseResId) {
                                    fileImg = "/file/loadImage/" + value.courseResId + "/180/110.r";
                                } else {
                                    fileImg = "/front/sanhai/images/course.png";
                                }
                                var courseId = value.courseId;
                                htmlStr += " <div class='main_l_nav_cont_row clearfix'>";
                                htmlStr += "<dl class=\"fl\">";
                                htmlStr += "<dt class=\"fl\">";
                                htmlStr += "<a href=\"javascript:;\"><img src=" + fileImg + "></a>";
                                htmlStr += "</dt>";
                                htmlStr += "<dd class=\"fl\">";
                                htmlStr += "<div class=\" class_detail fl\">";
                                htmlStr += "<h3><strong><a href=\"/site/ptcourse/" + value.ptId + "/detail.htm\">" + value.ptTitle + "</a></strong>";
                                htmlStr += "</h3>";
                                htmlStr += "<p class=\"class_detail_p1\">";
                                htmlStr += "<strong class=\"orange font20\">" + money.fmoney(value.ptPrice / 100, 2) + "</strong>";
                                htmlStr += "<b>&nbsp;&nbsp;共" + value.duration / 60 + "课时</b> &nbsp;&nbsp;<b>开课时间:&nbsp;" + new Date(parseFloat(value.classStartTime)).format("MM-dd hh:mm") + "</b>";
                                htmlStr += "</p>";
                                htmlStr += "<p class=\"class_detail_p2\">";
                                htmlStr += "<span class=\"mar_r_30\">每课时人均旁听人数:6</span>";
                                htmlStr += "<span>还有<strong class=\"orange font20\">" + (value.ptSeat - value.ptSales) + "</strong>个旁听名额</span>";
                                htmlStr += "</p>";
                                htmlStr += "<p class=\"class_detail_p2\">";
                                /!*var time = new Date().getTime();
                                if (time >= parseFloat(value.classStartTime)) {
                                    htmlStr += "<button type=\"button\" class=\"c_btn_size2 c_bg_color2 mar_r_24 go_pt\" data=" + value.classId + " time=" + value.classStartTime + ">去旁听</button>";
                                } else {
                                    htmlStr += "<button type=\"button\" class=\"c_btn_size2 c_bg_color2 mar_r_24 go_pt\" data=" + value.classId + " time=" + value.classStartTime + ">抢旁听</button>";
                                    //htmlStr += "<a type=\"button\" class=\"c_btn_size2 c_bg_color2 mar_r_24 go_pt btn\" href='/ptcourse/"+value.classId+"/buy.htm'>抢旁听</button>";
                                }*!/
                                htmlStr += "<button type=\"button\" class=\"c_btn_size2 go_consult \" data=" + value.ptId + " onclick=\"window.open('/consult/chat.htm?type=course&typeId=" + courseId + "','','height=730,width=900');\">去咨询</button>";
                                htmlStr += "</p>";
                                htmlStr += "</div>";
                                htmlStr += "</dd>";
                                htmlStr += "</dl>";
                                htmlStr += "<div class=\"fr\">";
                                htmlStr += "<p class=\"orange com_sele_status font16\">" + common.df.ptCourseStatus(value.ptCourseStatus) + "</p>";
                                htmlStr += "<ul class=\"com_sel_role clearfix\">";
                                htmlStr += "<li class=\"fl pr\">";
                                htmlStr += "<div> <img src=/file/loadImage/" + value.userResId + "/60/60.r></div>";
                                htmlStr += "<p>学生</p>";
                                htmlStr += "<ul class=\"title_list pa hide\">"
                                htmlStr += "<li>"
                                htmlStr += "<span>姓名 ：</span><span>颜如玉</span>"
                                htmlStr += "</li>"
                                htmlStr += "<li>"
                                htmlStr += "<span>性别 ：</span><span>女</span>"
                                htmlStr += "</li>"
                                htmlStr += "<li>"
                                htmlStr += "<span>在校平均分 ：</span><span>70</span>"
                                htmlStr += "</li>"
                                htmlStr += "</ul>"
                                htmlStr += "</li>";
                                htmlStr += "<li  class=\"fl pr\">";
                                htmlStr += "<div> <img src=/file/loadImage/" + value.teaResId + "/60/60.r></div>";
                                htmlStr += "<p>老师</p>"
                                htmlStr += "<ul class=\"title_list pa hide\">"
                                htmlStr += "<li>"
                                htmlStr += "<span>老师 ：</span><span>爱美丽</span>"
                                htmlStr += "</li>"
                                htmlStr += "<li>"
                                htmlStr += "<span>评价数 ：</span><span>300</span>"
                                htmlStr += "</li>"
                                htmlStr += "<li>"
                                htmlStr += "<span>好评率 ：</span><span>100%</span>"
                                htmlStr += "</li>"
                                htmlStr += "<li>"
                                htmlStr += "<span>授课时长 ：</span><span>200课时</span>"
                                htmlStr += "</li>"
                                htmlStr += "</ul>"
                                htmlStr += "</li>"
                                htmlStr += "<li  class=\"fl pr\">";
                                htmlStr += "<div> <img src=/file/loadImage/" + value.orgResId + "/60/60.r></div>";
                                htmlStr += "<p>学校</p>";
                                htmlStr += "<ul class=\"title_list pa hide\">"
                                htmlStr += "<li>"
                                htmlStr += "<span>好未来国际教育</span>"
                                htmlStr += "</li>"
                                htmlStr += "<li>"
                                htmlStr += "<span>教师 ：</span><span>300</span>"
                                htmlStr += "</li>"
                                htmlStr += "<li>"
                                htmlStr += "<span>课程 ：</span><span>100%</span>"
                                htmlStr += "</li>"
                                htmlStr += "<li>"
                                htmlStr += "<span>已招人数 ：</span><span>100</span>"
                                htmlStr += "</li>"
                                htmlStr += "</ul>"
                                htmlStr += "</li>";
                                htmlStr += "</ul>";
                                htmlStr += "</div>";
                                htmlStr += "</div>";*/

                                //知识点
                                if(value.pushType==1){
                                    knowHtml="";
                                    knows="";
                                    coursetype="(知识点讲解)";
                                    knows="知识点讲解：";
                                    var knowledgePoints=value.knowledgePoints;
                                    knowledgePoints=knowledgePoints.substr(0,knowledgePoints.length-1);
                                    var knowledgePoint=knowledgePoints==''?'':knowledgePoints.split(",");
                                    if(knowledgePoint.length<=0){
                                        knowHtml+="暂无知识点";
                                    }
                                    for(var k = 0; k < knowledgePoint.length; k++){
                                        var point=knowledgePoint[k];
                                        var knowledge=binarySearch(zNodes, parseInt(point))
                                        knowHtml+=knowledge.name+" "
                                    }
                                }

                                if(value.pushType==0){
                                    knowHtml="";
                                    knows="";
                                    coursetype="(题目讲解)";
                                    knows="题目讲解：";
                                    var pics=value.topics;
                                    pics=pics.substr(0,pics.length-1);
                                    var knowledgePoint=pics==''?'':pics.split(",");
                                    knowHtml=knowledgePoint.length+"题";
                                }

                                if(value.pushType==2){
                                    knowHtml="";
                                    knows="";
                                    coursetype="";
                                }

                                if ("" != value.courseResId && null != value.courseResId && "0" != value.courseResId && undefined != value.courseResId) {
                                    fileImg = "/file/loadImage/" + value.courseResId + "/180/110.r";
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
                                htmlStr += "<div class=\"main_l_nav_cont_row clearfix\">";
                                htmlStr += "<dl class=\"fl\">";
                                htmlStr += "<dt class=\"fl\">";
                                htmlStr += "<a href=\"/site/ptcourse/" + value.ptId + "/detail.htm\" target=\"_blank\"><img src=" + fileImg + " ></a>";
                                htmlStr += "</dt>";
                                htmlStr += "<dd class=\"fl\" style='width:590px!important'>";
                                htmlStr += "<div class=\"class_detail\">";
                                htmlStr += "<h3><span class='orange'>"+coursetype+"</span>";
                                htmlStr += "<a href=\"/site/ptcourse/" + value.ptId + "/detail.htm\" target=\"_blank\">" + value.theme + "</a>";
                                htmlStr += "</h3>";
                                htmlStr += "<div class=\"PTSelCont pr\">";
                                htmlStr += "<p class=\"\">";
                                htmlStr += "<span>课程状态：</span>";
                                htmlStr += "<em class=\"PTStatus\">" + common.df.ptCourseStatus(value.ptCourseStatus) + "</em>";
                                htmlStr += "</p>";
                                htmlStr += "<p class='clearfix'>";
                                htmlStr += "<span class='fl'>"+knows+"</span>";
                                htmlStr +=  "<em style='width: 190px;display: inline-block' title='"+knowHtml+"' class='fl ellipsis'> "+knowHtml+"</em>";
                                htmlStr += "</p>";
                                htmlStr += "<p class=\"\">";
                                htmlStr += "<span>上课时间：</span>";
                                htmlStr += "<em>" + new Date(parseFloat(value.classStartTime)).format("MM-dd hh:mm") + "</em>";
                                htmlStr += "</p>";
                                htmlStr += "<p>";
                                htmlStr += "<span>旁听价格：</span>";
                                htmlStr += "<em class=\"orange font20\">" + money.fmoney(value.ptPrice / 100, 2) + "</em>";
                                htmlStr += "</p>";
                                htmlStr += "<ul class=\"com_sel_role clearfix pa\">";
                                htmlStr += "<li class=\"fl pr\">";
                                htmlStr += "<em class=\"pa stu\"></em>";
                                htmlStr += "<a href=\"/site/student/" + value.studentId + "/toStudentIndex.htm\">";
                                htmlStr += "<div>";
                                htmlStr += "<img src=" + userImg + " alt=\"学生\" width='60px' height='60px'/>";
                                htmlStr += "</div> </a>";
                                htmlStr += "<ul class=\"title_list pa hide\">";
                                htmlStr += "<li>";
                                htmlStr += "<span>姓名 ：</span>";
                                htmlStr += "<span>" + value.usernickName + "</span>";
                                htmlStr += "</li>";
                                htmlStr += "<li>";
                                htmlStr += "<span>性别 ：</span>";
                                htmlStr += "<span>" + (value.userSex == 0 ? '男' : '女') + "</span>";
                                htmlStr += "</li>";
                                /*htmlStr += "<li>";
                                 htmlStr += "<span>在校平均分 ：</span>";
                                 htmlStr += "<span>70</span>";
                                 htmlStr += "</li>";*/
                                htmlStr += "</ul>";
                                htmlStr += "</li>";
                                htmlStr += "<li class=\"fl pr\">";
                                htmlStr += "<em class=\"pa tea\"></em>";
                                htmlStr += "<a href=\"/site/theacher/" + value.teacherId + "/toTeacherIndex.htm\">";
                                htmlStr += "<div>";
                                htmlStr += "<img src=" + teaImg + " alt=\"教师\" width='60px' height='60px'/>";
                                htmlStr += "</div> </a>";
                                htmlStr += "<ul class=\"title_list pa hide\">";
                                htmlStr += "<li>";
                                htmlStr += "<span>教师 ：</span>";
                                htmlStr += "<span>" + value.teaName + "</span>";
                                htmlStr += "</li>";
                                if (value.teaInfo != undefined) {
                                    htmlStr += "<li>";
                                    htmlStr += "<span> 学生数：</span>";
                                    htmlStr += "<span>"+ (value.teaInfo.length > 0 ? (value.teaInfo[0].teaStudents != undefined ? value.teaInfo[0].teaStudents : 1) : 1) + "</span>";
                                    htmlStr += "</li>";
                                    htmlStr += "<li>";
                                    htmlStr += "<span>评分 ：</span>";
                                    htmlStr += "<span>" + (value.teaInfo.length > 0 ? (value.teaInfo[0].teaEvaScore != undefined ? parseFloat(value.teaInfo[0].teaEvaScore).toFixed(1) : parseFloat(5.0)) : parseFloat(5.0)) + "</span>";
                                    htmlStr += "</li>";
                                    htmlStr += "<li>";
                                    htmlStr += "<span>授课时长 ：</span>";
                                    htmlStr += "<span>" + (value.teaInfo.length > 0 ? (value.teaInfo[0].courseTimes != undefined ? value.teaInfo[0].courseTimes/60 : 1) : 1) + "</span>";
                                    htmlStr += "</li>";
                                }
                                htmlStr += "</ul>";
                                htmlStr += "</li>";
                                htmlStr += "<li class=\"fl pr\">";
                                htmlStr += "<em class=\"pa sch\"></em>";
                                htmlStr += "<a href=\"/site/shool/" + value.schoolId + "/findCourseByorgId.htm\">";
                                htmlStr += "<div>";
                                htmlStr += "<img src=" + orgImg + " alt=\"学校\" width='60px' height='60px'/>";
                                htmlStr += "</div> </a>";
                                htmlStr += "<ul class=\"title_list pa hide\">";

                                if (value.schoolInfo != undefined) {
                                    htmlStr += "<li>";
                                    htmlStr += "<span>" + (value.schoolInfo.length > 0 ? (value.schoolInfo[0].orgName != undefined ? value.schoolInfo[0].orgName : 1) : 1) + "</span>";
                                    htmlStr += "</li>";
                                    htmlStr += "<li>";
                                    htmlStr += "<span>教师 ：</span>";
                                    htmlStr += "<span>" + (value.schoolInfo.length > 0 ? (value.schoolInfo[0].schoolTeachers != undefined ? value.schoolInfo[0].schoolTeachers : 1) : 1) + "</span>";
                                    htmlStr += "</li>";
                                    htmlStr += "<li>";
                                    htmlStr += "<span>课程 ：</span>";
                                    htmlStr += "<span>" + (value.schoolInfo.length > 0 ? (value.schoolInfo[0].schoolCourses != undefined ? value.schoolInfo[0].schoolCourses : 2) : 2) + "</span>";
                                    htmlStr += "</li>";
                                       /*htmlStr += "<li>";
                                     htmlStr += "<span>已招人数 ：</span>";
                                     htmlStr += "<span>" + (value.schoolInfo.length > 0 ? (value.schoolInfo[0].schoolStudents != undefined ? value.schoolInfo[0].schoolStudents : 1) : 1) + "</span>";
                                     htmlStr += "</li>";*/
                                }
                                htmlStr += "</ul>";
                                htmlStr += "</li>";
                                htmlStr += "</ul>";
                                htmlStr += "</div>";
                                htmlStr += "</div>";
                                htmlStr += "</dd>";
                                htmlStr += "</dl>";
                                htmlStr += "<div class=\"fr buyAudit tc\">";
                                htmlStr += "<button class=\"c_bg_color2 c_btn_size3\" onclick=\"popBuyAudit('" + value.courseId + "','"+value.studentId+"','"+value.classId+"')\">购买旁听</button>";
                                htmlStr += "</div>";
                                htmlStr += "</div>";
                                count++;
                            });
                        }
                        $("#couring").text(count);
                    } else {
                        $('.tabList').children('li').eq(0).children('a').removeClass();
                        $('.tabList').children('li').eq(1).children('a').addClass("ac");
                        var fileImg = "";
                        if (response.data.stucourse == null || response.data.stucourse.length == 0) {
                            htmlStr += "没有对应的课程";
                        } else {
                            htmlStr += "<table>";
                            htmlStr += "<colgrounp>";
                            htmlStr += "<col width='90px'/>";
                            htmlStr += "<col width='225px'/>";
                            htmlStr += "<col width='245px'/>";
                            htmlStr += "<col width='145px'/>";
                            htmlStr += "<col width='145px'/>";
                            htmlStr += "<col width='100px'/>";
                            htmlStr += "</colgrounp>";
                            $.each(response.data.stucourse, function (index1, item1) {
                                var time = new Date(parseFloat(item1.orderGenerateTime)).format("yyyy-MM-dd hh:mm:ss");
                                if ("" != item1.advertiseResId && null != item1.advertiseResId && "0" != item1.advertiseResId && undefined != item1.advertiseResId) {
                                    fileImg = "/file/loadImage/" + item1.advertiseResId + "/106/84.r";
                                } else {
                                    fileImg = "/front/sanhai/images/course.png";
                                }
                                if (item1.coursesStatus == 1 && item1.isRetireCourses == 0 && item1.courseMode==0) {
                                    htmlStr += "<tr class=''>";
                                    htmlStr += "<td><img src=" + fileImg + " alt=''/></td>";
                                    htmlStr += "<td>" + time + "</td>";
                                    htmlStr += "<td>" + item1.courseTitle + "</td>";
                                    htmlStr += "<td>" + (item1.name == undefined ? "" : item1.name) + "</td>";
                                    htmlStr += "<td>一对一</td>";
                                    htmlStr += "<td>已完结</td>";
                                    htmlStr += "</tr>";

                                }
                                if (item1.coursesStatus == 1 && item1.isRetireCourses == 0 && item1.courseMode==20) {
                                    htmlStr += "<tr class=''>";
                                    htmlStr += "<td><img src=" + fileImg + " alt=''/></td>";
                                    htmlStr += "<td>" + time + "</td>";
                                    htmlStr += "<td>" + item1.courseTitle + "</td>";
                                    htmlStr += "<td>" + (item1.name == undefined ? "" : item1.name) + "</td>";
                                    htmlStr += "<td>视频</td>";
                                    htmlStr += "<td>已完结</td>";
                                    htmlStr += "</tr>";

                                }
                                if (item1.coursesStatus == 1 && item1.isRetireCourses == 2 && item1.coursesFinishTimes > 1) {
                                    htmlStr += "<tr class=''>";
                                    htmlStr += "<td><img src=" + fileImg + " alt=''/></td>";
                                    htmlStr += "<td>" + time + "</td>";
                                    htmlStr += "<td>" + item1.courseTitle + "</td>";
                                    htmlStr += "<td>" + (item1.name == undefined ? "" : item1.name) + "</td>";
                                    htmlStr += "<td>一对一</td>";
                                    htmlStr += "<td>已完结</td>";
                                    htmlStr += "</tr>";
                                }

                            });
                            htmlStr += "</table>";
                        }

                    }
                    $("#courseing").html(htmlStr);
                    if (response.data.list > 0)
                        showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                            loadCourse(currPage, stuid, type);
                        });

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
                }
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
                            htmlStr += "<strong class='font20 orange'>" + money.fmoney( new Number(item_1.ptPrice) / 100 *  new Number(item_1.courseTime)/60, 2) + "</strong>";
                            htmlStr += "<input class='price' type='hidden' value="+ new Number(item_1.ptPrice) / 100 * new Number(item_1.courseTime)/60+">";
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
                    autoOpen: false,
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
        /*已完结课程个数*/
        stu_courseDo.prototype.getCourcount = function (currPage, stuid, type) {
            $.ajax({
                url: "/site/student/loadCourse.do",
                type: "post",
                dataType: "json",
                data: {
                    stuId: stuid,
                    currPage: currPage,
                    type: type
                },
                success: function (response) {
                    if (!common.checkResponse(response)) {
                        return false;
                    }
                    var count = 0;
                    $.each(response.data.stucourse, function (index1, item1) {

                        if (item1.coursesStatus == 1 && item1.isRetireCourses == 0) {
                            count++;

                        }
                        if (item1.coursesStatus == 1 && item1.isRetireCourses == 2 && item1.coursesFinishTimes > 1) {

                            count++;
                        }

                    });

                    $("#coured").text(count);
                }
            });
        }


        stu_courseDo.prototype.init = function () {
            /*只有学生身份显示购物车*/
            if(user.userIdentity==2){
                $('.shopping_car').removeClass('hide');
            }
            /*弹窗初始化*/
            $('.popBox').dialog({
                autoOpen: false,
                width: 600,
                modal: true,
                resizable: false,
                close: function() {
                    $(this).dialog("close")
                }
            });
            /*取消弹窗*/
            $('.pushBtnJs').click(function() {
                $("#pushNotice").dialog("open");

                return false;
            });
            //清除选项
            $('.cancelBtn').click(function() {

                $(".pushNotice").dialog("close");
            })

            /*点击出现搜索框*/
            $('.tch_search').css('cursor','pointer');
            $('.tch_search').click(function(){
                $('.search_bar').toggleClass('hide');
            });

            $('.subTitleBar_text1').placeholder({value:'请输入课程名称、关键词等...'});

            /*置顶*/
            toTop();
            delete this.arr;
            /*关注*/
            $('.attentionTo').click(function(){
                $(this).hide().siblings('.cancelAttention').show();
            });

            /***********************************************/
            var t = this;
            var imgsrc = "";
            var stuinfo = stuData.ppResId;
            if (stuinfo == 0 || stuinfo == undefined || stuinfo == '') {
                imgsrc = "/front/sanhai/images/person.png";
            } else {
                imgsrc = "/file/loadImage/" + stuinfo + "/140/140.r";
            }
            $('#userimg').attr("src", imgsrc);
            if (stuData.sex == '0') {
                $('#sex').removeClass().addClass("boy")
            } else {
                $('#sex').removeClass().addClass("girl")
            }

            if (stuData.introduce && $.trim(stuData.introduce).length >= 60) {
                $('#jainjie').html("简介：" + stuData.introduce.substring(0, 60) + "...");
            } else {
                $('#jainjie').html("简介：" + stuData.introduce);
            }
            /**********************学生首页***************************/
            $('.mainNav').children('li').eq(0).removeClass();
            $('.mainNav').children('li').eq(1).addClass("ac");
            $('.mainNav').children('li').eq(2).removeClass();
            t.loadCourse(1, stuData.stuId, 0);
            t.getCourcount(1, stuData.stuId, 1);//方便查找已完结个数
        };


        stu_courseDo.prototype.slect = function (type) {
            var t = this;
            t.loadCourse(1, stuData.stuId, type);
        }

        stu_courseDo.prototype.bindEvent = function () {
            var t = this;

            t.$a.bind('click', function (event) {
                t.slect(0);
            });

            t.$b.bind('click', function (event) {
                t.slect(1);
            });
        };
        stu_courseDo.prototype._init = function () {
            var t = this;
            t.init();
            t.bindEvent();
        };
        stu_courseDo.prototype.render = function () {
            this._init();
        };
        return stu_courseDo;
    }
);