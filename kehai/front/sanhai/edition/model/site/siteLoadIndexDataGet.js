/*
*网站的一对一课程
* */
define(function(){
    function SiteLoadIndexDataGet(){}

    SiteLoadIndexDataGet.prototype.init = function(callback){
        $.ajax({
            url:"/site/loadIndexData.do",
            type:"post",
            dataType:"json",
            success:function(response){
                callback&&callback(response);
            },
            error:function(){},
            complete:function(){}
        });
    };

    return new SiteLoadIndexDataGet();
});