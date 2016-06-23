/**
 * Created by Administrator on 2015/12/19.
 */
//
requirejs.config({
    baseUrl:JS_BASEURL,
    paths:{
        jquery: "lib/jquery-1.8.3.min",
        jquery_ui_min:"lib/jquery-ui.min",
        base:"module/base",
        basicSchool:"module/basicSchool",

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
        common:"module/common",
        "dialogs":"module/dialogs",

        "umeditor_config": "lib/umeditor.config",                                        // 富文本
        "umeditor": "lib/umeditor"                                                  // 富文本
    }

});

require(["app/register/schoolPerfectInfoDo"])