/**
 * Created by slg on 2015/12/16.
 */
/**
 * Created by slg on 2015/12/11.
 */

define('teacherEvaluateRecordDo',['jquery','dialogs','pageBar','dialogs','common','base','jquery_ui_min'],function($,dialog,pageBar,dialogs){

    var tchEvaluateRecord=function(){
        /*只有学生身份显示购物车*/
        if(user.userIdentity==2){
            $('.shopping_car').removeClass('hide');
        }
        var teacherinfo = tchEvaluate.course.data.teacherinfo;//老师个人信息
        var evaluate = tchEvaluate.course.data.evaluate.data;//最新评论
        var evaluateRey = tchEvaluate.course.data.evaluateRey;//最新回复
        var data1 = "teacherId="+oneteacherid+"&parm=total1&";

        showTeacherInfo(teacherinfo);
        evaluateReyresult=evaluateRey;
        sercheEvaluate(evaluate,evaluateRey);
        loadTeacherevaluate1(url, data1,1);


        $('#navigation').children('li').eq(0).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherIndex.htm");
        $('#navigation').children('li').eq(1).children('a').attr("href","/site/theacher/"+oneteacherid+"/toCourse.htm");
        $('#navigation').children('li').eq(3).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherExperience.htm");
        $('#navigation').children('li').eq(4).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherEvaluate.htm");



        var goodrate=(tchEvaluate.goodEvaluateRecordTotal/tchEvaluate.evaluateTotal).toFixed(2)*1000/10;

        if(!isNaN(goodrate)){
            $("#goodrate").text((goodrate==0?0:goodrate)+"%");
        }else{
            $("#goodrate").text("0"+"%");
        };

        score(tchEvaluate.orgScore,'red_js3');
        score(tchEvaluate.teaScore,'red_js2');
        score(tchEvaluate.sourceScore,'red_js1');
        $("#avgsourceScore").text(tchEvaluate.sourceScore+"分");
        $("#avgteaScore").text(tchEvaluate.teaScore+"分");
        $("#avgorgScore").text(tchEvaluate.orgScore+"分");

        score_small(tchEvaluate.teaScore,'red_js4');
        $("#avgsourceScore1").text(tchEvaluate.teaScore+"分");
        $('.all_comment').children('ul').eq(0).children('li').eq(0).children('label').text("全部评论（"+tchEvaluate.evaluateTotal+"）");
        $('.all_comment').children('ul').eq(0).children('li').eq(1).children('label').text("好评（"+tchEvaluate.goodEvaluateRecordTotal+"）");
        $('.all_comment').children('ul').eq(0).children('li').eq(2).children('label').text("中评（"+tchEvaluate.mediumEvaluateRecordTotal+"）");
        $('.all_comment').children('ul').eq(0).children('li').eq(3).children('label').text("差评（"+tchEvaluate.differenceEvaluateRecordTotal+"）");

        //展示老师个人信息
        function showTeacherInfo(val){
            if(val.length>0){
                var data=val[0];
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
                if(data.ppResId==""||data.ppResId==0){
                    $('#touxiang').html("<img STYLE='width:140px; height:137px;' src='/front/sanhai/images/person.png'/><br />");
                }else{
                    $('#touxiang').html("<img STYLE='width:140px; height:137px;' src='/file/loadImage/" + data.ppResId + "/140/137.r'/><br />");
                }
            }

        };

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

                    //console.log(response.resCode);

                    if ("000" == response.resCode){
                        Kh.addAttention(val);
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                    }
                    if("300" == response.resCode){
                        dialogs._timer(response.resMsg,2,2,null);
                    }
                }
            });
        };

        $('#tchAttention').click(function () {
            attention($(this),oneteacherid,1)
        });


        /*查看最新评论*/
        function sercheEvaluate(val,evaluateReys){
            var tab="";
            //debugger;
            if(val.length>0) {
                for (var k = 0; k < val.length; k++) {

                    var time = new Date(parseFloat(val[k].time)).format("yyyy-MM-dd hh:mm:ss");
                    /*var time = val[k].time;*/
                    var evaurl="";
                    if(val[k].ppResId==""||val[k].ppResId==0){
                        evaurl="/front/sanhai/images/person.png";
                    }else{
                        evaurl="/file/loadImage/" + val[k].ppResId + "/60/60.r";
                    }
                    tab += "<li class='dialogItem '>" +
                        "<div class='head_img'>" +
                        "<a href='/site/student/" + val[k].userId + "/toStudentIndex.htm'><img STYLE='width:60px; height:60px;' src='" + evaurl + "'>" + val[k].userName + "</a>" +
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
                        " </div>"+
                        "<div class='bottom_tools'>"+
                        "<span>"+time+"</span>&nbsp;&nbsp;&nbsp;<span><a href='/site/course/" + val[k].courseId +"/courseContent.htm'>《"+val[k].courseName+"》</a></span>";
                    var evaluateId = val[k].evaid;
                    var str = "";
                    var evaluateReyLength=0;
                    if (evaluateReys.length > 0) {

                        for (var j = 0; j < evaluateReys.length; j++) {
                            var evakeyurl="";
                            if(val[k].ppResId==""||val[k].ppResId==0){
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

        function evaluate1(parm){
            var data1 = "teacherId="+oneteacherid+"&parm="+parm+"&";
            loadTeacherevaluate1(url, data1,1);

        };

        function loadTeacherevaluate1(url, data,currPage){
            var a = data;
            data += "currentPage=" + currPage;
            //console.log(a);
            //console.log(data)
            $.ajax({
                url:url,
                data: data,
                type:"post",
                success:function(result) {

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

                    sercheEvaluate(val,evaluateReyresult);
                    var params = new Array();
                    params.push("/site/theacher/searchTeacherEvaluateBymodel.do");
                    params.push(a);
                    //console.log("------------------");
                    //console.log("totalPages-->" + result.data.totalPages);
                    //console.log("currPage-->" + result.data.currPage);
                    //console.log("------------------");
                    pageBar.setBasePageBar(result.data.totalPages, result.data.currPage, loadTeacherevaluate1, params);

                }
                ,
                error:function(xhr,status,error) {
                    //alert("请求失败.");
                }
            });

        }

        $('#total1').click(function(){ evaluate1('total1') });
        $('#good').click(function(){ evaluate1('good') });
        $('#medium').click(function(){ evaluate1('medium') });
        $('#difference').click(function(){ evaluate1('difference') });

    }





    return{
        tchEvaluateRecord:tchEvaluateRecord
    }
})