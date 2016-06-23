/**
 * Created by liqinghua on 16/1/27.
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
        "ajax-pushlet-client":"lib/ajax-pushlet-client",
        "consult_stu2": "app/chat/consult_stu2"
    },
    shim: {
        "consult_stu2": ["jquery", "common", "ajax-pushlet-client"],
        "jquery_mousewheel": ["jquery"],
        "iscroller": ["jquery","jquery_mousewheel"]
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
        PL.leave();
    }
    $(function(){
        consult_stu2.AsyncGetAdviserList(type, typeId);
    });
});