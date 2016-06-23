require.config({
    baseUrl:"/front/sanhai/",
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "base":"module/base",
        "dialogs": "module/dialogs",
        "angular":"lib/angular.min-1.2.2",
        "angular-ui-router":"lib/angular-ui-router",
        "angular-async-loader":"lib/angular-async-loader",

        "domReady":"lib/plugin/domReady",
        "pagination":"lib/tm.pagination",
        "rocApp":"app/roc/rocApp"
    },
    shim: {
        'angular': {exports: 'angular'},
        'pagination': {
            deps:['angular'],
            exports: 'pagination'
        },
        'angular-ui-router': {deps: ['angular']}
    }
   /* urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用*/

});


require(['domReady!','rocApp','angular-ui-router','app/roc/rocApp-routes'],function(document) {

    'use strict';
    angular.bootstrap(document,['rocApp']);
});

