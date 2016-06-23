/**
 * Created by boys on 2015/9/18.
 * 处理课表信息的js
 */


/**
 * 对学生、老师课程信息进行展示
 * @param json
 */

define(
    [
        'jquery',
        'teacher-course-list-1.0',
        'common',
        'dialogs',
        'money'
    ],function($,course,common, dialogs, money){
        window.openWindow = function(url, videoCode) {
            var width = window.screen.availWidth;
            var height = window.screen.availHeight;
            if (videoCode == undefined || videoCode == 0) {
                var tempWindow = window.open(url, '_blank', 'channelmode=yes,fullscreen=no,location=0,width=' + width + ",height=" + height + ",top=0, left=0,resizable=yes");
            }else if(videoCode == 1){
                var tempWindow1 = window.open('/videoClass/dbyIndex.htm?url='+url, '_blank', 'channelmode=yes,fullscreen=no,location=0,width=' + width + ",height=" + height + ",top=0, left=0,resizable=yes");
            }
            return false;
        };
        window.intoClass = function(orderId, startTime, recordId, earliestIntoTime, lastIntoTime){
            $.post('/courses/begin/time.do', function(resp){
                if (resp.resCode == '000'){
                    //var _timeStamp1 = new Date().getTime();
                    var _timeStamp = parseFloat(resp.data.currTime);
                    var earliestTime = parseInt(earliestIntoTime);
                   /* var $lastestTime = lastIntoTime.split(',');*/
                    var index = -1;
                    /*var $startTime = startTime.split(',');
                    var $recordId = recordId.split(',');*/
                    /*for (var i=0; i < $startTime.length; i++){
                        var beginTime = parseFloat($startTime[i]) - (earliestTime * 60 * 1000);
                        var endTime = parseFloat($startTime[i]) + (parseFloat($lastestTime[i]) * 60 * 1000);

                    }*/
                    /*提前30分钟进入教室*/
                    var beginTime = parseFloat(startTime) - (earliestTime * 60 * 1000);
                    /*上课时间晚30分钟结束*/
                    var endTime = parseFloat(startTime) + (parseFloat(lastIntoTime) * 60 * 1000)+ (earliestTime * 60 * 1000);
                    if(_timeStamp <= beginTime){
                        dialogs._timer("还没到上课时间，您可以休息一下喽!", 2, 2, null);
                        return;
                    }
                    if (_timeStamp > endTime){
                        dialogs._timer("上课时间已过!", 2, 2, null);
                        return;
                    }
                    $.ajax({
                        url: "/videoClass/checkUser.do",
                        data: {orderId:orderId,
                            coursesRecordId:recordId},
                        dataType:"json",
                        type: "post",
                        success: function(resp){
                            if (resp.resCode == "000"){
                                var url = resp.data.url;
                                var videoCode = resp.data.videoCode;
                                var salary = resp.data.salary;
                                var salaryText = "";
                                if (salary != null || salary != undefined){
                                    salaryText = "<p style='color:red'>本节课程的课酬为"+money.fmoney(parseFloat(salary)/100, 2)+"元<p><br/>";
                                }
                                if (typeof url == "undefined") return false;
                                var text_num =9;
                                var timer = null;
                                dialogs._confirm(salaryText + '即将进入教室，准备好了吗？','操作提示',function(){
                                        openWindow(url, 0);
                                },null);
                                /*clearInterval(timer);
                                timer = setInterval(function(){
                                    text_num --;
                                    $('.confirm_dialog_box .popbox_item p').html(salaryText + '马上进入教室，准备好了吗？还有 '+text_num+'  秒自动关闭');
                                    if(text_num<=0){
                                        clearInterval(timer);
                                        $('.popBox ').remove();
                                    }
                                },1000);*/
                            }else{
                                dialogs._timer(resp.resMsg, null, 2, null);
                            }
                            return false;
                        }
                    });
                }else{
                    dialogs._timer("无法进入教室，请稍后重试", 1, 2, null);
                }
            });
            /*var _timeStamp = new Date().getTime();
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
                    }else{
                        dialogs._timer(resp.resMsg, null, 2, null);
                    }
                    return false;
                }
            });*/
        };

        function appendRecordsList(json) {
            if (common.checkResponse(json) == false){
                return;
            }
            $("table:eq(0) tbody").html("");
            var list = json.data.list;
            if (typeof list == "undefined") return;  //无数据时返回
            var userFlag = json.data.userFlag;
            var earlestTime = json.data.earlestTime;
            var lastestTime = json.data.lastestTime;
            if (list.length > 0) {
                if(0 == userFlag || 1 == userFlag)
                    $("table:eq(0) tbody").append("<tr><th>学生</th><th>课程名</th><th>主讲内容</th><th>上课时间</th><th>操作</th></tr>");
                else if (2 == userFlag)
                    $("table:eq(0) tbody").append("<tr><th>老师</th><th>课程名</th><th>主讲内容</th><th>上课时间</th><th>操作</th></tr>");
                $("#count").text("(" + list.length + ")");
            }
            $.each(list, function(index, value){
                var courseStartTime = new Array();
                var courseRecordIds = new Array();
                var classTime = new Array();
                var content = "<tr>" +
                    "<td>"+value.name+"</td>" +
                    "<td>"+value.courseTitle + "&nbsp;("+common.df.coursesType(value.courseMode)+")</td>";
                var courseNum = "";
                var courseTime = "";
                var courseTheme = "";
                var courseStatus = 0;
                var flag = 0;
                if (value.courseMode == '20'){
                    $.each(value.courseRecords, function(index, record){
                        courseTheme = (record.courseTheme == "" ? '' : record.courseTheme);
                        courseNum += "<p class=\"course\" title='" + courseTheme + "'>(第" + record.recordIndex + "节)&nbsp;" + courseTheme + "</p>";
                        courseTime += "<div class=\"time_tk\"><p class=\"course\">" + new Date(parseFloat(record.bookCoursesTime)).format("MM-dd hh:mm") + "</p>" +
                            "<p class=\"course hide\">" + new Date(parseFloat(record.bookCoursesTime)).format("MM-dd hh:mm") + "</p></div>";
                        courseStartTime.push(record.bookCoursesTime);
                        courseRecordIds.push(record.coursesRecordId);
                        classTime.push(record.coursesTimes);
                    });
                }else {
                    $.each(value.courseRecords, function (index, record) {
                        /*if (++index == value.courseRecords.length) {
                            if (record.recordIndex == null) {
                                record.recordIndex = 0;
                                flag = 1;
                            }
                            if (parseInt(record.coursesTime) > parseInt(record.totalTime)) {
                                courseNum += "<p class=\"course\">第" + (parseInt(record.recordIndex) + 1) + "节</p>";
                            }
                            if (0 == userFlag || 1 == userFlag) {
                                if (parseInt(record.coursesTime) <= parseInt(record.totalTime)) {
                                    courseTime += "<p>课已排完</p>";
                                }
                                else {
                                    courseTime += "<p><a class=\"blue pushBtnJs\">排课</a>";
                                    courseTime += "<input type=\"hidden\" value='" + record.id + "' name='orderId'/>";
                                    courseTime += "<input type=\"hidden\" value='" + record.coursesId + "'name='courseId'/></p>";
                                }
                            } else {
                                if (parseInt(record.coursesTime) <= parseInt(record.totalTime)) {
                                    courseTime += "<p>课已排完</p>";
                                } else {
                                    courseTime += "<p>待排课</p>";
                                }
                            }
                            return false;
                        }*/
                        courseStatus = record.coursesStatus;
                        if (courseStatus == 20 && index == 0) {
                            flag = 2;
                        }
                        courseTheme = (record.courseTheme == "" ? '' : record.courseTheme);
                        courseNum += "<p class=\"course\" title='" + courseTheme + "'>(第" + record.recordIndex + "节)&nbsp;" + courseTheme + "</p>";
                        courseTime += "<div class=\"time_tk\"><p class=\"course\">" + new Date(parseFloat(record.bookCoursesTime)).format("MM-dd hh:mm") + "</p>";
                        courseStartTime.push(record.bookCoursesTime);
                        courseRecordIds.push(record.coursesRecordId);
                        classTime.push(record.coursesTimes);
                        if (courseStatus == 10 || courseStatus == 21 || courseStatus == 22) courseTime += "<p class='hide course'><a href='javascript:;' class='blue bg_color tk'>调课</a></p>";
                        if (courseStatus == 11) {
                            courseTime += "<p class=\"gray hide course\">上课中</p>";
                            flag = 3;
                        }
                        if (courseStatus == 20) {
                            courseTime += "<p class=\"gray hide course\">调课中</p>";
                        }
                        if (courseStatus == 12) {
                            courseTime += "<p class=\"gray hide course\">课程中止</p>";
                        }
                        courseTime += "<input type='hidden' value='" + record.recordIndex + "' class='indexBtn' />" +
                            "<input type='hidden' value='" + value.orderNum + "' class='orderId' />" +
                            "<input type='hidden' value='" + record.coursesRecordId + "' class='recordId' /></div>";
                    });
                }
                courseNum = "<td class='t  heme'>"+courseNum+"</td>";
                courseTime =  "<td>"+courseTime+"</td>";
                content += courseNum + courseTime;
                if (flag == 0 || flag == 3){
                content += "<td><p><a href='#' class='blue bg_color' " +
                    "onclick=\"intoClass('"+value.id+"','"+ courseStartTime +"','"+ courseRecordIds +"','" +earlestTime +"','"+classTime+"'"+")\">" +
                    "进入教室</a></p></td></tr>";
                }

                else if(flag == 1) {content += "<td></td>";}
                else if(flag == 2){content += "<td>调课申请中</td>";}
                else {content += "<td>上课中</td>"}
                $("table:eq(0) tbody").append(content);
            });
        }

        /**
         * 获取老师和学生的上课列表以数组json格式返回
         * @param resp
         */
        function formatClasses2ArrJson(resp) {
        var class_arr = [];
        var list = resp.data.list;
        var userFlag = resp.data.userFlag;
        if (list.length > 0){
            for (var i=0; i < list.length; i++){
                var record = list[i];
                var mode = record.courseMode;
                var type = mode == 0 ? "one" : "cls";
                var date = new Date(parseFloat(record.bookCoursesTime));
                var info = "";
                if (userFlag == 0 || userFlag == 1){
                    info = "{\"id\":\"" + record.coursesRecordId+ "\", \"year\":\"" + date.getFullYear() +"\", \"month\":\""+ parseInt(date.getMonth()+1) +"\", \"day\":\"" +
                        date.getDate() +"\", \"type\":\""+ type+"\",\"teacher\":\"\""+",\"lesson\":\""+record.courseTitle+"\",\"joiner\":\""+ record.name + "\"}";
                }else if(userFlag == 2){
                    info = "{\"id\":\"" + record.coursesRecordId+ "\", \"year\":\"" + date.getFullYear() +"\", \"month\":\""+ parseInt(date.getMonth()+1) +"\", \"day\":\"" +
                        date.getDate() +"\", \"type\":\""+ type+"\",\"teacher\":\""+record.name + "\""+",\"lesson\":\""+record.courseTitle+"\",\"joiner\":\"\"}";
                } else {
                    info = "{\"id\":\"" + record.coursesRecordId+ "\", \"year\":\"" + date.getFullYear() +"\", \"month\":\""+ parseInt(date.getMonth()+1) +"\", \"day\":\"" +
                        date.getDate() +"\", \"type\":\""+ type+"\",\"teacher\":\""+record.teaName + "\""+",\"lesson\":\""+record.courseTitle+"\",\"joiner\":\""+record.stuName+"\"}";
                }
                class_arr.push($.parseJSON(info));
            }
        }
        return class_arr;

    }

    return {
        appendRecordsList:appendRecordsList,
        formatClasses2ArrJson:formatClasses2ArrJson

    }
});
