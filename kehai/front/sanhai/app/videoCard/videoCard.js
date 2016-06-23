/**
 * Created by slg on 2016/2/19.
 */

require.config({
    baseUrl: JS_BASEURL,
    paths: {
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "base": "module/base",
        "dialogs": "module/dialogs",
        "videoCardDo": "app/videoCard/videoCardDo"
    },
    shim: {}
});

require(["videoCardDo"], function (videoCardDo) {
    videoCardDo.video();
    videoCardDo.videoExpireDate();
    videoCardDo.videoCardChargeLog(1);
});