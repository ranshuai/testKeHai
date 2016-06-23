/**
 * 购物车余额足够支付入口
 * Created by slg on 2015/12/18.
 */

requirejs.config({
    baseUrl: JS_BASEURL,
    paths: {
        jquery: "lib/jquery-1.8.3.min",
        money: "module/money",
        common: "module/common",
        base: "module/base",
        dialogs:"module/dialogs",
        jquery_ui_min: "lib/jquery-ui.min",
        collectionAndattention:"module/collectionAndattention",
        sanhai_evaluate:"module/sanhai-evaluate",
        pageBar:"module/sanhai-base-pagebar-standard-1.0.0",
        base_dialog_standard:"module/base_dialog_standard",
        messages_zh:"lib/jquery_validate/messages_zh",
        site_shoppingcar:"module/sanhai-site-shoppingcar",
        moneyEnoughDo:"app/shoppingCar/moneyEnough/moneyEnoughDo",
        shoppingcarHeaderDo:"app/shoppingCar/shoppingcarHeaderDo"

    },

    shim: {
        "lib/jquery_validate/jquery.validate.min": {
            deps: ['jquery'],
            exports: "jquery_validate"
        },
        "module/cookie": {
            deps: ['jquery'],
            exports: "cookie"
        },
        "module/jquery.md5": {
            deps: ['jquery'],
            exports: "jquery_md5"
        }

    }
})

//余额足够支付
require(["moneyEnoughDo",'shoppingcarHeaderDo'],function(moneyEnoughDo,shoppingcarHeaderDo){
    shoppingcarHeaderDo.topf();
    moneyEnoughDo.enough();
});