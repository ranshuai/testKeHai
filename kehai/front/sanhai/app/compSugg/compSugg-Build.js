({
    appDir: '../../',
    baseUrl:'./',
    dir:'../../../dist',
    paths:{
        jquery: "lib/jquery-1.8.3.min",
        jquery_ui_min: "lib/jquery-ui.min",
        base: "module/base",
        money: "module/money",
        common: "module/common",
        dialogs: "module/dialogs",
        base_dialog_standard: "module/base_dialog_standard",
        schIheaderDo: "app/schIndex/schIheaderDo",
        compSuggDo: "app/compSugg/compSuggDo"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/compSugg/compSugg',
            include:[ 'base','jquery','compSuggDo', 'schIheaderDo','app/site/siteSearchBar']
        }
    ]
})
