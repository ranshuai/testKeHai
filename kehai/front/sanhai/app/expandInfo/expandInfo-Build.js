({
    appDir: '../../',
    baseUrl:'./',
    dir:'../../../dist',
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "base":"module/base",
        "dialogs":"module/dialogs",
        /*"angular":"lib/angular.min-1.2.2",
         "bootstrap":"lib/bootstrap",
         "domReady":"lib/plugin/domReady",*/
        "expandInfoDo":"app/expandInfo/expandInfoDo"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/expandInfo/expandInfo',
            include:[
                'jquery','dialogs','base',
                'app/expandInfo/expandInfoDo'
            ]
        }
    ]
})

