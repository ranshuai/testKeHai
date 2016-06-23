/**
 * Created by Tian Jiayuan on 2015/7/2.
 */

define(
    [
        'jquery',
        'common',
        'money',
        'pageBar',
        'evaluate',
        'dialogs',
        'jquery_ui_min'
    ],function($,common,money,pagebar,evaluate, dialogs){


        window.quitCourse = function(orderId,type) {
            if (type == 1){ //退一对一课
                dialogs._class_cancel(function () {
                    var url = "/retireCourses/applicationWithdrawal.do";
                    var data = "WithdrawalInfo=" + encodeURIComponent($("#notice_textarea").val()) + "&orderNum=" + orderId;
                    sendRequestToServer(url, data);
                }, null);
            }else if(type == 30){ //换老师
                dialogs._teacher_change(function(){
                    $("input.oper").val(type);
                    $("input.orderId").val(orderId);
                    var url = "/changeTea/request.do";
                    var data = "operType=" + $(".oper").val() + "&detail=" + encodeURIComponent($("textarea").val()) + "&orderId=" + $(".orderId").val();
                    sendRequestToServer(url, data);
                }, null);
            }else if (type == 20){ // 退旁听
                var money = parseInt($("#money").val());
                dialogs._pt_agree_refund(function () {
                        $.ajax({
                            type: "post",
                            url: "/retireCourses/agree.do",
                            dataType: "json",
                            data: {
                                "backMoney": money,
                                "orderNum": orderId
                            },
                            success: function (result) {
                                if (common.checkResponse(result) == false) return;
                                if (result.resCode == "000") {
                                    dialogs._timer("退课成功", 1, 2, function(){location.reload();});
                                }else{
                                    dialogs._timer("退课失败", 2, 2, null);
                                }
                            }
                        });
                }, null);
                $("[name='oper']").val(10);
                $("[name='orderId']").val(orderId);
                $("[name='money']").val(money);
                $("p.notice").replaceWith("退旁听:<span class='orange'>" + $("#courseTitle").val() + "</span><br/>共：<span class='orange'>" + (money / 100).toFixed(2) + "</span>元<br/>您确认退吗？");
            }
        };

        window.courseSummary = function (orderId) {
            var $orderId = orderId;
            dialogs._class_summary(function(){
                var url = "/orderDeal/addSummary.do";
                var data = "id=" + $orderId + "&summary=" + $.trim($("#notice_textarea").val());
                sendRequestToServer(url, data);
            }, null);
        }

        window.sendRequestToServer = function (url, data){
            $.ajax({
                url:url,
                data:data,
                type:"post",
                dataType:"json",
                success:function(resp){
                    if (resp.resCode == "000") {
                        dialogs._timer("操作成功", 1, 1, function(){location.reload();});
                    }else {
                        dialogs._timer(resp.resMsg, 2, 1, null);
                    }
                },
                beforeSend:function(){

                }
            })
        }
/**
 * 获取订单列表信息
 * @param resp
 */
/**
 *
 * @param url
 * @param data
 * @param currPage
 */
function orderListInfo4Page(url, data, currPage, type) {
    var a = data;
    data += "currPage=" + currPage;
    $.ajax({
        url: url,
        data: data,
        type: "post",
        beforeSend: function () {
            //showLoading();
        },
        success: function (resp) {
            $("div.main_Cont30").removeClass("loading_page");
            if (common.checkResponse(resp) == false) return;
            if (resp.resCode == "000") {
                appendDetail(resp, type);
                var params = new Array();
                params.push("/orderDeal/list.do");
                params.push(a);
                pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, orderListInfo4Page, params);
            }
        },
        error: function (resp) {

        }
    });
}

/**
 * 订单列表信息展示方法
 * @param resp
 */
var appendDetail = function (resp, type) {
    //获取返回数据
    var data = resp.data;
    if (typeof data == "undefined")
        return;
    var list = data.list;
    if (typeof list == "undefined") {
        list = data.rows;
    }
    //统计数
    var count = data.countSize;
    if ((typeof count == "undefined")) {
        count = 0;
    }
    if (type == 1){

    }else{
        if (count == 0) {
            $(".tabItem:eq(0)").show();
            $(".tabItem:eq(1)").hide();
        }else{
            $(".tabItem:eq(1)").show();
            $(".tabItem:eq(0)").hide();
        }
    }
    //用户身份识别 0 老师 1 大学生 2 学生 3 机构
    var userFlag = data.userFlag;
    var orderStatus;
    $("#count").replaceWith("<h5 id=\"count\">&nbsp;&nbsp;&nbsp;共有" + count + "条记录</h5>");
    //添加分页
    $("table:eq(0) tbody").html("");
    if (count > 0) {
        //判断用户身份
        switch (userFlag) {
            case "0":
            case "1":
                $("table:eq(0) tbody").append("<tr class=\"table_head\"><th style=\"text-align: center;\">订单名称</th><th>价格</th><th>状态</th><th>购买人</th><th>操作</th></tr>");
                break;
            case "2":
                $("table:eq(0) tbody").append("<tr class=\"table_head\"><th style=\"text-align: center;\">订单名称</th><th>价格</th><th>教师</th><th>状态</th><th>操作</th></tr>");
                break;
            case "3":
            case "4":
                $("table:eq(0) tbody").append("<tr class=\"table_head\"><th style=\"text-align: center;\">订单名称</th><th>价格</th><th>教师</th><th>状态</th><th>购买人</th><th>操作</th></tr>");
                break;
        }
    } else {
        $("table:eq(0) tbody").html("");
    }

    if (typeof list != "undefined" && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            /** 表格数据头**/
            $("table:eq(0) tbody").append("<tr class=\"order_num\"></tr>");
            var date = new Date(parseFloat(list[i].orderGenerateTime)).format("yyyy-MM-dd hh:mm:ss");
            if (userFlag == "3" || userFlag == "4") {
                $("table:eq(0) tbody").children("tr:last-child").append("<th colspan='6'></th>");
            } else {
                $("table:eq(0) tbody").children("tr:last-child").append("<th colspan='5'></th>");
            }
            $("table:eq(0) tbody tr:last-child").children("th").append("订单号:" + list[i].id + "&nbsp;&nbsp;&nbsp;" + date);
            /** 表格内容 **/
            $("table:eq(0) tbody").append("<tr class=\"order_name\"></tr>");
            $("table:eq(0) tbody tr:last-child").append("<td><div class=\"ellipsis\">" + list[i].courseTitle + "&nbsp;(" + common.df.coursesType(list[i].courseMode, 0) + ")</div></td>");
            $("table:eq(0) tbody tr:last-child").append("<td class='tc'>" + money.fmoney(list[i].orderActualPrice / 100, 2) + "</td>");
            var type = list[i].orderStatus + list[i].assignTeacherFlag;
            var path = "/orderDeal/find/" + list[i].id + ".htm?type=" + type;
            var teacher = "无";
            //未支付的老师显示无
            if (list[i].orderStatus == 0) {
                $("table:eq(0) tbody tr:last-child").append("<td align='center'>" + teacher + "</td>");
            } else if (list[i].orderStatus == 2) {
                if (userFlag == "2") {//学生用户显示老师名
                    if (list[i].assignTeacherFlag == "3") {
                        if(list[i].teacher != null)
                            teacher = list[i].teacher.name==''?"无":list[i].teacher.name;
                        else
                            teacher = "无";
                    }
                    $("table:eq(0) tbody tr:last-child").append("<td align='center'>" + teacher + "</td>");
                } else if ("3" == userFlag || "4" == userFlag) {
                    /*if (type == "23") { //老师确认后
                        teacher = list[i].teacher.name;
                    }
                    else if ((type == "20" || type == "22") && list[i].coursesStatus == 0) { //机构匹配老师
                        teacher = "<a href='" + path + "' class='tc blue'>匹配老师</a>";
                    } else if (type = "21" && list[i].coursesStatus == 0) {//老师确认中
                        path = "/orderDeal/find/" + list[i].id + ".htm?type=20";
                        teacher = "<a href='" + path + "' class='tc blue'>重新匹配</a>";
                    }*/
                    if(list[i].teacher!=null&&list[i].teacher.name!=""){
                        teacher = list[i].teacher.name;
                    }
                    $("table:eq(0) tbody tr:last-child").append("<td align='center'>" + teacher + "</td>");
                }
            }
            orderStatus = common.df.orderPayType(list[i].orderStatus, 0);
            if (list[i].orderStatus == 2) {
                orderStatus = common.df.orderStatus(list[i].assignTeacherFlag + list[i].coursesStatus + list[i].isRetireCourses, 0);
                if (list[i].changeTeaFlag == 30 && orderStatus == "<p>进行中</p>"){
                    orderStatus = "<p>换师中</p>";
                }
            }
            $("table:eq(0) tbody tr:last-child").append("<td align='center'>" + orderStatus + "</td>");
            //非学生用户
            if (userFlag != "2") {
                $("table:eq(0) tbody tr:last-child").append("<td align='center'>" + list[i].user.name + "</td>");
            }
            var pathDetail = "/orderDeal/find/" + list[i].id + ".htm?type=0";
            var oper = "<a href='" + pathDetail + "' class='tc blue'>查看详情</a><br/><input type='hidden' name='orderId' value='" + list[i].id + "' />";
            //学生对应的操作按钮
            if (userFlag == "2") {
                //支付后的操作
                if (list[i].orderStatus == 2 && list[i].coursesStatus == 0 ) {
                    if (list[i].courseMode == 20 || list[i].courseMode == 0){
                        oper += "<br/><a href='#1' class='tc blue ajax'>退课</a>";
                    }
                   /* if (list[i].courseMode == 0 && list[i].assignTeacherFlag == 3 && list[i].changeTeaFlag != 30) { //一对一
                        oper += "<a href='#30' class='tc blue ajax'>&nbsp;&nbsp;换老师</a>";
                    }*/
                    //未支付的操作
                } else if (list[i].orderStatus == 0) {
                    //2015-09-07 蒋淼修改 只传递订单ID
                    var linkPath = "/shopping/shoppingCarTrade.htm?tradeOrder=" + list[i].id;
                    oper += "<br/><a href='" + linkPath + "' class='tc blue'>去支付</a>";
                }
                // 订单已结课 未评价
                if (list[i].coursesStatus == 1 && list[i].evaluteFlag == 0 && list[i].courseMode !=20) {
                    oper += "<a href='#0' class='tc blue ajax'>待评价</a>"
                }
            }
            //机构
            else if (userFlag == "3" || userFlag == "4") {
                if (list[i].orderStatus == 0) {
                    oper += "<a href='#40' class='tc blue ajax'>编辑</a>";
                }
            }else {
                if (list[i].coursesStatus == 1 && list[i].evaluteStuFlag == 0) {
                    oper += "<a href=" + pathDetail + " class='tc blue ajax'>待评价</a>";
                }
            }
            $("table:eq(0) tbody tr:last-child").append("<td class='tc blue'><input type='hidden' value='" + list[i].coursesId + "'/>" +
                "<input type='hidden' value='" + list[i].courseTitle + "'/>" +
                "<input type='hidden' value='" + list[i].id + "'/>" +
                "<input type='hidden' value='" + list[i].schoolId + "'/>" +
                "<input type='hidden' value='" + list[i].teacherId + "'/>" + oper + "</td>");
        }
    }
};

