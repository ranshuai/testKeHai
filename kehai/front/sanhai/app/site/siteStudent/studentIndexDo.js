/**
 * Created by bbb on 2015/12/17.
 */
define([
        'jquery',
        'dialogs',
        'money',
        'common',
        'base'
    ],

    function ($,dialogs,money,common) {

        function studentIndexDo() {

        }
        attention=function (val,attentiontype){
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

        //*加载学生首页课程*/
        studentIndexDo.prototype.loadStudentIndex=function (stuid){
            $.ajax({
                url: "/site/student/loadIndexData.do",
                type: "post",
                dataType: "json",
                data: {
                    stuId: stuid
                },
                success: function (response) {

                    if (!common.checkResponse(response)) {
                        return false;
                    }
                    var htmlStr = "";
                    var htmlStr2 = "";
                    var clsscont=0;
                    var clsscont2=0;
                    $.each(response.data.stucourse, function (index, item) {
                        var time = new Date(parseFloat(item.orderGenerateTime)).format("yyyy-MM-dd ");
                        var coursetype="";
                        if(item.courseMode==0){
                            coursetype="一对一";
                        }else if(item.courseMode==20){
                            coursetype="旁听";
                        }else if(item.courseMode==3){
                            coursetype="视频";
                        }
                        if(item.coursesStatus==0&&item.orderStatus==2&&item.assignTeacherFlag==3){
                            htmlStr += "<p>";
                            htmlStr += "<span class='stu_em_date'>" + time + "</span>";
                            htmlStr += "<span class='stu_em_classname'>" + item.courseTitle + "(" + coursetype + ")</span>";
                            htmlStr += "<span class='stu_em_classtime'>共" + item.coursesTime/60 + "课时</span>";
                            /*htmlStr += "<button class='c_bg_color2'>去旁听</button>";*/
                            htmlStr += "</p>";
                            clsscont++;
                        }
                        if(item.coursesStatus==1&&item.isRetireCourses==0){
                            htmlStr2+="<p>";
                            htmlStr2+="<span class='stu_em_date'>" + time + "</span>";
                            htmlStr2+="<span class='stu_em_classname'>" + item.courseTitle + "(" + coursetype + ")</span>";
                            htmlStr2+="<span class='stu_em_classtime'>共" + item.coursesTime/60 + "课时</span>";
                            htmlStr2+="</p>";
                            clsscont2++;
                        }
                        if(item.coursesStatus==1&&item.isRetireCourses==2&&item.coursesFinishTimes>1){
                            htmlStr2+="<p>";
                            htmlStr2+="<span class='stu_em_date'>" + time + "</span>";
                            htmlStr2+="<span class='stu_em_classname'>" + item.courseTitle + "(" + coursetype + ")</span>";
                            htmlStr2+="<span class='stu_em_classtime'>共" + item.coursesTime/60 + "课时</span>";
                            htmlStr2+="</p>";
                            clsscont2++;
                        }
                    });
                    if(clsscont==0){
                        htmlStr+="暂无在学课程";
                    }
                    if(clsscont2==0){
                        htmlStr2+="暂无已完结课程";
                    }
                    $("#classing").html("<h4>正在学(<span>"+clsscont+"</span>)</h4>"+htmlStr);
                    $("#classed").html("<h4>已完结(<span>"+clsscont2+"</span>)</h4>"+htmlStr2);

                }
            });

        }

        studentIndexDo.prototype.init = function () {
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
            /******************************************************/
            var t=this;
            var imgsrc="";
            var stuinfo=stuData.ppResId;
            if(stuinfo==0||stuinfo==undefined||stuinfo==''){
                imgsrc="/front/sanhai/images/person.png";
            }else{
                imgsrc="/file/loadImage/"+stuinfo+"/140/140.r";
            }
            $('#userimg').attr("src",imgsrc);
            if(stuData.sex=='0'){
                $('#sex').removeClass().addClass("boy")
            }else{
                $('#sex').removeClass().addClass("girl")
            }

            if(stuData.introduce&&stuData.introduce.trim().length>=60){
                $('#jainjie').html("简介："+stuData.introduce.substring(0,60)+"...");
            }else{
                $('#jainjie').html("简介："+stuData.introduce);
            }
            /**********************学生首页***************************/
            $('.mainNav').children('li').eq(0).addClass("ac");
            $('.mainNav').children('li').eq(1).removeClass();
            $('.mainNav').children('li').eq(2).removeClass();
            t.loadStudentIndex(stuData.stuId);
        };
        studentIndexDo.prototype._init = function () {
            var t = this;
            t.init();
        };
        studentIndexDo.prototype.render = function () {
            this._init();
        };
        return studentIndexDo;
    }
);