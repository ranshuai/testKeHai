/**
 * Created by liqinghua on 15/9/30.
 * 依赖jquery
 * 继承jquery 的函数
 * resetForm: 清空表单数据
 *
 *
 */

define(['jquery'],function($){

$.fn.extend({
    /**
     * 清空表单数据
     * @param options
     * without:例外不清空的数据
     * eg:
     * {
     *  without:
     *      {
     *          type:['radio']
     *          ids:['text_id']
     *      }
     * }
     * $('#form').resetForm();
     * 默认清空 text password file checkbox radio的数据
     * @return null
     */
    resetForm:function(options){
        var default_opt = {
            without:{
                type:null,
                ids:null
            }
        };
        var opt = options || default_opt;
        var _this = this;
        var input_type = ['text','password','file','checkbox','radio'];
        // 排除的input类型
        if(opt.without.type){
            input_type = $.removeArr(input_type,opt.without.type);
        }
        for(var i=0;i<input_type.length;i++) {
            _this.find('input:'+input_type[i]).not(function(){
                if(opt.without.ids)return opt.without.ids.indexOf($(this).attr('id')) < 0?false:true;
            }).val('').removeAttr('checked');
        }
    }
});

$.extend({
    /**
     * 从第一个数组中去掉第二个数组的数据
     * @param arr1  [1,2,3,4]
     * @param arr2  [2,3]
     * @return [1,4]
     */
    removeArr:function(arr1,arr2){
        for(var j=0;j<arr2.length;j++){
            for(var i=0; i<arr1.length;i++){
                if(arr1[i] == arr2[j])arr1.splice(i,1);
            }
        }
        return arr1;
    }
});


});