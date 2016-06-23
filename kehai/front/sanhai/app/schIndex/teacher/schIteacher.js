/**
 * Created by weiyan on 15/12/09.
 * 学校首页--老师
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
        pageBar: "module/sanhai-base-pagebar-standard-1.0.0",
        schIteacherDo: "app/schIndex/teacher/schIteacherDo",
        schIheaderDo: "app/schIndex/schIheaderDo",
        headerDo:"app/userInfo/headerDo"
    }
});

require(['schIheaderDo', 'schIteacherDo','headerDo'], function (schIheaderDo, schIteacherDo,headerDo) {
    headerDo.init();
    //schIheaderDo.top();
    schIheaderDo.topf();
    schIteacherDo.a();

})
