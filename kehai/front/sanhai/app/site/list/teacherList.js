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
        "siteTeacherList": "app/site/list/siteTeacherList",
        "headerDo":"app/userInfo/headerDo"
    },
    waitSeconds: 0
});
require(['app/site/list/teacherListDo', 'showSelectNav', 'loadHotCourse', 'siteTeacherList'],
    function (teacherListDo) {
        new teacherListDo().render();
    });