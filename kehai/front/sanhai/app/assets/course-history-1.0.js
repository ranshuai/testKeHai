/**
 * Created by boys on 2015/9/11.
 * 记录课程历史上课记录信息
 */
define(['jquery', 'common','pageBar','order-deal'], function ($,common,pagebar,order) {
    function ajax4CourseHistory(data, currPage) {
        var url = "/courses/" + currPage + "/onRecords.do";
        //console.log("url-->" + url);
        var param = data;
        $.ajax({
            url: url,
            data: data,
            dataType: "json",
            type: "post",
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    //console.log("------------------------");
                    //console.log("resCode-->" + resp.resCode);
                    //console.log("------------------------");
                    order.appendCoursesRecores(resp);
                    var params = new Array();
                    params.push(param);
                    //console.log("------------------");
                    //console.log("totalPages-->" + resp.data.totalPages);
                    //console.log("currPage-->" + resp.data.currPage);
                    //console.log("------------------");
                    pagebar.setBasePageBar(resp.data.totalPages, resp.data.currPage, ajax4CourseHistory, params);
                }
            },
            error: function (resp) {
                //alert("错误" +resp.resMsg);
            }
        });
    }

    return {
        ajax4CourseHistory:ajax4CourseHistory
    }

});