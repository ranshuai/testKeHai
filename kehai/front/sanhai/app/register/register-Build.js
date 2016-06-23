({
    appDir: '../../',
    baseUrl:'./',
    dir:'../../../dist',
    paths:{
        jquery: "lib/jquery-1.8.3.min",
        jquery_validate:"lib/jquery_validate/jquery.validate",
        addkehai_validate:"lib/jquery_validate/addkehai_validate",
        messages_zh:"lib/jquery_validate/messages_zh",
        jquery_ui_min:"lib/jquery-ui.min",
        sanhai_buttonCountdown:"module/sanhai_buttonCountdown",
        jquery_md5:"lib/jquery.md5",
        common:"module/common",
        dialogs:"module/dialogs",
        extendJquery:"module/extendJquery",
        base:"module/base"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/register/register',
            include:[
                'jquery',
                'dialogs',
                'extendJquery',
                'common',
                'base',
                'jquery_md5',
                'jquery_ui_min',
                'jquery_validate',
                'addkehai_validate',
                'sanhai_buttonCountdown',
                'app/register/registerDo'
            ]
        }
    ]
})
