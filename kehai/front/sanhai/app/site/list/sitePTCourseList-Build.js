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
        "sitePTCourseList": "app/site/list/sitePTCourseList",
        "intoPtCourse":"app/site/list/intoPtCourse-1.0.0",
        "jquery_md5": 'lib/jquery.md5'
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/site/list/ptCourseList',
            include: ['jquery',
                'showSelectNav',
                'loadHotCourse',
                'sitePTCourseList',
                'app/site/siteMainNav',
                'app/site/siteSearchBar',
                'app/site/siteTopBar',
                'money',
                'common',
                'base',
                'app/site/list/ptCourseListDo']
        }
    ]
})
