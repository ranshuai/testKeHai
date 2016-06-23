({
    appDir: '../../',
    baseUrl:'./',
    dir:'../../../dist',
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "money": "module/money",
        "common": "module/common",
        "base": "module/base",
        "dialogs": "module/dialogs",
        "jquery_ui_min": "lib/jquery-ui.min"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        //E:\work\nepfrontsystem\web\WEB-INF\page\layouts\indexLayout.jsp
        {
            name: 'app/site/index',
            include: [
                'jquery',
                'app/site/siteSearchBar',
                'app/site/siteIndex',
                'app/site/siteMainNav',
                'app/site/enterOrganization',
                'app/site/siteTopBar',
                'money',
                'common',
                'base',
                'app/site/indexDo'
            ]
        }
    ]
})
