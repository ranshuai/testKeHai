/*
 *
 热门课程的数据
 鼠标移入li里面请求的数据
 */
define('siteGoodCourseGet',function(){
    function siteGoodCourseGet(){}

    siteGoodCourseGet.prototype.init=function(json){
        $.ajax({
            url:"/site/hotCourse/" + json.subjectId + ".r",
            type:"post",
            dataType:"json",
            success:function(respons){
                json.callback && json.callback(respons);
            },
            error:function(respons){
                console.log('失败');
            },
            complete:function(respons){
            }
        });
    };
    return new siteGoodCourseGet();
});