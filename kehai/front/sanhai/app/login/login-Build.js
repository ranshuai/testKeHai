({
    appDir: '../../',
    baseUrl:'./',
    dir:'../../../dist',
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "base": "module/base",
        "jquery_md5": 'lib/jquery.md5',
        "common": "module/common",
        "dialogs": "module/dialogs"
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/login/login',
            include:[ 'jquery','dialogs','jquery_md5','app/login/loginDo']
        }
    ]
})
