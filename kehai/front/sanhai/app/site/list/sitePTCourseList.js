/**
 * Created by bbb on 2015/12/10.
 */

define('sitePTCourseList', ['jquery', 'common', 'money', 'pageBar', 'dialogs', 'intoPtCourse','PTCoursePopBox', 'base','jquery_ui_min','kpTree'], function ($, common, money, pageBar, dialogs, intoPtCourse,PopBox) {
    /**
     * 显示数据检索过滤条
     * @param selectNavCallback
     */
    var showSelectNav = function (selectNavCallback) {
        $.each($(".sele_c_list input"), function (index, item) {
            var inputId = $(this).attr("id");
            var inputVal = $("#" + inputId).val();
            if (inputId != "courseTitle" && inputId != "orgname" && inputId != "name" && inputVal != "ignore" && inputId != "sortType"&& inputId != "theme") {
                var title = $(".sele_list div[data=" + inputId + "]").text();
                var val = $(".sele_list ul li a[code=" + inputVal + "]").eq(0).text();
                $(".sele_list ul li a[code=" + inputVal + "]").eq(0).addClass('ac');
                var tit_index = $('.sele_li_tit').index($(".sele_list ul li a[code=" + inputVal + "]").eq(0).parents('.sele_list').find('.sele_li_tit'));
                $('<li><span class="span_bor"><span data="' + tit_index + '">' + title + '</span><span class="after">:</span><span class="ac">' + val + '</span><i class="del" data=' + inputId + ' num=' + index + '></i></span></li>').appendTo($('.sele_c_list'));
                $('.del').click(function () {
                    var same = $(this).attr('num');
                    $(" a[code=" + inputVal + "]").removeClass('ac');
                    $(this).parents('li').remove();
                    var codeKey = $(this).attr("data");
                    $("#" + codeKey).val("ignore");
                    if ($("#courseTitle")) {
                        $("#courseTitle").val("ignore");
                    }
                    if ($("#orgname")) {
                        $("#orgname").val("ignore");
                    }
                    if ($("#name")) {
                        $("#name").val("ignore");
                    }
                    selectNavCallback(1);
                });
            }

        });

        /**
         * 显示多行内容时折叠与展开
         * @returns {boolean}
         */
      
        function findInArr(arr, num) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == num) {
                    return true;
                }
            }
            return false;
        };

         $('.sel_more').toggle(function(){
                    var $this = $(this);
                    //console.log(1)
                    $this.parent('.sele_list').find('.sele_li_list').addClass('h_auto');
                    $this.find('span').html('收起<i class="sel_more_stop"></i>')
             },function(){
                    var $this = $(this);
                    //console.log(2)
                    $this.parent('.sele_list').find('.sele_li_list').removeClass('h_auto');
                    $this.find('span').html('更多<i ></i>')
             });        
        /*点击选项添加内容*/
        //给选中的元素添加自定义属性
        var num = 0;
        $('.sele_list ul').undelegate();
        $('.sele_list ul').delegate('a', {
            'click': function () {
                $this = $(this);
                var oCode = $this.attr("code");
                var oData = $this.parents('.sele_list').find('div').attr("data");
                $this.attr('num', num);
                $this.addClass('ac').parent().siblings().find('a').removeClass('ac');
                var oSele_li_tit = $this.parents('.sele_list').find('.sele_li_tit').text();
                var oSele_li_list = $this.text();
                var tit_index = $('.sele_li_tit').index($this.parents('.sele_list').find('.sele_li_tit'));
                //保存选中的选项往sele_c_list里添加li
                var arr = [];
                $('<li><span class="span_bor"><span data="' + tit_index + '">' + oSele_li_tit + '</span><span class="after">:</span><span class="ac">' + oSele_li_list + '</span><i class="del" data=' + oData + ' num=' + num + '></i></span></li>').appendTo($('.sele_c_list'));
                //选中的id
                num++;
                $('.sele_c_list li span:first-child').each(function () {

                    //console.log($(this).attr('data'));
                    if (!findInArr(arr, $(this).attr('data'))) {
                        arr.push($(this).attr('data'));
                    } else if (findInArr(arr, $(this).attr('data'))) {
                        $(this).parent().prevAll('li').find('span[data = ' + tit_index + ']').parents('li').remove();
                    }
                });
                // sele_c_list里del点击删除父级， 和自己属性一样的元素删除class
                $('.del').click(function () {

                    var same = $(this).attr('num');
                    $('a[num=' + same + ']').removeClass('ac');
                    $(this).parents('li').remove();
                    var codeKey = $(this).attr("data");
                    $("#" + codeKey).val("ignore");
                    selectNavCallback(1);
                });
                $("#" + oData).val(oCode);
                if ($("#courseTitle")) {
                    $("#courseTitle").val("ignore");
                }
                if ($("#orgname")) {
                    $("#orgname").val("ignore");
                }
                if ($("#name")) {
                    $("#name").val("ignore");
                }
                selectNavCallback(1);
            }

        });
        $('.sele_list .sel_more').find('span').css('cursor', 'pointer');
    }

    /*加载题目内容*/
    var loadQuestion = function (topics) {
        //console.log(topics);
        topics=Trim(topics,'g');
        $.ajax({
            url: "/site/ptcourse/loadQuestion.do",
            type: "post",
            data: {
                "topics": topics
            },
            success: function (result) {
                $('#questionData').html(result.data.question)
            }
            ,
            error: function (xhr, status, error) {
                //alert("请求失败.");
            }
        });
    }

    var Trim =function(str,is_global){

        var result;

        result = str.replace(/(^\s+)|(\s+$)/g,"");

        if(is_global.toLowerCase()=="g")

        {

            result = result.replace(/\s/g,"");

        }

        return result;

    }

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

    /**
     * 加载旁听课程信息
     * @param currPage
     */
    var loadSelectPtCourse = function (currPage,index,oignore) {
        $("#pageBar").html('');
        $("#courseCount").html('');
        var userId = user.userId;
        var userIdentity=user.userIdentity;
        var courseTitle = encodeURI(encodeURI($("#courseTitle").val()));
        var theme = encodeURI(encodeURI($("#theme").val()));
        var url = "/site/ptcourse/" + $("#courseType").val() + "/" + $("#gradeId").val() + "/" + $("#subjectId").val() + "/" +
            $("#stuScore").val() + "/" + $("#teachTime").val() + "/" + courseTitle + "/" + $("#sortType").val() + "/" + currPage + "/"+theme+"/"+$("#searchtype").val()+"/"+$("#dataId").val()+"/selectCourse.do";

        var lode='<div class="load_wrap tc pr">'+
            '<img class="pa" src="/front/sanhai/images/loading.gif" alt=""/>'+
            '</div>';
        $("#contentDiv").html(lode);
        $.post(url, function (response, status, xhr) {

            // 是否有课程
            if (null == response.data.list) {
                $("#contentDiv").html("没有对应课程信息");
            } else {

                $("#contentDiv").empty();
                // 默认图片
                var fileImg = "";
                var userImg = "";
                var teaImg = "";
                var orgImg = "";
                //console.log($('.login_main_l_nav .main_l_nav').children().size());
                /***************************推荐课程***************************************/

                var data=response.data.knowOrQuestionList;
                var sorttype=$("#searchtype").val();
                /******************************不显示短板暂时注释*******************************************/
                /*if(sorttype=='Know'&&userId != "null"&&userIdentity==2){
                    if(data!=""){
                        if($('#subjectId').val() != oignore){
                            $('.login_main_l_nav').empty();
                            $('<span id="errorNum" class="pa login_error_date"></span><span class="nav_bg1 pa"><</span><span class="nav_bg2 pa">></span><div class="main_l_nav_scope pr"><ul class="main_l_nav"></ul></div>').appendTo($('.login_main_l_nav'));
                            //计算main_l_nav 的宽度
                            var WPX = 0;
                            for(var i = 0; i<data.length; i++){
                                var qid=data[i].kid
                                var qname=data[i].kpointname;
                                var list = $('<li class="pr js-li "><a href="javascript:;" class="p0_12" data="'+qid+'">'+qname+'</a></li>');
                                list.appendTo($('.login_main_l_nav .main_l_nav'));
                                WPX+=$('.login_main_l_nav ').find('.js-li').eq(i).width();
                            };
                            $('.login_main_l_nav .main_l_nav').css('width',(WPX+2));
                        }
                        if(index==undefined){
                            $('.login_main_l_nav .main_l_nav .js-li').eq(0).find('a').addClass('orange');
                        }else{
                            $('.login_main_l_nav .main_l_nav .js-li a').removeClass('orange');
                            $('.login_main_l_nav .main_l_nav .js-li').eq(index).find('a').addClass('orange');
                        }
                        $('#errorNum').empty();
                        $('#errorNum').html("共<span class='orange' >"+data.length+"</span>个知识点</span>");
                    }else{
                        $('.login_main_l_nav .main_l_nav').empty();
                        var list = $('<li class="pr js-li "><a href="javascript:void(0);" class="p0_12" >您暂无知识点短板数据</a></li>');
                        list.appendTo($('.login_main_l_nav .main_l_nav'));
                        $('#errorNum').empty();
                        $('#errorNum').html("共<span class='orange' >0</span>个知识点</span>");
                    }

                }
                if(sorttype=='Topic'&&userId != "null"&&userIdentity==2){
                    if(data!=""){
                        if($('#subjectId').val() != oignore){
                            $('.login_main_l_nav').empty();
                            $('<span id="errorNum" class="pa login_error_date"></span><span class="nav_bg1 pa"><</span><span class="nav_bg2 pa">></span><div class="main_l_nav_scope pr"><ul class="main_l_nav clearfix"></ul></div>').appendTo($('.login_main_l_nav'));
                            for(var i = 0; i<data.length; i++){
                                var qid=data[i].questionId;
                                var list = $('<li class="pr js-li "><a href="javascript:;" class="p0_12" data="'+qid+'">题目'+qid+'</a></li>');
                                list.appendTo($('.login_main_l_nav .main_l_nav'));
                            };
                        }
                        if(index==undefined){
                            $('.login_main_l_nav .main_l_nav .js-li').eq(0).find('a').addClass('orange');
                        }else{
                            $('.login_main_l_nav .main_l_nav .js-li a').removeClass('orange');
                            $('.login_main_l_nav .main_l_nav .js-li').eq(index).find('a').addClass('orange');
                        }
                        $('#errorNum').empty();
                        $('#errorNum').html("共<span class='orange' >"+data.length+"</span>道错题</span>");
                        if($("#dataId").val() == 'ignore') {
                            loadQuestion($('.login_main_l_nav .main_l_nav .js-li').eq(0).find('a').attr('data'));
                        }else{
                            loadQuestion($("#dataId").val());
                        }
                    }else{
                        $('.login_main_l_nav .main_l_nav').empty();
                        var list = $('<li class="pr js-li p0_12"><a href="javascript:void(0);" class="p0_12" >您暂无题目短板数据</a></li>');
                        list.appendTo($('.login_main_l_nav .main_l_nav'));
                        $('#errorNum').empty();
                        $('#errorNum').html("共<span class='orange' >0</span>道错题</span>");
                        $('#questionData').empty();
                    }

                }*/

                /**********************************************************************/
                /******************************不显示短板暂时注释*******************************************/
                // 遍历所有记录
                var knowHtml="";

                var coursetype="";

                var knows="";

                var pushType="";

                $.each(response.data.list, function (index, value) {

                    //知识点
                    if(value.pushType==1){
                        pushType="point";
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
                            var knowledge=binarySearch(zNodes, parseInt(point))
                            knowHtml+=knowledge.name+" "
                        }
                    }

                    if(value.pushType==0){
                        pushType="subject";
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
                        pushType="";
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
                    content += "<dt class=\"fl pr\">";
                    content += "<a href=\"/site/ptcourse/" + value.ptId + "/detail.htm\" target=\"_blank\"><img src=" + fileImg + " >" +
                        "<i class=\""+pushType+"\"></i></a>";
                    content += "</dt>";
                    content += "<dd class=\"fl\">";
                    content += "<div class=\"class_detail\">";
                    content += "<h3><span class='orange'>"+coursetype+"</span>";
                    content += "<a href=\"/site/ptcourse/" + value.ptId + "/detail.htm\" target=\"_blank\">" + value.theme + "</a>";
                    content += "<em>【热招中】</em>";
                    content += "</h3>";
                    content += "<div class=\"PTSelCont pr\">";
                    content += "<p class='clearfix'>";
                    content += "<span class='fl'>"+knows+"</span>";
                    content +=  "<em style='width: 190px;display: inline-block' title='"+knowHtml+"' class='fl ellipsis'> "+knowHtml+"</em>";
                    content += "</p>";
                    content += "<p class=\"\">";
                    content += "<span>上课时间：</span>";
                    content += "<em>" + new Date(parseFloat(value.classStartTime)).format("MM月dd日 hh:mm") + "-"+
                        new Date(parseFloat(value.classStartTime)+parseFloat(value.courseTime*60*1000)).format("hh:mm") +"</em>";
                    content += "</p>";
                    content += "<p>";
                    content += "<span>旁听价格：</span>";
                    content += "<em class=\"orange font20\">" + money.fmoney(value.ptPrice / 100 * value.courseTime/60, 2) + "</em>";
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
                        /*content += "<li>";
                         content += "<span>在校平均分 ：</span>";
                         content += "<span>70</span>";
                         content += "</li>";*/
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
                     /*   content += "<li>";
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
                $("#courseCount").html('共筛选出<em class="orange">'+response.data.countSize+'</em>门相关课程');
                //显示分页工具条
                pageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                    //console.log("显示分页加载条: "+currPage);
                    loadSelectPtCourse(currPage);

                })
                // alert($('.com_sel_role').children('li').size());

                var timer = null;
                $('.com_sel_role').children('li').hover(function (ev) {
                    var scrollTop = $(document).scrollTop();
                    var scrollLeft = $(document).scrollLeft();
                    var $this = $(this);
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

                     if(userIdentity==0){
                         dialogs._timer('教师无购买权限',2,2,'');
                         return;
                     }else if(userIdentity==3){
                         dialogs._timer('学校无购买权限',2,2,'');
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
                            //var isEnough = true;
                            $.each(response.data.allArrangeCourseList, function (index_1, item_1) {
                                isBuy=false;
                                //isEnough = true;
                                htmlStr += "<div class='courItem clearfix'>";
                                htmlStr += "<div class='fl' style='width:240px'>";
                                $.each(response.data.arrangeCourseList, function (index, item_2) {
                                    if(item_1.classId==item_2.classId){
                                        isBuy=true;
                                    }
                                });
                                /*if (response.data.ptSeatNotEnoughList != undefined){
                                    $.each(response.data.ptSeatNotEnoughList, function(index, item_3){
                                        if (item_1.classId == item_3){
                                            isEnough = false;
                                        }
                                    })
                                }*/

                                if(isBuy==true /*|| isEnough == false*/){
                                    //if (isBuy){
                                        htmlStr += "<input type='checkbox' data='0' id='checkbox" + index_1 + "' name='classid'  disabled='disabled' value='" + item_1.classId + "' />";
                                    //}else{
                                    //    htmlStr += "<input type='checkbox' data='1' id='checkbox" + index_1 + "' name='classid'  disabled='disabled' value='" + item_1.classId + "' />";
                                    //}
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
        });

    }


    soft=function (val) {
        if (val == 1) {//综合
            $("#sortType").val("100");
            loadSelectPtCourse(1);
        }
        if (val == 2) {//人气
            $("#sortType").val("101");
            loadSelectPtCourse(1);
        }
        if (val == 3) {//销量
            $("#sortType").val("102");
            loadSelectPtCourse(1);
        }
        if (val == 4) {//评价
            $("#sortType").val("103");
            loadSelectPtCourse(1);
        }
    }

    /**
     * 加载热门课程
     */
    function loadHotCourse() {
        $.ajax({
            url: "/site/hotCourse.r",
            dataType: "json",
            success: function (response) {
                if (!common.checkResponse(response)) {
                    return false;
                }
                var htmlStr = "";
                $.each(response.data.list, function (index, item) {
                    var courseurl = "";
                    if (item.advertiseResId == "" || item.advertiseResId == 0 || item.advertiseResId == undefined) {
                        courseurl = "/front/sanhai/images/course.png";
                    } else {
                        courseurl = "/file/loadImage/" + item.advertiseResId + ".r?dim=180";
                    }
                    /* if(response.data.list.length-1==index){
                     htmlStr += '<dl class="main_r_cont_item clearfix noBorder">';
                     htmlStr += '<dt class="learn_together fl"><a href="/site/course/' + item.courseId + '/courseContent.htm"><img src='+courseurl+'></a></dt>';
                     htmlStr += '<dd>';
                     htmlStr += '<h4><a href="/site/course/' + item.courseId + '/courseContent.htm">' + item.courseTitle + '</a></h4>';
                     htmlStr += '<p class="select_classes_bg">' + item.sales + '人在学习</p>';
                     htmlStr += '</dd>';
                     htmlStr += '</dl>';
                     }else{
                     htmlStr += '<dl class="main_r_cont_item clearfix">';
                     htmlStr += '<dt class="learn_together fl"><a href="/site/course/' + item.courseId + '/courseContent.htm"><img src='+courseurl+'></a></dt>';
                     htmlStr += '<dd>';
                     htmlStr += '<h4><a href="/site/course/' + item.courseId + '/courseContent.htm">' + item.courseTitle + '</a></h4>';
                     htmlStr += '<p class="select_classes_bg">' + item.sales + '人在学习</p>';
                     htmlStr += '</dd>';
                     htmlStr += '</dl>';
                     }*/
                    var price = money.fmoney(Number(item.price) / 100, 2);
                    var couid = "'" + item.courseId + "'";
                    if (response.data.list.length - 1 == index) {
                        htmlStr += '<dl class="main_r_cont_item noBorder">';
                        htmlStr += '<dt class="learn_together"><a href="/site/course/' + item.courseId + '/courseContent.htm">' + item.courseTitle + '</a></dt>';
                        htmlStr += '<dd>';
                        htmlStr += '<p><strong>' + price + '</strong><span>' + item.sales + '人在学</span></p>';
                        htmlStr += '<p><a href="javascript:void(0);" class="audit">抢旁听</a><a href="javascript:void(0);" onclick="collection($(this),' + couid + ',' + item.courseMode + ')" class="add_love"><em></em>收藏</a></p>';
                        htmlStr += '</dd>';
                        htmlStr += '</dl>';
                    } else {
                        htmlStr += '<dl class="main_r_cont_item clearfix">';
                        htmlStr += '<dt class="learn_together"><a href="/site/course/' + item.courseId + '/courseContent.htm">' + item.courseTitle + '</a></dt>';
                        htmlStr += '<dd>';
                        htmlStr += '<p><strong>' + price + '</strong><span>' + item.sales + '人在学</span></p>';
                        htmlStr += '<p><a href="javascript:void(0);" class="audit">抢旁听</a><a href="javascript:void(0);" onclick="collection($(this),' + couid + ',' + item.courseMode + ')" class="add_love"><em></em>收藏</a></p>';
                        htmlStr += '</dd>';
                        htmlStr += '</dl>';
                    }
                });
                $("#hotCoursePanel").html(htmlStr);
            }
        });
    }


    return {
        loadSelectPtCourse: loadSelectPtCourse,
        showSelectNav: showSelectNav
    }

});