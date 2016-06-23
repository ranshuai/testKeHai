/**
 * 设置支付密码入口
 * Created by slg on 2015/12/19.
 */


requirejs.config({
    baseUrl: JS_BASEURL,
    paths: {
        jquery: "lib/jquery-1.8.3.min",
        money: "module/money",
        common: "module/common",
        base: "module/base",
        dialogs: "module/dialogs",
        jquery_ui_min: "lib/jquery-ui.min",
        collectionAndattention: "module/collectionAndattention",
        sanhai_evaluate: "module/sanhai-evaluate",
        pageBar: "module/sanhai-base-pagebar-standard-1.0.0",
        base_dialog_standard: "module/base_dialog_standard",
        messages_zh: "lib/jquery_validate/messages_zh",
        jquery_md5: 'module/jquery.md5',
        sendCode: "module/sanhai-send-code-standard-1.0.0",
        site_shoppingcar: "module/sanhai-site-shoppingcar",
        setPaypasswordDo: "app/shoppingCar/setPaypassword/setPaypasswordDo",
        shoppingcarHeaderDo: "app/shoppingCar/shoppingcarHeaderDo"
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
        "jquery_md5":{
            deps: ['jquery'],
            exports: "jquery_md5"
        }
    }
})

//设置支付密码
require(["setPaypasswordDo", 'shoppingcarHeaderDo'], function (setPaypasswordDo, shoppingcarHeaderDo) {
    shoppingcarHeaderDo.topf();
    setPaypasswordDo.setPaypaw();
});