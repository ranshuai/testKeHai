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
        "jquery_ui_min": "lib/jquery-ui.min",
        "pageBar": "module/sanhai-base-pagebar-standard-1.0.0",
        "dialogs": "module/dialogs",
        "base_dialog_standard": "module/base_dialog_standard",
        "schIheaderDo": "app/schIndex/schIheaderDo",
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
        }

    }
});

require(['app/site/sysMessage/sysMessageDo','schIheaderDo','headerDo'],
    function (sysMessageDo,schIheaderDo,headerDo) {
        headerDo.init();
        //schIheaderDo.top();
        new sysMessageDo().render();
    });