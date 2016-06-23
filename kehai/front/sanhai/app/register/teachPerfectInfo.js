/**
 * Created by Administrator on 2015/12/19.
 */
requirejs.config({
    //urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl:JS_BASEURL,
    paths:{
        jquery: "lib/jquery-1.8.3.min",
        jquery_ui_min:"lib/jquery-ui.min",
        base:"module/base",

        jquery_ui_widget:'lib/jqueryupload/jquery.ui.widget',
        jquery_iframe_transport:'lib/jqueryupload/jquery.iframe-transport',
        jquery_fileupload:'lib/jqueryupload/jquery.fileupload',
        jquery_xdr_transport:'lib/jqueryupload/jquery.xdr-transport',

        "fileupload_process":"lib/jqueryupload/jquery.fileupload-process",
        "fileupload_validate":"lib/jqueryupload/jquery.fileupload-validate",

        loadAreaAndMatch:'module/sanhai-area-standard-1.0.0',
       /* jquery_validate:"lib/jquery_validate/jquery.validate.min",
        addkehai_validate:"lib/jquery_validate/addkehai_validate",
        messages_zh:"lib/jquery_validate/messages_zh",*/
        jquery_Jcrop:'lib/jquery.Jcrop',
        basic:'module/basic',
        common:"module/common",
        "base_dialog_standard":"module/base_dialog_standard",
        loadVersionAndMatch:'app/course/sanhai-course-standard-1.0.0',
        "dialogs":"module/dialogs",
        "pageBar": 'module/sanhai-base-pagebar-standard-1.0.0'
    },
    /*shim: {
        "addkehai_validate":['jquery_validate'],
        "messages_zh":['jquery_validate']
    }*/
});

require(["app/register/teachPerfectInfoDo"]);

