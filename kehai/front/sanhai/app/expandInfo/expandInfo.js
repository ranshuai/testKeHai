/**
 * Created by weiyan on 16/01/07.
 * 推课
 */
requirejs.config({
    baseUrl:"/web/front/sanhai/",
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "base":"module/base",
        "dialogs":"module/dialogs",
        /*"angular":"lib/angular.min-1.2.2",
        "bootstrap":"lib/bootstrap",
        "domReady":"lib/plugin/domReady",*/
        "expandInfoDo":"app/expandInfo/expandInfoDo"

    }
});

require(['expandInfoDo'],function(expandInfoDo) {
    expandInfoDo.allChanges();
    expandInfoDo.a();

})
