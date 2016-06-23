/**
 * Created by slg on 2015/12/10.
 */
define('teacherHeaderDo',['jquery','common','headerDo','base'],function($,common,headerDo){
    headerDo.init();

    // //客服中心hover效果
    // $('.serviceList').rNavhover();
    // //切换身份hover效果
    // $('.tabRole').rNavhover();
    // //搜索框机构切换;
    // $('.select_type_List').rSetUpTab();

    // changeIdentity= function ( identity ){
    //     $.ajax({
    //         type:"post",
    //         dataType:"json",
    //         url:"/perfectInfo/toIdentity.do",
    //         data:{identity:identity},
    //         success:function(data){
    //             if(common.checkResponse(data) == false){
    //                 return;
    //             }
    //             location.reload();
    //         },
    //         error:function(data){
    //             _alert("网络异常","","")
    //         }
    //     });
    // };
    // var top=function(){
    //     $.ajax({
    //         type:"post",
    //         dataType:"json",
    //         url:"/perfectInfo/changeIdentity.do",
    //         data:{},
    //         success:function(data){
    //             // alert("成功");
    //             if(common.checkResponse(data) == false){
    //                 return;
    //             }
    //             var hasProp = 0;
    //             $.each(data.data,function(){
    //                 if(this == 0){
    //                     $('<li><a href="javascript:void(0);" onclick="changeIdentity(0)">切换到教师身份</a></li>').appendTo(".changeIdentity");
    //                 }else if( this ==1 ){
    //                     $('<li><a href="javascript:void(0);" onclick="changeIdentity(1)">切换到大学生身份</a></li>').appendTo(".changeIdentity");
    //                 }else if( this == 2){
    //                     $('<li><a href="javascript:void(0);" onclick="changeIdentity(2)">切换到学生身份</a></li>').appendTo(".changeIdentity");
    //                 }else if(this == 3){
    //                     $('<li><a href="javascript:void(0);" onclick="changeIdentity(3)">切换到学校身份</a></li>').appendTo(".changeIdentity");
    //                 }/*else if(this == 4){
    //                  $('<li><a href="javascript:void(0);" onclick="changeIdentity(4)">切换到咨询师身份</a></li>').appendTo(".changeIdentity");
    //                  }*/
    //                 hasProp++;
    //             });
    //             if( hasProp==0 ){
    //                 $(".tabRole").hide();
    //             }

    //         },
    //         error:function(data){
    //             _alert("网络异常","","");
    //         }
    //     });
    // };


    //搜索框机构切换;
    $('.select_type_List').rSetUpTab();
    /*点击出现搜索框*/
    $('.tch_search').click(function(){
        $('.search_bar').toggleClass('hide');
    });

    var hotData= function (){
       /* $.ajax({
            url: "/site/hotSearchKey.r",
            dataType :"json",
            success : function (res){
                if(common.checkResponse(res)) {
                    var htmlStr ="";

                    $.each(res.data.hotKeyList , function(index, item ){
                        htmlStr += "<li><a href='"+item.url+"'>"+item.name+"</a></li>";
                    });
                    if(htmlStr.length > 0 ) {
                        $("#hotSearchKey").html(htmlStr);
                    }
                }
            }
        });*/

        var htmlStr ="<li><a href='/site/course/ignore/10010/courseTransfer.htm'>语文</a></li>" +
                    "<li><a href='/site/course/ignore/10011/courseTransfer.htm'>数学</a></li>" +
                    "<li><a href='/site/course/ignore/10012/courseTransfer.htm'>英语</a></li>" +
                    "<li><a href='/site/course/ignore/10013/courseTransfer.htm'>生物</a></li>" +
                    "<li><a href='/site/course/1/ignore/courseTransfer.htm'>小学</a></li>" +
                    "<li><a href='/site/course/2/ignore/courseTransfer.htm'>小升初</a></li>";
        $("#hotSearchKey").html(htmlStr);
    };
    /*搜索框*/
    sercher=function (){
        var seltype=$(".sele_type").text();
        var data=$(".subTitleBar_text1").val();
        var seldata=encodeURI(encodeURI(data));
        if($.trim(data)==''){
            return;
        }
        if (seltype == "课程") {
            window.location.href = "/site/course/selectCourse1.htm?courseTitle=" + seldata;
        }
        if (seltype == "学校") {
            window.location.href = "/site/selectschool.htm?orgname=" + seldata;
        }
        if (seltype == "教师") {
            window.location.href = "/site/selectteacher.htm?name=" + seldata;
        }
        if (seltype == "课表") {
            window.location.href = "/site/toselectPtCourse.htm?theme=" + seldata;
        }
        if (seltype == "课海") {
            window.location.href = "/site/toselectVideoCourse.htm?theme=" + seldata;
        }

    };

    hotData();

    $('.subTitleBar_text1').placeholder({value:'请输入课程名称、关键词等...'});

});