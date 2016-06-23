require.config({
    shim:{
        'jquery.rViewReply':{
            deps:['jquery', 'base'],
            exports:'jQuery.fn.rViewReply'
        }
    }
});
require(["app/order/searchEvaluateDo"]);
