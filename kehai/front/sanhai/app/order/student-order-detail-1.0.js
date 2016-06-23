/**
 * Created by boys on 2015/9/6.
 */

/**
 * 完善老师名下“我的学生”详情信息
 * @param list
 */
define(['jquery','common','money','pageBar'],function($,common,money,pageBar){

    function completeDetailInfo(list){
        $("table tbody").empty();
        $.each(list, function(index, value){
            var content  = "<tr>";
            content += "<th colspan=\"5\" class=\"noBorder\">订单号：<span>"+value.id+"</span><span>"+new Date(parseFloat(value.orderGenerateTime)).format("yyyy-MM-dd hh:mm:ss")+"</span></th>";
            content += "</tr>";
            content += "<tr>";
            //content += "<td class=\"order_name\"><a href=\"javascript:;\">"+value.courseTitle+"</a></td>";
            switch (parseInt(value.courseMode)){
                case 2:  content += "<td class=\"order_name\"><a href=\"javascript:;\">"+value.name+"的陪读</a></td>";break;
                default: content += "<td class=\"order_name\"><a href=\"javascript:;\">"+value.courseTitle+"</a></td>";
            }
            content += "<td>"+money.fmoney(value.orderActualPrice/100, 2)+"</td>";
            content += "<td>"+value.name+"</td>";
            content += "<td>"+ common.df.coursesType(value.courseMode, null)+"</td>";
            var orderStatus = "3" + value.coursesStatus + value.isRetireCourses;
            content += "<td><span>"+common.df.orderStatus(orderStatus, null)+"</span></td>";
            content += "</tr>";
            $("table tbody").append(content);
        });
    }

    function ajax4StudentOrderList(student, currPage){
    var $student = student;
    var url = "/orderDeal/" + student + "/" + currPage + "/list.do";
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        success:function(resp) {
            if (common.checkResponse(resp) == false) return;
            if (resp.resCode == "000") {
                completeDetailInfo(resp.data.list);
                var params = new Array();
                params.push($student);
                pageBar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajax4StudentOrderList, params);
            }
        },
        error:function(resp){
        }
    })
}

    return {
        ajax4StudentOrderList:ajax4StudentOrderList
    }
})
