/**
 * Created by weiyan on 15/12/09.
 * 学校首页--主体
 */

requirejs.config({
    baseUrl:JS_BASEURL,
    paths:{
        jquery: "lib/jquery-1.8.3.min",
        jquery_ui_min: "lib/jquery-ui.min",
        base: "module/base",
        money: "module/money",
        common: "module/common",
        dialogs:"module/dialogs",
        pageBar :"module/sanhai-base-pagebar-standard-1.0.0",
        base_dialog_standard:"module/base_dialog_standard",
        shoppingcarHeaderDo:"app/shoppingCar/shoppingcarHeaderDo",
        paySuccessDo:"app/shoppingCar/paySuccess/paySuccessDo"
    },
    shim: {
        "module/cookie": {
            deps: ['jquery'],
            exports: "cookie"
        }
    }
});


require(['paySuccessDo','shoppingcarHeaderDo'],function(paySuccessDo,shoppingcarHeaderDo) {


    shoppingcarHeaderDo.topf();
    paySuccessDo.a();


})
