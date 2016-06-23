/**
 * Created by cc on 2015/12/7.
 */
require.config({
    baseUrl:JS_BASEURL,
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "birthday":"module/birthday",
        "base":"module/base",
        jquery_ui_widget:'lib/jqueryupload/jquery.ui.widget',
        jquery_iframe_transport:'lib/jqueryupload/jquery.iframe-transport',
        jquery_fileupload:'lib/jqueryupload/jquery.fileupload',
        jquery_xdr_transport:'lib/jqueryupload/jquery.xdr-transport',
        datetimepicker:'lib/jquery.datetimepicker',
        "fileupload_process":"lib/jqueryupload/jquery.fileupload-process",
        "fileupload_validate":"lib/jqueryupload/jquery.fileupload-validate",
        "dialogs":"module/dialogs",
        "basic": 'module/basic',
        "loadAreaAndMatch": 'module/sanhai-area-standard-1.0.0',
     /*   jquery_validate:"lib/jquery_validate/jquery.validate.min",
        addkehai_validate:"lib/jquery_validate/addkehai_validate",
        messages_zh:"lib/jquery_validate/messages_zh",*/
        jquery_ui_min:"lib/jquery-ui.min",
        common:"module/common",
        "jquery_Jcrop": 'lib/jquery.Jcrop',
    },
    shim: {
        /*"addkehai_validate":['jquery_validate'],
        "messages_zh":['jquery_validate'],*/
        "loadVersionAndMatch":{
            deps:["jquery"],
            exports:"loadVersionAndMatch"
        },
        "datetimepicker":{
            deps:["jquery"],
            exports:"datetimepicker"
        },
        "birthday":["jquery"],
        "jquery-ui":["jquery"],
        "jquery_Jcrop" : ["jquery"]
    }
});

require(["app/register/stuInfoDo"],
    function(stuInfo){
    stuInfo.init();
});
