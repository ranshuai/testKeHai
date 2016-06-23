require.config({

    baseUrl:JS_BASEURL,
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "base":"module/base",
        "dialogs":"module/dialogs",
        "loadAreaAndMatch": 'module/sanhai-area-standard-1.0.0',
        jquery_ui_min:"lib/jquery-ui.min",
        common:"module/common",
    },
    shim: {
        "loadVersionAndMatch":{
            deps:["jquery"],
            exports:"loadVersionAndMatch"
        },
        "jquery_ui_min":["jquery"]
    }
});

require(["app/register/joinOrgDo"],function(joinOrg){
    joinOrg.init();
});