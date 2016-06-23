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
        "loadHotCourse": "app/site/list/loadHotCourse",
        "sanhai_evaluate": "app/site/sanhai-evaluate",
        searchBar: "app/site/course/searchBar",
        schIheaderDo: "app/schIndex/schIheaderDo",
        base_dialog_standard: "module/base_dialog_standard"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/site/course/courseDetails',
            include: [
                'jquery',
                'loadHotCourse',
                'sanhai_evaluate',
                'money',
                'pageBar',
                'dialogs',
                'common',
                'base',
                'jquery_ui_min',
                'app/site/course/courseDetailsDo'
            ]
        }
    ]
})
