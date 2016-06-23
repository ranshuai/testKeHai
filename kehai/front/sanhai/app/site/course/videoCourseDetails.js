/**
 * Created by bbb on 2015/12/18.
 */
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
        base_dialog_standard: "module/base_dialog_standard",
        "loadHotCourse": "app/site/list/loadHotCourse",
        "sanhai_evaluate": "app/site/sanhai-evaluate",
        searchBar: "app/site/course/searchBar",
        schIheaderDo: "app/schIndex/schIheaderDo",
        base_dialog_standard: "module/base_dialog_standard",
        "intoPtCourse":"app/site/list/intoPtCourse-1.0.0",
        "jquery_md5": 'lib/jquery.md5',
        "kpTree":"module/kpTree",
        "PTCoursePopBox":"app/site/list/PTCoursePopBox",
        "headerDo":"app/userInfo/headerDo"
    },
    waitSeconds: 0,
    shim: {
        "dialogs": {
            deps: ['jquery', 'jquery_ui_min'],
            exports: "dialogs"
        },
        "siteTopBar": {
            deps: ['jquery', 'jquery_ui_min'],
            exports: "siteTopBar"
        },
        "jquery_md5":{
            deps: ['jquery']
        }

    }
});
require(['app/site/course/videoCourseDetailsDo', 'schIheaderDo','headerDo', 'loadHotCourse'],
    function (ptCourseDetailsDo, schIheaderDo,headerDo) {
        headerDo.init();
        //schIheaderDo.top();
        schIheaderDo.topf();
        new ptCourseDetailsDo().render();
    });