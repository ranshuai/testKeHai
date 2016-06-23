({
    appDir: '../../../',
    baseUrl:'./',
    dir:'../../../../dist',
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
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/shoppingCar/paySuccess/paySuccess',
            include:[ 'money','base',"module/cookie",'paySuccessDo','shoppingcarHeaderDo']
        }
    ]
})
