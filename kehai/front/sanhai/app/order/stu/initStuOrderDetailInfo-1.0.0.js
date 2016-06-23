/**
 * Created by boys on 2015/9/17.
 * 初始化学生订单详情页
 */

function initStuOrderDetailInfo(_json) {
    ////////
    //有关退课 调课 换老师的js操作在oderDeatil.js文件中
    ///////
        var json = _json;
        appendOrderDetailInfo(json);
        $("button.look_detail").click(function(){
            if ($("#userId").val() != "") location.href = "/site/theacher/" + $("#userId").val() +"/toTeacherIndex.htm";
        });
}


