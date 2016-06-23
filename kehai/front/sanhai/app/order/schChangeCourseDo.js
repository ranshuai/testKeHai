
define(['jquery','orgAppRecords-1.0'],function($,org){
        var oSelect_body = $('.sel_body');
        oSelect_body.change(function() {
            $(this).siblings("em").text($(this).find("option:selected").text());
        });

        /*tab切换*/
        $('.tab .tabList li').click(function() {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings().children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        });
    /*切换标示*/
    org.initOrgApplicationRecord();
});
