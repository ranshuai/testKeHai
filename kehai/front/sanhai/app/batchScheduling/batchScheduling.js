/**
 * Created by slg on 2016/4/6.
 */
require.config({
    baseUrl:JS_BASEURL,
    paths:{
        jquery:"lib/jquery-1.8.3.min",
        dialogs:"module/dialogs",
        "jquery_ui_min": "lib/jquery-ui.min",
        batchSchedulingDo:"app/batchScheduling/batchSchedulingDo"
    }
});

require(["batchSchedulingDo"],function(batchSchedulingDo){
    //batchSchedulingDo.batchScheduling()
});
