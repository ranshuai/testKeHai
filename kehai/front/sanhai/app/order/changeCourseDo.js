
define(['money','pageBar','teaAppRecords'],function(money,pagebar,record){

        var oSelect_body = $('.sel_body');
        var oSelect_plus = $('.select_plus');
        oSelect_body.change(function(){
            $(this).siblings("em").text($(this).find("option:selected").text());
        });
         record.initTeaChangeRecords();

})
