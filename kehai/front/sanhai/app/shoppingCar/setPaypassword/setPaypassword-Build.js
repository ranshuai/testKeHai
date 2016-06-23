({
    appDir: '../../../',
    baseUrl:'./',
    dir:'../../../../dist',
    paths:{
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
        jquery_md5:'module/jquery.md5',
        sendCode:"module/sanhai-send-code-standard-1.0.0",
        site_shoppingcar:"module/sanhai-site-shoppingcar",
        setPaypasswordDo:"app/shoppingCar/setPaypassword/setPaypasswordDo",
        shoppingcarHeaderDo:"app/shoppingCar/shoppingcarHeaderDo"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/shoppingCar/setPaypassword/setPaypassword',
            include:[ 'jquery','dialogs','money','common','base_dialog_standard','messages_zh','base','lib/jquery_validate/jquery.validate.min','sendCode','jquery_md5',"setPaypasswordDo",'shoppingcarHeaderDo']
        }
    ]
})
