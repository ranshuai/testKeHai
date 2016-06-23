/**
 * Created by 蒋淼 on 2016/2/19.
 */
require.config({
    baseUrl: JS_BASEURL,
    paths: {
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "base": "module/base",
        "dialogs": "module/dialogs",
        "videoViewDo": "app/videoView/videoViewDo"
    },
    shim: {}
});

require(["videoViewDo"], function (videoViewDo) {
    videoViewDo.loadVideoView(1);
});