/**
 * Created by boys on 2015/9/7.
 * 该js主要用于学生我的课表部分的操作
 */

define(['jquery','common','order-deal','myCalendar','enterClassesRecord','orderDeatil','pageBar','dialogs'], function ($,common,order,myCalendar,enter,orderDeatil,pageBar,dialogs) {

    function initCourseList() {


        /*测试*/
        /********************************************************/
        $('.my_viedo_stu .blue').live("click",function(){
            $(".page ").html('');
            var orderid=$(this).parents("td").find("input").val();
            $(this).parents(".sh_table").addClass('hide');
            $('.my_video_section').removeClass('hide');
            loadVedioList(orderid,1);
        });
        $('.bg_blue').live("click",function(){
            var vedioid=$(this).parents("span").find("input").val();
            $.ajax({
                url: "/video/playBack.do",
                type: "post",
                data: {
                    videoId: vedioid
                },
                dataType: "json"
            }).success(function (response, status, xhr) {
                if ("000" == response.resCode) {
                    var url = response.data.url;
                    if (typeof url == "undefined") return false;
                    dialogs._confirm('马上进入视频，准备好了吗?','操作提示',function(){
                        window.openWindow(url);
                    },function(){
                    });
                } else {
                    dialogs._timer(response.resMsg,2,2,null);
                }
            }).fail(function (response, status, xhr) {

            });
        });
        $("ul.tabList a:eq(2)").click(function () {
            $(".page ").html('');
            $('.sh_table').removeClass('hide');
            $('.my_video_section').addClass('hide');
            loadOrderList(1);
        });
        /********************************************************/

        /*测试*/

        var loadOrderList= function(currPage){

            $.ajax({
                url: "/courses/loadeStuOrderList.do",
                type: "post",
                dataType: "json",
                data: {
                    currPage: currPage
                },
                success: function (response) {
                    if (!common.checkResponse(response)) {
                        return false;
                    }
                    var htmlStr = "<tr><th class='tl' style='padding-left:170px'>课程信息</th><th>操作</th></tr>";

                    $.each(response.data.orderlist.data, function (index, item) {
                        var imgsrc="";
                        if(item.advertiseResId!=''&&item.advertiseResId!=0){
                            imgsrc = "/file/loadImage/" + item.advertiseResId + "/180/110.r";
                        }else{
                            imgsrc = "/front/sanhai/images/course.png";
                        }
                        htmlStr+="<tr>";
                        htmlStr+="<td>";
                        htmlStr+="<div class='clearfix '>";
                        htmlStr+="<div class='fl'>";
                        htmlStr+="<img class='my_viedo_stu_img' src='"+imgsrc+"' title='图片' alt='图片' width='180' height='110'/>";
                        htmlStr+="</div>";
                        htmlStr+="<div class='fl my_viedo_stu_info pr'>";
                        htmlStr+="<h4>"+item.courseTitle+"</h4>";
                        htmlStr+="<p><span>"+item.grade+"</span> <span>"+item.subject+"</span> </p>";
                        htmlStr+="<p><span>教材版本</span>:<span>"+item.teaVersion+"</span> </p>";
                        htmlStr+="<p>"+item.orgName+"</p>";
                        htmlStr+="</div>";
                        htmlStr+="</div>";
                        htmlStr+="</td>";
                        htmlStr+="<td>";
                        htmlStr+="<input type='hidden' value='"+item.id+"'/>";
                        htmlStr+="<span class='blue' style='cursor:pointer'>查看详情</span>";
                        htmlStr+="</td>";
                        htmlStr+="</tr>";
                    });
                    $("#orderlist").html(htmlStr);
                    //显示分页工具条
                    pageBar.showPageBar(response.data.orderlist.currPage, response.data.orderlist.totalPages, function (currPage) {
                        loadOrderList(currPage)
                    });
                    $(".page ").show();

                }


            });

        };

        var loadVedioList= function(orderId,currPage){

            $.ajax({
                url: "/courses//loadUserVideos.do",
                type: "post",
                dataType: "json",
                data: {
                    orderId:orderId,
                    currPage: currPage
                },
                success: function (response) {
                    if (!common.checkResponse(response)) {
                        return false;
                    }
                    var htmlStr = "<ul style='background: #dcdcdc'><li style=\"height:36px;line-height: 36px;\"><span style=\"display:inline-block;width:336px;text-align: center\" >课程信息</span><span style=\"display:inline-block;width:154px;margin-left: 183px;text-align: center\" >主讲人</span><span style=\"display:inline-block;width:170px;text-align: center\" >操作</span></li></ul>";

                    $.each(response.data.videolist.data, function (index, item) {
                        htmlStr+="<ul>";
                        htmlStr+="<li>";
                        htmlStr+="<span class='my_viedo_section_bg'></span>";
                        htmlStr+="<span class='my_viedo_section_tit'>第"+item.courseIndex+"节 : "+item.theme+"</span>";
                        htmlStr+="<span class='my_viedo_section_speaker'>主讲人："+item.teaname+"</span>";
                        htmlStr+="<span class='my_viedo_section_play'><input type='hidden' value='"+item.videoId+"'/><strong class='bg_blue'>播放</strong></span>";
                        htmlStr+="</li>";
                        htmlStr+="</ul>";
                    });
                    if(response.data.videolist.data==undefined||response.data.videolist.data.length<=0)htmlStr="您还暂无录制完的视频！";
                    $("#videos").html(htmlStr);
                    //显示分页工具条
                    pageBar.showPageBar(response.data.videolist.currPage, response.data.videolist.totalPages, function (currPage) {
                        loadVedioList(orderId,currPage)
                    });
                    $(".page ").show();

                }


            });

        };


        $(document).ready(function () {
            //加载项
            /*var hashValue = location.href.substr(location.href.lastIndexOf('#')+1);
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            tabChange(hashValue);*/
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            $.get("/courses/" + year + "/" + month + "/coursesList.do?" + Math.random(), function (resp) {
                if (common.checkResponse(resp) == false) return false;
                if (resp.resCode == "000") {
                    var classes_arr = order.formatClasses2ArrJson(resp);
                    myCalendar.myCalendar(classes_arr, year, month, resp.data.userFlag);
                }
            });
            /*tab切换*/
            $('.tab .tabList li').click(function () {
                var index = $(this).index();
                $(this).children('a').addClass('ac').parent('li').siblings().children('a').removeClass('ac');
                $('.tabCont .tabItem:eq(' + index + ')').show().removeClass('hide').siblings().hide();
            });

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

            };*//*function tabChange(hash) {
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

            $("ul.tabList a:eq(0)").click(function () {
                $(".page ").hide();
                $.get("/courses/" + year + "/" + month + "/coursesList.do?" + Math.random(), function (resp) {
                    if (common.checkResponse(resp) == false) return false;
                    if (resp.resCode == "000") {
                        var classes_arr = order.formatClasses2ArrJson(resp);
                        myCalendar.myCalendar(classes_arr, year, month, resp.data.userFlag);
                    }
                })
            });

            // tab切换时请求
            $("ul.tabList a:eq(1)").click(function () {
                $(".page ").html('');
                //if ($("div.page").is(":hidden")) {
                    enter.listClassRecord4Page("", 1);
                //}
                $(".page ").show();
            });
            $("a.tk").live("click", function () {
                var index = $(this).parent().siblings(".indexBtn").val();
                var recordId = $(this).parent().siblings(".recordId").val();
                orderDeatil.changeCourse(recordId, index, 10);
            });

            // 时间和调课按钮切换
           /* $("div.time_tk").live("mouseenter", function () {
                $(this).find('p:first').hide();
                $(this).find('p:last').show().removeClass("hide");
            });

            $("div.time_tk").live("mouseleave", function () {
                $(this).find('p:first').show().removeClass("hide");
                $(this).find('p:last').hide();
            });*/

            /*    //进入课堂
             $("#pushNotice15 button.determineBtn").live("click", function(){
             var url = $(this).parents().find("input").val();
             openWindow(url);
             closeDialog();
             });*/

            //开始输入时隐藏提示语
            $(".popBox textarea").live("focus", function () {
                $(".popBox p.reason").addClass('hide');
            });

            //开始输入时隐藏提示语
            $(".popBox input").live("focus", function () {
                $(".popBox p.reason").addClass('hide');
            });
        });
    }

   /* function intoClass(orderId, startTime, recordId, earliestIntoTime, lastIntoTime) {
        var _timeStamp = (new Date()).valueOf();
        var earliestTime = parseInt(earliestIntoTime);
        var lastestTime = lastIntoTime.split(',');
        var index = -1;
        var $startTime = startTime.split(',');
        var $recordId = recordId.split(',');
        for (var i = 0; i < $startTime.length; i++) {
            if (_timeStamp >= parseFloat($startTime[i]) - (earliestTime * 60 * 1000) &&
                _timeStamp < parseFloat($startTime[i]) + (parseFloat(lastestTime[i]) * 60 * 1000)) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            dialogs._wait("该时间点没课，您可以休息一下喽!", 2, null);
            return;
        }
        $.ajax({
            url: "/videoClass/checkUser.do",
            data: {
                orderId: orderId,
                coursesRecordId: $recordId[index]
            },
            dataType: "json",
            type: "post",
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    var url = resp.data.url;
                    if (typeof url == "undefined") return false;
                    var text_num = 9;
                    var timer = null;
                    dialogs._confirm('马上进入教室，准备好了吗？还有 ' + text_num + ' 秒自动关闭', '操作提示', function () {
                        openWindow(url);
                    }, function () {
                        clearInterval(timer);
                    });
                    clearInterval(timer);
                    timer = setInterval(function () {
                        text_num--;
                        $('.confirm_dialog_box .popbox_item p').text('马上进入教室，准备好了吗？还有 ' + text_num + '  秒自动关闭');
                        if (text_num <= 0) {
                            clearInterval(timer);
                            $('.popBox ').remove();
                        }
                    }, 1000);
                    //openDialog(15);
                    //$("#pushNotice15 #url").val(url);

                    //$("#pushNotice15 #index").text("第" + (index+1) + "节&nbsp&nbsp;")
                }
                return false;
            }
        });
    }*/

    return {
        initCourseList: initCourseList
    }

});