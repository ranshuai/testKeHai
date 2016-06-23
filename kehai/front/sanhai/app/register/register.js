
requirejs.config({
    baseUrl:JS_BASEURL,
    paths:{
        jquery: "lib/jquery-1.8.3.min",
        /*jquery_validate:"lib/jquery_validate/jquery.validate.min",
        addkehai_validate:"lib/jquery_validate/addkehai_validate",
        messages_zh:"lib/jquery_validate/messages_zh",*/
        jquery_ui_min:"lib/jquery-ui.min",
        sanhai_buttonCountdown:"module/sanhai_buttonCountdown",
        jquery_md5:"lib/jquery.md5",
        common:"module/common",
        dialogs:"module/dialogs",
        extendJquery:"module/extendJquery",
        base:"module/base"
    },
    shim: {
     /*   "addkehai_validate":['jquery','jquery_validate'],
        "messages_zh":['jquery_validate'],*/
        jquery_md5:["jquery"]
    }
});

require(["app/register/registerDo"]);