/**
 * Created by boys on 2015/8/11.
 */
// 处理老师待确认订单的方法集合
define(
    [
        'jquery',
        'common',
        'money',
        'pageBar'
    ],function($, common, money, pagebar){
    /**
     * 添加html内容
     * @param data
     * @returns {boolean}
     */
    var appendTeaConfirmList = function(data) {
        if (common.checkResponse(data) == false) return false;
        $("table tbody").empty();
        var list = data.data.list;
        if (typeof list != "undefined" && list.length > 0){
            $("#count").replaceWith("<h5 id='count1'>共有" + list.length + "条记录</h5>");
            $("table tbody").append("<tr><th>课程编号</th><th>课程名称</th><th>创建人</th><th>课酬</th><th>备注</th><th>操作</th></tr>");
            for (var i=0; i < list.length; i++){
                var order = list[i];
    //          alert(order.courseTitle);
                var remark = order.remark != "" ? order.remark : "无备注";
                $("table tbody").append("<tr></tr>");
                $("table tbody tr:last-child").append("<td>"+order.coursesId+"</td>");
                $("table tbody tr:last-child").append("<td class=\"tc\">"+order.courseTitle+"("+common.df.coursesType(order.courseMode, 0)+")</td>");
                //$("table tbody tr:last-child").append("<td>"+df.coursesType(order.courseMode, 0)+ "</td>");
                $("table tbody tr:last-child").append("<td>"+ order.stuName +"</td>" );
                $("table tbody tr:last-child").append("<td id='salary'>"+money.fmoney(order.salary/100,2)+"<input type='hidden' value='"+ order.salary+"'/></td>");
                $("table tbody tr:last-child").append("<td class=\"tc\">"+ remark +"</td>");
                $("table tbody tr:last-child").append("<td><a href='#' class='blue' id='submit'>确定</a><input type='hidden' value='"+ order.id +"'/></td>");
            }
        }else{
            $("#count").replaceWith("<h5 id='count'>共有" + 0 + "条记录</h5>");
        }
    };

    function teaConfirmList4Page(currPage) {
        var url = "/orderDeal/tea/" + currPage + "/confirm.do";
        $.ajax({
            url:url,
            dataType:"json",
            type:"post",
            success: function(resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000"){
                    appendTeaConfirmList(resp);
                    var params = new Array();
                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, teaConfirmList4Page, params);
                }
            },
            error: function(resp) {
            }
        });
    }

    return {
        teaConfirmList4Page : teaConfirmList4Page
    }
});