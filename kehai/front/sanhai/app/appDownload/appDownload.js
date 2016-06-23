/**
 * Created by Administrator on 2015/12/23.
 */
require.config({
    baseUrl:JS_BASEURL,
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "base":"module/base",
        "common": "module/common",
        // "schIheaderDo": "app/schIndex/schIheaderDo",
        "base_dialog_standard": "module/base_dialog_standard",
        "dialogs": "module/dialogs",
        "headerDo":"app/userInfo/headerDo"
    }
});
require(['headerDo','app/appDownload/appDownloadDo'],
function (headerDo) {
    headerDo.init();
   // schIheaderDo.top();
});

