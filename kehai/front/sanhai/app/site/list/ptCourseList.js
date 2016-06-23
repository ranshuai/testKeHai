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
        "sitePTCourseList": "app/site/list/sitePTCourseList",
        "intoPtCourse":"app/site/list/intoPtCourse-1.0.0",
        "jquery_md5": 'lib/jquery.md5',
        "PTCoursePopBox":"app/site/list/PTCoursePopBox",
        "headerDo":"app/userInfo/headerDo",
        "kpTree":"module/kpTree"
    },

    waitSeconds: 0,
    shim: {
        "intoPtCourse": {
            deps: ['jquery', 'jquery_ui_min','dialogs'],
            exports: "intoPtCourse"
        },
        "dialogs": {
            deps: ['jquery', 'jquery_ui_min'],
            exports: "dialogs"
        },
        "jquery_md5":{
            deps: ['jquery']
        }
    }

});


require(['app/site/list/ptCourseListDo', 'showSelectNav', 'loadHotCourse', 'sitePTCourseList'],
    function (PTCourseListDo) {
        new PTCourseListDo().render();
    });