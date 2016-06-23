/**
 * Created by boys on 2016/2/24.
 */

require.config({
    baseUrl: JS_BASEURL,
    paths: {
        "jquery": "lib/jquery-1.8.3.min",
        "money": "module/money",
        "common": "module/common",
        "base": "module/base",
        "jquery_ui_min": "lib/jquery-ui.min",
        "pageBar": "module/sanhai-base-pagebar-standard-1.0.0",
        "dialogs": "module/dialogs",
        "base_dialog_standard": "module/base_dialog_standard"
    },
    shim: {
        "dialogs": {
            deps: ['jquery', 'jquery_ui_min'],
            exports: "dialogs"
        }
    }

});

require(['app/site/list/ptVideoListDo'], function(){
    new PtVideoListDo().render();
});
