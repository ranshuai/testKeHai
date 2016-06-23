/**
 * Created by weiyan on 15/12/09.
 * 学校首页--主体
 */

requirejs.config({
    baseUrl: JS_BASEURL,
    paths: {
        jquery: "lib/jquery-1.8.3.min",
        jquery_ui_min: "lib/jquery-ui.min",
        base: "module/base",
        money: "module/money",
        common: "module/common",
        dialogs: "module/dialogs",
        base_dialog_standard: "module/base_dialog_standard",
        compSuggDo: "app/compSugg/compSuggDo",
        headerDo:"app/userInfo/headerDo"
    }
});


require(['compSuggDo','app/site/siteSearchBar','headerDo'], function (compSuggDo,siteSearchBar,headerDo) {
    new siteSearchBar().render();
    headerDo.init();
    // schIheaderDo.top();
    compSuggDo.submitf();
})





