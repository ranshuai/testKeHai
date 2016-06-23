({
    appDir: '../../../',
    baseUrl:'./',
    dir:'../../../../dist',
    paths:{
        jquery: "lib/jquery-1.8.3.min",
        money: "module/money",
        common: "module/common",
        base: "module/base",
        dialogs:"module/dialogs",
        jquery_ui_min:"lib/jquery-ui.min",
        collectionAndattention:"module/collectionAndattention",
        sanhai_evaluate:"module/sanhai-evaluate",
        pageBar:"module/sanhai-base-pagebar-standard-1.0.0",
        base_dialog_standard:"module/base_dialog_standard",
        teacherClassesDo:"app/siteTeacher/teacherClasses/teacherClassesDo"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/siteTeacher/teacherClasses/teacherClasses',
            include:['jquery','dialogs','money','base_dialog_standard','common','base','jquery_ui_min','app/siteTeacher/teacherHeader',"teacherClassesDo"]
        }
    ]
})
