(function (exports) {
    var config = {

        baseUrl: './',    //默认库寻址地址

        paths: {
            /*基本库依赖*/
            jquery: "vendor/jquery.min",
            bootstrap: "vendor/bootstrap.min",
            lazyload: "vendor/lazyload",
            underscore: 'vendor/underscore',
            template: 'vendor/template',
            domReady: "plugin/domReady",
            text: "plugin/require.text",    //text!text_path/hello.tpl
            css: "plugin/require.css",      //css!css_path/swiper.css
            text_path: "templates",
            css_path: "../css",

            /*home*/
            swiper: "vendor/swiper",

            /*content*/
            backbone: "vendor/backbone.min",
        },

        map: {
            '*': {
                'text': 'plugin/require.text',
                'css': 'plugin/require.css'
            }
        },

        shim: {

            jquery:{
              exports:'$'
            },

            underscore: {
                exports: '_'
            },

            'domReady': {
                exports: "domReady"
            },


            'template': {
                exports: "template"
            },

            'lazyload': ['jquery'],

            'bootstrap': ['jquery']
        }
};
    exports.REQUIREJSCONFIG = config;
})(window);