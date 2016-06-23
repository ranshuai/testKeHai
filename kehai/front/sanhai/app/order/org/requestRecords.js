/**
 * Created by boys on 2015/8/12.
 */
//用来处理老师的申请记录管理

/**
 * 退课记录的分页信息展示
 * @param url
 * @param data
 * @param currPage
 *
 */
define(['jquery','common','money','pageBar','course-deal'],function($,common,money,pageBar,course){
function ajax4RequestRetireRecords(url, data, currPage){

    var a = data;
    data += "&currentPage=" + currPage;
    $.ajax({
        url:url,
        data:data,
        type:"post",
        dataType:"json",
        success:function(resp) {
            if (common.checkResponse(resp) == false) return;
            if (resp.resCode == "000") {
                appendRetireCourses(resp);
                var params = new Array();
                params.push(url);
                params.push(a);
                pageBar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajax4RequestRetireRecords, params);
            }
        },
        error:function(resp){
        }
    })
}

/**
 * 换师信息的分页显示
 * @param url
 * @param data
 * @param currPage
 */
function ajax4RequestChangeTeaRecords(url, data, currPage) {
    var a = data;
    data += "&currPage=" + currPage;
    $.ajax({
        url:url,
        data:data,
        type:"post",
        dataType:"json",
        success:function(resp) {
            if (common.checkResponse(resp) == false) return;
            if (resp.resCode == "000") {
                course.orgRecordAppend(resp);
                var params = new Array();
                params.push(url);
                params.push(a);
                pageBar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajax4RequestChangeTeaRecords, params);
            }
        },
        error:function(resp){
            //alert("错误" +resp.resMsg);
        }
    })
}

/**
 * 填充机构的退课记录页面
 * @param result
 */
function appendRetireCourses(result){
    $("table tbody").html("");
    var val=result.data.list;
    if (val.length > 0) {
        $("table tbody").append("<tr><th>申请编号</th><th>申请人</th><th>课程名称</th><th>退课理由</th><th>所退金额</th><th>操作</th></tr>");
        $("#count").replaceWith("<h5 id=\"count\">共有"+result.data.countSize+"条记录</h5>");
    }else{
        $("#count").replaceWith("<h5 id=\"count\">共有"+0+"条记录</h5>");
        return;
    }
    for (var i=0; i < val.length; i++) {
        $("table tbody").append("<tr></tr>");
        $("table tbody tr:last-child").append("<td>"+ val[i].id +"</td>");
        $("table tbody tr:last-child").append("<td>"+ val[i].name +"</td>");
        $("table tbody tr:last-child").append("<td>"+ val[i].courseTitle +"</td>");
        $("table tbody tr:last-child").append("<td class='tc'><span class='dib tl'>"+ val[i].reasonsRetreat+"</span></td>");
        var stat = val[i].isRetireCourses;
        $("table tbody tr:last-child").append("<td  class=\"orange\" style='font-size: 14px'><span id='price'>"+money.fmoney(val[i].backMoney/100, 2)+"</span></td>");
        $("table tbody tr:last-child").append("<td>"+ common.df.show_org_RetireCourses_OrgOper(stat)+"<input type='hidden' id='id' value='"+val[i].id +"'/><input id='oderNum' type='hidden' value='"+val[i].id+"' />" +
            "<input id='orderActualPrice' type='hidden' value='"+val[i].orderActualPrice+"' />" +
            "<input id='coursesTime' type='hidden' value='"+val[i].coursesTime+"' />" +
            //"<input id='courseMode' type='hidden' value='"+val[i].courseMode+"' />" +
            //"<input id='courseTitle' type='hidden' value='"+val[i].courseTitle+"' />" +
            "<input id='coursesFinishTimes' type='hidden' value='"+val[i].coursesFinishTimes+"' /></td>");
        if(stat == "3"){
            $("a.bk:last").wrap("<div class=\"pr reject_reason_main\"><a class=\"reason blue\">驳回理由</a><div class=\"reject_reason pa hide\"><i class=\"pa\"></i>"+
                "<h5>理由：</h5>"+
                "<p>"+val[i].dismissedRetreat+"</p>"+"</div></div>");
        }
    }
}


    return {
        ajax4RequestRetireRecords:ajax4RequestRetireRecords,
        ajax4RequestChangeTeaRecords:ajax4RequestChangeTeaRecords
    }
})
