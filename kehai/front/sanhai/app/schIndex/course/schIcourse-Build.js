({
    appDir: '../../../',
    baseUrl:'./',
    dir:'../../../../dist',
    paths:{
        jquery: "lib/jquery-1.8.3.min",
        jquery_ui_min: "lib/jquery-ui.min",
        base: "module/base",
        money: "module/money",
        common: "module/common",
        dialogs:"module/dialogs",
        base_dialog_standard:"module/base_dialog_standard",
        pageBar:"module/sanhai-base-pagebar-standard-1.0.0",
        schIcourseDo:"app/schIndex/course/schIcourseDo",
        schIheaderDo:"app/schIndex/schIheaderDo",
        schIndexCcourse:"module/schIndexCourse"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/schIndex/course/schIcourse',
            include:['money','pageBar','base_dialog_standard','dialogs','base','jquery_ui_min','schIheaderDo','schIcourseDo']
        }
    ]
})
