({
    appDir: '../../../',
    baseUrl:'./',
    dir:'../../../../dist',
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "money": "module/money",
        "common": "module/common",
        "base": "module/base",
        "siteTopBar": "app/site/siteTopBar",
        "jquery_ui_min": "lib/jquery-ui.min",
        "pageBar": "module/sanhai-base-pagebar-standard-1.0.0",
        "dialogs": "module/dialogs",
        base_dialog_standard: "module/base_dialog_standard",
        "showSelectNav": "app/site/list/showSelectNav",
        "loadHotCourse": "app/site/list/loadHotCourse",
        "siteCourseList": "app/site/list/siteCourseList"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        //E:\work\nepfrontsystem\web\WEB-INF\page\layouts\indexLayout.jsp
        {
            name: 'app/site/list/courseList',
            include:[
                'jquery',
                'showSelectNav',
                'loadHotCourse',
                'siteCourseList',
                'app/site/siteMainNav',
                'app/site/siteSearchBar',
                'app/site/siteTopBar',
                'money',
                'common',
                'base',
                'app/site/list/courseListDo'
            ]
        }],
    shim: {
        "siteTopBar": {
            deps: ['jquery', 'jquery_ui_min'],
            exports: "siteTopBar"
        }

    }
})
