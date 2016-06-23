({
    appDir: '../../',
    baseUrl:'./',
    dir:'../../../dist',
    paths:{
        jquery: "lib/jquery-1.8.3.min",
        jquery_ui_min:"lib/jquery-ui.min",
        base:"module/base",
        basicSchool:"module/basicSchool",
        jquery_ui_widget:'lib/jqueryupload/jquery.ui.widget',
        jquery_iframe_transport:'lib/jqueryupload/jquery.iframe-transport',
        jquery_fileupload:'lib/jqueryupload/jquery.fileupload',
        jquery_xdr_transport:'lib/jqueryupload/jquery.xdr-transport',
        loadAreaAndMatch:'module/sanhai-area-standard-1.0.0',
        jquery_validate:"lib/jquery_validate/jquery.validate.min",
        addkehai_validate:"lib/jquery_validate/addkehai_validate",
        messages_zh:"lib/jquery_validate/messages_zh",
        jquery_Jcrop:'lib/jquery.Jcrop',
        common:"module/common",
        "dialogs":"module/dialogs"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/register/schoolPerfectInfo',
            include:[
                'jquery',
                'loadAreaAndMatch',
                'common',
                'base',
                'basicSchool',
                'jquery_ui_min',
                'jquery_validate',
                'addkehai_validate',
                'messages_zh',
                'app/register/schoolPerfectInfoDo'
            ]
        }
    ]
})
