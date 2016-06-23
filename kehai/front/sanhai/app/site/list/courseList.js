/**
 * Created by bbb on 2015/12/15.
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
        "base_dialog_standard": "module/base_dialog_standard",
        "showSelectNav": "app/site/list/showSelectNav",
        "loadHotCourse": "app/site/list/loadHotCourse",
        "siteCourseList": "app/site/list/siteCourseList",
        "headerDo":"app/userInfo/headerDo"
    },
    waitSeconds: 0,
    shim: {
        "siteTopBar": {
            deps: ['jquery', 'jquery_ui_min'],
            exports: "siteTopBar"
        }

    }
});
require(['app/site/list/courseListDo', 'showSelectNav', 'loadHotCourse', 'siteCourseList'],
    function (courseListDo) {
        new courseListDo().render();
    });