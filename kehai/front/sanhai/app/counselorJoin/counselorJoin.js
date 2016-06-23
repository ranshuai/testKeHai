/**
 * Created by slg on 2016/2/18.
 */

require.config({

    baseUrl:JS_BASEURL,
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "base":"module/base",
        "dialogs":"module/dialogs",
        common:"module/common",
    },
    shim:{

    }
});

require(["app/counselorJoin/counselorJoinDo"],function(counselorJoinDo){
    counselorJoinDo.init();
});
