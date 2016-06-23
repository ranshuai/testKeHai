/**
 * Created by liqinghua on 15/7/14.
 */

define(['jquery'],function($){



$.fn.extend({
    countdown:function(time){
        var obj = this;
        var oldText = obj.text();
        obj.attr("disabled","true");
        obj.text(time-- +"秒后重发");
        var countTime = window.setInterval(function(){
            obj.text(time-- +"秒后重发");
        },1000);
        window.setTimeout(function(){
            obj.removeAttr("disabled").text(oldText);
            window.clearInterval(countTime);
        },time*1000);
        return countTime;
    },

    serializeJson:function(array){
    var serializeObj={};
   // var array=form.serializeArray();
   // var str=form.serialize();
    $(array).each(function(){
        if(serializeObj[this.name]){
            if($.isArray(serializeObj[this.name])){
                serializeObj[this.name].push(this.value);
            }else{
                serializeObj[this.name]=[serializeObj[this.name],this.value];
            }
        }else{
            serializeObj[this.name]=this.value;
        }
    });
    return serializeObj;
    }
});

(function($){

})(jQuery);

});