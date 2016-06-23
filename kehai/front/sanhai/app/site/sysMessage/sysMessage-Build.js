({
    appDir: '../../../',
    baseUrl:'./',
    dir:'../../../../dist',
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "money": "module/money",
        "common": "module/common",
        "base": "module/base",
        "jquery_ui_min": "lib/jquery-ui.min",
        "pageBar": "module/sanhai-base-pagebar-standard-1.0.0",
        "dialogs": "module/dialogs",
        base_dialog_standard: "module/base_dialog_standard",
        schIheaderDo: "app/schIndex/schIheaderDo"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        //E:\work\nepfrontsystem\web\WEB-INF\page\layouts\indexLayout.jsp
        {
            name: 'app/site/sysMessage/sysMessage',
            include:[
                'jquery',
                'app/site/siteSearchBar',
                'common',
                'pageBar',
                'dialogs',
                'base_dialog_standard',
                'money',
                'base',
                'app/site/sysMessage/sysMessageDo'
            ]
        }
    ]
})
