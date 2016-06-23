
/**
 * Created by boys on 2015/9/11.
 * 记录课程历史上课记录信息
 */

function ajax4CourseHistory(data, currPage) {
    var url = "/courses/" + currPage + "/onRecords.do";
    var param = data;
    $.ajax({
        url:url,
        data: data,
        dataType:"json",
        type:"post",
        success: function(resp) {
            if (common.checkResponse(resp) == false) return;
            if (resp.resCode == "000"){
                appendCoursesRecores(resp);
                var params = new Array();
                params.push(param);
                setBasePageBar(resp.data.totalPages, resp.data.currPage, ajax4CourseHistory, params);
            }
        },
        error: function(resp) {
        }
    });
}