/**
 * 添加订单详情里中详细信息
 * @param resp
 */
function appendOrderDetailInfo(resp) {
    var json = resp;
    var order = json.data.coursesOrder;
    var courses = json.data.coursesList;
    var userFlag = json.data.userFlag;
    var evaluteList = json.data.evaluteList;
    //老师  大学生
    //alert(typeof userFlag);
    if (userFlag == "0" || userFlag == "1" || userFlag == "3" || userFlag == "4") {
        //添加学生信息
        $("#name").append(order.user.name);
        $("#sex").append(common.df.sexType(order.user.sex, 0));
        $("#tel").append(order.user.phoneNumber);
        $("#userId").val(order.user.userId);
        $("a.talk").attr("href", "/site/student/" + order.user.userId + "/toStudentIndex.htm");
        if (order.user.ppResId == "") {
            $("dt img").attr("src", JS_BASEURL + "/images/person.png");
        } else {
            $("dt img").attr("src", "/file/loadImage/" + order.user.ppResId + ".r")
        }
    } else if (userFlag == 2) {//学生
        //添加老师信息
        if (order.teacher != null) {
            $("#name").append(order.teacher.name);
            $("#sex").append(common.df.sexType(order.teacher.sex, 0));
            $("#tel").append(order.teacher.phoneNumber);
            $("#userId").val(order.teacher.userId);
            $("a.talk").attr("href", "/site/theacher/" + order.teacher.userId + "/toTeacherIndex.htm");
            if (order.teacher.ppResId == "") {
                $("dt img").attr("src", JS_BASEURL + "/images/person.png");
            } else {
                $("dt img").attr("src", "/file/loadImage/" + order.teacher.ppResId + ".r")
            }

        }else{
            $(".student_message").hide();
        }
    }
    //添加订单信息
    var price = order.coursesTime != 0 ? money.fmoney((order.orderActualPrice / 100) / (order.coursesTime / 60)) : "￥0.00";
    $("#orderId").append(order.id + "  &nbsp;&nbsp;" + new Date(parseFloat(order.orderGenerateTime)).format("yyyy-MM-dd hh:mm:ss"));
    $("table:eq(0) tbody tr td:eq(0)").append("<p>" + order.courseTitle + "</p><p>(" + common.df.coursesType(order.courseMode, 0) + ")</p>");
    $("table:eq(0) tbody tr td:eq(1)").append("总时长：" + Math.round(order.coursesTime / 60) + "小时<br/>");
    $("table:eq(0) tbody tr td:eq(2)").append("<p>单价：" + price + "/小时</p><p>总价：" + money.fmoney(order.orderActualPrice / 100, 2) + "</p>");
    var orderStatus;
    orderStatus = common.df.orderPayType(order.orderStatus, 0);
    if (order.orderStatus == 2) {  // 已支付
        orderStatus = common.df.orderStatus(order.assignTeacherFlag + order.coursesStatus + order.isRetireCourses, 0); //组合查看状态
        if (order.coursesFinishTimes > 0) {
            orderStatus = "<p>已完成" + order.coursesFinishTimes / 60 + "/" + parseInt(order.coursesTime / 60) + "课程</p>";
        }
    }
    var oper = "";
    if (order.orderStatus == 2) {
        // 学生的操作
        if (userFlag == "2") {
            if ( order.courseMode == '0'){
                if (order.coursesStatus == 0) { //未结课
                    oper = "<a href='javascript:;' class=\"blue pushBtnJs quit\" id=\"quit\" onclick=\"quitCourse('" + order.id + "',1)\">退课</a>&nbsp;&nbsp;";
                }
                var index = json.data.index;
                var courseRecordId = json.data.courseRecordId;
                if (order.coursesStatus == 0) {
                    if (order.assignTeacherFlag == 3 && (order.isRetireClass == 0 || order.isRetireClass == 32)) {
                        if (typeof courseRecordId != "undefined" && courseRecordId != null && courseRecordId > 0) {
                            oper += "<a href='javascript:;' class=\"blue pushBtnJs change\" id=\"change\" onclick=\"changeCourse('" + courseRecordId + "','" + index + "',20)\">调课</a>&nbsp;&nbsp;";
                        } else {
                            oper += "<a href='javascript:;' disabled='true'>调课</a>&nbsp;&nbsp;";
                        }
                    }
                }
                /*if (order.coursesStatus == 0 && order.assignTeacherFlag == 3 && order.changeTeaFlag != 30) {
                    oper += "<a href='javascript:;' class=\"blue pushBtnJs changeTea\" onclick=\"quitCourse('" + order.id + "',30)\">换老师</a>";
                }*/

                if (order.coursesStatus == 1 && order.evaluteFlag == 0) {
                    oper += "<a href='javascript:;' class=\"blue pushBtnJs changeTea pushBtnJs1\" >待评价</a>" +
                        "<input type='hidden' value='" + order.coursesId + "'/>" +
                        "<input type='hidden' value='" + order.courseTitle + "'/>" +
                        "<input type='hidden' value='" + order.id + "'/>" +
                        "<input type='hidden' value='" + order.schoolId + "'/>" +
                        "<input type='hidden' value='" + order.teacherId + "'/>" +
                        "<input type='hidden' value=''/>" +
                        "<input type='hidden' value=''/>";
                }
            }else if(order.courseMode == "20"){
                if (order.coursesStatus == 0) { //未结课
                    oper = "<a href='javascript:;' class=\"blue pushBtnJs quit\" id=\"quit\" onclick=\"quitCourse('" + order.id + "',20)\">退课</a>&nbsp;&nbsp;";
                    oper +=  "<input id='courseTitle' type='hidden' value='" + order.courseTitle + "'/>";
                    oper +=  "<input id='money' type='hidden' value='" + order.orderActualPrice + "'/>";
                }
            }

        }
        // 老师的操作
        else if (userFlag == "0" || userFlag == "1") {
            var index = json.data.index;
            var courseRecordId = json.data.courseRecordId;

            if (order.coursesStatus == 1 && order.evaluteStuFlag == 0) {
                oper += "<p><a href='javascript:;' class=\"blue pushBtnJs changeTea pushBtnJs1\" >待评价</a></p>" +
                    "<input type='hidden' value='" + order.coursesId + "'/>" +
                    "<input type='hidden' value='" + order.courseTitle + "'/>" +
                    "<input type='hidden' value='" + order.id + "'/>" +
                    "<input type='hidden' value='" + order.schoolId + "'/>" +
                    "<input type='hidden' value='" + order.teacherId + "'/>" +
                    "<input type='hidden' value='" + order.userId + "'/>" +
                    "<input type='hidden' value='" + order.user.name + "'/>";
            }
            if (order.coursesStatus == 1 /*&& order.isRetireCourses==0*/ && order.summaryFlag == 0) {
                oper += "<p><a href='javascript:;' class=\"blue\" onclick=\"courseSummary('" + order.id + "')\">课程总结</a></p>";
            }
        }
        // 机构的操作
        else {
            if (order.assignTeacherFlag == 0 && order.coursesStatus == 0) {
                oper += "<a href='javascript:;' class=\"blue pushBtnJs chooseTea\" onclick=\"chooseTea('" + order.id + "',20)\">匹配老师</a>";
            } else if (order.assignTeacherFlag == 2 && order.coursesStatus == 0) {
                oper += "<a href='javascript:;' class=\"blue pushBtnJs chooseTea\" onclick=\"chooseTea('" + order.id + "',22)\">匹配老师</a>";
            }
        }
    } else {
        if (userFlag == "3" || userFlag == "4") {
            oper += "<p><a href='#40' class='blue pushBtnJs edit'>编辑</a></p>";
        }else if (userFlag == "2"){
            var linkPath = "/shopping/shoppingCarTrade.htm?tradeOrder=" + order.id;
            oper += "<p><a href='" + linkPath + "' class='tc blue'>去支付</a></p>";
        }
    }
    $("table:eq(0) tbody tr td:eq(3)").append(orderStatus + oper);
    $("a.edit").data("time", Math.round(order.coursesTime / 60)).data("money", order.orderActualPrice / 100);

//        添加课程信息
    if (typeof courses != "undefined" && courses != null) {
        $("#courses").show();
        for (var i = 0; i < courses.length; i++) {
            var course = courses[i];
            $("table:eq(1) tbody").append("<tr></tr>");
            $("table:eq(1) tbody tr:last-child").append("<td>" + course.coursesNum + "</td><td>" + course.coursesTimes / 60 + "小时</td><td><p>" +
                //new Date(parseFloat(course.coursesBeginTime)).format("yyyy-MM-dd hh:mm:ss") + "</td><td>" + course.name +
                new Date(parseFloat(course.coursesBeginTime)).format("yyyy-MM-dd") + "</p><p>"+
                new Date(parseFloat(course.coursesBeginTime)).format("hh:mm:ss")+"</p></td><td>" + course.name +
                "</td><td>" + common.df.coursesStatus(course.coursesStatus, 0) + "</td>");
        }
    }
    //添加评价信息
    $("#evluate table tbody").empty();
    if (evaluteList != null && evaluteList.length > 0) {
        $("#evluate").show();
        $.each(evaluteList, function (index, value) {
            if (value.stu2Tea == null && value.tea2Stu == null) {
            }
            else {

                var content = "<tr><td>第" + value.index + "节</td><td class=\"evaluate_message tl\">";
                if (value.stu2Tea != "undefined" && value.stu2Tea != null) {
                    if(value.stu2Tea[0].ppResId != ''){
                        content += "<dl class=\"clearfix\"><dt><img src=\"" + "/file/loadImage/" + value.stu2Tea[0].ppResId + ".r\" alt=\"学生头像\" title=\"学生头像\"></dt>";
                    }else{
                        content += "<dl class=\"clearfix\"><dt><img src='"+JS_BASEURL+"/images/person.png' alt=\"学生头像\" title=\"学生头像\"></dt>";
                    }
                    content += "<dd><p>" + new Date(parseFloat(value.stu2Tea[0].time)).format("yyyy-MM-dd hh:mm:ss") + "</p><p>" + value.stu2Tea[0].userName + "</p></dd></dl>";
                    content += "<p class=\"evaluate_cont\">" + value.stu2Tea[0].des + "</p>";
                } else {
                    if (order.user.ppResId != ''){
                        content += "<dl class=\"clearfix\"><dt><img src=\"" + "/file/loadImage/" + order.user.ppResId + ".r\" alt=\"学生头像\" title=\"学生头像\"></dt>";
                    }else{
                        content += "<dl class=\"clearfix\"><dt><img src='"+JS_BASEURL +"/images/person.png' alt=\"学生头像\" title=\"学生头像\"></dt>";
                    }
                    content += "<dd><p></p><p>" + order.user.name + "</p></dd></dl>";
                    content += "<p class=\"evaluate_cont\"></p>";
                }
                content += "</td>";
                content += "<td class=\"evaluate_message tl\">";
                if (value.tea2Stu != "undefined" && value.tea2Stu != null) {
                    content += "<dl class=\"clearfix\">";
                    if (value.tea2Stu[0].ppResId != ''){
                        content += "<dt><img src=\"" + "/file/loadImage/" + value.tea2Stu[0].ppResId + ".r\" alt=\"教师头像\" title=\"教师头像\"></dt>";
                    }else{
                        content += "<dt><img src='"+JS_BASEURL +"/images/person.png' alt=\"教师头像\" title=\"教师头像\"></dt>";
                    }
                    content += "<dd><p>" + new Date(parseFloat(value.tea2Stu[0].time)).format("yyyy-MM-dd hh:mm:ss") + "</p><p>" + value.tea2Stu[0].userName + "</p></dd></dl>";
                    content += "<p class=\"evaluate_cont\">" + value.tea2Stu[0].des + "</p>";
                } else {
                    content += "<dl class=\"clearfix\">";
                    if (order.teacher.ppResId != ''){
                        content += "<dt><img src=\"" + "/file/loadImage/" + order.teacher.ppResId + ".r\" alt=\"教师头像\" title=\"教师头像\"></dt>";
                    }else {
                        content += "<dt><img src='"+JS_BASEURL+"/images/person.png' alt=\"教师头像\" title=\"教师头像\"></dt>";
                    }
                    content += "<dd><p></p><p>" + order.teacher.name + "</p></dd></dl>";
                    content += "<p class=\"evaluate_cont\"></p>";
                }
                content += "</td></tr>";
                $("#evluate table tbody").append(content);
            }
        });
    }
    // 订单总评


    /*解绑*/
    $('.pushBtnJs1').click(function () {
        $('#wrong_text').addClass('hide');
        $('#wrong_text_length').addClass('hide');
        var $this = $(this);
        if (0 == userFlag || 1 == userFlag) {
            dialogs._form_assess(function(){evaluate.saveEvaluaTea();}, function () {
                $('.p_right em i').removeClass('active');
                $('.p_right em span').text('0');});
        } else {
            dialogs._student_assess(function(){evaluate.saveEvaluaStu();}, function () {
                $('.p_right em i').removeClass('active');
                $('.p_right em span').text('0');});
        }
        $('#coursesId').val($this.parents('td').children('input').eq(0).val());
        $('#courseTitle').val($this.parents('td').children('input').eq(1).val());
        $('#id').val($this.parents('td').children('input').eq(2).val());
        $('#schoolId').val($this.parents('td').children('input').eq(3).val());
        $('#teacherId').val($this.parents('td').children('input').eq(4).val());
        $('#userId1').val($this.parents('td').children('input').eq(5).val());
        $('#username').val($this.parents('td').children('input').eq(6).val());
        //$("#pushNotice").dialog("open");
        //评价弹窗里的评分，
        $('.p_right em').each(function (index) {
                $('.p_right em').eq(index).delegate('i', {
                    'mouseenter': function () {

                        var index = $(this).parent().find('i').index($(this));
                        var $this = $(this);
                        for (var j = 0; j < $(this).parent().find('i').length; j++) {
                            if ($this.parent().find('i').eq(j).index() <= index + 1) {
                                $this.addClass('ac');
                                $this.parent().find('i').eq(j).addClass('ac');

                            }
                        }
                    }, 'mouseleave': function () {
                        var $this = $(this);
                        $this.parent().find('i').removeClass('ac');
                    }, 'click': function () {
                        var index = $(this).parent().find('i').index($(this));
                        var $this = $(this);
                        for (var j = 0; j < $(this).parent().find('i').length; j++) {
                            if ($this.parent().find('i').eq(j).index() <= index + 1) {
                                $this.addClass('active');
                                $this.parent().find('i').eq(j).addClass('active');
                                $this.parent().find('span').text(index + 1);
                            } else {
                                $this.parent().find('i').eq(j).removeClass('active');
                            }
                        }
                    }
                });
            }
        );
        return false;

    });

};

