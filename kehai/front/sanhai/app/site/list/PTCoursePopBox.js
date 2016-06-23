/**
 * 网站选择旁听课表
 * 点击购买旁听出现弹窗
 *
 * */


define(['jquery'],function($){
    'use strict';
    function CheckBox(){
    }
    CheckBox.prototype.sum_ = function(){
        var courseList = $('#couserlists .courItem');
        var rtnSum = 0;
        for(var i=0; i<courseList.length; i++){
            if( $(courseList[i]).find('input:checkbox').attr('checked') ){
                rtnSum += Number($(courseList[i]).find('.price').val());
            }
        }
        return rtnSum;
    }
    /*输出总价*/
    CheckBox.prototype.totailTxt = function(){
        $('.popBuyAuditTotal strong').text("￥" + this.sum_().toFixed(2));
    }
    CheckBox.prototype.selBoxAll = function(){      
        this.totail = [];
        this.selBox = $('.order_table #couserlists input[type=checkbox][disabled!="disabled"]');
        this.selBoxDis = $('.order_table #couserlists input[type=checkbox][disabled="disabled"]');
        $('<span class="orange">(已购买)</span>').appendTo($('input[disabled="disabled"]').parent('div'));
        //var type = $('input[disabled="disabled"]').attr("data");
        //if (type == 0){
        //    $('<span class="orange">(已购买)</span>').appendTo($('input[disabled="disabled"]').parent('div'));
        //}else{
        //    $('<span class="orange">(已售完)</span>').appendTo($('input[disabled="disabled"]').parent('div'));
        //}
        //如果选中的checked的数量等于checcked的数量checkboxAll选中
        var selNum = 0;
        for(var i =0; i<this.selBox.size(); i++){
                if(this.selBox[i].checked){
                    selNum++;
                    if(this.selBox.size()==selNum){
                         $('#checkboxAll').attr('checked', true);
                    }
                }else{
                    $('#checkboxAll').attr('checked', false);
                }   
        }
        var _this = this;
        $('#checkboxAll').off();
        $('#checkboxAll').on('click', function () {
            if ($(this).attr('checked')) {
                _this.selBox.attr('checked', true);
            } else {
                _this.selBox.attr('checked', false);
            }
            _this.totailTxt();
        });
        this.selBox.off();
        this.selBox.on('click', function () {
            var num = 0;
            for (var i = 0; i < _this.selBox.length; i++) {
                if (_this.selBox[i].checked) num++;
            }
            _this.totailTxt();
            if (num == _this.selBox.size()) {
                $('#checkboxAll').attr('checked', true);
            } else {
                $('#checkboxAll').attr('checked', false);
            }
        });
        this.totailTxt();
    }
    return new CheckBox;
});