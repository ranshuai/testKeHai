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
        "consult_stu2": "app/chat/consult_stuIM",
        "easemob": "app/chat/sdk/easemob.im-1.0.7",
        "easemob_im": "app/chat/easemob.im.config"
    },
    shim: {
        "consult_stu2": ["jquery", "common"],
        "jquery_mousewheel": ["jquery"],
        "iscroller": ["jquery","jquery_mousewheel"],
        "easemob_im": ["easemob"],
        "easemob": ["dialogs"]
    }
});

require(["jquery","consult_stu2"],function($, consult_stu2){
    window.onbeforeunload = beforeClose;
    window.onunload = closeWindow;
    function beforeClose() {
        var warning = "确认退出?";
        return warning;
    }
    function closeWindow() {

    }
    $(function(){
        consult_stu2.AsyncGetAdviserList(type, typeId);
    });
});