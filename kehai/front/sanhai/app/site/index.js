/**
 * Created by bbb on 2015/12/14.
 */
requirejs.config({
    baseUrl: JS_BASEURL,
    paths: {
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "money": "module/money",
        "common": "module/common",
        "base": "module/base",
        "dialogs": "module/dialogs",
        "base_dialog_standard": "module/base_dialog_standard",
        "siteTopBar": "app/site/siteTopBar",
        "loadAreaAndMatch":"module/sanhai-area-standard-1.0.0",
        'jquery_validate':"lib/jquery_validate/jquery.validate.min",
        'addkehai_validate':"lib/jquery_validate/addkehai_validate",
        'messages_zh':"lib/jquery_validate/messages_zh",
        "headerDo":"app/userInfo/headerDo"
    },
    waitSeconds: 0
   

});
require(['app/site/indexDo'],
    function (indexDo) {
            new indexDo().render();
    });

