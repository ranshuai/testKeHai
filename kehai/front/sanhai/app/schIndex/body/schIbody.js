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
        pageBar: "module/sanhai-base-pagebar-standard-1.0.0",
        base_dialog_standard: "module/base_dialog_standard",
        schIbodyDo: "app/schIndex/body/schIbodyDo",
        schIheaderDo: "app/schIndex/schIheaderDo",
        headerDo:"app/userInfo/headerDo"
    }
});

require(['schIheaderDo', 'schIbodyDo','headerDo'], function (schIheaderDo, schIbodyDo,headerDo) {
    //schIheaderDo.top(); 用headerDo.init();代替
    headerDo.init();
    schIheaderDo.topf();
    schIbodyDo.a();

})
