({
    appDir: '../../',
    baseUrl:'./',
    dir:'../../../dist',
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "birthday":"module/birthday",
        "base":"module/base",
        "jquery_ui_widget": 'lib/jqueryupload/jquery.ui.widget',
        "jquery_fileupload": 'lib/jqueryupload/jquery.fileupload',
        "dialogs":"module/dialogs",
        "basic": 'module/basic',
        "loadAreaAndMatch": 'module/sanhai-area-standard-1.0.0',
        jquery_validate:"lib/jquery_validate/jquery.validate.min",
        addkehai_validate:"lib/jquery_validate/addkehai_validate",
        messages_zh:"lib/jquery_validate/messages_zh",
        jquery_ui_min:"lib/jquery-ui.min",
        common:"module/common",
        "jquery_Jcrop": 'lib/jquery.Jcrop'
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/register/stuInfo',
            include:[
                "loadAreaAndMatch","common","base","jquery_fileupload","dialogs","jquery_Jcrop","basic",
                "jquery_validate",
                "addkehai_validate","messages_zh","jquery","birthday",
                'app/register/stuInfoDo'
            ]
        }
    ]
})
