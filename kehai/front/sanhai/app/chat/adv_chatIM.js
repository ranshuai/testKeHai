/**
 * Created by yinjiaming on 2016/03/22
 */

require.config({
    baseUrl: JS_BASEURL,
    paths: {
        "jquery": "lib/jquery-1.8.3.min",                                            // jquery-1.8.3
        "jquery_ui_min": "lib/jquery-ui.min",                                   // jquery UI
        "jquery_mousewheel":"lib/jquery.mousewheel",
        "base": "module/base",
        "dialogs": "module/dialogs",
        "common": "module/common",                                                      // 通用功能
        "iscroller":"app/chat/iscroller",
        "consult_adv2": "app/chat/consult_advIM",
        "easemob": "app/chat/sdk/easemob.im-1.0.7",
        "easemob_im": "app/chat/easemob.im.config"
    },
    shim: {
        "consult_adv2": ["jquery", "common"],
        "jquery_mousewheel": ["jquery"],
        "iscroller": ["jquery","jquery_mousewheel"],
        "easemob_im": ["easemob"]
    }
});

require(["jquery","consult_adv2"],function($, consult_adv2){
    window.onbeforeunload = beforeClose;
    window.onunload = closeWindow;
    function beforeClose() {
        var warning = "确认退出?";
        return warning;
    }
    function closeWindow() {

    }
    $(function(){
        consult_adv2.AsyncAdviserGetInfo();
    });
});