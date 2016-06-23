/**
 * 教师评论入口
 * Created by slg on 2015/12/16.
 */

requirejs.config({
    baseUrl: JS_BASEURL,
    paths: {
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
        teacherEvaluateRecordDo:"app/siteTeacher/teacherEvaluateRecord/teacherEvaluateRecordDo",
        headerDo:"app/userInfo/headerDo",
        teacherHeaderDo:"app/siteTeacher/teacherHeaderDo"

    }
    // shim:{
    //     "app/siteTeacher/teacherHeaderDo":{
    //         deps:['jquery','common','base'],
    //         exports:"teacherHeaderDo"
    //     }
    // }
});
// require([
//     'app/siteTeacher/teacherHeader'
// ]);

require(["teacherEvaluateRecordDo",'teacherHeaderDo'],function(teacherEvaluateRecordDo) {
    teacherEvaluateRecordDo.tchEvaluateRecord()
})