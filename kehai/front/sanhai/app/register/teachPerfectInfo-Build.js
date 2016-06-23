({
    appDir: '../../',
    baseUrl:'./',
    dir:'../../../dist',
    paths:{
        jquery: "lib/jquery-1.8.3.min",
        jquery_ui_min:"lib/jquery-ui.min",
        base:"module/base",
        jquery_ui_widget:'lib/jqueryupload/jquery.ui.widget',
        jquery_fileupload:'lib/jqueryupload/jquery.fileupload',
        loadAreaAndMatch:'module/sanhai-area-standard-1.0.0',
        jquery_validate:"lib/jquery_validate/jquery.validate.min",
        addkehai_validate:"lib/jquery_validate/addkehai_validate",
        messages_zh:"lib/jquery_validate/messages_zh",
        jquery_Jcrop:'lib/jquery.Jcrop',
        basic:'module/basic',
        common:"module/common",
        "base_dialog_standard":"module/base_dialog_standard",
        loadVersionAndMatch:'app/course/sanhai-course-standard-1.0.0',
        "dialogs":"module/dialogs",
        "pageBar": 'module/sanhai-base-pagebar-standard-1.0.0'
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/register/teachPerfectInfo',
            include:[
                'jquery',
                'loadAreaAndMatch',
                'loadVersionAndMatch',
                'common',
                'jquery_validate',
                'jquery_fileupload',
                'addkehai_validate',
                'messages_zh',
                'base',
                'jquery_ui_min',
                'basic',
                'app/register/teachPerfectInfoDo'
            ]
        }
    ]
})
