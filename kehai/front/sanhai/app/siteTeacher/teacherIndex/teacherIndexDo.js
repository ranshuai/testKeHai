/**
 * Created by slg on 2015/12/14.
 */
define('teacherIndexDo',['jquery','dialogs','money','dialogs','common','base','jquery_ui_min'],function($,dialog,money,dialogs){


    var tch=function(){
        /*只有学生身份显示购物车*/
        if(user.userIdentity==2){
            $('.shopping_car').removeClass('hide');
        }
        var colleague = tchbody.course.data.colleague;//同事
        var oneToOne = tchbody.course.data.oneToOne;//一对一
        var publicecourses = tchbody.course.data.publicecourses;//班课
        var teacherinfo = tchbody.course.data.teacherinfo;//老师个人信息

        showTeacherInfo(teacherinfo);
        showcolleague(colleague);
        showOnotoOne(oneToOne);
        showpublicCourse(publicecourses);
        var objdate="";
        if(tchbody.durations>99) {
            objdate="<i class='tc2'></i>教学时长：<span title='"+tchbody.durations+"'>99</span><b class='add'></b>"
        }else{
            objdate="<i class='tc2'></i>教学时长：<span title='"+tchbody.durations+"'>"+tchbody.durations+"</span><b></b>"
        }
        $('#durations').html(objdate);

        $('.teach_cont_list').children('li').eq(0).children('span').text(oneToOne.length+tchbody.publiccoursesCount);
        $('.teach_cont_list').children('li').eq(2).children('span').text(tchbody.buyCount);
        $('.teach_cont_list').children('li').eq(3).children('span').text(tchbody.orderNum);

        $('#navigation').children('li').eq(0).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherIndex.htm");
        $('#navigation').children('li').eq(1).children('a').attr("href","/site/theacher/"+oneteacherid+"/toCourse.htm");
        $('#navigation').children('li').eq(3).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherExperience.htm");
        $('#navigation').children('li').eq(4).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherEvaluate.htm");


        var evaluate = tchbody.course.data.evaluate.data;//最新评论
        var evaluateRey = tchbody.course.data.evaluateRey;//最新回复
        evaluateReyresult=evaluateRey;
        sercheEvaluate(evaluate,evaluateRey);

        var durations=(parseFloat(tchbody.durations)/60).toFixed(0);
        var goodrate=(tchbody.goodEvaluateRecordTotal/tchbody.evaluateTotal).toFixed(2)*1000/10;
        if(!isNaN(goodrate)){
            $("#goodrate").text((goodrate==0?0:goodrate)+"%");
            $('.teach_cont_list').children('li').eq(5).children('span').text(goodrate==0?0:goodrate);
        }else{
            $("#goodrate").text("0"+"%");
            $('.teach_cont_list').children('li').eq(5).children('span').text("0");
        }
        $('.teach_cont_list').children('li').eq(4).children('span').text(evaluate.length);


        $('.all_comment').children('ul').eq(0).children('li').eq(0).children('label').text("全部评论（"+tchbody.evaluateTotal+"）");
        $('.all_comment').children('ul').eq(0).children('li').eq(1).children('label').text("好评（"+tchbody.goodEvaluateRecordTotal+"）");
        $('.all_comment').children('ul').eq(0).children('li').eq(2).children('label').text("中评（"+tchbody.mediumEvaluateRecordTotal+"）");
        $('.all_comment').children('ul').eq(0).children('li').eq(3).children('label').text("差评（"+tchbody.differenceEvaluateRecordTotal+"）");

        //小评分
        score_small(tchbody.teaScore,'red_js4');
        $("#avgsourceScore1").text(tchbody.teaScore+"分");

        score(tchbody.orgScore,'red_js3');
        score(tchbody.teaScore,'red_js2');
        score(tchbody.sourceScore,'red_js1');
        $("#avgsourceScore").text(tchbody.sourceScore+"分");
        $("#avgteaScore").text(tchbody.teaScore+"分");
        $("#avgorgScore").text(tchbody.orgScore+"分");

        $('#total1').click(function(){ evaluate1('total1') });
        $('#good').click(function(){ evaluate1('good') });
        $('#medium').click(function(){ evaluate1('medium') });
        $('#difference').click(function(){ evaluate1('difference') });

        //展示老师个人信息
        function showTeacherInfo(val){//展示老师个人信息
            if(val.length>0){
                var data=val[0];
                $("#tramor").attr("href","/site/shool/"+data.orgId+"/findTeacher.htm")
                var tag=data.teaTag.split(",");
                var str="";
                if(data.teaTag!=""&&tag.length>0){
                    str+="<div class='tch_main_label'>";
                    for(var i=0;i<tag.length;i++){

                        str+="<span>"+tag[i]+"</span>"
                    }
                    str+="</div>";
                }

                var tab=" <a href='javascript:void(0);'>"+data.name+"</a>"+
                    "<em>"+(data.seniority?data.seniority:1)+"年教龄</em>";
                if(data.orgId==0){
                    tab+= "<span><button class='joinSch' onclick=\"javascript:window.location.href='/per/joinOrg.htm'\">加入学校</button></span>";
                }else{
                    tab+=  "<span>所属学校：<a href='/site/shool/"+data.orgId+"/findCourseByorgId.htm' style='font-size: 14px;line-height: 24px;font-weight:normal;'>"+data.orgName+"</a></span>";
                }
                tab+=str;
                $('.tch_main').html(tab);

                if(data.ppResId==""||data.ppResId==0||data.ppResId==undefined){
                    $('#touxiang').html("<img STYLE='width:140px; height:137px;' src='/front/sanhai/images/person.png'/><br />");
                }else{
                    $('#touxiang').html("<img STYLE='width:140px; height:137px;' src='/file/loadImage/" + data.ppResId + "/140/137.r'/><br />");
                }

                $('#teachingExperience').html(data.teachingExperience==''?'暂无信息':data.teachingExperience);
                $('#teachingGrade').html(data.teachingGrade==''?'暂无信息':data.teachingGrade);
            }

        };

        //关注
        function attention(val,orgid,attentiontype){
            $.ajax({
                url: "/attention/intoAttention.do",
                type: "post",
                dataType: "json",
                data: {
                    attentionObjId: orgid,
                    attentionType: attentiontype
                },
                success: function (response) {
                    if ("000" == response.resCode){
                        Kh.addAttention(val);
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                    }
                    if("300" == response.resCode){
                        //base_dialog_standard.defaultDialog("warning",response.resMsg,null);
                        dialogs._timer(response.resMsg,2,2,null);
                    }
                }
            });
        };

        $('#tchAttention').click(function () {
            attention($(this),oneteacherid,1)
        });




    //展示同事
    function showcolleague(value){
        var tab="";
        for(var i=0;i<value.length;i++){
            var val=value[i];
            var src = "";
            if(val.ppResId==""||val.ppResId==0||val.ppResId==undefined){
                src="/front/sanhai/images/person.png";
            }else{
                src="/file/loadImage/" + val.ppResId + "/100/100.r";
            }
            if(i<4){
                tab+="<li>"+
                    "<a href='/site/theacher/" + val.userId +"/toTeacherIndex.htm'>"+
                    "<img STYLE='width:100px; height:100px;' src='"+src+"' alt='同事头像'>"+
                    "<span>" + val.name +"</span>"+
                    " </a>"+
                    "</li>"

            }else{
                break
            }

        }
        if(value.length==0){
            $("#tramor").remove();
        }
        $("#colleague").html(tab);
    };


    //展示一对一课程
    function showOnotoOne(value){
        var tab="";
        for(var i=0;i<value.length;i++){
            var val=value[i];
//      var price=val.orderPrice/100;
            var price=money.fmoney(Number(val.price) / 100, 2);
            var duration=parseFloat(val.duration)/60;

            if(i==0){
                tab+=" <tr>"+
                    "<td><i></i><span>"+val.courseTitle+"</span></td>"+
                    "<td>"+price+"</td>"+
                    "<td>" + duration +"小时</td>"+
                    "<td><input type='hidden' value='0'/>"+
                    "<input type='hidden' value='" + val.courseId +"'/>"+
                        /*"<a class='shoppingpushBtnJs'>去买课</a></td>"+*/
                    "<a href='/site/course/" + val.courseId +"/courseContent.htm'>去买课</a></td>"+
                    "</tr>"
            }else{
                tab+=" <tr>"+
                    "<td><i></i><span>"+val.courseTitle+"</span></td>"+
                    "<td>"+price+"</td>"+
                    "<td>" + duration +"小时</td>"+
                    "<td><input type='hidden' value='0'/>"+
                    "<input type='hidden' value='" + val.courseId +"'/>"+
                        /*"<a class='shoppingpushBtnJs'>去买课</a></td>"+*/
                    "<a href='/site/course/" + val.courseId +"/courseContent.htm'>去买课</a></td>"+
                    "</tr>"
            }

        }

        //console.info("***"+tab)
        $("#onotoonocourse").html(tab);
        $('.popBox').dialog({
            autoOpen: false,
            width: 600,
            modal: true,
            resizable: false,
            close: function() {
                $(this).dialog("close")
            }
        });

        $('.shoppingpushBtnJs').click(function() {
            var courseMode=$(this).parent('td').children('input').eq(0).val();
            var courseId=$(this).parent('td').children('input').eq(1).val();
            $("#shoppingpushNotice").dialog("open");

            $('#courseMode').val(courseMode);
            $('#courseId').val(courseId);
            return false;
        });
        $('.cancelBtn').click(function() {

            $(".shoppingpushNotice").dialog("close");
        })
    };


    //继续选课
    function continueCourse(){
            var courseMode = $('#courseMode').val();
            var courseId =$('#courseId').val();
            var auditFlag = 0;
            var remark = $('#notice_textarea').val();
            $.ajax({
                url:"/orderDeal/add.do",
                type:"post",
                dataType:"json",
                data:{
                    courseMode: courseMode,
                    courseId: courseId,
                    auditFlag: auditFlag,
                    remark: remark
                },
                success:function(response){

                    //console.log(response.resCode);

                    if("000" == response.resCode ) {
                        $(".shoppingpushNotice").dialog("close");
                    }
                    if("200" == response.resCode ) {
                        window.location.href = "/login.htm";
                        $(".shoppingpushNotice").dialog("close");
                    }
                }
            });
        }
    /*查看最新评论*/
    function sercheEvaluate(val,evaluateReys,i){
        var tab="";
        //debugger;
        if(val.length>0) {
            for (var k = 0; k < val.length; k++) {
                if(k<6){
                    var time = new Date(parseFloat(val[k].time)).format("yyyy-MM-dd hh:mm:ss");
                    /*var time = val[k].time;*/
                    var evaurl="";
                    if(val[k].ppResId==""||val[k].ppResId==0||val[k].ppResId==undefined){
                        evaurl="/front/sanhai/images/person.png";
                    }else{
                        evaurl="/file/loadImage/" + val[k].ppResId + "/60/60.r";
                    }
                    tab += "<li class='dialogItem '>"+
                        "<div class='head_img'>"+
                        "<a href='/site/student/" + val[k].userId + "/toStudentIndex.htm'><img STYLE='width:60px; height:60px;' src='"+evaurl+"'>"+val[k].userName+"</a>"+
                        " </div>"+
                        "<i class='arrow'></i>"+
                            /*"<div class='title'>"+
                             "<em>"+val[k].des+"</em>"+*/
                        "<div class='title_r fr'>"+
                        "<span>课程："+val[k].sourceScore+"分</span>"+
                        "<span>老师："+val[k].teaScore+"分</span>"+
                        "<span>服务："+val[k].orgScore+"分</span>"+
                        "</div>"+
                            /*"</div>"+*/
                        "<div class='dialogCont'>"+
                        val[k].des +
                        " </div>"+
                        "<div class='bottom_tools'>"+
                        "<span>"+time+"</span>&nbsp;&nbsp;&nbsp;<span><a href='/site/course/" + val[k].courseId +"/courseContent.htm'>《"+val[k].courseName+"》</a></span>";
                    var evaluateId = val[k].evaid;
                    var str = "";
                    var evaluateReyLength=0;
                    if (evaluateReys.length > 0) {

                        for (var j = 0; j < evaluateReys.length; j++) {
                            var evakeyurl="";
                            if(evaluateReys[j].ppResId==""||evaluateReys[j].ppResId==0||evaluateReys[j].ppResId==undefined){
                                evakeyurl="/front/sanhai/images/person.png";
                            }else{
                                evakeyurl="/file/loadImage/" + evaluateReys[j].ppResId + "/60/60.r";
                            }
                            if (evaluateReys[j].evaid == evaluateId) {
                                evaluateReyLength++;
                                var ti = new Date(parseFloat(evaluateReys[j].reTime)).format("yyyy-MM-dd hh:mm:ss");
                                /*var ti = evaluateReys[j].reTime;*/
                                str += "<dl class='clearfix'>"+
                                    "<dt><img STYLE='width:60px; height:60px;' src='"+evakeyurl+"'></dt>"+
                                    "<dd><em>"+evaluateReys[j].reUserName+"：</em>"+evaluateReys[j].content+"</dd>"+
                                    "<dd><span>"+ti+"</span></dd>"+
                                    "</dl>";
                            }

                        }
                        tab +="<div class='bottom_r'>"+
                            "<a>"+
                            "<em>查看回复</em>"+
                            "<span class='bot_span'>("+evaluateReyLength+")</span>"+
                            "</a>"+
                            "</div>"+
                            "</div>"+
                            "<div class='view_reply  hide'>";
                        tab += str;
                        evaluateReyLength=0;
                    }else{
                        tab +="<div class='bottom_r'>"+
                            "<a>"+
                            "<em>查看回复</em>"+
                            "(<span class='bot_span'>"+evaluateReyLength+"</span>)"+
                            "</a>"+
                            "</div>"+
                            "</div>"+
                            "<div class='view_reply  hide'>";
                        tab += str;
                        evaluateReyLength=0;
                    }


                    tab += "</div>"+
                        "</li>";
                }else{
                    break;
                }

            }
        }


        $("#sereva").html(tab);
        $('#sereva li').each(function(){
            $(this).find('dl:last').addClass('last_dialogItem');
        });

        /*最新评论*/
        $('.dialogList li').each(function(i){
            var $this = $(this);
            $(this).find('.bottom_r a').click(function() {
                var  num = $this.find('.bot_span').text().substring(1,$this.find('.bot_span').text().length-1);
                if(num == 0) return false;
                if($this.find('.view_reply').css('display') == 'block'){
                    $this.find('.view_reply').addClass('hide');
                    $this.find('.bottom_r').children('a').removeClass('ac');
                    $this.find('.bottom_r').find('em').text('查看回复');
                    $this.siblings().find('.view_reply').addClass('hide');
                    $this.siblings().find('.bottom_r').children('a').removeClass('ac');
                }else{
                    $this.find('.view_reply').removeClass('hide');
                    $this.find('.bottom_r').children('a').addClass('ac');
                    $this.find('.bottom_r').find('em').text('收起回复');
                    $this.siblings().find('.view_reply').addClass('hide');
                    $this.siblings().find('.bottom_r').children('a').removeClass('ac');
                }
                $(document).click(function(){
                    $('.view_reply').addClass('hide');;
                    $('.bottom_r').find('em').text('查看回复');
                    $('.bottom_r').children('a').removeClass('ac');
                });
                return false;
            });
        });
    };

    function payCourse(){//去购物车结算
            var courseMode = $('#courseMode').val();
            var courseId =$('#courseId').val();
            var auditFlag = 0;
            var remark = $('#notice_textarea').val();
            $.ajax({
                url:"/orderDeal/add.do",
                type:"post",
                dataType:"json",
                data:{
                    courseMode: courseMode,
                    courseId: courseId,
                    auditFlag: auditFlag,
                    remark: remark
                },
                success:function(response){

                    //console.log(response.resCode);

                    if("000" == response.resCode ) {

                        window.location.href="/shopping/shoppingCoureses.htm";
                        $(".shoppingpushNotice").dialog("close");
                    }
                    if("200" == response.resCode ){
                        window.location.href = "/login.htm";
                        $(".shoppingpushNotice").dialog("close");
                    }
                }
            });
        }


    function showpublicCourse(value){//展示班课
            var tab="";
            if(value.length>0){
                for(var i=0;i<value.length;i++){
                    var val=value[i];
//        var price=val.orderPrice/100;
                    var price=money.fmoney(Number(val.orderPrice) / 100, 2);
                    var duration=parseFloat(val.duration)/60;
                    if(i<6){
                        tab+=" <div class='class_item'>"+
                            " <div class='class_img_warp'>"+
                            "<a href='javascript:;'><img src='/front/sanhai/images/table_img.jpg' alt='雅思'></a>"+
                            "</div>"+
                            "<div class='class_item_cont'>"+
                            "<h2>"+
                            "<a href=''>"+val.courseTitle+"</a>"+
                            "</h2>"+
                            "<table>"+
                            "<colgrounp>"+
                            "<col width='80px'/>"+
                            "<col width='140px'/>"+
                            "</colgrounp>"+
                            "<tr>"+
                            "<td class='tr'>课程长度：</td>"+
                            "<td>" + duration +"小时</td>"+
                            "</tr>"+
                            "<tr>"+
                            "<td class='tr'>班级人数：</td>"+
                            "<td>50人</td>"+
                            "</tr>"+
                            "<tr>"+
                            "<td class='tr'>上课安排：</td>"+
                            "<td>每周5晚18:00:00</td>"+
                            "</tr>"+
                            "<tr>"+
                            "<td class='tr'>上课方式：</td>"+
                            "<td>线上授课</td>"+
                            "</tr>"+
                            "<tr>"+
                            "<td class='tr'>适宜人群：</td>"+
                            "<td>备战高考冲刺</td>"+
                            " </tr>"+
                            "</table>"+
                            "</div>"+
                            "<div class='add_shopping_car'>"+
                            "<h4>课程总价：</h4>"+
                            "<p><strong>"+val.price+"</strong><br><span>剩余名额：<em>10 </em></span></p>"+
                            "<a href='#' class='btn'>立即抢</a>"+
                            " </div>"+
                            "</div>";

                    }else{
                        break
                    }

                }
            }else{
                tab="";
            }


            $("#publiccourse").html(tab);
        }

        function evaluate1(parm){
            $.ajax({
                type:"post",
                url:"/site/theacher/searchTeacherEvaluateBymodel.do",
                dataType:"json",
                data:{
                    "parm":parm,
                    "currentPage":1,
                    "teacherId":oneteacherid
                },
                success:function(result) {
                    /* if (common.checkResponse(result) == false) {
                     return;
                     }
                     if (common.checkResponse(evaluateReyresult) == false) {
                     return;
                     }*/
                    var val = result.data.rows;//评论记录
                    sercheEvaluate(val,evaluateReyresult);

                }
                ,
                error:function(xhr,status,error) {
                    //alert("请求失败.");
                }
            });

        };



        document.getElementById('search_input').onkeydown=keyDownSearch;

        function keyDownSearch(e) {
            // 兼容FF和IE和Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                sercher();
                return false;
            }
            return true;
        }




}
    return{
        tch:tch
    }
})