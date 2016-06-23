/**
 * Created by Administrator on 2016/1/5.
 */

define(['jquery','base'],function($){


    /*tab切换*/
    $('.tabList li a').click(function(){
        $(this).addClass('ac').parent('li').siblings('li').find('a').removeClass('ac');
    });
    /*全选*/
    var check = $('#areaCheckBoxAll').parent('li').parent('ul');
    $('#areaCheckBoxAll').click(function(){
        if($('#areaCheckBoxAll').attr('checked')){
            check.find('input').attr('checked',true);
        }else{
            check.find('input').attr('checked',false);
        }
    });
    check.find("input[id!='areaCheckBoxAll']").click(function(){
       var num =0;
        check.find("input[id!='areaCheckBoxAll']").each(function(i){
            if(check.find("input[id!='areaCheckBoxAll']")[i].checked) num++;
        });
        if(num == check.find("input[id!='areaCheckBoxAll']").size()){
            $('#areaCheckBoxAll').attr('checked',true);
        }else{
            $('#areaCheckBoxAll').attr('checked',false);
        }
    });


});