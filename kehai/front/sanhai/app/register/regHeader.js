require.config({

    baseUrl:JS_BASEURL,
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "base":"module/base",
    },

});

require(["app/register/regHeaderDo"],function(regHeader){
    regHeader.init();
});