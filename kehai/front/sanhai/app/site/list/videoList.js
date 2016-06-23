/**
 * Created by slg on 2016/2/22.
 */
require.config({
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
        "siteVideoList": "app/site/list/siteVideoList",
        "intoPtCourse":"app/site/list/intoPtCourse-1.0.0",
        "jquery_md5": 'lib/jquery.md5',
        "PTCoursePopBox":"app/site/list/PTCoursePopBox",
        "headerDo":"app/userInfo/headerDo"
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

require(['app/site/list/videoListDo', 'showSelectNav', 'loadHotCourse', 'siteVideoList'],
    function (VideoCourseListDo) {
        new VideoCourseListDo().render();
    });