/*
 *
 今日推荐的数据
 鼠标移入li里面请求的数据
 */
define('siteTodyRecommendGet',function(){
    function siteTodyRecommendGet(){}

    siteTodyRecommendGet.prototype.init=function(json){
        $.ajax({
            url:"/site/index/selectterdayCourBysubjectId.r",
            type:"post",
            dataType:"json",
            data:{
              "subjectId":json.subjectId
            },
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
    return new siteTodyRecommendGet();
});