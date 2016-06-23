/**
 * Created by slg on 2015/12/11.
 */

define('teacherClassesDo',['jquery','dialogs','money','dialogs','common','base','jquery_ui_min'],function($,dialog,money,dialogs){

    var tchcourse=function(){
        /*只有学生身份显示购物车*/
        if(user.userIdentity==2){
            $('.shopping_car').removeClass('hide');
        }

        var oneToOne = tchclass.course.data.oneToOne;//一对一
        var publicecourses = tchclass.course.data.publicecourses;//班课
        var teacherinfo = tchclass.course.data.teacherinfo;//老师个人信息


        showOnotoOne(oneToOne);
        showTeacherInfo(teacherinfo);
        showpublicCourse(publicecourses);



        $('#navigation').children('li').eq(0).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherIndex.htm");
        $('#navigation').children('li').eq(1).children('a').attr("href","/site/theacher/"+oneteacherid+"/toCourse.htm");
        $('#navigation').children('li').eq(3).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherExperience.htm");
        $('#navigation').children('li').eq(4).children('a').attr("href","/site/theacher/"+oneteacherid+"/toTeacherEvaluate.htm");

        score_small(tchclass.teaScore,'red_js4');
        $("#avgsourceScore1").text(tchclass.teaScore+"分");

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

        function showOnotoOne(value){//展示一对一课程
            var tab="";
            for(var i=0;i<value.length;i++){
                var val=value[i];
//      var price=val.orderPrice/100;
                var price=money.fmoney(Number(val.price) / 100, 2);
                var duration=parseFloat(val.duration)/60;

                if(i==0){
                    tab+=" <tr >"+
                        "<td><i></i><span>"+val.courseTitle+"</span></td>"+
                        "<td>"+price+"</td>"+
                        "<td>" + duration +"小时</td>"+
                        "<td><input type='hidden' value='0'/>"+
                        "<input type='hidden' value='" + val.courseId +"'/>"+
                            /*  "<a class='shoppingpushBtnJs' href='/site/course/" + val.coursesId +"/courseContent.htm'>去买课</a></td>"+*/
                        "<a href='/site/course/" + val.courseId +"/courseContent.htm'>去买课</a></td>"+
                        "</tr>"
                }else{
                    tab+=" <tr>"+
                        "<td><i></i><span>"+val.courseTitle+"</span></td>"+
                        "<td>"+price+"</td>"+
                        "<td>" + duration +"小时</td>"+
                        "<td><input type='hidden' value='0'/>"+
                        "<input type='hidden' value='" + val.courseId +"'/>"+
                            /* "<a class='shoppingpushBtnJs' href='/site/course/" + val.coursesId +"/courseContent.htm'>去买课</a></td>"+*/
                        "<a href='/site/course/" + val.courseId +"/courseContent.htm'>去买课</a></td>"+
                        "</tr>"
                }


            }
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

        function showpublicCourse(value){//展示班课
            var tab="";
            if(value.length>0){
                for(var i=0;i<value.length;i++){
                    var val=value[i];
//        var price=val.orderPrice/100;
                    var price=money.fmoney(Number(val.orderPrice) / 100, 2);
                    var duration=parseFloat(val.duration)/60;

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

                }
            }else{
                tab="";
            }


            $("#publiccourse").html(tab);
        };

        function continueCourse(){ //继续选课
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
    }





    return{
        tchcourse:tchcourse
    }
})