/**
 * 获取分页的属性
 * @type {{pageSize, countSize, currPage, totalPages}}
 */
var pageInfo = function () {
    return {
        pageSize: function (data) {
            return typeof data.pageSize == "undefined" ? 0 : data.pageSize;
        },
        countSize: function (data) {
            return typeof data.countSize == "undefined" ? 0 : data.countSize;
        },
        currPage: function (data) {
            return typeof data.currPage == "undefined" ? 0 : data.currPage;
        },
        totalPages: function (data) {
            return typeof resp.data.totalPages == "undefined" ? 0 : resp.data.totalPages;
        }
    };
}();


/**
 * 获取老师和学生的上课列表以数组json格式返回
 * @param resp
 */
function formatClasses2ArrJson(resp) {
    var class_arr = [];
    var list = resp.data.list;
    var userFlag = resp.data.userFlag;
    if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            var record = list[i];
            var mode = record.courseMode;
            var type = mode == 0 ? "one" : "cls";
            var date = new Date(parseFloat(record.bookCoursesTime));
            var info = "";
            if (userFlag == 0 || userFlag == 1) {
                info = "{\"id\":\"" + record.coursesRecordId + "\", \"year\":\"" + date.getFullYear() + "\", \"month\":\"" + parseInt(date.getMonth() + 1) + "\", \"day\":\"" +
                    date.getDate() + "\", \"type\":\"" + type + "\",\"teacher\":\"\"" + ",\"lesson\":\"" + record.courseTitle + "\",\"joiner\":\"" + record.name + "\"}";
            } else if (userFlag == 2) {
                info = "{\"id\":\"" + record.coursesRecordId + "\", \"year\":\"" + date.getFullYear() + "\", \"month\":\"" + parseInt(date.getMonth() + 1) + "\", \"day\":\"" +
                    date.getDate() + "\", \"type\":\"" + type + "\",\"teacher\":\"" + record.name + "\"" + ",\"lesson\":\"" + record.courseTitle + "\",\"joiner\":\"\"}";
            } else {
                info = "{\"id\":\"" + record.coursesRecordId + "\", \"year\":\"" + date.getFullYear() + "\", \"month\":\"" + parseInt(date.getMonth() + 1) + "\", \"day\":\"" +
                    date.getDate() + "\", \"type\":\"" + type + "\",\"teacher\":\"" + record.teaName + "\"" + ",\"lesson\":\"" + record.courseTitle + "\",\"joiner\":\"" + record.stuName + "\"}";
            }
            class_arr.push($.parseJSON(info));
        }
    }
    return class_arr;
}


    /**
     * 添加待排课信息 针对老师和学生
     */

    var appendSchedulList = function (resp) {
        if (common.checkResponse(resp) == false) return false;

        var list = resp.data.list;
        var userFlag = resp.data.userFlag;
        var count = resp.data.countSize;
        if (typeof list == "undefined" || list.length == 0) {
            $("#count").replaceWith("<h5 id=\"count\">&nbsp;&nbsp;&nbsp;共有" + 0 + "条记录</h5>");
            return false;
        }
        else {
            $("#count").replaceWith("<h5 id=\"count\">&nbsp;&nbsp;&nbsp;共有" + count + "条记录</h5>");
            $("table:eq(1) tbody").empty();
            if (userFlag == 2) {//学生用户
                $("table:eq(1) tbody").append("  <tr>" +
                    "<th>学生</th>" +
                    "<th>课程名称</th>" +
                    "<th>课程类型</th>" +
                    "<th>课程状态</th>" +
                    "<th>备注</th>" +
                    "</tr>");
            } else {//老师用户
                $("table:eq(1) tbody").append("  <tr>" +
                    "<th>学生</th>" +
                    "<th>课程名称</th>" +
                    "<th>节次</th>" +
                    "<th>课程状态</th>" +
                    "<th>备注</th>" +
                    "<th>操作</th>" +
                    "</tr>");
            }

            for (var i = 0; i < list.length; i++) {
                var info = list[i];
                $("table:eq(1) tbody").append("<tr valign='top'></tr>");
                var remark = typeof info.remark == "undefined" ? "未添加备注" : info.remark;
                if (userFlag != 2) {
                    $("tbody tr:last-child").append("<td>" + info.name + "</td>");
                    $("tbody tr:last-child").append("<td class='tc'><a href='#courseId=" + info.coursesId + "'>" + info.courseTitle + "</a></td>");
                    if (info.recordIndex == "undefinded" || info.recordIndex == "") info.recordIndex = 0;
                    $("tbody tr:last-child").append("<td>" + common.df.courseRecordIndex(parseInt(info.recordIndex) + 1, 0) + "</td>");
                    $("tbody tr:last-child").append("<td>待约时间</td>");
                    $("tbody tr:last-child").append("<td class=\"tc\">" + remark + "</td>");
                    $("tbody tr:last-child").append("<td><a class=\"blue pushBtnJs\">填写时间</a>" +
                        "<input type=\"hidden\" value='" + info.id + "' name='orderId'/>" +
                        "<input type=\"hidden\" value='" + info.coursesId + "' name='courseId'/></td>");
                } else {
                    $("tbody tr:last-child").append("<td>" + info.name + "</td>");
                    $("tbody tr:last-child").append("<td class='tc'><a href='#courseId=" + info.coursesId + "'>" + info.courseTitle + "</a></td>");
                    $("tbody tr:last-child").append("<td>" + common.df.coursesType(info.courseMode, 0) + "</td>");
                    $("tbody tr:last-child").append("<td>待约时间</td>");
                    $("tbody tr:last-child").append("<td class=\"tc\">" + remark + "</td>");
                }
            }
        }
    }


    /**
     * 对老师或学生上课记录中添加数据
     */

    var appendCoursesRecores = function (resp) {
        if (common.checkResponse(resp) == false) return false;
        var list = resp.data.list;
        var resCode = resp.data.resCode;
        var userFlag = resp.data.userFlag;
        var count = resp.data.countSize;
        $("table tbody").html("");
        if (typeof list != "undefined" && list.length > 0) {
            $("#count").replaceWith("<h5 id='count'>共有" + count + "条记录</h5>");
            if (userFlag == 0 || userFlag == 1) {
                $("table").append("<tr><th>课程</th><th>学生</th><th>主讲内容</th><th>收入金额</th><th>上课时间</th><th>听课人数</th><th>操作</th></tr>");
            } else {
                $("table").append("<tr><th>课程</th><th>教师</th><th>主讲内容</th><th>价格</th><th>上课时间</th><th>操作</th></tr>");
            }
            for (var i = 0; i < list.length; i++) {
                var record = list[i];
                var moneyNum = 0;
                $("table tbody").append("<tr></tr>");
                $("table tbody tr:last-child").append("<td>" + record.coursesName + "</td><td>" + record.name + "</td>" +
                    "<td><p><span style=\"color: #CEBD9E\">[" + common.df.coursesType(record.courseMode, 0) + "]</span>" + record.courseTheme + "</p><p>第" + record.recordIndex + "节</p></td>");
                if (userFlag == 0 || userFlag == 1) {
                    moneyNum = ((record.salary / 100)) * (record.coursesTimes / 60);
                } else {
                    moneyNum = ((record.orderActualPrice / 100) / (record.coursesTime / 60)) * (record.coursesTimes / 60);
                }
                $("table tbody tr:last-child td:last-child").after("<td>" + money.fmoney(moneyNum, 2) + "</td><td>" +
                    new Date(parseFloat(record.coursesBeginTime)).format("MM-dd hh:mm") + "至" +
                    new Date(parseFloat(record.coursesEndTime)).format("hh:mm") + "</td>");
                if (userFlag == 0) {
                    if (record.evaluteStuFlag == 0) {
                        $("table tbody tr:last-child td:last-child").after("<td>" + parseInt(record.auditNumber) + "</td>" +
                                /* "<td><a class='tc blue' href='/evaluate/forwardEvaluate.htm?courseId="+record.coursesNum+"&courseName="+record.coursesName+"&orderId="+record.id+"&coursesRecordId="+record.coursesRecordId+"&schoolId="+record.coursesSchoolId+"&teacherId="+record.coursesTeacher+"&userid="+record.userId+"&name="+record.name+"'>评价</a>" +*/
                            "<td><a class='tc blue pushBtnJs1' >评价</a>" +
                            "<input type='hidden' value='" + record.coursesNum + "'/>" +
                            "<input type='hidden' value='" + record.coursesName + "'/>" +
                            "<input type='hidden' value='" + record.id + "'/>" +
                            "<input type='hidden' value='" + record.coursesSchoolId + "'/>" +
                            "<input type='hidden' value='" + record.bookCoursesTeacherId + "'/>" +
                            "<input type='hidden' value='" + record.coursesRecordId + "'/>" +
                            "<input type='hidden' value='" + record.userId + "'/>" +
                            "<input type='hidden' value='" + record.name + "'/>" +
                            "<a href='/orderDeal/find/" + record.id + ".htm?type=10' class='tc blue'>|详情</a></td>");
                    } else {
                        $("table tbody tr:last-child td:last-child").after("<td>" + parseInt(record.auditNumber) + "</td>" +
                                /* "<td><a class='tc blue' href='/evaluate/forwardEvaluate.htm?courseId="+record.coursesNum+"&courseName="+record.coursesName+"&orderId="+record.id+"&coursesRecordId="+record.coursesRecordId+"&schoolId="+record.coursesSchoolId+"&teacherId="+record.coursesTeacher+"&userid="+record.userId+"&name="+record.name+"'>评价</a>" +*/
                            "<td>" +
                            "<a href='/orderDeal/find/" + record.id + ".htm?type=10' class='tc blue'>详情</a></td>");
                    }

                } else {
                    if (record.evaluteFlag == 0) {
                        if (record.courseMode == 0){
                            $("table tbody tr:last-child td:last-child").after("<td>" +
                                "<a class='tc blue pushBtnJs1' >评价</a>" +
                                "<input type='hidden' value='" + record.coursesNum + "'/>" +
                                "<input type='hidden' value='" + record.coursesName + "'/>" +
                                "<input type='hidden' value='" + record.id + "'/>" +
                                "<input type='hidden' value='" + record.coursesSchoolId + "'/>" +
                                "<input type='hidden' value='" + record.bookCoursesTeacherId + "'/>" +
                                "<input type='hidden' value='" + record.coursesRecordId + "'/>" +
                                "<input type='hidden' value='" + record.userId + "'/>" +
                                "<input type='hidden' value='" + record.name + "'/>" +
                                "<a class='tc blue' href='/orderDeal/find/" + record.id + ".htm?type=10'>|详情</a></td>");
                        }else{
                            $("table tbody tr:last-child td:last-child").after("<td><a class='tc blue' href='/orderDeal/find/" + record.id + ".htm?type=10'>详情</a></td>");
                        }

                    } else {
                        $("table tbody tr:last-child td:last-child").after("<td>" +
                            "<a class='tc blue' href='/orderDeal/find/" + record.id + ".htm?type=10'>详情</a></td>");
                    }
                }
            }
        } else {
            $("#count").replaceWith("<h5 id='count'>共有0条记录</h5>");
        }

        /*弹窗初始化*/
        $('.popBox').dialog({
            autoOpen: false,
            width: 600,
            modal: true,
            resizable: false,
            close: function () {
                $(this).dialog("close")
            }
        });
        /*解绑*/
        $('.pushBtnJs1').click(function () {
            $('#wrong_text').addClass('hide');
            $('#wrong_text_length').addClass('hide');
            var $this = $(this);
            $('#coursesId').val($this.parent('td').children('input').eq(0).val());
            $('#courseTitle').val($this.parent('td').children('input').eq(1).val());
            $('#id').val($this.parent('td').children('input').eq(2).val());
            $('#schoolId').val($this.parent('td').children('input').eq(3).val());
            $('#teacherId').val($this.parent('td').children('input').eq(4).val());
            $('#coursesRecordId').val($this.parent('td').children('input').eq(5).val());
            $('#userId1').val($this.parent('td').children('input').eq(6).val());
            $('#username').val($this.parent('td').children('input').eq(7).val());
            $("#pushNotice").dialog("open");
            //评价弹窗里的评分，
            $('.p_right em').each(function (index) {
                    $('.p_right em').eq(index).delegate('i', {
                        'mouseenter': function () {

                            var index = $(this).parent().find('i').index($(this));
                            var $this = $(this);
                            for (var j = 0; j < $(this).parent().find('i').length; j++) {
                                if ($this.parent().find('i').eq(j).index() <= index + 1) {
                                    $this.addClass('ac');
                                    $this.parent().find('i').eq(j).addClass('ac');

                                }
                            }
                        }, 'mouseleave': function () {
                            var $this = $(this);
                            $this.parent().find('i').removeClass('ac');
                        }, 'click': function () {
                            var index = $(this).parent().find('i').index($(this));
                            var $this = $(this);
                            for (var j = 0; j < $(this).parent().find('i').length; j++) {
                                if ($this.parent().find('i').eq(j).index() <= index + 1) {
                                    $this.addClass('active');
                                    $this.parent().find('i').eq(j).addClass('active');
                                    $this.parent().find('span').text(index + 1);
                                } else {
                                    $this.parent().find('i').eq(j).removeClass('active');
                                }
                            }
                        }
                    });
                }
            );
            return false;

        });
        //清除选项
        $('.cancelBtn').click(function () {

            $('.p_right em i').removeClass('active');
            $('.p_right em span').text('0');
            $(".pushNotice").dialog("close");


        });
    }


    /**
     * 加载陪读的记录
     */

    var loadCompRecords = function (resp) {
        if (common.checkResponse(resp) == false) return false;
        var list = resp.data.rows;
        //先清空表格内容
        $("table").empty();
        //alert(list.length);
        if (typeof list != "undefined" && list.length > 0) {
            $("table").append(" <tr class=\"right_main_mid_table_nav\"> " +
                "<th>课程编号</th>" +
                "<th>课程类型</th>" +
                "<th>学段</th>" +
                "<th>科目</th>" +
                "<th>价格</th>" +
                "</tr>");
            for (var i = 0; i < list.length; i++) {
                var value = list[i];
                if (value.courses.courseType == "8") var accompanyType = "全科陪读";
                if (value.courses.courseType == "9") var accompanyType = "单科陪读";

                if (value.courses.companionLevelId == "20201") var accompanyLevel = "小学部";
                if (value.courses.companionLevelId == "20202") var accompanyLevel = "初中部";
                if (value.courses.companionLevelId == "20203") var accompanyLevel = "高中部";

                var content = "<tr class=\"right_main_mid_table_cont\">" +
                    "<td class=\"text_in57\">" + value.coursesId.substr(1, 4) + "***" + value.coursesId.substr(10) + "</td>" +
                    "<td class=\"text_in57\">" + accompanyType + "</td>" +
                    "<td class=\"text_in57\">" + accompanyLevel + "</td>" +
                    "<td class=\"text_in57\">" + value.courses.subject + "</td>" +
                    "<td class=\"text_in57\">" + value.orderActualPrice / 100 + "/月</td>" +
                    "</tr>";
                $("table").append(content);
            }

        } else {
            $("table").after("目前没有相关的陪读信息");
        }
    }


    return {
        formatClasses2ArrJson : formatClasses2ArrJson,
        orderListInfo4Page : orderListInfo4Page,
        appendCoursesRecores:appendCoursesRecores,
        appendOrderDetailInfo:appendOrderDetailInfo

    }
});