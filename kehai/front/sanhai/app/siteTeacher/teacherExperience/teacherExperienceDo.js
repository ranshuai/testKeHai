/**
 * Created by slg on 2015/12/16.
 */

define('teacherExperienceDo',['jquery','dialogs','pageBar','dialogs','common','base','jquery_ui_min'],function($,dialog,pageBar,dialogs) {
    var tchExperience = function (/*course,teaScore,oneteacherid*/) {

        /*只有学生身份显示购物车*/
        if(user.userIdentity==2){
            $('.shopping_car').removeClass('hide');
        }

        $('#navigation').children('li').eq(0).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherIndex.htm");
        $('#navigation').children('li').eq(1).children('a').attr("href","/site/theacher/"+oneteacherid+"/toCourse.htm");
        $('#navigation').children('li').eq(3).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherExperience.htm");
        $('#navigation').children('li').eq(4).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherEvaluate.htm");

        var teacherinfo = tchExp.course.data.teacherinfo;//老师个人信息
        showTeacherInfo(teacherinfo);
        score_small(tchExp.teaScore,'red_js4');
        $("#avgsourceScore1").text(tchExp.teaScore+"分");

        function showTeacherInfo(val){//展示老师个人信息

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
                $('.tch_authentication').children('p').children('span').eq(0).text(data.name);
                $('.tch_authentication').children('p').children('span').eq(1).text(data.sex==0?'男':'女');
                $('.tch_authentication').children('p').children('span').eq(2).text((data.seniority?data.seniority:1)+"年教龄");
                $('.tch_authentication').children('p').children('span').eq(3).text(data.areaName);
                $('.tch_authentication').children('p').children('span').eq(4).text("ID："+data.id);
                $('#teachingExperience').html(data.teachingExperience);
                $('#teachingFeature').html(data.teachingFeature);
                $('#teachingGrade').html(data.teachingGrade);
                if(data.teaCardAudited==='0'){
                    $('.tch_authentication').children('label').eq(0).removeClass('hide');
                }
                if(data.teaCerAudited==='-1'){
                    $('.tch_authentication').children('label').eq(1).removeClass('hide');
                }
            }
        }

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

    };

    return{
        tchExperience:tchExperience
    }

})