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
        evaluate: "module/sanhai-evaluate",
        base_dialog_standard: "module/base_dialog_standard",
        pageBar: "module/sanhai-base-pagebar-standard-1.0.0",
        schIevaluateDo: "app/schIndex/evaluateRecord/schIevaluateDo",
        schIheaderDo: "app/schIndex/schIheaderDo",
        headerDo:"app/userInfo/headerDo"
    }
});

require(['schIheaderDo', 'schIevaluateDo','headerDo'], function (schIheaderDo, schIevaluateDo,headerDo) {
    headerDo.init();
    // schIheaderDo.top();
    schIheaderDo.topf();
    schIevaluateDo.a();


})
