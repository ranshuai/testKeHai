/**
 * Created by bbb on 2015/12/18.
 */
/**
 * Created by bbb on 2015/12/11.
 */
define([
        'jquery',
        'loadHotCourse',
        'sanhai_evaluate',
        'money',
        'pageBar',
        'app/site/list/intoPtCourse-1.0.0',
        'dialogs',
        'PTCoursePopBox',
        'common',
        'base',
        'jquery_ui_min',
        'kpTree'
    ],

    function ($, loadHotCourse, sanhai_evaluate, money, pageBar,intoPtCourse,dialogs,popBox,common) {

        function ptCourseDetailsDo() {

        }

        window.openWindow = function(url) {
            //console.log("打开一个窗口");
            var width = window.screen.availWidth;
            var height = window.screen.availHeight;
            var tempWindow = window.open(url, '_blank','channelmode=yes,fullscreen=no,location=0,width=' + width + ",height=" +height + ",top=0, left=0");
            return false;
        }

        ptCourseDetailsDo.prototype.binarySearch=function(arrs, index) {
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

        ptCourseDetailsDo.prototype.init = function () {

            /*只有学生身份显示购物车*/
            if(user.userIdentity==2){
                $('.shopping_car').removeClass('hide');
            }
            var t = this;
            /*tab切换*/
            $('.tab .tabList li').click(function () {
                var index = $(this).index();
                $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
                $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
            });
            $('.popBox').dialog({
                autoOpen: false,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).dialog("close")
                }
            });

            $('.pushBtnJs').click(function () {
                var courseMode = $(this).parent('div').children('input').eq(0).val();
                var courseId = $(this).parent('div').children('input').eq(1).val();
                $("#pushNotice").dialog("open");

                $('#courseMode1').val(courseMode);
                $('#courseId').val(courseId);
                return false;
            });
            $('.push_btnJs').click(function () {
                return false;
            });
            $('.cancelBtn').click(function () {

                $(".pushNotice").dialog("close");
            });
            (function () {
                var aView_reply = $('.view_reply');
                var aA = $('.bottom_r a');
                var aSpan = $('.bottom_r').find('span');
                aA.toggle(function () {
                    var $this = $(this);
                    $this.addClass('ac');
                    aView_reply.eq(aA.index($this)).removeClass('hide');
                    $this.children('em').text('回复收起');
                }, function () {
                    var $this = $(this);
                    var num = $this.children('.bot_span').text();
                    //alert(num);
                    $this.removeClass('ac');
                    aView_reply.eq(aA.index($this)).addClass('hide');
                    $this.children('em').text('查看回复');
                    $this.children('.bot_span').text(num);
                });
            })();
            /****************************************************************/

            //客服中心hover效果
            $('.serviceList').rNavhover();
            //切换身份hover效果
            $('.tabRole').rNavhover();
            //切换机构身份
            $('.select_type_List').rSetUpTab();

            $('.subTitleBar_text1').placeholder({value: '请输入课程名称、关键词等...'})
            $('.reason').mouseover(function () {
                $('.reject_reason').show();
            });
            $('.reason').mouseout(function () {
                $('.reject_reason').hide();
            });
            /*************************错题一对一情况下不显示老师信息和购买者********************************************/

            if(ptCourseDetailData.teacherId!=0){
                $('.com_detail_Information').eq(0).removeClass('hide');
            }
            if(ptCourseDetailData.studentId!=ptCourseDetailData.schoolId){
                $('.com_detail_Information').eq(1).removeClass('hide');
                $('.ul_main').children('li').eq(3).removeClass('noBorder');
                $('.ul_main').children('li').eq(4).removeClass('hide');
                $('.ul_nav').children('li').eq(4).removeClass('hide');
            }
            $(".grade").text(common.df.grade(ptCourseDetailData.gradeId+""));
           $(".subject").text(common.df.dataCode(ptCourseDetailData.subjectId+""));

            /****************************************************************************/

            aLLcourseId = ptCourseDetailData.courseallid;
            orgidid = ptCourseDetailData.orgiiiid;
            var course = ptCourseDetailData.data;
            var evaluateRey = course.data.evaluateRey;//最新回复
            evaluateReyresult = evaluateRey;
            var goodEvaluateRecordTotal = ptCourseDetailData.goodEvaluateRecordTotal;
            var evaluateTotal = ptCourseDetailData.evaluateTotal;
            var goodrate = new Number((goodEvaluateRecordTotal / evaluateTotal)).toFixed(2) * 1000/10;
            var data = "courseId=" + aLLcourseId + "&parm=total1&";
            /*t.loadonetooneevaluate1(url, data, 1);*/
            if (!isNaN(goodrate)) {
                $("#goodrate").text(goodrate + "%");
                $("#goodrate1").text(goodrate + "%");
            } else {
                $("#goodrate").text("0" + "%");
                $("#goodrate1").text("0" + "%");
            }
            var orgScore = ptCourseDetailData.avgorgScore;
            var teaScore = ptCourseDetailData.avgteaScore;
            var sourceScore = ptCourseDetailData.avgsourceScore;
            score(orgScore, 'red_js3');
            score(teaScore, 'red_js2');
            score(sourceScore, 'red_js1');
            $("#avgsourceScore").text(sourceScore + "分");
            $("#avgteaScore").text(teaScore + "分");
            $("#avgorgScore").text(orgScore + "分");
            $("#avgsourceScore1").text(sourceScore + "分");
            $("#avgteaScore1").text(teaScore + "分");
            $("#avgorgScore1").text(orgScore + "分");
            var startTime = ptCourseDetailData.startTime;
            $("#classStartTime").text(new Date(startTime).format("MM-dd hh:mm"));
           /* var startTime = ptCourseDetailData.startTime;
            var time = new Date().getTime();
            if (time < parseFloat(startTime)) {
                $("#pt").text("抢旁听");
            }
            $("#classStartTime").text(new Date(startTime).format("MM-dd hh:mm"));
            new intoPtCourse().loadPlanPtCourse(ptCourseDetailData.orderId, 1);
            //进入旁听
            new intoPtCourse().intoPtCourse($("a#pt"), ptCourseDetailData.classId);*/


            var teaTag=ptCourseDetailData.teaTag;
            var tags=teaTag.split(",");
            var tagHtml="";
            if(teaTag!=''){
                for(var k = 0; k < tags.length; k++){
                    var tag=tags[k];
                    tagHtml+="<span >"+ tag+"</span>";
                }
            }

            $('.tag').html(tagHtml);

            //系列课程安排
            var html="";
            for (var k = 0; k < course.data.arrangeCourseList.length; k++) {
                var classdata=course.data.arrangeCourseList[k];

                var knowledgePoints=classdata.knowledgePoints;
                knowledgePoints=knowledgePoints.substr(1,knowledgePoints.length-2);
                var knowledgePoint=knowledgePoints==''?'':knowledgePoints.split(",");
                var knowHtml="";
                if(knowledgePoint.length<=0){
                    knowHtml="暂无知识点";
                }
                for(var j = 0; j < knowledgePoint.length; j++){
                    var point=knowledgePoint[j];
                    var knowledge=t.binarySearch(zNodes, parseInt(point));
                    knowHtml+="<span>"+(knowledge==undefined?"":knowledge.name)+"</span>&nbsp;&nbsp;&nbsp;"
                }

                html+=" <tr>";
                html+="<td>";
                html+="<div class='tl'>";
                html+="<a href=\"/site/ptcourse/" + classdata.ptId + "/detail.htm\" target=\"_blank\"><strong >"+classdata.theme+"</strong></a>";
                html+="</div>";
                html+="</td>";
                html+="<td>";
                html+="<div class='tc'>";
                html+="<strong >" + new Date(parseFloat(classdata.classStartTime)).format("MM-dd hh:mm") + "</strong>";
                html+="</div>";
                html+="</td>";
                html+="<td>";
                html+="<div class='tc'>";
                html+=" <strong >"+knowHtml+"</strong>";
                html+="</div>";
                html+="</td>";
                html+="</tr>";
            }

            $('#planClass').html(html);

            //知识点
            var knowledgePoints=ptCourseDetailData.knowledgePoints;
            knowledgePoints=knowledgePoints.substr(1,knowledgePoints.length-2);
            var knowledgePoint=knowledgePoints==''?'':knowledgePoints.split(",");
            var knowHtml="";
            for(var k = 0; k < knowledgePoint.length; k++){
                var point=knowledgePoint[k];
                var knowledge=t.binarySearch(zNodes, parseInt(point))
                knowHtml+="<span>"+(knowledge==undefined?"":knowledge.name)+"</span>&nbsp;&nbsp;&nbsp;"
            }
            if(knowledgePoint.length<=0){
                knowHtml="暂无知识点";
                $('#1_1').after('<div style="padding-left: 15px">'+knowHtml+'</div>');
            }else{
                $('#1_1').after('<p style="padding-left: 15px">'+knowHtml+'</p>');
            }
            //课件
            var courseWare=ptCourseDetailData.courseWare;
            var courseWareResId=ptCourseDetailData.courseWareResId;
            var courseWareFileType=ptCourseDetailData.courseWareFileType;
            var wareHtml="";
            if(courseWare!=''&&courseWareFileType==0){
                wareHtml+="<tr>";
                wareHtml+="<td>";
                wareHtml+="<div>";
                wareHtml+="<img src='/front/sanhai/images/doc.png' alt='图片'/>";
                wareHtml+="<strong>"+courseWare+"</strong>";
                wareHtml+="</div>";
                wareHtml+="</td>";
                wareHtml+="<td>";
                wareHtml+="<div class='tr'>";
                wareHtml+="<a href='/file/dow/"+courseWareResId+".r'>";
                wareHtml+="<em class='loadFile'></em>";
                wareHtml+="<strong class='blue'>下载</strong>";
                wareHtml+="</a>";
                wareHtml+="</div>";
                wareHtml+="</td>";
                wareHtml+="</tr>";
            }else if(courseWare!=''&&courseWareFileType==1){
                wareHtml+="<tr>";
                wareHtml+="<td>";
                wareHtml+="<div>";
                wareHtml+="<img src='/front/sanhai/images/ppt.png' alt='图片'/>";
                wareHtml+="<strong class='font18'>"+courseWare+"</strong>";
                wareHtml+="</div>";
                wareHtml+="</td>";
                wareHtml+="<td>";
                wareHtml+="<div class='tr'>";
                wareHtml+="<a href='/file/dow/"+courseWareResId+".r'>";
                wareHtml+="<em class='loadFile'></em>";
                wareHtml+="<strong class='blue'>下载</strong>";
                wareHtml+="</a>";
                wareHtml+="</div>";
                wareHtml+="</td>";
                wareHtml+="</tr>";
            }else if(courseWare!=''&&courseWareFileType==3){
                wareHtml+="<tr>";
                wareHtml+="<td>";
                wareHtml+="<div>";
                wareHtml+="<img src='/front/sanhai/images/pdf.png' alt='图片'/>";
                wareHtml+="<strong class='font18'>"+courseWare+"</strong>";
                wareHtml+="</div>";
                wareHtml+="</td>";
                wareHtml+="<td>";
                wareHtml+="<div class='tr'>";
                wareHtml+="<a href='/file/dow/"+courseWareResId+".r'>";
                wareHtml+="<em class='loadFile'></em>";
                wareHtml+="<strong class='blue'>下载</strong>";
                wareHtml+="</a>";
                wareHtml+="</div>";
                wareHtml+="</td>";
                wareHtml+="</tr>";
            }else{
                if(courseWare!=''){
                    wareHtml+="<tr>";
                    wareHtml+="<td>";
                    wareHtml+="<div>";
                    wareHtml+="<img src='/front/sanhai/images/pdf.png' alt='图片'/>";
                    wareHtml+="<strong class='font18'>"+courseWare+"</strong>";
                    wareHtml+="</div>";
                    wareHtml+="</td>";
                    wareHtml+="<td>";
                    wareHtml+="<div class='tr'>";
                    wareHtml+="<a href='/file/dow/"+courseWareResId+".r'>";
                    wareHtml+="<em class='loadFile'></em>";
                    wareHtml+="<strong class='blue'>下载</strong>";
                    wareHtml+="</a>";
                    wareHtml+="</div>";
                    wareHtml+="</td>";
                    wareHtml+="</tr>";
                }else{
                    wareHtml+="暂无课件";
                }

            }

            $('#ware').html(wareHtml);

            t.loadQuestion(ptCourseDetailData.topics);
        };


        ptCourseDetailsDo.prototype.loadonetooneevaluate1 = function (url, data, currPage) {
            var t = this;
            var a = data;
            data += "currentPage=" + currPage;
            //console.log(a);
            //console.log(data)
            $.ajax({
                url: url,
                data: data,
                type: "post",
                success: function (result) {

                    /*  if (common.checkResponse(result) == false) {
                     return;
                     }
                     if (common.checkResponse(evaluateReyresult) == false) {
                     return;
                     }*/

                    /*   //console.log(result.data);

                     //console.log(result.data.pageSize);*/
                    //console.log(result);
                    var val = result.data.rows;//评论记录
                    //t.sercheEvaluate(val, evaluateReyresult);
                    var params = new Array();
                    params.push("/site/course/searchEvaluateBymodel.do");
                    params.push(a);
                    //console.log("------------------");
                    //console.log("totalPages-->" + result.data.totalPages);
                    //console.log("currPage-->" + result.data.currPage);
                    //console.log("------------------");
                    pageBar.setBasePageBar(result.data.totalPages, result.data.currPage, t.loadonetooneevaluate1, params);

                }
                ,
                error: function (xhr, status, error) {
                    //alert("请求失败.");
                }
            });

        }

        /*加载题目内容*/
        ptCourseDetailsDo.prototype.loadQuestion = function (topics) {
            var t = this;
            topics= t.Trim(topics,'g');
            $.ajax({
                url: "/site/ptcourse/loadQuestion.do",
                type: "post",
                data: {
                    "topics": topics
                },
                success: function (result) {
                $('#1_2').after('<div style="padding-left: 15px">'+result.data.question+'</div>')
                    $('.pd25').last().css('border','none');
                }
                ,
                error: function (xhr, status, error) {
                    //alert("请求失败.");
                }
            });

        }

        ptCourseDetailsDo.prototype.Trim=function(str,is_global){

            var result;

            result = str.replace(/(^\s+)|(\s+$)/g,"");

            if(is_global.toLowerCase()=="g")

            {

                result = result.replace(/\s/g,"");

            }

            return result;

        }


        /*查看最新评论*/
        ptCourseDetailsDo.prototype.sercheEvaluate = function (val, evaluateReys) {
            var tab = "";
            //debugger;
            if (val.length > 0) {
                for (var k = 0; k < val.length; k++) {
                    if (k < 6) {
                        var time = new Date(parseFloat(val[k].time)).format("yyyy-MM-dd hh:mm:ss");
                        /*var time = val[k].time;*/
                        var evaurl = "";
                        if (val[k].ppResId == "" || val[k].ppResId == 0) {
                            evaurl = "/front/sanhai/images/person.png";
                        } else {
                            evaurl = "/file/loadImage/" + val[k].ppResId + "/60/60.r";
                        }
                        tab += "<li class='dialogItem '>" +
                            "<div class='head_img'>" +
                            "<a href='#'><img STYLE='width:60px; height:60px;' src='" + evaurl + "'>" + val[k].userName + "</a>" +
                            " </div>" +
                            "<i class='arrow'></i>" +
                                /*  "<div class='title'>" +*/
                                /*"<em>"+val[k].des+"</em>"+*/
                            "<div class='title_r fr'>" +
                            "<span>课程：" + val[k].sourceScore + "分</span>" +
                            "<span>老师：" + val[k].teaScore + "分</span>" +
                            "<span>服务：" + val[k].orgScore + "分</span>" +
                            "</div>" +
                                /* "</div>" +*/
                            "<div class='dialogCont'>" +
                            val[k].des +
                            " </div>" +
                            "<div class='bottom_tools'>" +
                                /*"<span>" + time + "</span>&nbsp;&nbsp;&nbsp;<span><a href='/site/course/" + val[k].courseId + "/courseContent.htm'>《" + val[k].courseName + "》</a></span>";*/
                            "<span>" + time + "</span>";

                        if (evaluateReys.length > 0) {
                            var evaluateId = val[k].evaid;
                            var str = "";
                            var evaluateReyLength = 0;
                            for (var j = 0; j < evaluateReys.length; j++) {
                                var evakeyurl = "";
                                if (val[k].ppResId == "" || val[k].ppResId == 0) {
                                    evakeyurl = "/front/sanhai/images/person.png";
                                } else {
                                    evakeyurl = "/file/loadImage/" + evaluateReys[j].ppResId + "/60/60.r";
                                }
                                if (evaluateReys[j].evaid == evaluateId) {
                                    evaluateReyLength++;
                                    var ti = new Date(parseFloat(evaluateReys[j].reTime)).format("yyyy-MM-dd hh:mm:ss");
                                    /*var ti = evaluateReys[j].reTime;*/
                                    str += "<dl class='clearfix'>" +
                                        "<dt><img STYLE='width:60px; height:60px;' src='" + evakeyurl + "'></dt>" +
                                        "<dd><em>" + evaluateReys[j].reUserName + "：</em>" + evaluateReys[j].content + "</dd>" +
                                        "<dd><span>" + ti + "</span></dd>" +
                                        "</dl>";
                                }

                            }
                            tab += "<div class='bottom_r'>" +
                                "<a>" +
                                "<em>查看回复</em>" +
                                "<span class='bot_span'>(" + evaluateReyLength + ")</span>" +
                                "</a>" +
                                "</div>" +
                                "</div>" +
                                "<div class='view_reply hide'>";
                            tab += str;
                            evaluateReyLength = 0;
                        }


                        tab += "</div>" +
                            "</li>";
                    } else {
                        break;
                    }

                }
            }


            $("#sereva").html(tab);

            $('#sereva li').each(function () {
                $(this).find('dl:last').addClass('last_dialogItem');
            });

            /*最新评论*/
            $('.dialogList li').each(function (i) {
                var $this = $(this);
                $(this).find('.bottom_r a').click(function () {
                    var num = $this.find('.bot_span').text().substring(1, $this.find('.bot_span').text().length - 1);
                    if (num == 0) return false;
                    if ($this.find('.view_reply').css('display') == 'block') {
                        $this.find('.view_reply').addClass('hide');
                        $this.find('.bottom_r').children('a').removeClass('ac');
                        $this.find('.bottom_r').find('em').text('查看回复');
                        $this.siblings().find('.view_reply').addClass('hide');
                        $this.siblings().find('.bottom_r').children('a').removeClass('ac');
                    } else {
                        $this.find('.view_reply').removeClass('hide');
                        $this.find('.bottom_r').children('a').addClass('ac');
                        $this.find('.bottom_r').find('em').text('收起回复');
                        $this.siblings().find('.view_reply').addClass('hide');
                        $this.siblings().find('.bottom_r').children('a').removeClass('ac');
                    }
                    $(document).click(function () {
                        $('.view_reply').addClass('hide');
                        $('.bottom_r').find('em').text('查看回复');
                        $('.bottom_r').children('a').removeClass('ac');
                    });
                    return false;
                });
            });

        };

        getSubjectId = function (subject) {
            switch (subject) {
                case "语文":
                    return "10010";
                case "数学":
                    return "10011";
                case "英语":
                    return "10012";
                case "生物":
                    return "10013";
                case "物理":
                    return "10014";
                case "化学":
                    return "10015";
                case "地理":
                    return "10016";
                case "历史":
                    return "10017";
                case "政治":
                    return "10018";
                case "品德与生活":
                    return "10019";
                case "美术":
                    return "10020";
                case "音乐":
                    return "10021";
                case "体育":
                    return "10022";
                case "信息技术":
                    return "10023";
                case "法制":
                    return "10024";
                case "综合实践":
                    return "10025";
                case "科学":
                    return "10026";
                case "理综":
                    return "10027";
                case "文综":
                    return "10028";
                case "思想品德":
                    return "10029";
                case "一年级":
                    return "1001";
                case "二年级":
                    return "1002";
                case "三年级":
                    return "1003";
                case "四年级":
                    return "1004";
                case "五年级":
                    return "1005";
                case "六年级":
                    return "1006";
                case "预初":
                    return "1007";
                case "初一":
                    return "1008";
                case "初二":
                    return "1009";
                case "初三":
                    return "1010";
                case "高一":
                    return "1011";
                case "高二":
                    return "1012";
                case "高三":
                    return "1013";
                default :
                    return "";
            }
        };
        /**
         * 收藏课程
         * @param courseId
         * @param coursemode
         */
        collection = function (val, courseId, coursemode) {
            //alert(courseId+" "+coursemode)
            $.ajax({
                url: "/collection/intoCollection.do",
                type: "post",
                dataType: "json",
                data: {
                    courseId: courseId,
                    courseMode: coursemode
                },
                success: function (response) {

                    //console.log(response.resCode);

                    if ("000" == response.resCode) {
                        Kh.collectHeart(val);
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                    }
                }
            });
        }


        /**
         * 首页左侧菜单事件
         * @param content   事件触发元素
         * @param level     菜单级别 1 = 第一级；2 = 第二级
         */
        toSelectMainCourse = function (content) {
            var subjectId = getSubjectId(content.text());
            var url = "/site/course/ignore/" + subjectId + "/courseTransfer.htm";
            location.href = url;
        }

        toSelectMainCourse1 = function (content) {
            var subjectId = getSubjectId(content.text());
            var url = "/site/course/ignore/" + subjectId + "/ignore/ignore/ignore/ignore/courseTransfer.htm";
            location.href = url;
        }

        ptCourseDetailsDo.prototype.evaluate1 = function (parm) {
            var t = this;
            var data = "courseId=" + aLLcourseId + "&parm=" + parm + "&";
            t.loadonetooneevaluate1(url, data, 1);
        };

        ptCourseDetailsDo.prototype.bindEvent = function () {
            var t = this;
            $('.all_comments').children('li').eq(0).bind('click', function (event) {
                t.evaluate1('total1');
            });
            $('.all_comments').children('li').eq(1).bind('click', function (event) {
                t.evaluate1('good');
            });
            $('.all_comments').children('li').eq(2).bind('click', function (event) {
                t.evaluate1('medium');
            });
            $('.all_comments').children('li').eq(3).bind('click', function (event) {
                t.evaluate1('difference');
            });

            $("#pt").bind('click', function (event) {
                var courseid=$('#courseid').val();
                var studentId=$('#studentId').val();
                var classid=$('#classid').val();
                t.popBuyAudit(courseid,studentId,classid);
            });

            $("#listen").bind('click', function(event) {

                var classid=$('#classid').val();
                t.userListen(classid);
            });
        };


        ptCourseDetailsDo.prototype.userListen = function (classId) {
            var startTime = ptCourseDetailData.startTime;
            var courseStatus = ptCourseDetailData.ptCourseStatus;
            var userId = ptCourseDetailData.userId;
            var userIdentity=ptCourseDetailData.userIdentity;
            if (userId == "null") {
                location.href = "/login.htm";
                return;
            }
            if(userIdentity!=null&&userIdentity!=2){
                dialogs._timer("抱歉，请用学生身份登录哦", 2,2,"");
                return;
            }
            if (courseStatus != "700104"){
                dialogs._timer("抱歉，老师还未上课哦，待会再来吧", 2,2,"");
                return;
            }
            $.ajax({url:"/videoClass/listen.do",
                    type:"post",
                    dataType:"json",
                    data:{classId:classId,startTime:startTime},
                    success: function(response){

                        if (response.resCode == "000"){
                                var url = response.data.url;
                                if (typeof url == "undefined") return false;
                                var text_num =9;
                                var timer = null;
                                dialogs._confirm('马上进入教室，准备好了吗?','操作提示',function(){
                                    //发请求试听次数减一
                                    $.ajax({url:"/videoClass/updateUserAuditionNum.do",
                                        type:"post",
                                        dataType:"json",
                                        data:{},
                                        success: function(response){
                                        }
                                    });
                                    openWindow(url);
                                    //clearInterval(timer);
                                },function(){
                                    //clearInterval(timer);
                                });


                                //clearInterval(timer);
                                //timer = setInterval(function(){
                                //    text_num --;
                                //    $('.confirm_dialog_box .popbox_item p').text('马上进入教室，准备好了吗？还有 '+text_num+'  秒自动关闭');
                                //    if(text_num<=0){
                                //        clearInterval(timer);
                                //        $('.popBox ').remove();
                                //        //发请求试听次数减一
                                //        $.ajax({url:"/videoClass/updateUserAuditionNum.do",
                                //            type:"post",
                                //            dataType:"json",
                                //            data:{},
                                //            success: function(response){
                                //            }
                                //        });
                                //        openWindow(url);
                                //    }
                                //},1000);

                        }else{
                                dialogs._wait(response.resMsg, 2, null);
                        }
                    }
            })

        };

        ptCourseDetailsDo.prototype.popBuyAudit = function (courseId,studentId,classid) {
            //判断是否登录
            var userId = ptCourseDetailData.userId;
            var userIdentity=ptCourseDetailData.userIdentity;
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
                    var isEnough  = true;
                    $.each(response.data.allArrangeCourseList, function (index_1, item_1) {
                        isBuy=false;
                        htmlStr += "<div class='courItem clearfix'>";
                        htmlStr += "<div class='fl tl' style='width:240px'>";
                        $.each(response.data.arrangeCourseList, function (index, item_2) {
                            if(item_1.classId==item_2.classId){
                                isBuy=true;
                            }
                        });
                       /* if (response.data.ptSeatNotEnoughList != undefined) {
                            $.each(response.data.ptSeatNotEnoughList, function (index, item_3) {
                                if (item_1.classId == item_3) {
                                    isEnough = false;
                                }
                            });
                        }*/
                        if(isBuy==true/* || isEnough == false*/){
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
                    popBox.selBoxAll();

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

        ptCourseDetailsDo.prototype._init = function () {
            var t = this;
            t.init();
            t.bindEvent();
            loadHotCourse.loadHotCourse();
        };
        ptCourseDetailsDo.prototype.render = function () {
            this._init();
        };

        return ptCourseDetailsDo;
    }
);