/**
 * Created by Administrator on 2015/12/29.
 */
requirejs.config({
    baseUrl: JS_BASEURL,
    paths: {
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "base": "module/base",
        "jquery_md5": 'lib/jquery.md5',
        "common": "module/common",
        "dialogs": "module/dialogs"
    },
    shim:{
        "jquery_ui_min":{
            deps: ["jquery"]
        },
        "jquery_md5":{
            deps: ['jquery']
        }
    }
});

require(['app/login/loginDo']);

