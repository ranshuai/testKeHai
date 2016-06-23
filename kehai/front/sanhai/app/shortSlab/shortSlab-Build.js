({
    appDir: '../../../',
    baseUrl:'./',
    dir:'../../../../dist',
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "base":"module/base",
        "angular":"lib/angular.min-1.2.2",
        "bootstrap":"lib/bootstrap",
        "domReady":"lib/plugin/domReady"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/shortSlab/shortSlab',
            include:[
                'jquery','angular','app/shortSlab/shortSlabDo'
            ]
        }
    ]
})
