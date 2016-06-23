/**
 * Created by bbb on 2015/12/17.
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
        "loadHotCourse": "app/site/list/loadHotCourse",
        "sanhai_evaluate": "app/site/sanhai-evaluate",
        "schIndex_header": "app/site/course/schIndex_header",
        "searchBar": "app/site/course/searchBar",
        "headerDo":"app/userInfo/headerDo",
        "teacherHeaderDo":"app/siteTeacher/teacherHeaderDo"
    },
    waitSeconds: 0,
    shim: {
        "dialogs": {
            deps: ['jquery', 'jquery_ui_min'],
            exports: "dialogs"
        },
        "dialog": {
            deps: ['jquery', 'jquery_ui_min'],
            exports: "dialog"
        },
        "siteTopBar": {
            deps: ['jquery', 'jquery_ui_min'],
            exports: "siteTopBar"
        },
        "app/siteTeacher/tchHeaderDo": {
            deps: ['jquery', 'common', 'base'],
            exports: "tchHeaderDo"
        }

    }
});
require(['app/site/siteStudent/stuExperienceDo','teacherHeaderDo'],
    function (stu_experienceDo) {
        new stu_experienceDo().render();
        $('.tch_search').click(function () {
            $('.search_bar').toggleClass('hide');
        });
    });