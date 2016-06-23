/**
 * Created by boys on 2015/8/14.
 */
//用于进入待上课页面的js

define(
    [
        'jquery',
        'common',
        'course-timetable-page-append-1.0.0',
        'pageBar'
    ],function($,common,time,pagebar){


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
                    $("table:eq(0) tbody").append("<tr><th>课程名</th><th>学生</th><th>主讲内容</th><th>上课时间</th><th>操作</th></tr>");
                else if (2 == userFlag)
                    $("table:eq(0) tbody").append("<tr><th>课程名</th><th>老师</th><th>主讲内容</th><th>上课时间</th><th>操作</th></tr>");
                $("#count").text("(" + list.length + ")");
            }
            $.each(list, function(index, value){
                var courseStartTime = new Array();
                var courseRecordIds = new Array();
                var classTime = new Array();
                var content = "<tr>" +
                    "<td><span style='width: 275px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block'>"+value.courseTitle + "&nbsp;("+common.df.coursesType(value.courseMode)+")</span></td>";

                var courseNum = "";
                var courseTime = "";
                var courseTheme = "";
                var courseThcher = "";
                var courseThcher_s = "";
                var entreClass="";
                var courseStatus = 0;
                var flag = 0;
                var link="javascript:void(0);";

                if (value.courseMode == '20'){
                    $.each(value.courseRecords, function(index, record){
                        if(record.ptId!=undefined){
                            link="/site/ptcourse/"+record.ptId+"/detail.htm";
                        }
                        entreClass+="<p><a href='#wait' class='blue bg_color' " +
                            "onclick=\"intoClass('"+value.id+"','"+ record.bookCoursesTime +"','"+ record.coursesRecordId +"','" +earlestTime +"','"+record.coursesTimes+"'"+")\">" +
                            "进入教室</a></p>";
                        courseThcher=record.name==undefined?"无":record.name;
                        if(0 == userFlag) courseThcher=value.name==undefined?"无":value.name;
                        courseThcher_s +="<p>"+courseThcher+"</p>";
                        courseTheme = (record.courseTheme == "" ? '' : record.courseTheme);
                        courseNum += "<a href='"+link+"'><p class=\"course\" title='" + courseTheme + "'>(第" + record.recordIndex + "节)&nbsp;" + courseTheme + "</p></a>";
                        courseTime += "<div class=\"time_tk\"><p class=\"course\">" + new Date(parseFloat(record.bookCoursesTime)).format("MM-dd hh:mm") + "</p>" +
                            "<p class=\"course hide\">" + new Date(parseFloat(record.bookCoursesTime)).format("MM-dd hh:mm") + "</p></div>";
                        courseStartTime.push(record.bookCoursesTime);
                        courseRecordIds.push(record.coursesRecordId);
                        classTime.push(record.coursesTimes);
                    });
                }else {
                    if (value.courseRecords.length == 0) {
                        $(".page ").hide();
                        return true;
                    }
                    $(".page ").show();
                    $.each(value.courseRecords, function (index, record) {
                        /* if (++index == value.courseRecords.length) {
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
                        if(record.ptId!=undefined){
                            link="/site/ptcourse/"+record.ptId+"/detail.htm";
                        }
                        courseStatus = record.coursesStatus;
                        if (courseStatus == 20 && index == 0) {
                            flag = 2;
                        }
                        entreClass+="<p><a href='#wait' class='blue bg_color' " +
                            "onclick=\"intoClass('"+value.id+"','"+ record.bookCoursesTime +"','"+ record.coursesRecordId +"','" +earlestTime +"','"+record.coursesTimes+"'"+")\">" +
                            "进入教室</a></p>";
                        courseThcher=record.name==undefined?"无":record.name;
                        if(0 == userFlag) courseThcher=value.name==undefined?"无":value.name;
                        courseThcher_s +="<p>"+courseThcher+"</p>";
                        courseTheme = (record.courseTheme == "" ? '' : record.courseTheme);
                        courseNum += "<a href='"+link+"'><p class=\"course\" title='" + courseTheme + "'>(第" + record.recordIndex + "节)&nbsp;" + courseTheme + "</p></a>";
                        courseTime += "<div class=\"time_tk\"><p class=\"course\">" + new Date(parseFloat(record.bookCoursesTime)).format("MM-dd hh:mm") + "</p>";
                        courseStartTime.push(record.bookCoursesTime);
                        courseRecordIds.push(record.coursesRecordId);
                        classTime.push(record.coursesTimes);
                        //if ((courseStatus == 10 || courseStatus == 21 || courseStatus == 22)&& userFlag == 2)
                        //    courseTime += "<p class='hide course'><a href='javascript:;' class='blue bg_color tk'>调课</a></p>";
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
                if (courseTime == "") return true;

                courseThcher="<td>"+courseThcher_s+"</td>";
                courseNum = "<td class='theme'>"+courseNum+"</td>";
                courseTime =  "<td>"+courseTime+"</td>";
                entreClass="<td>"+entreClass+"</td>";
                content += courseThcher+courseNum + courseTime+entreClass+"</tr>";

                /*if (flag == 0 || flag == 3){
                    content += "<td><p><a href='#wait' class='blue bg_color' " +
                        "onclick=\"intoClass('"+value.id+"','"+ courseStartTime +"','"+ courseRecordIds +"','" +earlestTime +"','"+classTime+"'"+")\">" +
                        "进入教室</a></p></td></tr>";
                }
                else if(flag == 1) {content += "<td></td>";}
                else if(flag == 2){content += "<td>调课申请中</td>";}
                else {content += "<td>上课中</td>"}*/
                $("table:eq(0) tbody").append(content);
            });
        }

  /**
     * 用于待上课页面的分页方法
     * @param url
     * @param data
     * @param currPage
     */
    function listClassRecord4Page(day, currPage) {
        var url = "/courses/find/" + currPage + "/waitCourses.do";
        var data = "";
        var $day = "";
        if (day.length > 0){
            $day = day;
            data += "day=" + day + "&";
        }
        $.ajax({
            url:url,
            type:"post",
            dataType:"json",
            data:data,
            success:function(resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    appendRecordsList(resp);
                    var params = new Array();
                    params.push($day);
                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, listClassRecord4Page, params);
                }
            },
            error:function(resp){
                alert("错误" +resp.resMsg);
            }
        })
    }

    /**
     * 打开一个新的地址页
     * @param url
     */
    function openLinkTab(url) {
        var el = document.createElement("a");
        document.body.appendChild(el);
        el.href = url; //url 是你得到的连接
        el.target = '_blank'; //指定在新窗口打开
        el.click();
        document.body.removeChild(el);
        return false;
    }

    function openWindow(url) {
        var width = window.screen.width;
        var height = window.screen.height;
        var tempWindow = window.open(url, '_blank','fullscreen=yes,location=0,width=' + width + ",height=" +height + ",top=0, left=0");
        return false;
    }

    return {
        listClassRecord4Page : listClassRecord4Page
    }

});