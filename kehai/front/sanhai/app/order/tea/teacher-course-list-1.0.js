/**
 * Created by boys on 2015/9/7.
 * 老师我的课表操作js
 */

define(
    [
        'jquery',
        'common',
        'order-deal',
        'myCalendar',
        'enterClassesRecord',
        'tea-schedule-course-1.0.0',
        'dialogs',
        'orderDeatil'

    ],function($,common,order,myCalendar,enter,tea,dialogs, orderDeatil){

    //进入课程的函数
   /* function intoClass(orderId, startTime, recordId, earliestIntoTime, lastIntoTime){
        var _timeStamp = new Date().getTime();
        var earliestTime = parseInt(earliestIntoTime);
        var $lastestTime = lastIntoTime.split(',');
        var index = -1;
        var $startTime = startTime.split(',');
        var $recordId = recordId.split(',');
        for (var i=0; i < $startTime.length; i++){
            var beginTime = parseFloat($startTime[i]) - (earliestTime * 60 * 1000);
            var endTime = parseFloat($startTime[i]) + (parseFloat($lastestTime[i]) * 60 * 1000);
            if (_timeStamp >= beginTime && _timeStamp < endTime){
                index = i;
                break;
            }
        }
        if (index == -1){
            dialogs._timer("该时间点没课，您可以休息一下喽!", 1, 2, null);
            return;
        }
        $.ajax({
            url: "/videoClass/checkUser.do",
            data: {orderId:orderId,
                coursesRecordId:$recordId[index]},
            dataType:"json",
            type: "post",
            success: function(resp){
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000"){
                    var url = resp.data.url;
                    if (typeof url == "undefined") return false;
                    var text_num =9;
                    var timer = null;
                    dialogs._confirm('马上进入教室，准备好了吗？还有 '+text_num+' 秒自动关闭','操作提示',function(){
                        openWindow(url);
                    },function(){
                        clearInterval(timer);
                    });
                    clearInterval(timer);
                    timer = setInterval(function(){
                        text_num --;
                        $('.confirm_dialog_box .popbox_item p').text('马上进入教室，准备好了吗？还有 '+text_num+'  秒自动关闭');
                        if(text_num<=0){
                            clearInterval(timer);
                            $('.popBox ').remove();
                        }
                    },1000);
                   /!* openDialog(15);
                    $("#pushNotice15 #url").val(url);*!/
                }else{
                    dialogs._timer(resp.resMsg, null, 2, null);
                }
                return false;
            }
        });
    }*/

    function initTeaCourseListNew() {

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        $.get("/courses/"+ year + "/" + month +"/coursesList.do?" + Math.random(), function(resp){
         if (common.checkResponse(resp) == false) return false;
         if (resp.resCode == "000"){
         var classes_arr = order.formatClasses2ArrJson(resp);
         myCalendar.myCalendar(classes_arr,year, month, resp.data.userFlag);
         }
         });
        // tab切换时请求
        $("ul.tabList a:eq(1)").click(function(){
            if ($("div.page").is(":hidden")){
                $("div.page").show();
                enter.listClassRecord4Page("", 1);
                tea.initTeaScheduleCourse();
            }
        });
        //加载课表日历
        $("ul.tabList a:eq(0)").click(function(){
            $(".page ").hide();
            $.get("/courses/"+ year + "/" + month +"/coursesList.do?" + Math.random(), function(resp){
                if (common.checkResponse(resp) == false) return false;
                if (resp.resCode == "000"){
                    var classes_arr = order.formatClasses2ArrJson(resp);
                    myCalendar.myCalendar(classes_arr,year, month, resp.data.userFlag);
                }
            })
        });
        //加载项
        /*var hashValue = location.href.substr(location.href.lastIndexOf('#')+1);
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        tabChange(hashValue);*/
        /*$.get("/courses/"+ year + "/" + month +"/coursesList.do?" + Math.random(), function(resp){
            if (common.checkResponse(resp) == false) return false;
            if (resp.resCode == "000"){
                var classes_arr = order.formatClasses2ArrJson(resp);
                myCalendar.myCalendar(classes_arr,year, month, resp.data.userFlag);
            }
        });*/

        /*function tabChange(hash) {
            if (hash == "wait"){
                $(".tabList li:eq(1) a").addClass('ac').parent('li').siblings().children('a').removeClass('ac');
                $('.tabCont .tabItem:eq(1)').show().removeClass('hide').siblings().hide();
                //alert(enter);
                enter.listClassRecord4Page("", 1);
                //$(".page ").show();
                //if ($("div.page").is(":hidden")) {
                //    enter.listClassRecord4Page("", 1);
                //    $(".page ").show();
                //}
            }else{
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                $(".tabList li:eq(0) a").addClass('ac').parent('li').siblings().children('a').removeClass('ac');
                $('.tabCont .tabItem:eq(0)').show().removeClass('hide').siblings().hide();
                $(".page ").hide();
                $.get("/courses/" + year + "/" + month + "/coursesList.do?" + Math.random(), function (resp) {
                    if (common.checkResponse(resp) == false) return false;
                    if (resp.resCode == "000") {
                        var classes_arr = order.formatClasses2ArrJson(resp);
                        myCalendar.myCalendar(classes_arr, year, month, resp.data.userFlag);
                    }
                })
            }
        }

        window.onhashchange = function() {
            var hash = location.hash.substr(1);
            //alert(hash);
            tabChange(hash);

        };*/
        $(".tab .tabList li:eq(0)").trigger("click");
        /*tab切换*/
        $('.tab .tabList li').click(function() {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings().children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().removeClass('hide').siblings().hide();
        });
        //绑定调课按钮
       /* $("a.tk").live("click", function(){
            var index = $(this).parent().siblings(".indexBtn").val();
            var recordId = $(this).parent().siblings(".recordId").val();
            orderDeatil.changeCourse(recordId, index, 1);
        });
        // 时间和调课按钮切换
        $("div.time_tk").live("mouseenter", function(){
            $(this).find('p:first').hide();
            $(this).find('p:last').show().removeClass("hide");
        });

        $("div.time_tk").live("mouseleave", function(){
            $(this).find('p:first').show().removeClass("hide");
            $(this).find('p:last').hide();
        });*/

     /*   $("#pushNotice0 textarea").live("focus", function(){
            $("p.reason").hide();
        });*/

    }

    return {
        initTeaCourseListNew : initTeaCourseListNew
        // intoClass : intoClass
    }
});

