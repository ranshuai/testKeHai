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
        base_dialog_standard: "module/base_dialog_standard",
        "intoPtCourse":"app/site/list/intoPtCourse-1.0.0",
        "jquery_md5": 'lib/jquery.md5',
        "kpTree":"module/kpTree",
        "PTCoursePopBox":"app/site/list/PTCoursePopBox"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/site/course/ptCourseDetails',
            include: [
                'jquery',
                'loadHotCourse',
                'sanhai_evaluate',
                'money',
                'pageBar',
                'app/site/list/intoPtCourse-1.0.0',
                'dialogs',
                'PTCoursePopBox',
                'common',
                'base',
                'jquery_ui_min',
                'kpTree','app/site/course/ptCourseDetailsDo', 'schIheaderDo', 'loadHotCourse',
                'app/site/course/courseDetailsDo'
            ]
        }
    ]
})
