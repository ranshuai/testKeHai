 /**
 * Created by boys on 2015/8/13.
 */
define(
    [
        'jquery',
        'common',
        'course-timetable-page-append-1.0.0',
        'enterClassesRecord',
        'tea-schedule-course-1.0.0'
    ],function($,common,timetable,enter,tea){


 /**
 * 格式化时间格式
 * @param year
 * @param month
 * @param day
 * @returns {string}
 */
function formatTime(year, month, day) {
    var time = "";
    time += year + "-";
    if (month < 10){
        time += "0" + month + "-";
    }else {
        time += month + "-";
    }

    if (day < 10){
        time += "0" + day;
    }else{
        time += day
    }

    return time;
}
/**
 * 动态查询日历信息
 * @param year
 * @param month
 */
function ajaxGetWaitCourse(year, month) {
    //console.log("in ajax for wait course");
    $.post("/courses/"+year+"/"+ month + "/coursesList.do",
        function(resp){
            //console.log("resCode-->" + resp.resCode);
            if (common.checkResponse(resp) == false) return false;
            var class_arr = timetable.formatClasses2ArrJson(resp);
            //console.log("ajax" + class_arr);
            $('.dateList .cls,.dateList .one').die();
            myCalendar(class_arr, year, month,resp.data.userFlag);
    },"json");
    //console.log("out ajax for wait course");
}
/**
 * 获取不同用户的客户日历信息
 * @param class_arr
 * @param userFlag
 */
function myCalendar(class_arr,year, month, userFlag){
    $("#classes_calendar").empty();
    var classes_arr = class_arr;
    //console.log("******************************")
    //console.log(classes_arr);
    //console.log("******************************")
    $('.widget_select').live({
        mouseover:function(){$(this).addClass('widget_select_hover')},
        mouseout:function(){$(this).removeClass('widget_select_hover')}
    });

    $('.widget_select a').live('click',function(){
        var pa=$(this).parents('.widget_select');
        pa.find('h6 span').text($(this).text());
        pa.removeClass('widget_select_hover');
    });


    var html='<div class="calendar">';
    html+='<div class="controlBar">';
    html+='<div class="widget_select control_year">';
    html+='<h6> <span>'+new Date().getFullYear()+'</span><i></i></h6>';
    html+='<ul>';
    //html+='<li><a href="javascript:;">2014</a></li><li><a href="javascript:;">2015</a></li><li><a href="javascript:;">2016</a></li><li><a href="javascript:;">2017</a></li>';
        for (var i=1; i< 5; i++){
            html += '<li><a href="javascript:;">'+(new Date().getFullYear() + i) +'</a></li>';
        }
    html+='</ul>';
    html+='</div>';
    html+='<div class="widget_select control_month">';
    html+='<h6><span>1</span><i></i></h6>';
    html+='<ul><li><a href="javascript:;">1</a></li><li><a href="javascript:;">2</a></li><li><a href="javascript:;">3</a></li><li><a href="javascript:;">4</a></li><li><a href="javascript:;">5</a></li><li><a href="javascript:;">6</a></li><li><a href="javascript:;">7</a></li><li><a href="javascript:;">8</a></li><li><a href="javascript:;">9</a></li><li><a href="javascript:;">10</a></li><li><a href="javascript:;">11</a></li><li><a href="javascript:;">12</a></li></ul>';
    html+='</div>';
    html+='<button type="button" class="transparentBtn noBorder backTodayBtn"> 返回今天</button>';
    html+='</div>';
    html+='<ul class="weekList clearfix">';
    html+='<li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li>';
    html+='</ul>';
    html+='<ul class="dateList clearfix"></ul>';
    html+='</div>';

    $('#classes_calendar').append(html);
    /*
     var classes_arr = [
     { id:110, year: 2015, month: 6, day: 20, type:'one',teacher:'刘萍',lesson:'数学课',joiner:'张三'},
     { id:111,year: 2015, month: 6, day: 30, type: 'cls',teacher:'李清',lesson:'语文课',joiner:'100人'},
     {id:112, year: 2015, month: 8, day: 15, type: 'one',teacher:'张三',lesson:'数学课',joiner:'王五'},
     {id:113, year: 2015, month: 7, day: 6, type: 'one',teacher:'李阳',lesson:'历史课',joiner:'李四'},
     {id:114, year: 2015, month: 8, day: 28, type: 'cls',teacher:'赵薇',lesson:'地理课',joiner:'20人'},
     {id:115, year: 2015, month: 7, day: 28, type: 'cls',teacher:'郭玲',lesson:'生物课',joiner:'40人'}
     ];*/

    //var classes_arr = [{id:, year::, month:, day:, courses[{id, type, teacher, lessson, joiner},{id, type, teacher, lessson, joiner},{id, type, teacher, lessson, joiner},{id, type, teacher, lessson, joiner}]}];
    function dateFn(classes_arr, set_year, set_month) {
        //if (parseInt(set_month) < 10) set_month = "0" + set_month;
        var now_date = new Date();
        var oYear = set_year || now_date.getFullYear();
        var oMonth = set_month || now_date.getMonth() + 1;
        var today = now_date.getDate();
        var iNow = 0;

        $('.calendar .control_month h6').html(oMonth + ' <i></i>');
        $('.calendar .control_year h6').html(oYear + ' <i></i>');


        var setDay = new Date();
        setDay.setFullYear(set_year, set_month);
        iNow = (oYear - now_date.getFullYear()) * 12 + oMonth - (now_date.getMonth() + 1);

        //算出本月有多少天，放多少个LI
        function nowDays() {
            var oDate = new Date();
            //将日期先调到下个月，再将天数调为0 回到上个月最后一天
            today>28? today=28:today=today;
            oDate.setFullYear(oYear, oMonth, today);
            oDate.setMonth(oDate.getMonth(), 0);
            return oDate.getDate();
        };

        // 算出本月第一天是星期几
        function firstDay() {
            var oDate = new Date();
            today>28? today=28:today=today;
            oDate.setFullYear(oYear, oMonth - 1, today);
            oDate.setDate(1);
            return oDate.getDay(); // 0-6 星期天是0
        };


        //接收本月第一天是星期几
        var firstWeek = firstDay();
        if (firstWeek == 0) firstWeek = 7;
        firstWeek--;

        //每次进来之前都要清空
        $('.dateList').empty();

        //塞空白日期的LI
        for (var i = 0; i < firstWeek; i++) {
            $('.dateList').append('<li></li>');
        }

        //接收本月有几天
        var days = nowDays();

        //根据本月有多少天创建LI
        for (var i = 0; i < days; i++) {
            $('.dateList').append('<li>' + (parseInt(i) + 1) + '</li>')
        };

        //获取所有日期的LI
        var aLi = $('.dateList li');

        //判断是上个月还是下个月还是本月
        var oDate = new Date();
        oDate.setMonth(oDate.getMonth());
        var d = oDate.getDate();

        if (iNow < 0) {
            //上个月
            for (var i = 0; i < aLi.length; i++) {
                $(aLi[i]).addClass('ccc');
            };
        }
        else if (iNow == 0) {
            for (var i = 0; i < aLi.length; i++) {
                if ($(aLi[i]).text() < d) {
                    //过去的日期变灰
                    $(aLi[i]).addClass('ccc');
                }
                else if ($(aLi[i]).text() == d) {
                    //当天
                    $(aLi[i]).addClass('today');
                }
                else if (i % 7 == 5 || i % 7 == 6) {
                    //星期六星期天
                    $(aLi[i]).addClass('sun');
                }
            }
        }
        else {
            for (var i = 0; i < aLi.length; i++) {
                if (i % 7 == 5 || i % 7 == 6) {
                    //星期六星期天
                    $(aLi[i]).addClass('sun');
                }
            }
        }

        //标记课程
        function markDate(arr) {
            for (var i = 0; i < arr.length; i++) {
                var id=arr[i]['id'];
                var m_year = arr[i]['year'];
                var m_month = arr[i]['month'];
                var m_day = arr[i]['day'];
                var type = arr[i]['type'];

                if (m_year == oYear && m_month == oMonth) {
                    aLi.each(function() {
                        if ($(this).text() == m_day) {
                            if (type == "one") $(this).addClass('one').attr('id',id);
                            if (type == "cls") $(this).addClass('cls').attr('id',id);
                        }
                    });
                }
            }
        };
        markDate(classes_arr);
    };
    dateFn(classes_arr, year, month);
    //console.log("******************************2");
    //console.log(classes_arr);
    //console.log("******************************");
    //选择年
    $('.calendar .control_year li').live("click",function() {
        var year = $(this).text();
        var month = $('.calendar .control_month h6').text();
        year=$.trim(year);
        month=$.trim(month);
        ajaxGetWaitCourse(year, parseInt(month));
        //dateFn(classes_arr, year, month);
    });
    //选择月
    $('.calendar .control_month li').click(function() {
        var year = $('.calendar .control_year h6').text();
        var month = $(this).text();
        year=$.trim(year);
        month=$.trim(month);
        ajaxGetWaitCourse(year, parseInt(month));
        //dateFn(classes_arr, year, month);
    });

    //返回今天
    $('.calendar .backTodayBtn').click(function() {
        var now_date = new Date();
        var year = now_date.getFullYear();
        var month = now_date.getMonth() + 1;
        ajaxGetWaitCourse(year, month);
        //dateFn(classes_arr, year, month);
    });

    $('.dateList').delegate('li',{'mouseenter':function(){
        $(this).css('zIndex','100');
        if($(this).text()>0){
            $(this).addClass('hover');
        }
    },'mouseleave':function(){
        $(this).css('zIndex','0');
        $(this).removeClass('hover');

    }});

    //显示课程详情
   /* $('.dateList .cls,.dateList .one').live('mouseover',function(){
        var id=$(this).attr('id');
        var pop_l=$(this).position().left;
        var p_w=$(this).parent().width();
        var pos=pop_l-p_w/2;
        var cls="";
        pos>0 ?  cls='calendar_cls_detail calendar_cls_detail_l': cls='calendar_cls_detail';
        //console.log("******************************3")
        //console.log(classes_arr);
        //console.log("******************************")
        //console.log("arr_length-->" + classes_arr.length);
        for( var i=0; i<classes_arr.length; i++){
            if(classes_arr[i]['id']==id) var json=classes_arr[i];
        };
        var cls_type="";
        json['type']=='one'?  cls_type="一对一" : cls_type="班课";

        var popHtml='<div class="'+cls+'">';
        popHtml+='<span class="arrow"></span>';
        popHtml+='<h5>'+cls_type+'</h5>';
        popHtml+='<h6>'+json['lesson']+'</h6>';
        if (userFlag == 0 || userFlag == 1) popHtml+='<p>听课：'+json['joiner']+'</p>';
        else if(userFlag == 2) popHtml+='<p>老师：'+json['teacher']+'</p>';
        else popHtml+='<p>老师：'+json['teacher']+'</p>' + '<p>听课：'+json['joiner']+'</p>';
        popHtml+='</div>';
        var popNum=$(this).children('.calendar_cls_detail').size();
        if(popNum>=1)$(this).children('.calendar_cls_detail').show();
        else $(this).append(popHtml);
    });
    $('.dateList .one,.dateList .cls').live('mouseout',function(){
        $(this).children('.calendar_cls_detail').hide();
    });*/

    //显示课程详情
    $(".dateList .cls,.dateList .one").die("mouseenter");
    $('.dateList .cls,.dateList .one').live('mouseenter',function(){
       var year = $.trim($(".calendar .control_year h6").text()); 
       var month = $.trim($(".calendar .control_month h6").text()); 
        var day = $(this).text();
        var id=$(this).attr('id');
        var pop_l=$(this).position().left;
        var p_w=$(this).parent().width();
        var pos=pop_l-p_w/2;
        var cls="";
        var _this = $(this);
        pos>0 ?  cls='calendar_cls_detail calendar_cls_detail_l': cls='calendar_cls_detail';
        //console.log("******************************3")
        //console.log(classes_arr);
        //console.log("******************************")
        //console.log("year -->" + year);
        //console.log(formatTime(year, month, day));
        //console.log("arr_length-->" + classes_arr.length);
        //console.log("this-->" + $(this).html());
        var day = formatTime(year, month, day);
        var popNum=$(_this).children('.calendar_cls_detail').size();
        //console.log("popNum-->" + popNum);
        //console.log("this-->" + $(_this).html());
        $(this).children('.popI_arrow').show();
        if(popNum >= 1){
            $(_this).children('.calendar_cls_detail').show();
            return false;
        }
        $.post("/courses/"+day + "/list.do", function(resp){
            //console.log(resp.data.list);
            if (common.checkResponse(resp) == false) return;
            $(_this).append("<div class='"+cls+" calendar_cls_detail_l'></div>");
            $.each(resp.data.list, function(index, value){
                var cls_type="";
                switch (value.courseMode){
                    case "0": cls_type = "一对一";break;
                    case "1": cls_type = "班课";break;
                    case "20": cls_type = "旁听";break;
                    case "4": cls_type = "错题一对一";break;
                }
                //var popHtml='<div class="'+cls+'">';
                /*var popHtml='<span class="arrow"></span>';
                popHtml+='<h5>'+cls_type+'</h5>';
                popHtml+='<h6>'+value.courseTitle+'</h6>';
                if (userFlag == 0 || userFlag == 1) popHtml+='<p>听课：'+(value.name==undefined?"无":value.name)+'</p>';
                else if(userFlag == 2) popHtml+='<p>老师：'+(value.name==undefined?"无":value.name)+'</p>';
                else popHtml+='<p>老师：'+(value.teaName==undefined?"无":value.teaName)+'</p>' + '<p>听课：'+(value.stuName==undefined?"无":value.stuName)+'</p>';*/
                var popHtml='<span class="arrow"></span>';
                popHtml+='<h6>'+value.courseTheme+' ('+cls_type+') </h6>';
                popHtml+='<p>上课时间：'+(new Date(parseFloat(value.bookCoursesTime)).format('yyyy-MM-dd hh:mm'))+'</p>';
                //popHtml+='</div>';
                //console.log("popHtml-->" + popHtml);
                //var popNum=$(_this).children('.calendar_cls_detail').size();
                //console.log("popNum-->" + popNum);
                //if(popNum>=2) $(_this).children('.calendar_cls_detail').show();
                //else {$(_this).children("div").append(popHtml);}
                $(_this).children("div").append(popHtml);
            });
            $(_this).append("<i class=\"popI_arrow\"></i>");
        }, "json");

        /*for( var i=0; i<classes_arr.length; i++){
            if(classes_arr[i]['id']==id) var json=classes_arr[i];
        };
        var cls_type="";
        json['type']=='one'?  cls_type="一对一" : cls_type="班课";

        var popHtml='<div class="'+cls+'">';
        popHtml+='<span class="arrow"></span>';
        popHtml+='<h5>'+cls_type+'</h5>';
        popHtml+='<h6>'+json['lesson']+'</h6>';
        if (userFlag == 0 || userFlag == 1) popHtml+='<p>听课：'+json['joiner']+'</p>';
        else if(userFlag == 2) popHtml+='<p>老师：'+json['teacher']+'</p>';
        else popHtml+='<p>老师：'+json['teacher']+'</p>' + '<p>听课：'+json['joiner']+'</p>';
        popHtml+='</div>';
        var popNum=$(this).children('.calendar_cls_detail').size();
        if(popNum>=1)$(this).children('.calendar_cls_detail').show();
        else $(this).append(popHtml);*/
    });
    $('.dateList .one,.dateList .cls').live('mouseout',function(){
        $(this).children('.calendar_cls_detail').hide();
        $(this).children('.popI_arrow').hide();
    });

    //学校用户不得点击
    if (userFlag != 3 && userFlag != 4) {
        $("ul.dateList .cls,ul.dateList .one").die("click");
        $('ul.dateList .cls,ul.dateList .one').live("click", function () {
            $(this).children('.calendar_cls_detail').remove();
            var year = $.trim($(".calendar .control_year h6").text());
            var month = $.trim($(".calendar .control_month h6").text());
            var day = $(this).text();
            var dateTime = formatTime(year, month, day);
            //判断是否是个人中心的点击事件
            var href = location.href;
            if (href.indexOf('waitCourses.htm') == -1){
                //console.log("课表");
                location.href="/courses/find/waitCourses.htm";
                return;
            }
            //console.log(year + "-" + month + "-" + day + "=" + dateTime);
            $(".page ").show();
            /*$("ul.tabList a:eq(0)").removeClass("ac");
            $("ul.tabList a:eq(1)").addClass("ac");
            $("ul.tabList div.tabItem:eq(0)").addClass('hide');
            $("ul.tabList div.tabItem:eq(1)").removeClass('hide');*/
            $(".tab .tabList li:eq(1)").trigger("click");
            enter.listClassRecord4Page(dateTime, 1);
            if (0 == userFlag || 1 == userFlag) tea.initTeaScheduleCourse();
        });
    }
}

    return {
        myCalendar : myCalendar
    }

});

