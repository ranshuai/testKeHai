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
        dialogs: "module/dialogs",
        base_dialog_standard: "module/base_dialog_standard",
        pageBar: "module/sanhai-base-pagebar-standard-1.0.0",
        schIteacherDo: "app/schIndex/teacher/schIteacherDo",
        schIheaderDo: "app/schIndex/schIheaderDo"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/schIndex/teacher/schIteacher',
            include:['money','pageBar','common','base_dialog_standard','base','schIheaderDo', 'schIteacherDo']
        }
    ]
})
