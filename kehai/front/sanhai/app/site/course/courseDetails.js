requirejs.config({
    baseUrl: JS_BASEURL,
    paths: {
        "jquery": "lib/jquery-1.8.3.min",
        "money": "module/money",
        "common": "module/common",
        "base": "module/base",
        "siteTopBar": "app/site/siteTopBar",
        "jquery_ui_min": "lib/jquery-ui.min",
        "pageBar": "module/sanhai-base-pagebar-standard-1.0.0",
        "dialogs": "module/dialogs",
        "base_dialog_standard": "module/base_dialog_standard",
        "loadHotCourse": "app/site/list/loadHotCourse",
        "sanhai_evaluate": "app/site/sanhai-evaluate",
        "searchBar": "app/site/course/searchBar",
        "schIheaderDo": "app/schIndex/schIheaderDo",
        "headerDo":"app/userInfo/headerDo"
    },
    waitSeconds: 0,
    shim: {
        "dialogs": {
            deps: ['jquery', 'jquery_ui_min'],
            exports: "dialogs"
        }
    }
});
require(['app/site/course/courseDetailsDo', 'schIheaderDo','headerDo','loadHotCourse'],
    function (courseDetailsDo, schIheaderDo,headerDo) {
        //schIheaderDo.top();
        headerDo.init();
        schIheaderDo.topf();
        new courseDetailsDo().render();
    });
