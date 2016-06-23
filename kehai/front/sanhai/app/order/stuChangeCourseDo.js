/**
 * Created by Administrator on 2015/12/17.
 */

//调 退课 换老师 （学生）

define(['jquery','initStuAppRecord-1.0','appRecords'],function($,init){


        $("#applyList").trigger("click");
        var oSelect_body = $('.sel_body');
        var oSelect_plus = $('.select_plus');
        oSelect_body.change(function(){
//      var $this = $(this);
//      var oEm = oSelect_plus.children('em');
//      oEm.text($this.val());
            $(this).siblings("em").text($(this).find("option:selected").text());
        });

        /*tab切换*/
        $('.tab .tabList li').click(function() {
            index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings().children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        });

    init.initStuAppRecord();


});

