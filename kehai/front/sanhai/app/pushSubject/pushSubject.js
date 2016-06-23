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
        "expandInfoDo":"app/expandInfo/expandInfoDo",
        "pushSubjectDo":"app/pushSubject/pushSubjectDo"
    }
});

require(['jquery','pushSubjectDo'],function($,pushSubjectDo) {

    pushSubjectDo.a();

});
