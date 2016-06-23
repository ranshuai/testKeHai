/**
 * Created by boys on 2015/8/11.
 */


function scheduleCoursesInfo4Page(currPage) {
    var url = "/orderDeal/" + currPage + "/schedule.do";
    $.ajax({
        url:url,
        dataType:"json",
        type:"post",
        success: function(resp) {
            if (common.checkResponse(resp) == false) return;
            if (resp.resCode == "000"){
                appendSchedulList(resp);
                var params = new Array();
                setBasePageBar(resp.data.totalPages, resp.data.currPage, scheduleCoursesInfo4Page, params);
            }
        },
        error: function(resp) {
            //alert("错误" +resp.resMsg);
        }
    });
}
