define(["jquery","base"]
    ,function($){
        return{
            init:function() {
                //客服中心hover效果
                $('.serviceList').rNavhover();
                //切换身份hover效果
                $('.tabRole').rNavhover();
            }
        }
});
