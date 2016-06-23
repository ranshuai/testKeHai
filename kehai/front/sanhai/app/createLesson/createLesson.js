/**
 * Created by slg on 2016/1/7.
 */

require.config({
    baseUrl:JS_BASEURL,
    paths:{
        //"jquery": "lib/jquery-1.8.3.min",
        //"jquery_ui_min": "lib/jquery-ui.min",
        "umeditor_config":"lib/umeditor.config",
        "umeditor":"lib/umeditor",
        //"zh-cn":"lib/zh-cn/zh-cn",
        "ztree":"lib/ztree/jquery.ztree.all-3.5.min",
        "common":"module/common",
        /*"jquery.datetimepicker":"lib/jquery.datetimepicker",*/
        "base":"module/base",
        "dialogs":"module/dialogs",
        "createLessonDo":"app/createLesson/createLessonDo",
        "kpTree":"module/kpTree",
        "qrcode":"lib/qrcode/jquery.qrcode.min",
        "jquery_fileupload":"lib/jqueryupload/jquery.fileupload"
    },
    shim:{
        "umeditor":{
            deps:['jquery'],
            exports:"umeditor"
        },
        "zh-cn":{
            deps:['umeditor'],
            exports:"zh-cn"
        },
       /* "umeditor_config":{
            exports:"umeditor_config"
        },*/
        "jquery":{
            exports:"jquery"
        },
        "ztree":{
            deps:['jquery'],
            exports:"ztree"
        },
        "qrcode":{
            depes:['jquery'],
            exports:"qrcode"
        }
    }/*,
    urlArgs: "bust=" +  (new Date()).getTime()*/


});

require(["createLessonDo"],function(createLessonDo){
    createLessonDo.init()
});
